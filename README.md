# jaden.lol

Portfolio for Jaden Seangmany. Next.js. Rest is Vercel/Geist. Bloom is Nurture.

```bash
npm install
npm run dev
```

Design source of truth: `AGENTS.md`.

## Listening (`/listening`)

Lifetime minutes and play counts come from a privacy-stripped aggregate of Spotify extended streaming history (`src/data/listening-history.json`). The searchable catalog is `public/listening-catalog.json`. Do not commit the zip. After a new export:

```bash
npm run spotify:history
```

The live snapshot (now playing, last 50 plays, top 50 ranges, library totals) still needs the Web API:

1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Redirect URI: `http://127.0.0.1:53682/callback`
3. Put `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in `.env.local`.
4. `npm run spotify:token` and paste `SPOTIFY_REFRESH_TOKEN` into `.env.local`.
5. On Vercel, set the same three env vars.
