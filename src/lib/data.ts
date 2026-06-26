import portfolioJson from '@/data/portfolio.json'
import { getRepoData, getRepoLanguages, getProfileSkills } from './github'
import type { PortfolioData, FeaturedProject } from './types'

const raw = portfolioJson as PortfolioData & {
  featuredProjects: Array<Omit<FeaturedProject, 'githubUrl' | 'stars' | 'updatedAt' | 'language'>>
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

  return {
    ...raw,
    featuredProjects: projectsWithGitHub.sort((a, b) => a.order - b.order),
    skills: { ...baseSkills, Languages: mergedLanguages },
  }
}
