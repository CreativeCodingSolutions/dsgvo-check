import { NextRequest, NextResponse } from "next/server";
import { scanWebsite } from "@/lib/scanner";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Bitte gib eine gültige URL an." },
        { status: 400 }
      );
    }

    if (url.length > 500) {
      return NextResponse.json(
        { error: "URL ist zu lang (max. 500 Zeichen)." },
        { status: 400 }
      );
    }

    const result = await scanWebsite(url);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Serverfehler beim Scannen der Website." },
      { status: 500 }
    );
  }
}
