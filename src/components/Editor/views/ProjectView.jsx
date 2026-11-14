import { getProject, STATUS_META } from '../../../data/projects.js'
import ArchitectureDiagram from '../../ArchitectureDiagram/ArchitectureDiagram.jsx'
import { Icon } from '../../../utils/icons.jsx'

function StatusPill({ status }) {
  const m = STATUS_META[status] || STATUS_META.completed
  return (
    <span className="pill" style={{ color: m.color, background: m.bg, borderColor: m.color }}>
      <Icon name={status === 'completed' ? 'CheckCircle2' : status === 'planned' ? 'CalendarClock' : 'Clock'} size={12} />
      {m.label}
    </span>
  )
}

function LinkRow({ links }) {
  const gh = links.github
  const demo = links.demo
  const docker = links.dockerHub
  return (
    <div className="project-links">
      {gh && gh.value ? (
        <a className="btn" href={gh.value} target="_blank" rel="noreferrer noopener">
          <Icon name="Github" size={15} /> GitHub Repository
          {gh.placeholder && <Icon name="AlertTriangle" size={12} color="var(--text-dim)" />}
        </a>
      ) : (
        <span className="btn disabled" title="Add the repository URL in data/projects.js">
          <Icon name="Github" size={15} /> Repository link (placeholder)
        </span>
      )}

      {docker && docker.value && (
        <a className="btn" href={docker.value} target="_blank" rel="noreferrer noopener">
          <Icon name="Container" size={15} /> Docker Hub
        </a>
      )}

      {demo && demo.value ? (
        <a className="btn" href={demo.value} target="_blank" rel="noreferrer noopener">
          <Icon name="ExternalLink" size={15} /> Live Demo
        </a>
      ) : (
        <span className="btn disabled" title="Add a live demo URL in data/projects.js">
          <Icon name="ExternalLink" size={15} /> Live demo (placeholder)
        </span>
      )}
    </div>
  )
}

export default function ProjectView({ file }) {
  const p = getProject(file.ref)
  if (!p) return <div className="editor-empty">Project not found.</div>

  return (
    <div className="animate-in">
      <div className="project-hero">
        <h1 className="doc-title" style={{ margin: 0 }}>
          <Icon name="Boxes" size={24} /> {p.name}
        </h1>
        <StatusPill status={p.status} />
      </div>
      <p className="doc-sub">{p.tagline}</p>

      {p.status === 'planned' && (
        <blockquote className="md" style={{ margin: '0 0 18px' }}>
          <Icon name="Info" size={13} /> This project is <strong>planned / in progress</strong> — it is not yet
          complete. Links are placeholders until the work is published.
        </blockquote>
      )}

      <div className="section-h">
        <Icon name="BookOpen" size={15} /> Overview
      </div>
      <p className="md">{p.overview}</p>

      <div className="section-h">
        <Icon name="Target" size={15} /> Problem Statement
      </div>
      <p className="md">{p.problem}</p>

      <div className="section-h">
        <Icon name="Code2" size={15} /> Technologies
      </div>
      <div className="chips">
        {p.technologies.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>

      {p.repoContext && (
        <div className="chips">
          <span className="chip">
            <Icon name="Github" size={13} /> repo: {p.repoContext.repo}
          </span>
          <span className="chip">
            <Icon name="Container" size={13} /> docker: {p.repoContext.dockerHubUser}
          </span>
        </div>
      )}

      <div className="section-h">
        <Icon name="Network" size={15} /> Architecture Diagram
      </div>
      <ArchitectureDiagram type={p.diagram} />

      <div className="section-h">
        <Icon name="Zap" size={15} /> Key Features
      </div>
      <ul className="md">
        {p.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <div className="section-h">
        <Icon name="ExternalLink" size={15} /> Links
      </div>
      <LinkRow links={p.links} />

      <div className="section-h">
        <Icon name="Package" size={15} /> Screenshots
      </div>
      {p.screenshots.length === 0 ? (
        <div className="screenshot-ph">
          <Icon name="Package" size={22} />
          <div style={{ marginTop: 8 }}>Screenshots placeholder — add image paths to this project in <code className="inline">data/projects.js</code>.</div>
        </div>
      ) : (
        <div className="card-grid">
          {p.screenshots.map((src, i) => (
            <img key={i} src={src} alt={`${p.name} screenshot ${i + 1}`} style={{ width: '100%', borderRadius: 8 }} />
          ))}
        </div>
      )}
    </div>
  )
}
