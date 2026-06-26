import portfolioJson from '@/data/portfolio.json'
import { getRepoData } from './github'
import type { PortfolioData, FeaturedProject } from './types'

const raw = portfolioJson as PortfolioData & {
  featuredProjects: Array<Omit<FeaturedProject, 'githubUrl' | 'stars' | 'updatedAt' | 'language'>>
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const projectsWithGitHub: FeaturedProject[] = await Promise.all(
    raw.featuredProjects.map(async (project) => {
      const gh = await getRepoData(project.repo)
      return {
        ...project,
        githubUrl: gh?.html_url ?? `https://github.com/subodhadhikari2023/${project.repo}`,
        stars: gh?.stargazers_count ?? 0,
        updatedAt: gh?.updated_at ?? null,
        language: gh?.language ?? null,
      }
    })
  )

  return {
    ...raw,
    featuredProjects: projectsWithGitHub.sort((a, b) => a.order - b.order),
  }
}
