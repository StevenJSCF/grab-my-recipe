import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { videoId } = await req.json();
    if (!videoId || typeof videoId !== "string") {
      return NextResponse.json({ error: "Missing or invalid videoId" }, { status: 400 });
    }
    const apiKey = process.env.YOUTUBE_DATA_GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }
    const youtubeRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
    );
    const youtubeData = await youtubeRes.json();
    return NextResponse.json(youtubeData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch YouTube metadata: "  + error}, { status: 500 });
  }
}