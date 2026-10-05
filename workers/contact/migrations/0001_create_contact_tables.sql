CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  email_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  verified_at TEXT,
  sent_at TEXT
);

CREATE INDEX contact_messages_expiry_idx ON contact_messages(expires_at);
CREATE INDEX contact_messages_ip_created_idx ON contact_messages(ip_hash, created_at);
CREATE INDEX contact_messages_email_created_idx ON contact_messages(email_hash, created_at);

CREATE TABLE contact_rate_limits (
  bucket_key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  reset_at TEXT NOT NULL
);
