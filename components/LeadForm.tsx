"use client";

import { useMemo, useState } from "react";

function getUtm() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") || undefined,
    medium: params.get("utm_medium") || undefined,
    campaign: params.get("utm_campaign") || undefined,
    term: params.get("utm_term") || undefined,
    content: params.get("utm_content") || undefined,
  };
}

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [err, setErr] = useState<string>("");

  const pageUrl = useMemo(() => (typeof window !== "undefined" ? window.location.href : ""), []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      budget: String(fd.get("budget") || ""),
      timeline: String(fd.get("timeline") || ""),
      message: String(fd.get("message") || ""),
      category: "협업/용역",
      utm: getUtm(),
      page_url: pageUrl,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "submit failed");
      setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="이름"
          className="h-12 rounded-xl2 border border-oh-border px-4 font-semibold outline-none"
        />
        <input
          name="email"
          type="email"
          placeholder="이메일(선택)"
          className="h-12 rounded-xl2 border border-oh-border px-4 outline-none"
        />
      </div>

      <input
        name="phone"
        placeholder="연락처(선택)"
        className="h-12 rounded-xl2 border border-oh-border px-4 outline-none"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="budget"
          placeholder="예산 범위(선택)"
          className="h-12 rounded-xl2 border border-oh-border px-4 outline-none"
        />
        <input
          name="timeline"
          placeholder="희망 일정(선택)"
          className="h-12 rounded-xl2 border border-oh-border px-4 outline-none"
        />
      </div>

      <textarea
        name="message"
        required
        minLength={10}
        placeholder="요청 내용(필수) — 범위/목표/산출물 중심으로"
        className="min-h-[120px] rounded-xl2 border border-oh-border p-4 outline-none leading-relaxed"
      />

      <button
        disabled={loading}
        className="h-14 rounded-full bg-oh-accent font-extrabold text-white disabled:opacity-60"
      >
        {loading ? "전송 중..." : "제안서 요청 보내기"}
      </button>

      {ok === true && (
        <div className="rounded-xl2 border border-oh-border bg-white p-4 font-semibold">
          접수 완료. 이메일로 회신함.
        </div>
      )}
      {ok === false && (
        <div className="rounded-xl2 border border-oh-border bg-white p-4 text-sm text-oh-ink">
          전송 실패: {err}
        </div>
      )}
    </form>
  );
}
