-- 寄付テーブル
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  donor_name text not null,
  donor_email text not null,
  amount integer not null,
  project text not null,
  message text,
  is_anonymous boolean default false,
  payment_method text,
  status text default 'completed' check (status in ('pending', 'completed', 'failed')),
  created_at timestamptz default now()
);

alter table public.donations enable row level security;

-- 全員が寄付履歴を閲覧可能（匿名でない場合）
create policy "donations_select_all"
  on public.donations for select
  using (is_anonymous = false or auth.uid() = user_id);

-- 認証済みユーザーは寄付を作成可能
create policy "donations_insert_auth"
  on public.donations for insert
  with check (auth.uid() is not null);

-- 自分の寄付履歴のみ更新可能
create policy "donations_update_own"
  on public.donations for update
  using (auth.uid() = user_id);
