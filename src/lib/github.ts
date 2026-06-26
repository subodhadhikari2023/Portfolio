const GITHUB_USERNAME = 'subodhadhikari2023'
const GITHUB_API = 'https://api.github.com'

export interface GitHubRepo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  topics: string[]
  homepage: string | null
  html_url: string
}

// Languages too small to count as meaningful skills
const SKIP_LANGS = new Set(['HTML', 'CSS', 'SCSS', 'Dockerfile', 'Shell', 'Batchfile', 'Makefile', 'PLpgSQL'])

export async function getProfileSkills(): Promise<Record<string, string[]> | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${GITHUB_USERNAME}/contents/README.md`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ''}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    const data: { content: string } = await res.json()
    const markdown = Buffer.from(data.content, 'base64').toString('utf-8')
    const match = markdown.match(/<!--\s*PORTFOLIO_SKILLS\s*([\s\S]*?)\s*-->/)
    if (!match) return null
    return JSON.parse(match[1].trim())
  } catch {
    return null
  }
}

export async function getRepoLanguages(repoName: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ''}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const langs: Record<string, number> = await res.json()
    return Object.keys(langs).filter(l => !SKIP_LANGS.has(l))
  } catch {
    return []
  }
}

export async function getRepoData(repoName: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN ?? ''}`,
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    return res.json() as Promise<GitHubRepo>
  } catch {
    return null
  }
}
