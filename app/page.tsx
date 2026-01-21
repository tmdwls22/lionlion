import LeadForm from "@/components/LeadForm";
import { site } from "@/content/site";
import { getSetting } from "@/lib/settings";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl2 bg-oh-card border border-oh-border shadow-soft">{children}</div>;
}

export default async function Page() {
  const kakao = (await getSetting("kakao_channel_url")) || "https://pf.kakao.com/";

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[720px] px-4 pb-28 pt-10">
        <section className="rounded-xl2 border border-oh-border bg-oh-card shadow-soft p-6">
          <div className="inline-flex items-center rounded-full bg-oh-accent px-3 py-1 text-sm font-semibold text-white">
            {site.heroBadge}
          </div>

          <h1 className="mt-4 text-[34px] leading-[1.08] font-extrabold tracking-tight text-oh-ink">
            {site.heroTitle[0]}<br />{site.heroTitle[1]}
          </h1>

          <p className="mt-3 text-base leading-relaxed text-oh-muted">{site.heroSubtitle}</p>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href={kakao}
              className="w-full rounded-full bg-oh-ink px-5 py-4 text-center text-[16px] font-bold text-white"
            >
              {site.primaryCta}
            </a>

            <a
              href="#lead"
              className="w-full rounded-full bg-white px-5 py-4 text-center text-[16px] font-bold text-oh-ink border border-oh-border"
            >
              {site.secondaryCta}
            </a>
          </div>
        </section>

        <section className="mt-5 grid gap-3">
          {site.proof.map((p) => (
            <Card key={p.title}>
              <div className="p-5">
                <div className="text-lg font-extrabold">{p.title}</div>
                <div className="mt-1 text-oh-muted">{p.desc}</div>
              </div>
            </Card>
          ))}
        </section>

        <section className="mt-6">
          <div className="px-1 text-sm font-bold text-oh-ink/90">제공 영역</div>
          <div className="mt-3 grid gap-3">
            {site.services.map((s) => (
              <Card key={s.title}>
                <div className="p-5">
                  <div className="text-[18px] font-extrabold">{s.title}</div>
                  <div className="mt-1 text-oh-muted leading-relaxed">{s.desc}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="lead" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="text-[18px] font-extrabold">이메일로 제안서 요청</div>
              <p className="mt-1 text-oh-muted leading-relaxed">
                자료 기반 요청(범위/예산/일정)을 남기면 이메일로 회신함.
              </p>
              <LeadForm />
            </div>
          </Card>
        </section>

        <section className="mt-6">
          <div className="px-1 text-sm font-bold text-oh-ink/90">FAQ</div>
          <div className="mt-3 grid gap-3">
            {site.faq.map((f) => (
              <details key={f.q} className="rounded-xl2 bg-oh-card border border-oh-border shadow-soft p-5">
                <summary className="cursor-pointer font-extrabold">{f.q}</summary>
                <div className="mt-2 text-oh-muted leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-oh-border bg-white/85 backdrop-blur">
        <div className="mx-auto max-w-[720px] px-4 py-3 flex gap-3">
          <a href={kakao} className="flex-1 rounded-full bg-oh-ink px-4 py-3 text-center font-bold text-white">
            카톡 문의
          </a>
          <a href="#lead" className="flex-1 rounded-full border border-oh-border bg-white px-4 py-3 text-center font-bold text-oh-ink">
            이메일 요청
          </a>
        </div>
      </div>
    </main>
  );
}
