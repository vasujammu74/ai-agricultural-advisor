# AI Agricultural Advisor — API Key Setup Guide

This app works in **demo mode** out of the box using dummy placeholder keys.
The chatbox answers real farming questions using a built-in topic-based advice
engine, the disease-detection page shows clearly-labelled demo data, and the
speak button falls back to your browser's built-in voice.

To enable **live AI features**, replace the dummy keys in `.env.local` with your
real API keys. Here's how.

---

## 1. Where the keys live

All keys are stored in a file called `.env.local` at the project root. The file
already exists and looks like this:

```
OPENAI_API_KEY=dummy-replace-with-your-openai-key
OPENAI_MODEL=gpt-4o-mini
SARVAM_API_KEY=dummy-replace-with-your-sarvam-key
KINDWISE_API_KEY=dummy-replace-with-your-kindwise-key
```

Keys are read **server-side only** — they are never exposed to the browser.

---

## 2. Get your keys

### A. OpenAI (chat answers) — required for live chat
1. Go to <https://platform.openai.com/api-keys>
2. Sign in / create an account.
3. Click **Create new secret key**.
4. Copy the key (starts with `sk-...`).
5. In `.env.local`, replace the dummy value:
   ```
   OPENAI_API_KEY=sk-your-real-key-here
   ```

### B. Sarvam AI (text-to-speech in 5 Indian languages) — for spoken answers
1. Go to <https://sarvam.ai> and sign up.
2. Open the dashboard → **API Keys**.
3. Copy your subscription key.
4. In `.env.local`:
   ```
   SARVAM_API_KEY=your-real-sarvam-key
   ```

### C. Kindwise (plant disease detection) — for image analysis
1. Go to <https://kindwise.com> and sign up.
2. Open the dashboard → **API keys** (or "Crop Doctor" / "Plant.id" section).
3. Copy your API key.
4. In `.env.local`:
   ```
   KINDWISE_API_KEY=your-real-kindwise-key
   ```

---

## 3. After replacing the keys

Save the `.env.local` file. The app automatically detects real keys — any key
that starts with `dummy`, `replace`, or is too short is treated as not
configured, and that feature stays in demo mode. There is nothing else to
restart or rebuild.

You can mix and match: for example, you can add only the OpenAI key and leave
the others as dummy. Chat will be live, while TTS and disease detection stay in
demo mode until you add their keys too.

---

## 4. How the app chooses what to use

| Feature        | Key needed          | Without the key (demo mode)                          |
|----------------|---------------------|------------------------------------------------------|
| Chat answers   | `OPENAI_API_KEY`    | Topic-based demo answers in your language            |
| Spoken answers | `SARVAM_API_KEY`    | Falls back to the browser's built-in voice           |
| Disease detect | `KINDWISE_API_KEY`  | Shows clearly-labelled demo plant data               |

---

## 5. Quick checklist

- [ ] Replace `OPENAI_API_KEY` → live chat works
- [ ] Replace `SARVAM_API_KEY` → high-quality multilingual speech works
- [ ] Replace `KINDWISE_API_KEY` → real plant identification works
- [ ] Save `.env.local`
- [ ] Try asking a question in the Assistant and tapping **Read aloud**
- [ ] Upload a leaf photo in Disease Detection and tap **Analyze**

That's it — your app is fully functional.
