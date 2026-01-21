import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";
import { getSetting, setSetting } from "@/lib/settings";

export async function GET() {
  if (!isAdminAuthed()) return NextResponse.json({ ok: false }, { status: 401 });

  const kakao = (await getSetting("kakao_channel_url")) || "https://pf.kakao.com/";
  const leadTo = (await getSetting("lead_to_email")) || "";
  return NextResponse.json({ ok: true, kakao_channel_url: kakao, lead_to_email: leadTo });
}

export async function POST(req: Request) {
  if (!isAdminAuthed()) return NextResponse.json({ ok: false }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const kakao = typeof body.kakao_channel_url === "string" ? body.kakao_channel_url.trim() : "";
  const leadTo = typeof body.lead_to_email === "string" ? body.lead_to_email.trim() : "";

  try {
    if (kakao) await setSetting("kakao_channel_url", kakao);
    if (leadTo) await setSetting("lead_to_email", leadTo);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Supabase not configured" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
