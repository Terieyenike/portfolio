const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

const MAX_BODY_BYTES = 10_000;
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/verify" && request.method === "GET") {
      return verificationPage(url);
    }

    const allowedOrigin = getAllowedOrigin(request, env, url.pathname === "/verify");
    if (request.headers.has("Origin") && !allowedOrigin) {
      return json({ error: "This request is not allowed." }, 403);
    }

    if (request.method === "OPTIONS") {
      if (!allowedOrigin) return json({ error: "This request is not allowed." }, 403);
      return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) });
    }

    if (url.pathname === "/submit" && request.method === "POST") {
      return submit(request, env, allowedOrigin);
    }
    if (url.pathname === "/verify" && request.method === "POST") {
      return verify(request, env, allowedOrigin);
    }

    return json({ error: "Not found." }, 404, allowedOrigin);
  },

  async scheduled(_event, env, ctx) {
    const now = new Date().toISOString();
    ctx.waitUntil(Promise.all([
      env.DB.prepare(
        "DELETE FROM contact_messages WHERE (verified_at IS NULL AND expires_at < ?) OR (sent_at IS NOT NULL AND sent_at < ?)",
      ).bind(now, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()).run(),
      env.DB.prepare("DELETE FROM contact_rate_limits WHERE reset_at < ?").bind(now).run(),
    ]));
  },
};

async function submit(request, env, origin) {
  if (!env.DB || !env.TURNSTILE_SECRET || !env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ error: "The contact service is not fully configured yet." }, 503, origin);
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > MAX_BODY_BYTES) return json({ error: "Message is too large." }, 413, origin);
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return json({ error: "Expected a JSON request." }, 415, origin);
  }

  let body;
  try {
    const rawBody = await readBoundedBody(request, MAX_BODY_BYTES);
    body = JSON.parse(rawBody);
  } catch (error) {
    if (error instanceof RangeError) return json({ error: "Message is too large." }, 413, origin);
    return json({ error: "Invalid request." }, 400, origin);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Invalid request." }, 400, origin);

  // Quietly discard bots that complete the hidden field; do not send email or reveal the trap.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true }, 202, origin);
  }

  const name = cleanText(body.name, 100);
  const email = cleanEmail(body.email);
  const subject = cleanText(body.subject || "", 160);
  const message = cleanText(body.message, 5000);
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!name || name.length < 2 || !email || !message || message.length < 10 || !turnstileToken || turnstileToken.length > 2048) {
    return json({ error: "Check the required fields and try again." }, 400, origin);
  }

  const hostname = new URL(request.headers.get("Origin") || "https://iamteri.tech").hostname;
  const originHosts = new Set((env.ALLOWED_ORIGINS || "https://iamteri.tech").split(",").map((item) => {
    try { return new URL(item.trim()).hostname; } catch { return ""; }
  }));
  const turnstile = await checkTurnstile(turnstileToken, request, env.TURNSTILE_SECRET);
  if (!turnstile.success || turnstile.action !== "contact" || turnstile.hostname !== hostname || !originHosts.has(hostname)) {
    return json({ error: "Spam check expired or could not be verified. Please try again." }, 400, origin);
  }

  const nowMs = Date.now();
  const now = new Date(nowMs).toISOString();
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const ipHash = await sha256(`${env.RATE_LIMIT_SALT || env.TURNSTILE_SECRET}:ip:${ip}`);
  const emailHash = await sha256(`${env.RATE_LIMIT_SALT || env.TURNSTILE_SECRET}:email:${email.toLowerCase()}`);
  const [ipCount, emailCount] = await Promise.all([
    incrementLimit(env.DB, `ip:${ipHash}`, now, new Date(nowMs + 60 * 60 * 1000).toISOString()),
    incrementLimit(env.DB, `email:${emailHash}`, now, new Date(nowMs + 60 * 60 * 1000).toISOString()),
  ]);
  if (ipCount > 8 || emailCount > 2) {
    return json({ error: "Too many attempts. Please wait before requesting another confirmation email." }, 429, origin);
  }

  const id = crypto.randomUUID();
  const token = randomToken();
  const tokenHash = await sha256(token);
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();
  await env.DB.prepare(
    "INSERT INTO contact_messages (id, name, email, subject, message, token_hash, ip_hash, email_hash, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).bind(id, name, email, subject, message, tokenHash, ipHash, emailHash, createdAt, expiresAt).run();

  const verifyUrl = `${new URL(request.url).origin}/verify?id=${encodeURIComponent(id)}&token=${encodeURIComponent(token)}`;
  const sent = await sendEmail(env, {
    to: [email],
    subject: "Confirm your message to Teri",
    text: `Please confirm that you can access this email address to send your message to Teri.\n\nConfirm: ${verifyUrl}\n\nThis link expires in 24 hours. If you did not submit the form, ignore this email. Your message will not be delivered unless you confirm.`,
    html: `<p>Please confirm that you can access this email address to send your message to Teri.</p><p><a href="${escapeHtml(verifyUrl)}">Confirm my email and send my message</a></p><p>This link expires in 24 hours. If you did not submit the form, ignore this email. Your message will not be delivered unless you confirm.</p>`,
    idempotencyKey: `contact-verification-${id}`,
  });

  if (!sent) return json({ error: "We couldn’t send the confirmation email right now. Please try again shortly." }, 502, origin);
  return json({ ok: true }, 202, origin);
}

async function verify(request, env, origin) {
  if (!env.DB || !env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ error: "The contact service is not fully configured yet." }, 503, origin);
  }
  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/x-www-form-urlencoded")) {
    return json({ error: "Invalid confirmation request." }, 415, origin);
  }

  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 2048) return json({ error: "Invalid confirmation request." }, 413, origin);
  let form;
  try {
    const rawForm = await readBoundedBody(request, 2048);
    form = new URLSearchParams(rawForm);
  } catch { return json({ error: "Invalid confirmation request." }, 400, origin); }
  const id = form.get("id") || "";
  const token = form.get("token") || "";
  if (!/^[\da-f-]{36}$/i.test(id) || !/^[A-Za-z0-9_-]{40,60}$/.test(token)) {
    return verificationResult("This confirmation link is invalid or incomplete.", false);
  }

  const record = await env.DB.prepare("SELECT * FROM contact_messages WHERE id = ?").bind(id).first();
  if (!record || record.expires_at < new Date().toISOString() || !(await safeEqual(await sha256(token), record.token_hash))) {
    return verificationResult("This confirmation link is invalid or has expired. Please submit the form again.", false);
  }
  if (record.sent_at) return verificationResult("Your email is already confirmed and your message has been delivered. Thank you.", true);

  const verifiedAt = new Date().toISOString();
  const sent = await sendEmail(env, {
    to: [env.CONTACT_TO],
    replyTo: record.email,
    subject: `Portfolio contact: ${record.subject || "New message"}`,
    text: `From: ${record.name}\nEmail: ${record.email}\nSubject: ${record.subject || "(none)"}\n\n${record.message}`,
    html: `<h2>New portfolio message</h2><p><strong>From:</strong> ${escapeHtml(record.name)} (${escapeHtml(record.email)})</p><p><strong>Subject:</strong> ${escapeHtml(record.subject || "(none)")}</p><p>${escapeHtml(record.message).replace(/\n/g, "<br>")}</p>`,
    idempotencyKey: `contact-message-${id}`,
  });
  if (!sent) return verificationResult("We confirmed your email, but could not deliver the message just now. Please retry this page shortly.", false, 502);

  await env.DB.prepare("UPDATE contact_messages SET verified_at = COALESCE(verified_at, ?), sent_at = ? WHERE id = ? AND sent_at IS NULL")
    .bind(verifiedAt, new Date().toISOString(), id).run();
  return verificationResult("Your email is confirmed and your message has been delivered. Thank you.", true);
}

async function checkTurnstile(token, request, secret) {
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") || undefined,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { success: false };
    return await response.json();
  } catch {
    return { success: false };
  }
}

async function incrementLimit(db, key, now, resetAt) {
  const row = await db.prepare(`
    INSERT INTO contact_rate_limits (bucket_key, count, reset_at) VALUES (?, 1, ?)
    ON CONFLICT(bucket_key) DO UPDATE SET
      count = CASE WHEN reset_at <= ? THEN 1 ELSE count + 1 END,
      reset_at = CASE WHEN reset_at <= ? THEN excluded.reset_at ELSE reset_at END
    RETURNING count
  `).bind(key, resetAt, now, now).first();
  return Number(row?.count || 0);
}

async function readBoundedBody(request, maxBytes) {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new RangeError("Request body too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

async function sendEmail(env, { to, subject, text, html, replyTo, idempotencyKey }) {
  try {
    const response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to,
        subject,
        text,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

function verificationPage(url) {
  const id = url.searchParams.get("id") || "";
  const token = url.searchParams.get("token") || "";
  if (!/^[\da-f-]{36}$/i.test(id) || !/^[A-Za-z0-9_-]{40,60}$/.test(token)) {
    return verificationHtml("This confirmation link is invalid or incomplete.", false);
  }
  // GET only displays the consent action: email security scanners must not consume the link.
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Confirm your email</title><style>body{font:16px/1.6 system-ui,sans-serif;background:#f6f7f2;color:#20251b;margin:0;min-height:100vh;display:grid;place-items:center;padding:24px}.card{max-width:520px;background:white;padding:36px;border:1px solid #dce1d3}button{background:#506814;color:white;border:0;padding:14px 20px;font:inherit;cursor:pointer}p{color:#555}</style><main class="card"><h1>Confirm your email</h1><p>Confirm that you can access this address and want your message delivered to Teri.</p><form method="post" action="/verify"><input type="hidden" name="id" value="${escapeHtml(id)}"><input type="hidden" name="token" value="${escapeHtml(token)}"><button type="submit">Confirm email and send message</button></form><p>If you did not send a message, close this page. Nothing is delivered unless you confirm.</p></main></html>`, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function verificationResult(message, success, status = 200) {
  return verificationHtml(message, success, status);
}

function verificationHtml(message, success, status = 200) {
  const color = success ? "#506814" : "#8a3b24";
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Email confirmation</title><style>body{font:16px/1.6 system-ui,sans-serif;background:#f6f7f2;color:#20251b;margin:0;min-height:100vh;display:grid;place-items:center;padding:24px}.card{max-width:520px;background:white;padding:36px;border:1px solid #dce1d3}a{color:${color}}</style><main class="card"><h1>${success ? "Thank you" : "Confirmation needed"}</h1><p>${escapeHtml(message)}</p><p><a href="https://iamteri.tech/contact/">Return to Teri’s portfolio</a></p></main></html>`, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function getAllowedOrigin(request, env, allowWorkerOrigin) {
  const origin = request.headers.get("Origin");
  if (!origin) return null;
  const configured = (env.ALLOWED_ORIGINS || "https://iamteri.tech,https://www.iamteri.tech,http://localhost:4321")
    .split(",").map((item) => item.trim());
  if (configured.includes(origin)) return origin;
  if (allowWorkerOrigin && origin === new URL(request.url).origin) return origin;
  return null;
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(value, status = 200, origin = null) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { ...JSON_HEADERS, ...(origin ? corsHeaders(origin) : {}) },
  });
}

function cleanText(value, max) {
  if (typeof value !== "string") return "";
  const cleaned = value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  return [...cleaned].slice(0, max).join("");
}

function cleanEmail(value) {
  if (typeof value !== "string" || value.length > 254) return "";
  const email = value.trim();
  if (!/^[^\s<>(),;:\\"\[\]]+@[^\s<>(),;:\\"\[\]]+\.[^\s<>(),;:\\"\[\]]{2,}$/.test(email)) return "";
  return email;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function safeEqual(left, right) {
  if (typeof right !== "string" || left.length !== right.length) return false;
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  let difference = 0;
  for (let index = 0; index < leftBytes.length; index++) difference |= leftBytes[index] ^ rightBytes[index];
  return difference === 0;
}
