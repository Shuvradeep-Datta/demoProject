// ─────────────────────────────────────────────────────────────
// Explorer file tree. Each FILE node carries everything the editor
// needs to render it:
//   id      unique id (also used as the tab key)
//   name    display name / file name
//   path    breadcrumb path segments
//   lang    language label (status bar + icon)
//   view    which renderer the Editor should use
//   ref     optional key passed to the renderer (project id, cert, etc.)
// ─────────────────────────────────────────────────────────────

export const ROOT_NAME = 'SHUVRADEEP-DATTA'

const file = (id, name, path, lang, view, ref) => ({
  kind: 'file',
  id,
  name,
  path,
  lang,
  view,
  ref: ref || null,
})

export const fileTree = [
  {
    kind: 'folder',
    id: 'about',
    name: 'ABOUT',
    children: [
      file('about-me', 'about-me.md', ['ABOUT'], 'Markdown', 'markdown'),
      file('career-journey', 'career-journey.md', ['ABOUT'], 'Markdown', 'markdown'),
      file('career-goals', 'career-goals.md', ['ABOUT'], 'Markdown', 'markdown'),
    ],
  },
  {
    kind: 'folder',
    id: 'experience',
    name: 'EXPERIENCE',
    children: [file('cognizant', 'cognizant.md', ['EXPERIENCE'], 'Markdown', 'experience', 'cognizant')],
  },
  {
    kind: 'folder',
    id: 'technical-skills',
    name: 'TECHNICAL-SKILLS',
    children: [
      file('java-backend', 'java-backend.json', ['TECHNICAL-SKILLS'], 'JSON', 'skills', 'java-backend.json'),
      file('cloud-aws', 'cloud-aws.json', ['TECHNICAL-SKILLS'], 'JSON', 'skills', 'cloud-aws.json'),
      file('azure', 'azure.json', ['TECHNICAL-SKILLS'], 'JSON', 'skills', 'azure.json'),
      file('devops', 'devops.json', ['TECHNICAL-SKILLS'], 'JSON', 'skills', 'devops.json'),
      file('databases', 'databases.json', ['TECHNICAL-SKILLS'], 'JSON', 'skills', 'databases.json'),
      file('frontend', 'frontend.json', ['TECHNICAL-SKILLS'], 'JSON', 'skills', 'frontend.json'),
    ],
  },
  {
    kind: 'folder',
    id: 'projects',
    name: 'PROJECTS',
    children: [
      file('resilience4j-order-service', 'resilience4j-order-service.md', ['PROJECTS'], 'Markdown', 'project', 'resilience4j-order-service'),
      file('aws-s3-integration', 'aws-s3-integration.md', ['PROJECTS'], 'Markdown', 'project', 'aws-s3-integration'),
      file('skillpulse-devops', 'skillpulse-devops.md', ['PROJECTS'], 'Markdown', 'project', 'skillpulse-devops'),
      file('employee-management-system', 'employee-management-system.md', ['PROJECTS'], 'Markdown', 'project', 'employee-management-system'),
    ],
  },
  {
    kind: 'folder',
    id: 'architecture',
    name: 'ARCHITECTURE',
    children: [
      file('architecture-microservices', 'microservices.md', ['ARCHITECTURE'], 'Markdown', 'architecture', 'microservices'),
      file('architecture-aws', 'aws-architecture.md', ['ARCHITECTURE'], 'Markdown', 'architecture', 'aws'),
      file('architecture-cicd', 'cicd-pipeline.md', ['ARCHITECTURE'], 'Markdown', 'architecture', 'cicd'),
    ],
  },
  {
    kind: 'folder',
    id: 'certifications',
    name: 'CERTIFICATIONS',
    children: [file('certifications', 'certifications.md', ['CERTIFICATIONS'], 'Markdown', 'certifications')],
  },
  {
    kind: 'folder',
    id: 'education',
    name: 'EDUCATION',
    children: [file('education', 'education.md', ['EDUCATION'], 'Markdown', 'education')],
  },
  {
    kind: 'folder',
    id: 'contact',
    name: 'CONTACT',
    children: [file('contact', 'contact.md', ['CONTACT'], 'Markdown', 'contact')],
  },
  file('readme', 'README.md', [], 'Markdown', 'markdown'),
]

// Flatten all file nodes into a lookup by id.
export const fileIndex = (() => {
  const idx = {}
  const walk = (nodes) => {
    for (const n of nodes) {
      if (n.kind === 'file') idx[n.id] = n
      if (n.children) walk(n.children)
    }
  }
  walk(fileTree)
  return idx
})()

export function getFile(id) {
  return fileIndex[id] || null
}

// All files as a flat array (for search).
export const allFiles = Object.values(fileIndex)

export default fileTree
