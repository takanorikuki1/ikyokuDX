-- 教育コンテンツテーブル
create table if not exists public.education_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content_type text not null check (content_type in ('video', 'webinar', 'document', 'course')),
  description text not null,
  instructor text not null,
  duration text,
  category text not null,
  difficulty text not null check (difficulty in ('初級', '中級', '上級')),
  thumbnail_url text,
  content_url text,
  tags text[] default '{}',
  views integer default 0,
  rating numeric(3, 2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.education_content enable row level security;

-- 認証済みユーザーは全コンテンツを閲覧可能
create policy "education_content_select_auth"
  on public.education_content for select
  using (auth.uid() is not null);

-- 認証済みユーザーはコンテンツを作成可能
create policy "education_content_insert_auth"
  on public.education_content for insert
  with check (auth.uid() = user_id);

-- 自分のコンテンツのみ更新可能
create policy "education_content_update_own"
  on public.education_content for update
  using (auth.uid() = user_id);

-- 自分のコンテンツのみ削除可能
create policy "education_content_delete_own"
  on public.education_content for delete
  using (auth.uid() = user_id);

create trigger education_content_updated_at
  before update on public.education_content
  for each row
  execute function public.handle_updated_at();
