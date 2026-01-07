
import { createClient } from './supabase/server';
import type { DoctorProfile, JobPosting, CaseStudy, BoardPost, EducationContent, DonationProject, Conversation, Message } from './mock-data';

// HELPER: Map snake_case DB result to camelCase Domain Entity
const mapDoctor = (row: any): Partial<DoctorProfile> => ({
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    department: row.department,
    specialty: row.specialty,
    licenseNumber: row.license_number,
    joinedDate: row.joined_date,
    experience: row.experience,
    availability: row.availability,
    bio: row.bio,
});

export async function getDoctors(): Promise<Partial<DoctorProfile>[]> {
    const supabase = await createClient();
    // Join skills, certifications, career_history to provide complete list view
    const { data, error } = await supabase.from('profiles').select(`
        *,
        profile_skills(skill),
        certifications(name),
        career_history(*),
        education_history(*)
    `);

    if (error || !data) return [];

    // Enrich mapDoctor to handle arrays
    return data.map((row: any) => ({
        ...mapDoctor(row),
        skills: row.profile_skills?.map((s: any) => s.skill) || [],
        certifications: row.certifications?.map((c: any) => c.name) || [],
        careerHistory: row.career_history || [],
        educationHistory: row.education_history || []
    }));
}

export async function getDoctorById(id: string): Promise<Partial<DoctorProfile> | null> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('profiles').select(`
    *,
    career_history(*),
    education_history(*),
    certifications(*),
    research_works(*),
    profile_skills(*),
    profile_languages(*)
  `).eq('id', id).single();

    if (error) return null;
    if (error) return null;
    return {
        ...mapDoctor(data),
        skills: data.profile_skills?.map((s: any) => s.skill) || [],
        certifications: data.certifications?.map((c: any) => c.name) || [],
        careerHistory: data.career_history || [],
        educationHistory: data.education_history || [],
        researchList: [] // Placeholder as schema might differ
    };
}

export async function getJobPostings() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('job_postings').select('*, job_requirements(requirement), job_benefits(benefit)');
    if (error || !data) return [];

    return data.map((j: any) => ({
        id: j.id,
        title: j.title,
        facility: j.facility,
        location: j.location,
        region: j.region,
        type: j.type,
        salary: j.salary,
        description: j.description,
        postedDate: j.posted_date,
        deadline: j.deadline,
        status: j.status,
        applicants: j.applicants_count,
        requirements: j.job_requirements?.map((r: any) => r.requirement) || [],
        benefits: j.job_benefits?.map((b: any) => b.benefit) || []
    }));
}

export async function getJobPostingById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from('job_postings').select('*, job_requirements(*), job_benefits(*)').eq('id', id).single();
    if (error || !data) return null;

    return {
        id: data.id,
        title: data.title,
        facility: data.facility,
        location: data.location,
        region: data.region,
        type: data.type,
        salary: data.salary,
        description: data.description,
        postedDate: data.posted_date,
        deadline: data.deadline,
        status: data.status,
        applicants: data.applicants_count,
        requirements: data.job_requirements?.map((r: any) => r.requirement) || [],
        benefits: data.job_benefits?.map((b: any) => b.benefit) || []
    };
}

export async function getCaseStudies() {
    const supabase = await createClient();
    // Join profiles to get author name
    const { data, error } = await supabase.from('case_studies').select('*, profiles(name)');
    if (error || !data) return [];

    return data.map((c: any) => ({
        ...c,
        author: c.profiles?.name || 'Unknown',
        tags: c.tags || [] // Ensure tags is array
    }));
}

export async function getCaseStudyById(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from('case_studies').select('*, profiles(name)').eq('id', id).single();
    if (error || !data) return null;
    // Map author name from profiles
    return {
        ...data,
        author: data.profiles?.name || 'Unknown',
        tags: data.tags || []
    };
}

export async function getBoardPosts() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('board_posts').select('*, profiles(name)');
    if (error || !data) return [];

    // Ensure all required fields have default values
    return data.map((post: any) => ({
        ...post,
        tags: post.tags || [],
        likes: post.likes || 0,
        comments: post.comments || 0,
        author: post.profiles?.name || 'Anonymous'
    }));
}

export async function getEducationContent() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('education_content').select('*, profiles(name)');
    if (error || !data) return [];

    // Ensure arrays are present if UI expects them
    return data.map((e: any) => ({
        ...e,
        tags: e.tags || [],
        instructor: e.profiles?.name || 'Unknown'
    }));
}



export async function getDonationProjects() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('donation_projects').select('*');
    if (error || !data) return [];

    // Keep snake_case to match client component expectations and ensure null safety
    return data.map((d: any) => ({
        id: d.id,
        title: d.title || '',
        description: d.description || '',
        goal_amount: d.goal_amount || 0,
        current_amount: d.current_amount || 0,
        supporter_count: d.supporter_count || 0,
        category: d.category || 'medical_network',
        status: d.status || 'active',
        created_at: d.created_at
    }));
}

export async function getRecentDonations() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('donations').select('*, profiles(name)').order('created_at', { ascending: false }).limit(5);
    if (error || !data) return [];

    return data.map((d: any) => ({
        ...d,
        donor_name: d.profiles?.name || d.donor_name || 'Anonymous'
    }));
}

// Conversation stubs (Real implementation requires Auth context mostly)
export async function getConversations() {
    // Placeholder: in real app, fetch where participant matches current user
    return [];
}
