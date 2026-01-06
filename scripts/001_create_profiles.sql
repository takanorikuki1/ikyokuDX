-- プロフィールテーブル（医師情報）
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role text not null check (role in ('医局長（教授）', '准教授', '講師', '助教', '医員（病院勤務）', '開業医（診療所医局員）', '研修医', 'OB/OG', '事務局')),
  specialties text[] default '{}',
  hospital text,
  experience_years integer default 0,
  avatar_url text,
  bio text,
  skills text[] default '{}',
  languages text[] default '{}',
  certifications jsonb default '[]',
  education jsonb default '[]',
  career_history jsonb default '[]',
  research jsonb default '{"papers": [], "presentations": [], "books": []}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLSを有効化
alter table public.profiles enable row level security;

-- 全員が全プロフィールを閲覧可能
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

-- 自分のプロフィールのみ挿入可能
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 自分のプロフィールのみ更新可能
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- 自分のプロフィールのみ削除可能
create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- 更新日時を自動更新するトリガー
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();
