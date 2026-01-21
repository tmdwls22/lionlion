import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
  return NextResponse.json({ ok: true, authed: isAdminAuthed() });
}
