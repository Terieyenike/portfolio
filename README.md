# Teri Eyenike Portfolio

A modern, world-class developer portfolio built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and Markdown.  
Showcasing projects, blog posts, and more — with a focus on accessibility, performance, and developer experience.

---

## ✨ Features

- **Astro** for fast, static site generation
- **Tailwind CSS** for utility-first, responsive styling
- **Markdown** for easy blog and content authoring
- **Dark mode** with smooth transitions
- **Responsive design** for all devices
- **SEO optimized** with meta tags and Open Graph
- **Accessible**: keyboard navigation, focus states, and ARIA labels
- **Microinteractions** and subtle animations
- **Social links** and “Buy Me a Coffee” support
- **Contact form** (customizable)
- **Tag system** for blog posts

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/terieyenike/portfolio.git
cd portfolio
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:4321](http://localhost:4321) to view your site.

---

## 🛠️ Project Structure

```
src/
  assets/         # Images, logos, and static assets
  components/     # Reusable UI components (e.g., ContactForm, PostItem)
  layouts/        # Layout components (BaseLayout, Header, Footer)
  pages/          # Astro pages (about, blog, contact, tags, etc.)
  content/        # Markdown blog posts
  utils/          # Utility functions (e.g., slugify)
public/           # Static files (robots.txt, favicon, etc.)
```

---

## 📝 Writing Blog Posts

- Add new posts in `src/content/blog/` as `.md` files.
- Use frontmatter for metadata:

```markdown
---
title: "My Awesome Post"
description: "A short summary of the post."
pubDate: 2025-06-04
image: "/assets/blog/cover.jpg"
tags: [astro, webdev]
readingTime: 4
---
```

---

## ⚙️ Customization

- **Site settings:** Edit `src/consts.ts` for site title, description, and social links.
- **Branding:** Replace logo files in `src/assets/img/`.
- **Colors & styles:** Adjust Tailwind config or CSS as needed.
- **Contact form:** The static form calls a Cloudflare Worker in `workers/contact/`. Cloudflare Turnstile is verified server-side; the message stays in D1 and is sent to `developedbyteri@gmail.com` through Resend only after the sender clicks a confirmation link. The Worker also enforces input limits, a honeypot, per-IP/per-address limits, one-time random tokens, expiration, strict CORS, and HTML escaping. Email confirmation proves access to the submitted mailbox, not a person's legal identity; disposable inboxes may still be used.

  **Set up the contact backend** (requires Cloudflare and Resend accounts, plus DNS access for a sending domain):
  1. Create a Cloudflare Turnstile widget for `iamteri.tech`, `www.iamteri.tech`, and `localhost` for development. Add the public site key to `.env` and the production site's build environment as `PUBLIC_TURNSTILE_SITE_KEY`.
  2. Verify a sending domain in Resend and publish the DNS records Resend provides. The default sender is `contact@send.iamteri.tech`, using a sending subdomain to isolate email reputation; keep it if available or change `CONTACT_FROM` in `workers/contact/wrangler.toml` to an address on a domain you verify. Keep `CONTACT_TO` as the inbox that should receive confirmed messages.
  3. From `workers/contact/`, run `npx wrangler d1 create teri-portfolio-contact`, replace `database_id` in `wrangler.toml` with the returned ID, and run `npx wrangler d1 migrations apply teri-portfolio-contact --remote`.
  4. Add Worker secrets with `npx wrangler secret put TURNSTILE_SECRET` and `npx wrangler secret put RESEND_API_KEY`; never put these values in `.env`, source files, or the browser bundle. Optionally set `RATE_LIMIT_SALT` as another Worker secret.
  5. Deploy the Worker with `npx wrangler deploy`. In Vercel, open the site's **Settings → Environment Variables** and add `PUBLIC_TURNSTILE_SITE_KEY` (the public widget key) and `PUBLIC_CONTACT_API_URL` (the Worker’s `https://...workers.dev` URL) to Production; add them to Preview too if you want forms on preview deployments. Vercel applies changed values to new deployments, so redeploy after saving. Keep `TURNSTILE_SECRET` and `RESEND_API_KEY` only in Cloudflare Worker secrets, never in Vercel or the static site.

  For local Worker development, create the D1 database locally with `npx wrangler d1 migrations apply teri-portfolio-contact --local`; put test secrets in the ignored `workers/contact/.dev.vars`. Use Cloudflare Turnstile's published test keys locally, and set `PUBLIC_CONTACT_API_URL` to the local Worker URL (normally `http://localhost:8787`). Do not use test keys or credentials in production. Unconfirmed submissions expire after 24 hours; confirmed messages are purged after 30 days. Only a keyed hash of the request IP is stored for abuse limits. Old Formspree submissions/settings are not migrated or deleted; the site no longer posts to Formspree once this version is deployed.

---

## 🌐 Deployment

You can deploy this site to any static host (Netlify, Vercel, GitHub Pages, etc.):

```bash
npm run build
# or
yarn build
```

The output will be in the `dist/` folder.

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Support

If you like this project, consider [buying me a coffee](https://www.buymeacoffee.com/eyenike)!

---

**Built with [Astro](https://astro.build) and ❤️ by Teri Eyenike**
