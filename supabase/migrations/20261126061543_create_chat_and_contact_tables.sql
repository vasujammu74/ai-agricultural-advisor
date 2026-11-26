/*
# Create chat_messages and contact_submissions tables

1. New Tables
- `chat_messages`: stores farmer-assistant conversation turns (role, content, language).
  - id (uuid, pk)
  - role (text: 'user' | 'assistant')
  - content (text)
  - language (text, e.g. 'en')
  - created_at (timestamptz)
- `contact_submissions`: stores messages submitted through the Contact form.
  - id (uuid, pk)
  - name (text)
  - email (text)
  - message (text)
  - created_at (timestamptz)

2. Security
- Single-tenant app, no sign-in: data is intentionally shared/public per browser session
  (chat history is fetched back by the same client that wrote it).
- Enable RLS on both tables.
- Grant CRUD to anon + authenticated so the anon-key frontend can reach them.
- Policies: allow anon + authenticated full CRUD (USING (true) / WITH CHECK (true))
  because there is no per-user ownership concept in this no-auth app.
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  language text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, DELETE ON chat_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages"
ON chat_messages FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages"
ON chat_messages FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_chat_messages" ON chat_messages;
CREATE POLICY "anon_delete_chat_messages"
ON chat_messages FOR DELETE
TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_submissions TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);
