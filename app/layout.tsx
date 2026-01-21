import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "주식회사 어흥 | 협업/용역 문의",
  description: "어흥 랜딩페이지 — 협업/용역 리드 수집",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang="ko">
      <body>
        {children}
        {ga ? (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} />
            <Script id="ga4">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${ga}');
            `}</Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
