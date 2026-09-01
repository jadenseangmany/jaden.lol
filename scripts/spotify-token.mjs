/**
 * One-time Spotify OAuth. Prints a refresh token for .env.local.
 *
 * 1. Create an app at https://developer.spotify.com/dashboard
 * 2. Redirect URI: http://127.0.0.1:53682/callback
 * 3. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local
 * 4. npm run spotify:token
 */
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";

const PORT = 53682;
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
  "user-read-email",
  "user-follow-read",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(" ");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

function openUrl(url) {
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  spawn(cmd, [url], { stdio: "ignore", shell: process.platform === "win32" });
}

loadEnv();

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local");
  process.exit(1);
}

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", id);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", REDIRECT);
authUrl.searchParams.set("scope", SCOPES);
authUrl.searchParams.set("show_dialog", "true");

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`);
  if (url.pathname !== "/callback") {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");
  if (err || !code) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(err ?? "missing code");
    server.close();
    process.exit(1);
    return;
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
    }),
  });
  const json = await tokenRes.json();
  if (!tokenRes.ok || !json.refresh_token) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(JSON.stringify(json, null, 2));
    console.error(json);
    server.close();
    process.exit(1);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Token received. You can close this tab.");
  console.log("\nAdd this to .env.local:\n");
  console.log(`SPOTIFY_REFRESH_TOKEN=${json.refresh_token}\n`);
  server.close();
  process.exit(0);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Redirect URI must be exactly:", REDIRECT);
  console.log("Opening Spotify authorize…");
  openUrl(authUrl.toString());
});
