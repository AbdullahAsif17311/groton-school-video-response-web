# Abdullah Asif | Groton School Video Response

A personal website that presents a short video response for a Groton School Fall 2027 application.
Next.js (App Router), TypeScript, React, Tailwind CSS and Lucide React. No login, no database, no backend.

## Run it on your computer

Install Node.js 20.9 or newer (nodejs.org, LTS version). In a terminal inside this folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000. To test the production build: `npm run build`, then `npm start`.

## Add your video

1. Export the video as an **MP4**.
2. Save it as `public/videos/abdullah-response.mp4`.
3. Refresh the page.

Until the file exists, visitors see a friendly "My video will appear here." box instead of a broken player.
To use another file name or a hosted video, edit `src/config/site.ts` (the comment there explains it).
Keep the file under about 100 MB, and play it once with sound before you submit the link.

## Edit the text about you

All the details (projects, timeline, "also do" list, "where I'm from" and the GitHub/LinkedIn links) are in
`src/config/content.ts`. They come from the Groton application documents. Keep everything true and consistent with
the application.

The site deliberately does NOT show a phone number, home address, date of birth, email, or any family details.
It is a public web page, so keep it that way.

## Deploy to Vercel

1. Put the project on GitHub (include the video in `public/videos/`).
2. Import it at https://vercel.com/new, keep the default settings, click **Deploy**.
3. Open the live link and check the video on a computer and a phone before sharing it.

## Effects

- Hidden notebook doodles appear under the cursor on the red hero; hero letters drop in once and hop on hover.
- Cursor ring that grows over links and says "Play", "Go", "Open" or "Top" (mouse only).
- Video frame tilts toward the mouse, spinning "press play" badge, confetti the first time the video plays.
- Interest tiles lift, change color and follow the mouse with a soft light; each icon has its own animation.
- Project rows sweep red on hover; timeline items slide; magnetic buttons; ticker bands; scroll progress bar.

All motion is switched off for visitors who prefer reduced motion, and cursor effects never run on touch screens.

## Files

```
src/app/            layout, page, global styles, icon
src/components/     Nav, Hero, Doodles, VideoResponse, VideoPlayer, Marquee, About, InterestTile,
                    Closing, Footer, and the effects: Cursor, Reveal, Tilt, Magnetic
src/config/site.ts      title, description and the video path
src/config/content.ts   projects, timeline, links and other text from the application
public/videos/          put abdullah-response.mp4 here
```
