export const site = {
  name: "Abdullah Asif",
  title: "Abdullah Asif | Groton School Video Response",
  description:
    "Abdullah Asif, a student from Karachi, Pakistan, introduces himself to the Groton School admissions team with a short video response for Fall 2027.",
};

/**
 * HOW TO REPLACE THE VIDEO
 * ------------------------
 * Option 1 (default, local file):
 *   Put your MP4 at  public/videos/abdullah-response.mp4  and keep `src` as it is.
 *   If you use a different file name, change `src` below to match.
 *
 * Option 2 (hosted file):
 *   Upload the MP4 somewhere (for example Vercel Blob) and paste its full
 *   https:// address into `src`.
 *
 * Optional: add a thumbnail at public/videos/poster.jpg and set
 *   poster: "/videos/poster.jpg"
 *
 * Until the file exists, the page shows a friendly placeholder, never a
 * broken player. Keep the MP4 reasonably small (compress it if it is over
 * about 100 MB) so it deploys and loads quickly.
 */
export const video: { src: string; poster?: string; title: string } = {
  src: "/videos/abdullah-response.mp4",
  poster: undefined,
  title: "Abdullah Asif's video response for Groton School",
};
