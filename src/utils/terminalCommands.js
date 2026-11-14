// Simulated portfolio terminal. NOT a real OS shell — a fixed set of
// commands that print portfolio information. Each command returns an array
// of output line objects: { text, cls }.
import profile from '../data/profile.js'
import { skillCategories } from '../data/skills.js'
import projects from '../data/projects.js'
import experience from '../data/experience.js'
import certifications from '../data/certifications.js'
import education from '../data/education.js'

const line = (text = '', cls = 'term-out') => ({ text, cls })

export const COMMAND_NAMES = [
  'help',
  'about',
  'skills',
  'experience',
  'projects',
  'certifications',
  'education',
  'contact',
  'whoami',
  'ls',
  'clear',
]

const COMMANDS = {
  help: () => [
    line('Available commands:', 'term-accent'),
    line('  help            Show this help message'),
    line('  about           Short professional bio'),
    line('  skills          Core technical skills'),
    line('  experience      Professional experience'),
    line('  projects        Featured projects'),
    line('  certifications  Certifications & status'),
    line('  education       Education summary'),
    line('  contact         How to reach me'),
    line('  whoami          Who am I'),
    line('  ls              List portfolio sections'),
    line('  clear           Clear the terminal'),
    line(''),
    line('Tip: open files from the Explorer or press Ctrl+Shift+P.', 'term-muted'),
  ],

  whoami: () => [
    line(profile.name, 'term-accent'),
    line(profile.title),
    line(`${profile.location}`, 'term-muted'),
  ],

  about: () => [line(profile.intro)],

  skills: () => {
    const out = []
    for (const cat of skillCategories) {
      if (cat.inline) continue
      out.push(line(`${cat.label}:`, 'term-accent'))
      out.push(line('  ' + cat.skills.map((s) => s.name).join(' | ')))
    }
    return out
  },

  experience: () => {
    const out = []
    for (const e of experience) {
      out.push(line(`${e.role} @ ${e.company}`, 'term-accent'))
      out.push(line(`  ${e.period} · ${e.location}`, 'term-muted'))
      out.push(line(`  Client: ${e.client}`))
    }
    return out
  },

  projects: () => {
    const out = [line('Featured projects:', 'term-accent')]
    for (const p of projects) {
      const tag = p.status === 'planned' ? ' (planned)' : p.status === 'in-progress' ? ' (in progress)' : ''
      out.push(line(`  • ${p.name}${tag}`))
    }
    return out
  },

  certifications: () => {
    const out = [line('Certifications:', 'term-accent')]
    for (const c of certifications) {
      const label = c.status === 'passed' ? 'PASSED' : c.status === 'in-progress' ? 'IN PROGRESS' : 'PLANNED'
      out.push(line(`  [${label}] ${c.name}${c.code ? ` (${c.code})` : ''}`))
    }
    return out
  },

  education: () => education.map((e) => line(`${e.degree}, ${e.year}`)),

  contact: () => {
    const c = profile.contacts
    const fmt = (f) => (f.placeholder ? `${f.value} (placeholder)` : f.value)
    return [
      line('Contact:', 'term-accent'),
      line(`  Email:    ${fmt(c.email)}`),
      line(`  LinkedIn: ${fmt(c.linkedin)}`),
      line(`  GitHub:   ${fmt(c.github)}`),
      line(`  Location: ${profile.location}`),
    ]
  },

  ls: () => [
    line('ABOUT/  EXPERIENCE/  TECHNICAL-SKILLS/  PROJECTS/', 'term-path'),
    line('ARCHITECTURE/  CERTIFICATIONS/  EDUCATION/  CONTACT/', 'term-path'),
    line('README.md', 'term-out'),
  ],
}

// Returns { lines, clear } for a raw input string.
export function runCommand(raw) {
  const cmd = raw.trim().toLowerCase()
  if (cmd === '') return { lines: [] }
  if (cmd === 'clear') return { lines: [], clear: true }
  const handler = COMMANDS[cmd]
  if (!handler) {
    return {
      lines: [
        line(`command not found: ${raw.trim()}`, 'term-err'),
        line("Type 'help' to see available commands.", 'term-muted'),
      ],
    }
  }
  return { lines: handler() }
}

export const WELCOME_LINES = [
  line('SkillPulse portfolio terminal — simulated shell.', 'term-accent'),
  line("Type 'help' to list commands.  (Not a real OS shell.)", 'term-muted'),
  line(''),
]
