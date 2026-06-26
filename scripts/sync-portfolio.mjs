/**
 * Detects GitHub repos tagged with `portfolio-featured` that are not yet in
 * portfolio.json. For each new repo it fetches the README to pre-fill draft
 * fields; if no README exists it creates a template README on the repo first.
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

async function ghPut(path, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`GitHub API PUT ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

async function fetchReadme(repoName) {
  try {
    const data = await gh(`/repos/${USERNAME}/${repoName}/readme`)
    return Buffer.from(data.content, 'base64').toString('utf-8')
  } catch {
    return null
  }
}

function buildReadmeTemplate(repo) {
  const name = repo.name.replace(/-/g, ' ')
  const topics = (repo.topics ?? []).filter(t => t !== TOPIC)
  return [
    `# ${name}`,
    '',
    repo.description ?? 'A brief description of this project.',
    '',
    '## Features',
    '',
    '- Feature 1',
    '- Feature 2',
    '- Feature 3',
    '',
    '## Tech Stack',
    '',
    ...(topics.length > 0 ? topics.map(t => `- ${t}`) : ['- [Add technologies used]']),
    '',
    '## Getting Started',
    '',
    '```bash',
    `git clone https://github.com/${USERNAME}/${repo.name}.git`,
    '```',
    '',
    'Add setup instructions here.',
    '',
    '## Live Demo',
    '',
    repo.homepage ? `[View Live Demo](${repo.homepage})` : '[Add live demo link here]',
    '',
  ].join('\n')
}

async function ensureReadme(repo) {
  let markdown = await fetchReadme(repo.name)
  if (!markdown) {
    console.log(`  No README found — creating template on ${repo.name}...`)
    const content = buildReadmeTemplate(repo)
    await ghPut(`/repos/${USERNAME}/${repo.name}/contents/README.md`, {
      message: 'docs: add README template',
      content: Buffer.from(content).toString('base64'),
    })
    console.log(`  ✓ README.md created`)
    return content
  }
  return markdown
}

function parseReadme(markdown, repo) {
  const lines = markdown.split('\n')

  // Title: first H1 heading
  const titleLine = lines.find(l => /^#\s+/.test(l))
  const title = titleLine
    ? titleLine.replace(/^#\s+/, '').trim()
    : repo.name.replace(/-/g, ' ')

  // Description: first non-empty paragraph that isn't a heading, image, or badge
  const titleIdx = titleLine ? lines.indexOf(titleLine) : -1
  let description = ''
  for (let i = titleIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && !line.startsWith('#') && !line.startsWith('!') && !line.startsWith('<') && !line.startsWith('>')) {
      description = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
      break
    }
  }
  if (!description) description = repo.description ?? `[TODO: describe ${repo.name}]`

  // Live URL: look for demo/live links in the markdown, fall back to repo homepage
  const liveMatch = markdown.match(
    /\[(?:live\s*demo|demo|view\s*live|deployed|live\s*site)[^\]]*\]\((https?:\/\/[^)]+)\)/i
  )
  const liveUrl = liveMatch ? liveMatch[1] : (repo.homepage || null)

  // Tags: parse "Tech Stack / Technologies / Built With" section, supplement with repo topics
  const techSection = markdown.match(
    /##\s*(?:tech\s*stack|technologies|built\s*with|tools\s*used)[^\n]*\n([\s\S]*?)(?=\n##|$)/i
  )
  let tags = (repo.topics ?? []).filter(t => t !== TOPIC)
  if (techSection) {
    const parsed = techSection[1]
      .split('\n')
      .map(l => l.replace(/^[-*•]\s+/, '').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim())
      .filter(l => l && l.length > 0 && l.length < 40 && !l.startsWith('#'))
    if (parsed.length > 0) tags = [...new Set([...tags, ...parsed])]
  }

  // Highlight: prefer a test/user count stat, then a "deployed/production" sentence
  const statMatch = markdown.match(/(\d+\+?\s*(?:tests?|automated\s*tests?|endpoints?|features?|users?|requests?\/s))/i)
  const prodMatch = markdown.match(/(?:deployed|production|live)[^\n.!?]*(?:[.!?])/i)
  const highlight = statMatch
    ? statMatch[0].trim()
    : prodMatch
    ? prodMatch[0].trim()
    : '[TODO: add key stat or achievement]'

  return { title, description, liveUrl, tags, highlight }
}

async function main() {
  // 1. Find all repos tagged portfolio-featured
  const search = await gh(`/search/repositories?q=user:${USERNAME}+topic:${TOPIC}&per_page=100&sort=updated`)
  const tagged = search.items
  console.log(`Found ${tagged.length} repo(s) with topic '${TOPIC}': ${tagged.map(r => r.name).join(', ')}`)

  // 2. Load current portfolio.json
  const portfolio = JSON.parse(readFileSync(PORTFOLIO_PATH, 'utf-8'))
  const existing = new Set(portfolio.featuredProjects.map(p => p.repo))

  // 3. Only process repos not already in portfolio.json
  const newRepos = tagged.filter(r => !existing.has(r.name))
  if (newRepos.length === 0) {
    console.log('✓ portfolio.json is already up to date — nothing to add.')
    return
  }

  // 4. For each new repo: fetch/create README, parse it, build draft entry
  const maxOrder = portfolio.featuredProjects.reduce((m, p) => Math.max(m, p.order ?? 0), 0)
  const drafts = []

  for (let i = 0; i < newRepos.length; i++) {
    const repo = newRepos[i]
    console.log(`\nProcessing ${repo.name}...`)

    const markdown = await ensureReadme(repo)
    const parsed = parseReadme(markdown, repo)

    drafts.push({
      repo: repo.name,
      featured: true,
      order: maxOrder + i + 1,
      customTitle: parsed.title,
      customDescription: parsed.description,
      highlight: parsed.highlight,
      liveUrl: parsed.liveUrl,
      liveLabel: parsed.liveUrl ? 'Live Demo' : null,
      collaborator: null,
      tags: parsed.tags,
    })

    console.log(`  ✓ title:       ${parsed.title}`)
    console.log(`  ✓ description: ${parsed.description.slice(0, 80)}`)
    console.log(`  ✓ tags:        ${parsed.tags.join(', ') || 'none'}`)
    console.log(`  ✓ liveUrl:     ${parsed.liveUrl ?? 'none'}`)
    console.log(`  ✓ highlight:   ${parsed.highlight}`)
    console.log(`  → Review and remove "_draft": true when ready to publish`)
  }

  portfolio.featuredProjects.push(...drafts)

  // 5. Write back
  writeFileSync(PORTFOLIO_PATH, JSON.stringify(portfolio, null, 2) + '\n')
  console.log(`\n✓ Added ${drafts.length} draft entry/entries to portfolio.json`)
}

main().catch(e => {
  console.error('Sync failed:', e.message)
  process.exit(1)
})
