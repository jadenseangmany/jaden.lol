import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = await getNowPlaying();
    return NextResponse.json(
      { now },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Spotify now failed", error);
    return NextResponse.json(
      { now: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
