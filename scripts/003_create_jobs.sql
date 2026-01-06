-- 求人情報テーブル
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  hospital text not null,
  location text not null,
  department text not null,
  employment_type text not null,
  salary_range text,
  description text not null,
  requirements text[] default '{}',
  benefits text[] default '{}',
  work_schedule text,
  responsibilities text,
  qualifications text,
  application_deadline timestamptz,
  status text default 'active' check (status in ('active', 'closed', 'draft')),
  views integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.jobs enable row level security;

-- 全員が公開求人を閲覧可能
create policy "jobs_select_all"
  on public.jobs for select
  using (status = 'active' or auth.uid() = user_id);

-- 認証済みユーザーは求人を作成可能
create policy "jobs_insert_auth"
  on public.jobs for insert
  with check (auth.uid() = user_id);

-- 自分の求人のみ更新可能
create policy "jobs_update_own"
  on public.jobs for update
  using (auth.uid() = user_id);

-- 自分の求人のみ削除可能
create policy "jobs_delete_own"
  on public.jobs for delete
  using (auth.uid() = user_id);

create trigger jobs_updated_at
  before update on public.jobs
  for each row
  execute function public.handle_updated_at();
