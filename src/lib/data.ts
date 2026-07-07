import portfolioJson from '@/data/portfolio.json'
import { getRepoData, getRepoLanguages, getProfileSkills } from './github'
import type { PortfolioData, FeaturedProject } from './types'

const raw = portfolioJson as PortfolioData & {
  featuredProjects: Array<Omit<FeaturedProject, 'githubUrl' | 'stars' | 'updatedAt' | 'language'>>
}

// Maps a project tag to a skill category using case-insensitive substring matching.
// Returns null for tags that don't fit any known category — those go to "Technologies Used".
function categorizeTag(tag: string): string | null {
  const t = tag.toLowerCase()
  if (/angular|react|vue|next\.?js|svelte|thymeleaf|html\/css|tailwind|bootstrap/.test(t)) return 'Web Applications'
  if (/spring|hibernate|\/jpa|rest\s*api|jwt|flask|express|fastapi|httpx|beautifulsoup|scrapy/.test(t)) return 'APIs & Backend'
  if (/docker|github.?action|ghcr|railway|kubernetes|nginx|vercel|linux|ci\/cd/.test(t)) return 'Deployment & DevOps'
  if (/mysql|postgresql|postgres|sqlite|mongodb|redis|\bh2\b|flyway|liquibase/.test(t)) return 'Data & Storage'
  if (/^java$|typescript|javascript|\bpython\b|^sql$|^bash$|kotlin|golang|rust/.test(t)) return 'Languages'
  if (/\bgit\b|maven|gradle|intellij|vs\s*code|postman|junit|pytest|playwright|rich|pyyaml/.test(t)) return 'Tools'
  return null
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [projectsWithGitHub, profileSkills] = await Promise.all([
    Promise.all(
      raw.featuredProjects
        .filter(p => !p._draft)
        .map(async (project) => {
          const gh = await getRepoData(project.repo)
          return {
            ...project,
            githubUrl: gh?.html_url ?? `https://github.com/subodhadhikari2023/${project.repo}`,
            stars: gh?.stargazers_count ?? 0,
            updatedAt: gh?.updated_at ?? null,
            language: gh?.language ?? null,
          } as FeaturedProject
        })
    ),
    getProfileSkills(),
  ])

  // Skills: prefer the profile README block; fall back to portfolio.json
  const baseSkills = profileSkills ?? raw.skills

  // Auto-detect languages from repo API and merge into the Languages category
  const repoLangs = await Promise.all(projectsWithGitHub.map(p => getRepoLanguages(p.repo)))
  const detected = Array.from(new Set(repoLangs.flat()))
  const existingLangs = baseSkills['Languages'] ?? []
  const mergedLanguages = Array.from(new Set([...existingLangs, ...detected]))

  // Derive additional skills from project tags and merge into the right categories.
  // Tags that don't match a known category fall into "Technologies Used".
  const allTags = Array.from(new Set(projectsWithGitHub.flatMap(p => p.tags)))
  const tagsByCategory: Record<string, string[]> = {}
  for (const tag of allTags) {
    const cat = categorizeTag(tag) ?? 'Technologies Used'
    ;(tagsByCategory[cat] ??= []).push(tag)
  }

  const mergedSkills: Record<string, string[]> = { ...baseSkills, Languages: mergedLanguages }
  for (const [cat, tags] of Object.entries(tagsByCategory)) {
    const existing = mergedSkills[cat] ?? []
    mergedSkills[cat] = Array.from(new Set([...existing, ...tags]))
  }

  return {
    ...raw,
    featuredProjects: projectsWithGitHub.sort((a, b) => a.order - b.order),
    skills: mergedSkills,
  }
}
