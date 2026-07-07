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

async function fetchScreenshots(repoName) {
  for (const folder of ['docs/screenshots', 'screenshots']) {
    try {
      const entries = await gh(`/repos/${USERNAME}/${repoName}/contents/${folder}`)
      if (!Array.isArray(entries)) continue

      const isImage = f => f.type === 'file' && /\.(png|jpe?g|gif|webp)$/i.test(f.name)
      const images = []

      // Root-level images first
      images.push(...entries.filter(isImage).map(f => f.download_url))

      // One level of subfolders — up to 5 images each
      for (const dir of entries.filter(f => f.type === 'dir')) {
        try {
          const sub = await gh(`/repos/${USERNAME}/${repoName}/contents/${folder}/${dir.name}`)
          if (!Array.isArray(sub)) continue
          images.push(...sub.filter(isImage).slice(0, 5).map(f => f.download_url))
        } catch { /* subfolder inaccessible — skip */ }
      }

      if (images.length > 0) return images
    } catch {
      // folder doesn't exist — try next
    }
  }
  return null
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

  // Description: sourced from the GitHub repo's description field (more reliable than
  // parsing README prose, which varies widely in structure across repos).
  const description = repo.description ?? `[TODO: describe ${repo.name}]`

  // Live URL: look for demo/live links in the markdown, fall back to repo homepage
  const liveMatch = markdown.match(
    /\[(?:live\s*demo|demo|view\s*live|deployed|live\s*site)[^\]]*\]\((https?:\/\/[^)]+)\)/i
  )
  const liveUrl = liveMatch ? liveMatch[1] : (repo.homepage || null)

  // Tags: parse "Tech Stack / Technologies / Built With" section, supplement with repo topics.
  // READMEs use three different shapes for this section in practice, so we detect and
  // handle each:
  //   (a) bullet list      — "- Spring Boot"
  //   (b) markdown table    — "| Layer | Technology |" rows — the label column (first
  //                           cell) is a category like "Language", not a tech name, so we
  //                           keep only the remaining cell(s)
  //   (c) delimiter line    — a single line of items separated by · or , with no
  //                           bullets/table at all, e.g. "Python · httpx · SQLite"
  const techSection = markdown.match(
    /##\s*(?:tech\s*stack|technologies|built\s*with|tools\s*used)[^\n]*\n([\s\S]*?)(?=\n##|$)/i
  )
  let tags = (repo.topics ?? []).filter(t => t !== TOPIC)
  if (techSection) {
    const rawLines = techSection[1].split('\n').map(l => l.trim()).filter(Boolean)
    let parsed = []

    const bulletLines = rawLines.filter(l => /^[-*•]\s+/.test(l))
    const tableLines = rawLines.filter(l => l.startsWith('|'))

    if (bulletLines.length > 0) {
      parsed = bulletLines.map(l =>
        l.replace(/^[-*•]\s+/, '').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
      )
    } else if (tableLines.length > 0) {
      parsed = tableLines
        .filter(l => !/^\|[\s|:-]+\|$/.test(l)) // drop separator rows like |---|---|
        .slice(1) // drop header row (assumed to be "| Layer | Technology |")
        .flatMap(l =>
          l.split('|').map(c => c.trim()).filter(Boolean)
            .slice(1) // drop the category/label column, keep only tech name cell(s)
            .flatMap(c => c.split(',').map(x => x.trim()))
        )
    } else if (rawLines.some(l => l.includes('·') || l.includes(','))) {
      // Delimiter-separated single line, e.g. "Python 3.14 · httpx · SQLite · Docker"
      parsed = rawLines
        .join(' ')
        .split(/[·,]/)
        .map(x => x.replace(/\*\*/g, '').trim())
        .filter(Boolean)
    }

    parsed = parsed.filter(l => l && l.length > 0 && l.length < 40 && !l.startsWith('#'))
    if (parsed.length > 0) tags = [...new Set([...tags, ...parsed])]
  }

  // Highlight: prefer a test/user count stat, then a genuine deployment-status sentence.
  // The old regex matched the bare word "live" anywhere (e.g. "queries live in
  // config/queries.yaml" — meaning "reside," not "deployed"), and could match inside
  // inline code spans. We now require specific deployment phrasing and strip inline
  // code (`...`) before searching so config paths can't be mistaken for a claim.
  const searchableText = markdown.replace(/`[^`]*`/g, '')
  const statMatch = searchableText.match(/(\d+\+?\s*(?:tests?|automated\s*tests?|endpoints?|features?|users?|requests?\/s))/i)
  const prodMatch = searchableText.match(
    /(?:is\s+live|live\s+(?:at|on|demo|instance)|currently\s+deployed|deployed\s+(?:to|on|via)|in\s+production|production[- ]ready|production\s+system)[^\n.!?]*[.!?]/i
  )
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

  // 3. Process every tagged repo on every run:
  //   - New repos get a full entry created from scratch.
  //   - Existing entries always get description, tags, highlight, and screenshots
  //     refreshed from the latest README / docs/screenshots/ folder.
  //   - Hand-curated fields (customTitle, liveUrl, liveLabel, collaborator, order)
  //     are always preserved from the existing entry.
  const maxOrder = portfolio.featuredProjects.reduce((m, p) => Math.max(m, p.order ?? 0), 0)
  let newCount = 0
  let changed = false

  for (const repo of tagged) {
    console.log(`\nProcessing ${repo.name}...`)

    const markdown = await ensureReadme(repo)
    const parsed = parseReadme(markdown, repo)
    const screenshots = await fetchScreenshots(repo.name)

    const existingIdx = portfolio.featuredProjects.findIndex(p => p.repo === repo.name)
    const existingEntry = existingIdx >= 0 ? portfolio.featuredProjects[existingIdx] : null

    if (existingEntry && !existingEntry._draft) {
      // Existing published entry — refresh auto-derived fields only.
      // highlight is hand-curated and cannot be reliably parsed from README prose, so it
      // is preserved. customTitle, liveUrl, liveLabel, collaborator, order are also preserved.
      portfolio.featuredProjects[existingIdx] = {
        ...existingEntry,
        customDescription: parsed.description,
        tags: parsed.tags,
        ...(screenshots ? { screenshots } : {}),
      }
      console.log(`  ✓ refreshed description, tags, screenshots`)
    } else {
      // New entry or draft being promoted — build a full entry.
      const order = existingEntry ? existingEntry.order : maxOrder + (++newCount)
      const entry = {
        repo: repo.name,
        featured: true,
        order,
        customTitle: parsed.title,
        customDescription: parsed.description,
        highlight: parsed.highlight,
        liveUrl: parsed.liveUrl,
        liveLabel: parsed.liveUrl ? 'Live Demo' : null,
        collaborator: null,
        tags: parsed.tags,
        ...(screenshots ? { screenshots } : {}),
      }
      if (existingIdx >= 0) {
        portfolio.featuredProjects[existingIdx] = entry
        console.log(`  ✓ promoted draft → live`)
      } else {
        portfolio.featuredProjects.push(entry)
        console.log(`  ✓ added new entry`)
      }
    }

    console.log(`  ✓ description: ${parsed.description.slice(0, 80)}`)
    console.log(`  ✓ tags:        ${parsed.tags.join(', ') || 'none'}`)
    console.log(`  ✓ highlight:   ${parsed.highlight}`)
    console.log(`  ✓ screenshots: ${screenshots ? screenshots.length + ' image(s)' : 'none found'}`)
    changed = true
  }

  if (!changed) {
    console.log('\n✓ No tagged repos found — portfolio.json unchanged.')
    return
  }

  // 4. Write back
  writeFileSync(PORTFOLIO_PATH, JSON.stringify(portfolio, null, 2) + '\n')
  console.log(`\n✓ Processed ${tagged.length} repo(s) — portfolio.json updated`)
}

main().catch(e => {
  console.error('Sync failed:', e.message)
  process.exit(1)
})
