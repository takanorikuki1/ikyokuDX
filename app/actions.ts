'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// --- BOARD POSTS ---
export async function createBoardPost(formData: FormData) {
    const supabase = await createClient()

    // Basic validation
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const category = formData.get('category') as string

    if (!title || !content) return { error: 'Title and content are required' }

    // Get current user (optional for demo)
    const { data: { user } } = await supabase.auth.getUser()
    const authorId = user?.id || null

    const { error } = await supabase.from('board_posts').insert({
        title,
        content,
        category: category || 'General',
        author_id: authorId
    })

    if (error) {
        console.error('Board post error:', error)
        return { error: `Failed to create post: ${error.message}` }
    }

    revalidatePath('/board')
    return { success: true }
}

// --- JOB POSTINGS (Matching) ---
export async function createJobPosting(formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const facility = formData.get('facility') as string
    const description = formData.get('description') as string

    if (!title || !facility) return { error: 'Missing required fields' }

    const { error } = await supabase.from('job_postings').insert({
        title,
        facility,
        description,
        location: formData.get('location') as string || 'TBD',
        type: formData.get('type') as string || 'Full-time',
        salary: formData.get('salary') as string || 'Negotiable',
        status: 'open',
        posted_date: new Date().toISOString()
    })

    if (error) {
        console.error(error)
        return { error: 'Failed to create job' }
    }

    revalidatePath('/matching')
    return { success: true }
}

// --- CASE STUDIES ---
export async function createCaseStudy(formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const description = formData.get('description') as string // Maps to 'summary' or 'content' depending on schema

    const { data: { user } } = await supabase.auth.getUser()
    const authorId = user?.id || null

    const { error } = await supabase.from('case_studies').insert({
        title,
        content: description,
        author_id: authorId
    })

    if (error) {
        console.error('Case study error:', error)
        return { error: `Failed to create case: ${error.message}` }
    }

    revalidatePath('/cases')
    return { success: true }
}

// --- EDUCATION CONTENT ---
export async function createEducationContent(formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string

    const { data: { user } } = await supabase.auth.getUser()
    const instructorId = user?.id || null

    const { error } = await supabase.from('education_content').insert({
        title,
        description,
        category: category || 'General',
        instructor_id: instructorId
    })

    if (error) {
        console.error('Education content error:', error)
        return { error: `Failed to create content: ${error.message}` }
    }

    revalidatePath('/education')
    return { success: true }
}

// --- DONATION PROJECTS ---
export async function createDonationProject(formData: FormData) {
    const supabase = await createClient()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const goalAmount = parseInt(formData.get('goal_amount') as string) || 1000000
    const category = formData.get('category') as string

    const { data: { user } } = await supabase.auth.getUser()
    const createdBy = user?.id || null

    const { error } = await supabase.from('donation_projects').insert({
        title,
        description,
        goal_amount: goalAmount,
        category: category || 'medical_network'
    })

    if (error) {
        console.error('Donation project error:', error)
        return { error: `Failed to create project: ${error.message}` }
    }

    revalidatePath('/donation')
    return { success: true }
}
