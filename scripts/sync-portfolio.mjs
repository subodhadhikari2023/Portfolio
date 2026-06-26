/**
 * Detects GitHub repos tagged with the `portfolio-featured` topic that are not
 * yet in portfolio.json, and adds a draft entry for each one.
 *
 * Run by the sync-portfolio GitHub Action. Also works locally:
 *   GITHUB_TOKEN=<pat> node scripts/sync-portfolio.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_PATH = join(__dirname, '../src/data/portfolio.json')
const TOPIC = 'portfolio-featured'
const USERNAME = 'subodhadhikari2023'
const TOKEN = process.env.GITHUB_TOKEN

if (!TOKEN) {
  console.error('GITHUB_TOKEN env var is required.')
  process.exit(1)
}

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!res.ok) throw new Error(`GitHub API ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

async function main() {
  // 1. Find all repos tagged portfolio-featured
  const search = await gh(`/search/repositories?q=user:${USERNAME}+topic:${TOPIC}&per_page=100&sort=updated`)
  const tagged = search.items

  console.log(`Found ${tagged.length} repo(s) with topic '${TOPIC}': ${tagged.map(r => r.name).join(', ')}`)

  // 2. Load current portfolio.json
  const portfolio = JSON.parse(readFileSync(PORTFOLIO_PATH, 'utf-8'))
  const existing = new Set(portfolio.featuredProjects.map(p => p.repo))

  // 3. Diff — only repos not already in portfolio.json
  const newRepos = tagged.filter(r => !existing.has(r.name))

  if (newRepos.length === 0) {
    console.log('✓ portfolio.json is already up to date — nothing to add.')
    return
  }

  // 4. Build draft entries
  const maxOrder = portfolio.featuredProjects.reduce((m, p) => Math.max(m, p.order ?? 0), 0)

  const drafts = newRepos.map((repo, i) => ({
    repo: repo.name,
    featured: true,
    order: maxOrder + i + 1,
    customTitle: repo.name.replace(/-/g, ' '),
    customDescription: repo.description ?? `[TODO: describe ${repo.name}]`,
    highlight: '[TODO: add key stat or achievement]',
    liveUrl: repo.homepage || null,
    liveLabel: null,
    collaborator: null,
    tags: (repo.topics ?? []).filter(t => t !== TOPIC),
    _draft: true,
  }))

  portfolio.featuredProjects.push(...drafts)

  // 5. Write back
  writeFileSync(PORTFOLIO_PATH, JSON.stringify(portfolio, null, 2) + '\n')

  console.log(`\n✓ Added ${drafts.length} draft entry/entries:`)
  drafts.forEach(d => {
    console.log(`  • ${d.repo} (order ${d.order})`)
    console.log(`    Fill in: customTitle, customDescription, highlight, tags`)
    console.log(`    Remove "_draft": true when done`)
  })
}

main().catch(e => {
  console.error('Sync failed:', e.message)
  process.exit(1)
})
