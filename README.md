# Vikram & Kavita — Royal Digital Wedding Invitation

Mobile-first React + Vite + Tailwind invitation with royal Indian aesthetics, scratch-to-reveal date, occasion artwork, and logo-tap wedding music.

## Run locally

```bash
cd ~/Desktop/vikram-kavita-wedding
nvm use 22
npm install
npm run dev
```

Open http://127.0.0.1:5173 — tap the royal card to open, then tap the **logo** for music.

## What’s unique

1. **Royal card opening** — envelope / wax-seal invite experience
2. **Scratch shagun card** — foil scratch reveals **26 November 2026** with heart & wedding emoji burst
3. **Rich Indian palette** — sindoor red, marigold, peacock teal, antique gold, ivory
4. **AI occasion stills** — Vinayak, Haldi, Bandoli, Sangeet, Barat, Phera, Reception
5. **Logo music** — tap logo (hero / nav / footer) for tanpura + shehnai-style ambience

## Add your own wedding music (recommended)

Download a royalty-free shehnai / sangeet instrumental (e.g. from [Pixabay Music](https://pixabay.com/music/search/indian%20wedding/)) and save as:

```text
public/music/wedding-theme.mp3
```

It will layer under the festive synth when guests tap the logo.

## Customize

Edit `src/data/wedding.js` for names, dates, address, RSVP Formspree ID, and image paths.

## Deploy (Vercel ~2 min)

```bash
npx vercel
```

Or push to GitHub → import on [vercel.com](https://vercel.com).
