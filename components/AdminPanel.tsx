"use client";

import { useEffect, useState } from "react";

type Settings = {
  kakao_channel_url: string;
  lead_to_email: string;
};

export default function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState<Settings>({ kakao_channel_url: "https://pf.kakao.com/", lead_to_email: "" });
  const [saving, setSaving] = useState(false);

  async function refreshAuth() {
    const r = await fetch("/api/admin/me", { cache: "no-store" });
    const j = await r.json();
    setAuthed(!!j.authed);
    return !!j.authed;
  }

  async function loadSettings() {
    const r = await fetch("/api/admin/settings", { cache: "no-store" });
    if (!r.ok) return;
    const j = await r.json();
    setSettings({ kakao_channel_url: j.kakao_channel_url, lead_to_email: j.lead_to_email });
  }

  useEffect(() => {
    refreshAuth().then((ok) => {
      if (ok) loadSettings();
    });
  }, []);

  async function login() {
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!r.ok) {
      alert("비밀번호 오류");
      return;
    }
    setPassword("");
    setAuthed(true);
    await loadSettings();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  async function save() {
    setSaving(true);
    try {
      const r = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!r.ok) throw new Error("저장 실패");
      alert("저장 완료");
    } catch (e: any) {
      alert(e?.message || "error");
    } finally {
      setSaving(false);
    }
  }

  if (authed === null) {
    return (
      <main className="min-h-screen grid place-items-center p-6">
        <div className="w-full max-w-md rounded-xl2 bg-oh-card border border-oh-border shadow-soft p-6">
          <div className="text-xl font-extrabold">로딩 중...</div>
        </div>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="min-h-screen grid place-items-center p-6">
        <div className="w-full max-w-md rounded-xl2 bg-oh-card border border-oh-border shadow-soft p-6">
          <div className="text-xl font-extrabold">관리자 로그인</div>
          <p className="mt-2 text-oh-muted">ADMIN_PASSWORD 입력 후 설정을 수정할 수 있음.</p>

          <div className="mt-4 grid gap-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="비밀번호"
              className="h-12 rounded-xl2 border border-oh-border px-4 outline-none"
            />
            <button onClick={login} className="h-12 rounded-full bg-oh-ink text-white font-bold">
              로그인
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-xl rounded-xl2 bg-oh-card border border-oh-border shadow-soft p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-extrabold">어흥 랜딩 관리자 설정</div>
            <p className="mt-2 text-oh-muted">카톡 링크/수신메일을 여기서 바꾸면 랜딩에 즉시 반영됨.</p>
          </div>
          <button onClick={logout} className="rounded-full border border-oh-border px-4 py-2 font-bold">
            로그아웃
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label className="font-bold">카카오 채널 링크</label>
            <input
              value={settings.kakao_channel_url}
              onChange={(e) => setSettings((s) => ({ ...s, kakao_channel_url: e.target.value }))}
              className="h-12 rounded-xl2 border border-oh-border px-4 outline-none"
            />
          </div>

          <div className="grid gap-2">
            <label className="font-bold">리드 수신 이메일</label>
            <input
              value={settings.lead_to_email}
              onChange={(e) => setSettings((s) => ({ ...s, lead_to_email: e.target.value }))}
              className="h-12 rounded-xl2 border border-oh-border px-4 outline-none"
            />
          </div>

          <button
            disabled={saving}
            onClick={save}
            className="h-12 rounded-full bg-oh-accent text-white font-extrabold disabled:opacity-60"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </main>
  );
}
