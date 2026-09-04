import { getTrackCovers } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter((id) => /^[A-Za-z0-9]{22}$/.test(id))
    .slice(0, 50);

  if (!ids.length) return NextResponse.json({});

  try {
    const covers = await getTrackCovers(ids);
    return NextResponse.json(covers, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({});
  }
}
