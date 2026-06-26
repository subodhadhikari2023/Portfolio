export interface Personal {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  github: string
  linkedin: string
  availableForWork: boolean
  resumeUrl: string
}

export interface Stat {
  label: string
  value: string
}

export interface FeaturedProject {
  repo: string
  featured: boolean
  order: number
  customTitle: string
  customDescription: string
  highlight: string
  liveUrl: string | null
  liveLabel: string | null
  collaborator: string | null
  tags: string[]
  screenshots?: string[]
  githubUrl?: string
  stars?: number
  updatedAt?: string | null
  language?: string | null
}

export interface SkillsMap {
  [category: string]: string[]
}

export interface Experience {
  role: string
  org: string
  period: string
  description: string
  highlight: boolean
}

export interface Education {
  degree: string
  institution: string
  period: string
  cgpa: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  screenshot?: string
}

export interface PortfolioData {
  personal: Personal
  about: string
  stats: Stat[]
  featuredProjects: FeaturedProject[]
  skills: SkillsMap
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
}
