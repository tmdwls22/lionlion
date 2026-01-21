import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { LeadSchema } from "@/lib/validators";
import { Resend } from "resend";
import { getSetting } from "@/lib/settings";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.parse(body);

    const ua = req.headers.get("user-agent") ?? "";
    const ip = req.headers.get("x-forwarded-for") ?? "";

    const { error } = await supabaseAdmin.from("leads").insert({
      name: parsed.name,
      email: parsed.email || null,
      phone: parsed.phone || null,
      channel: "email",
      category: parsed.category,
      budget: parsed.budget || null,
      timeline: parsed.timeline || null,
      message: parsed.message,
      utm_source: parsed.utm?.source || null,
      utm_medium: parsed.utm?.medium || null,
      utm_campaign: parsed.utm?.campaign || null,
      utm_term: parsed.utm?.term || null,
      utm_content: parsed.utm?.content || null,
      page_url: parsed.page_url || null,
      user_agent: ua,
      ip: ip,
    });

    if (error) throw error;

    const toEmail = (await getSetting("lead_to_email")) || "";
    if (toEmail) {
      await resend.emails.send({
        from: process.env.LEAD_FROM_EMAIL!,
        to: toEmail,
        subject: `[어흥] 협업/용역 리드 접수: ${parsed.name}`,
        text:
`이름: ${parsed.name}
이메일: ${parsed.email || "-"}
전화: ${parsed.phone || "-"}
카테고리: ${parsed.category}
예산: ${parsed.budget || "-"}
일정: ${parsed.timeline || "-"}
내용:
${parsed.message}
`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "error" }, { status: 400 });
  }
}
