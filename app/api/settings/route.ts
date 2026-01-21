import { NextResponse } from "next/server";
import { getSetting } from "@/lib/settings";

export async function GET() {
  const kakao = (await getSetting("kakao_channel_url")) || "https://pf.kakao.com/";
  return NextResponse.json({ ok: true, kakao_channel_url: kakao });
}
