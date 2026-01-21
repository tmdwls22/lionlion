# 어흥 랜딩 (톤 고정 + 관리자에서 카톡 링크 수정 가능)

## 기능
- 메인 랜딩(카드형 옐로/주황 톤)
- **카톡 CTA 링크는 DB settings에서 불러옴** → `/admin`에서 언제든 수정
- 이메일 문의 폼 → Supabase DB 저장 + Resend로 운영자 메일 발송
- 관리자 페이지(`/admin`)에서:
  - 카톡 채널 링크 수정
  - 리드 수신 이메일 수정

## 1) 설치
```bash
npm install
```

## 2) Supabase 준비
1) Supabase 프로젝트 생성
2) SQL Editor에서 아래를 실행

### SQL
```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text,
  channel text not null default 'email',
  category text not null default '협업/용역',
  budget text,
  timeline text,
  message text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  page_url text,
  user_agent text,
  ip text
);

create table if not exists public.settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

insert into public.settings(key, value)
values
  ('kakao_channel_url', 'https://pf.kakao.com/'),
  ('lead_to_email', 'your@email.com')
on conflict (key) do nothing;

alter table public.leads enable row level security;
alter table public.settings enable row level security;

create policy "No direct inserts" on public.leads
for insert to anon
with check (false);

create policy "No direct select" on public.settings
for select to anon
using (false);

create policy "No direct update" on public.settings
for update to anon
using (false);
```

## 3) 환경변수
`.env.local` 생성 후 `.env.example` 참고해 채우기

## 4) 실행
```bash
npm run dev
```

## 5) 관리자
- `/admin` 접속
- `ADMIN_PASSWORD`로 로그인
- 카톡 링크/리드 수신 이메일 저장

## 6) 배포
Vercel에 연결 후 Environment Variables 등록하면 됨.
