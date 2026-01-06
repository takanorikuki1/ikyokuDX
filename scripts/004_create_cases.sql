-- 症例データベーステーブル
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  patient_age integer,
  diagnosis text not null,
  symptoms text[] default '{}',
  treatment text not null,
  outcome text not null,
  complications text,
  discussion text,
  learning_points text[] default '{}',
  images text[] default '{}',
  tags text[] default '{}',
  category text not null,
  views integer default 0,
  bookmarks integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.cases enable row level security;

-- 認証済みユーザーは全症例を閲覧可能
create policy "cases_select_auth"
  on public.cases for select
  using (auth.uid() is not null);

-- 認証済みユーザーは症例を作成可能
create policy "cases_insert_auth"
  on public.cases for insert
  with check (auth.uid() = user_id);

-- 自分の症例のみ更新可能
create policy "cases_update_own"
  on public.cases for update
  using (auth.uid() = user_id);

-- 自分の症例のみ削除可能
create policy "cases_delete_own"
  on public.cases for delete
  using (auth.uid() = user_id);

create trigger cases_updated_at
  before update on public.cases
  for each row
  execute function public.handle_updated_at();
