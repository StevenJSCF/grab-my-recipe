import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const videoId = url.searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
  }

  try {
    const supaRes = await fetch(
      `https://api.supadata.ai/v1/youtube/transcript?videoId=${videoId}&text=true`,
      {
        headers: {
          'x-api-key': process.env.SUPADATA_API_KEY!, // 👈 Make sure this exists in your `.env.local`
        },
      }
    );

    if (!supaRes.ok) {
      const error = await supaRes.json();
      return NextResponse.json({ error: error.message || 'Supadata error' }, { status: supaRes.status });
    }

    const data = await supaRes.json();
    return NextResponse.json(data); // includes: content, lang, availableLangs
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
