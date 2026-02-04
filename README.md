# Valentine

An interactive Valentine's Day proposal website with playful animations and a love letter reveal.

## Features

- Playful "Yes/No" proposal with escalating persuasion
- Yes button grows, No button shrinks and escapes cursor
- Animated love letter with typing effect
- Photo carousel with your memories
- Valentine's to-do list
- Background music and confetti celebration
- Mobile responsive

## Setup

1. Add your photos to `public/photos/` (photo_1.jpeg through photo_6.jpeg)
2. Add your audio files to `public/audio/` (background.mp3, celebration.mp3)
3. Edit `lib/constants.ts` to personalize:
   - `CONFIG.senderName` - your name
   - `CONFIG.valentineName` - their name
   - `LOVE_LETTER` - your message

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Oyinbayode/Valentine)

## Tech

Next.js, Framer Motion, Tailwind CSS, canvas-confetti
