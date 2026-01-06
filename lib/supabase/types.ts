export interface Profile {
  id: string
  email: string
  full_name: string
  role: string
  specialties: string[]
  hospital: string | null
  experience_years: number
  avatar_url: string | null
  bio: string | null
  skills: string[]
  languages: string[]
  certifications: Certification[]
  education: Education[]
  career_history: CareerHistory[]
  research: Research
  created_at: string
  updated_at: string
}

export interface Certification {
  name: string
  issuer: string
  year: number
  description?: string
}

export interface Education {
  degree: string
  institution: string
  field: string
  year: number
}

export interface CareerHistory {
  title: string
  institution: string
  period: string
  description?: string
}

export interface Research {
  papers: ResearchItem[]
  presentations: ResearchItem[]
  books: ResearchItem[]
}

export interface ResearchItem {
  title: string
  authors?: string
  year: number
  publication?: string
  description?: string
}
