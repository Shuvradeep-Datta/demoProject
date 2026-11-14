// Build a lightweight full-text search index across all portfolio files.
import { allFiles } from '../data/fileTree.js'
import { content } from '../data/content.js'
import { skillCategories, categoriesForFile } from '../data/skills.js'
import projects, { getProject } from '../data/projects.js'
import experience from '../data/experience.js'
import certifications from '../data/certifications.js'
import education, { timeline } from '../data/education.js'
import profile from '../data/profile.js'

function textForFile(f) {
  switch (f.view) {
    case 'markdown':
      return content[f.id] || ''
    case 'experience': {
      const e = experience.find((x) => x.id === f.ref) || experience[0]
      return [e.company, e.role, e.client, e.summary, ...e.responsibilities, ...e.stack].join(' ')
    }
    case 'skills': {
      const cats = categoriesForFile(f.ref)
      return cats.map((c) => `${c.label} ${c.skills.map((s) => s.name).join(' ')}`).join(' ')
    }
    case 'project': {
      const p = getProject(f.ref)
      if (!p) return ''
      return [p.name, p.tagline, p.overview, p.problem, ...p.technologies, ...p.features].join(' ')
    }
    case 'architecture':
      return content[`architecture-${f.ref}`] || ''
    case 'certifications':
      return certifications.map((c) => `${c.name} ${c.code} ${c.issuer} ${c.status}`).join(' ')
    case 'education':
      return [
        ...education.map((e) => `${e.degree} ${e.year}`),
        ...timeline.map((t) => `${t.date} ${t.title} ${t.detail}`),
      ].join(' ')
    case 'contact':
      return `contact email linkedin github resume ${profile.location}`
    default:
      return ''
  }
}

export const searchDocs = allFiles.map((f) => ({
  id: f.id,
  name: f.name,
  path: f.path,
  text: textForFile(f),
}))

// Returns [{ id, name, path, snippet }] for a query.
export function search(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const results = []
  for (const doc of searchDocs) {
    const hay = doc.text.toLowerCase()
    const idx = hay.indexOf(q)
    const nameMatch = doc.name.toLowerCase().includes(q)
    if (idx === -1 && !nameMatch) continue
    let snippet = ''
    if (idx !== -1) {
      const start = Math.max(0, idx - 30)
      const end = Math.min(doc.text.length, idx + q.length + 40)
      snippet = (start > 0 ? '…' : '') + doc.text.slice(start, end).replace(/\s+/g, ' ').trim() + (end < doc.text.length ? '…' : '')
    }
    results.push({ id: doc.id, name: doc.name, path: doc.path, snippet, query: q })
  }
  return results
}

// Used by Search panel highlight: markSnippet returns parts array.
export function markParts(snippet, query) {
  if (!snippet) return [{ text: '', mark: false }]
  const parts = []
  const lower = snippet.toLowerCase()
  let i = 0
  const q = query.toLowerCase()
  while (i < snippet.length) {
    const next = lower.indexOf(q, i)
    if (next === -1) {
      parts.push({ text: snippet.slice(i), mark: false })
      break
    }
    if (next > i) parts.push({ text: snippet.slice(i, next), mark: false })
    parts.push({ text: snippet.slice(next, next + q.length), mark: true })
    i = next + q.length
  }
  return parts
}

export { skillCategories, projects }
