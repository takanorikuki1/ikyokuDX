-- ======================================
-- Medical Network Platform - Supabase Schema
-- ======================================
-- This script is IDEMPOTENT - can be run multiple times safely

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ======================================
-- PROFILES (extends Supabase auth.users)
-- ======================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    avatar_url TEXT,
    role TEXT DEFAULT 'doctor',
    specialty TEXT,
    department TEXT,
    institution TEXT,
    experience_years INTEGER DEFAULT 0,
    bio TEXT,
    skills TEXT[] DEFAULT '{}',
    location TEXT,
    phone TEXT,
    medical_license TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- ======================================
-- BOARD POSTS (掲示板)
-- ======================================
CREATE TABLE IF NOT EXISTS board_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE board_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view board posts" ON board_posts;
CREATE POLICY "Anyone can view board posts" ON board_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create posts" ON board_posts;
CREATE POLICY "Anyone can create posts" ON board_posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Authors can update own posts" ON board_posts;
CREATE POLICY "Authors can update own posts" ON board_posts FOR UPDATE USING (auth.uid() = author_id);

-- ======================================
-- JOB POSTINGS (求人情報)
-- ======================================
CREATE TABLE IF NOT EXISTS job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    facility TEXT NOT NULL,
    location TEXT,
    region TEXT,
    type TEXT DEFAULT 'full-time',
    salary TEXT,
    description TEXT,
    status TEXT DEFAULT 'open',
    applicants_count INTEGER DEFAULT 0,
    posted_date TIMESTAMPTZ DEFAULT NOW(),
    deadline TIMESTAMPTZ,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    requirement TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS job_benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    benefit TEXT NOT NULL
);

ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_benefits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view job postings" ON job_postings;
CREATE POLICY "Anyone can view job postings" ON job_postings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create jobs" ON job_postings;
CREATE POLICY "Anyone can create jobs" ON job_postings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view requirements" ON job_requirements;
CREATE POLICY "Anyone can view requirements" ON job_requirements FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view benefits" ON job_benefits;
CREATE POLICY "Anyone can view benefits" ON job_benefits FOR SELECT USING (true);

-- ======================================
-- CASE STUDIES (症例データベース)
-- ======================================
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    diagnosis TEXT,
    category TEXT DEFAULT 'general',
    author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tags TEXT[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view case studies" ON case_studies;
CREATE POLICY "Anyone can view case studies" ON case_studies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create cases" ON case_studies;
CREATE POLICY "Anyone can create cases" ON case_studies FOR INSERT WITH CHECK (true);

-- ======================================
-- EDUCATION CONTENT (教育コンテンツ)
-- ======================================
CREATE TABLE IF NOT EXISTS education_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'video',
    category TEXT,
    level TEXT DEFAULT 'beginner',
    instructor_id UUID REFERENCES profiles(id),
    duration TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    views INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE education_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view education content" ON education_content;
CREATE POLICY "Anyone can view education content" ON education_content FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create content" ON education_content;
CREATE POLICY "Anyone can create content" ON education_content FOR INSERT WITH CHECK (true);

-- ======================================
-- DONATION PROJECTS (寄付プロジェクト)
-- ======================================
CREATE TABLE IF NOT EXISTS donation_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'medical_network',
    goal_amount INTEGER NOT NULL DEFAULT 1000000,
    current_amount INTEGER DEFAULT 0,
    supporter_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    image_url TEXT,
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES donation_projects(id) ON DELETE CASCADE,
    donor_id UUID REFERENCES profiles(id),
    donor_name TEXT,
    amount INTEGER NOT NULL,
    message TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE donation_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view donation projects" ON donation_projects;
CREATE POLICY "Anyone can view donation projects" ON donation_projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create projects" ON donation_projects;
CREATE POLICY "Anyone can create projects" ON donation_projects FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view donations" ON donations;
CREATE POLICY "Anyone can view donations" ON donations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can donate" ON donations;
CREATE POLICY "Authenticated users can donate" ON donations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ======================================
-- MESSAGES (メッセージ)
-- ======================================
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_1 UUID REFERENCES profiles(id) ON DELETE CASCADE,
    participant_2 UUID REFERENCES profiles(id) ON DELETE CASCADE,
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Demo-friendly policies (allow all for now)
DROP POLICY IF EXISTS "Anyone can view conversations" ON conversations;
CREATE POLICY "Anyone can view conversations" ON conversations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can create conversations" ON conversations;
CREATE POLICY "Anyone can create conversations" ON conversations FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update conversations" ON conversations;
CREATE POLICY "Anyone can update conversations" ON conversations FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can view messages" ON messages;
CREATE POLICY "Anyone can view messages" ON messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can send messages" ON messages;
CREATE POLICY "Anyone can send messages" ON messages FOR INSERT WITH CHECK (true);


-- ======================================
-- INDEXES
-- ======================================
CREATE INDEX IF NOT EXISTS idx_board_posts_author ON board_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_board_posts_category ON board_posts(category);
CREATE INDEX IF NOT EXISTS idx_job_postings_status ON job_postings(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_author ON case_studies(author_id);
CREATE INDEX IF NOT EXISTS idx_education_content_type ON education_content(type);
CREATE INDEX IF NOT EXISTS idx_donations_project ON donations(project_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);

-- ======================================
-- FUNCTIONS & TRIGGERS
-- ======================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_board_posts_updated_at ON board_posts;
CREATE TRIGGER update_board_posts_updated_at BEFORE UPDATE ON board_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_job_postings_updated_at ON job_postings;
CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_case_studies_updated_at ON case_studies;
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_education_content_updated_at ON education_content;
CREATE TRIGGER update_education_content_updated_at BEFORE UPDATE ON education_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_donation_projects_updated_at ON donation_projects;
CREATE TRIGGER update_donation_projects_updated_at BEFORE UPDATE ON donation_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();
