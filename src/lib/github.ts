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
