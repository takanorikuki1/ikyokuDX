-- Enable RLS
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- 1. Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text not null,
  role text not null, -- 'doctor', 'resident', 'admin' etc
  department text,
  specialty text,
  license_number text,
  joined_date date,
  experience integer,
  availability text check (availability in ('available', 'occupied', 'unavailable')),
  bio text,
  avatar_url text, -- URL to storage
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- 2. Profile Details (Normalized)
create table if not exists public.career_history (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  period text not null,
  facility text not null,
  position text not null,
  description text,
  created_at timestamptz default now()
);
alter table public.career_history enable row level security;
create policy "Public career view" on public.career_history for select using (true);
create policy "User career update" on public.career_history for all using (auth.uid() = profile_id);

create table if not exists public.education_history (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  period text not null,
  institution text not null,
  degree text not null,
  field text,
  created_at timestamptz default now()
);
alter table public.education_history enable row level security;
create policy "Public education view" on public.education_history for select using (true);
create policy "User education update" on public.education_history for all using (auth.uid() = profile_id);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  issue_date text,
  number text,
  created_at timestamptz default now()
);
alter table public.certifications enable row level security;
create policy "Public cert view" on public.certifications for select using (true);
create policy "User cert update" on public.certifications for all using (auth.uid() = profile_id);

create table if not exists public.research_works (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  year text,
  title text not null,
  journal text,
  type text, -- '論文', '学会発表', '著書'
  created_at timestamptz default now()
);
alter table public.research_works enable row level security;
create policy "Public research view" on public.research_works for select using (true);
create policy "User research update" on public.research_works for all using (auth.uid() = profile_id);

create table if not exists public.profile_skills (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  skill text not null,
  created_at timestamptz default now()
);
alter table public.profile_skills enable row level security;
create policy "Public skills view" on public.profile_skills for select using (true);
create policy "User skills update" on public.profile_skills for all using (auth.uid() = profile_id);

create table if not exists public.profile_languages (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  language text not null,
  created_at timestamptz default now()
);
alter table public.profile_languages enable row level security;
create policy "Public langs view" on public.profile_languages for select using (true);
create policy "User langs update" on public.profile_languages for all using (auth.uid() = profile_id);

-- 3. Job Postings
create table if not exists public.job_postings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  facility text not null,
  location text not null,
  region text not null,
  type text not null, -- 'full-time', etc
  salary text,
  description text not null,
  posted_date date default CURRENT_DATE,
  deadline date,
  status text default 'open',
  applicants_count integer default 0,
  created_at timestamptz default now()
);
alter table public.job_postings enable row level security;
create policy "Public jobs view" on public.job_postings for select using (true);

create table if not exists public.job_requirements (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.job_postings(id) on delete cascade not null,
  requirement text not null
);
alter table public.job_requirements enable row level security;
create policy "Public job reqs view" on public.job_requirements for select using (true);

create table if not exists public.job_benefits (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.job_postings(id) on delete cascade not null,
  benefit text not null
);
alter table public.job_benefits enable row level security;
create policy "Public job benefits view" on public.job_benefits for select using (true);

-- 4. Case Studies
create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  author_id uuid references public.profiles(id) on delete set null,
  -- author_name denormalization not strictly needed if we join, but keeping simple
  date date default CURRENT_DATE,
  summary text,
  diagnosis text,
  treatment text,
  outcome text,
  views integer default 0,
  comments_count integer default 0,
  created_at timestamptz default now()
);
alter table public.case_studies enable row level security;
create policy "Public cases view" on public.case_studies for select using (true);

create table if not exists public.case_study_tags (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.case_studies(id) on delete cascade not null,
  tag text not null
);
alter table public.case_study_tags enable row level security;
create policy "Public case tags view" on public.case_study_tags for select using (true);

create table if not exists public.case_study_images (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.case_studies(id) on delete cascade not null,
  image_url text not null
);
alter table public.case_study_images enable row level security;
create policy "Public case images view" on public.case_study_images for select using (true);

-- 5. Education Content
create table if not exists public.education_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null, -- 'video', 'document'
  category text,
  instructor text,
  duration text,
  level text,
  description text,
  thumbnail_url text,
  views integer default 0,
  rating numeric(3, 2), -- e.g. 4.5
  published_date date default CURRENT_DATE,
  created_at timestamptz default now()
);
alter table public.education_content enable row level security;
create policy "Public education view" on public.education_content for select using (true);

create table if not exists public.education_tags (
  id uuid primary key default gen_random_uuid(),
  education_id uuid references public.education_content(id) on delete cascade not null,
  tag text not null
);
alter table public.education_tags enable row level security;
create policy "Public education tags view" on public.education_tags for select using (true);

-- 6. Notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade, -- NULL means global/system
  type text not null, -- 'info', 'warning'
  title text not null,
  message text not null,
  date timestamptz default now(),
  is_read boolean default false,
  link text,
  created_at timestamptz default now()
);
alter table public.notifications enable row level security;
create policy "User sees own or global notifications" on public.notifications for select using (user_id = auth.uid() OR user_id IS NULL);

-- 7. Board Posts
create table if not exists public.board_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid references public.profiles(id) on delete set null,
  category text not null,
  date timestamptz default now(),
  replies_count integer default 0,
  views integer default 0,
  is_pinned boolean default false,
  created_at timestamptz default now()
);
alter table public.board_posts enable row level security;
create policy "Public board view" on public.board_posts for select using (true);
create policy "Auth users post" on public.board_posts for insert with check (auth.uid() is not null);

create table if not exists public.board_tags (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.board_posts(id) on delete cascade not null,
  tag text not null
);
alter table public.board_tags enable row level security;
create policy "Public board tags view" on public.board_tags for select using (true);

-- 8. Sponsor Ads
create table if not exists public.sponsor_ads (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  logo_url text not null,
  title text not null,
  description text not null,
  link text,
  type text not null, -- 'banner', 'card'
  created_at timestamptz default now()
);
alter table public.sponsor_ads enable row level security;
create policy "Public ads view" on public.sponsor_ads for select using (true);

-- 9. Chat / Messaging
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  type text default 'direct', -- 'direct', 'group'
  name text, -- for group chats
  avatar_url text,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);
alter table public.conversations enable row level security;

create table if not exists public.conversation_participants (
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  joined_at timestamptz default now(),
  primary key (conversation_id, user_id)
);
alter table public.conversation_participants enable row level security;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamptz default now()
);
alter table public.messages enable row level security;

-- Policies for Chat
create policy "Participants view conversation" on public.conversations for select using (
  exists (select 1 from public.conversation_participants where conversation_id = id and user_id = auth.uid())
);

create policy "Participants view participants" on public.conversation_participants for select using (
  exists (select 1 from public.conversation_participants cp where cp.conversation_id = conversation_participants.conversation_id and cp.user_id = auth.uid())
);

create policy "Participants view messages" on public.messages for select using (
  exists (select 1 from public.conversation_participants where conversation_id = messages.conversation_id and user_id = auth.uid())
);

create policy "Participants send messages" on public.messages for insert with check (
  auth.uid() = sender_id and
  exists (select 1 from public.conversation_participants where conversation_id = conversation_id and user_id = auth.uid())
);

-- 10. Donation Projects
create table if not exists public.donation_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  detailed_description text,
  goal_amount numeric not null,
  current_amount numeric default 0,
  supporters_count integer default 0,
  category text not null,
  start_date date,
  end_date date,
  image_url text,
  created_at timestamptz default now()
);
alter table public.donation_projects enable row level security;
create policy "Public donation projects view" on public.donation_projects for select using (true);

create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.donation_projects(id) on delete cascade not null,
  date date not null,
  title text not null,
  content text not null,
  created_at timestamptz default now()
);
alter table public.project_updates enable row level security;
create policy "Public project updates view" on public.project_updates for select using (true);

create table if not exists public.project_benefits (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.donation_projects(id) on delete cascade not null,
  benefit text not null
);
alter table public.project_benefits enable row level security;
create policy "Public project benefits view" on public.project_benefits for select using (true);

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.donation_projects(id) on delete set null not null,
  donor_id uuid references public.profiles(id) on delete set null, -- Null for anonymous?
  donor_name text not null,
  amount numeric not null,
  message text,
  created_at timestamptz default now()
);
alter table public.donations enable row level security;
create policy "Public donations view" on public.donations for select using (true);
create policy "Authenticated users donate" on public.donations for insert with check (auth.uid() is not null);
