-- 寄付プロジェクトテーブル
create table if not exists public.donation_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  detailed_description text,
  category text not null check (category in ('medical_network', 'education', 'equipment')),
  goal_amount integer not null,
  current_amount integer default 0,
  supporter_count integer default 0,
  start_date date,
  end_date date,
  image_url text,
  benefits jsonb default '[]'::jsonb,
  updates jsonb default '[]'::jsonb,
  status text default 'active' check (status in ('active', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.donation_projects enable row level security;

-- 全員がプロジェクトを閲覧可能
create policy "donation_projects_select_all"
  on public.donation_projects for select
  using (true);

-- 管理者のみプロジェクトを作成・更新可能
create policy "donation_projects_insert_admin"
  on public.donation_projects for insert
  with check (auth.uid() is not null);

create policy "donation_projects_update_admin"
  on public.donation_projects for update
  using (auth.uid() is not null);
