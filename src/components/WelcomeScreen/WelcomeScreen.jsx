import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import profile from '../../data/profile.js'
import { getFile } from '../../data/fileTree.js'
import { Icon, FileIcon } from '../../utils/icons.jsx'

const START_ACTIONS = [
  { id: 'open-portfolio', label: 'Open Portfolio (README)', icon: 'BookOpen', file: 'readme' },
  { id: 'about', label: 'About Me', icon: 'UserRound', file: 'about-me' },
  { id: 'projects', label: 'Browse Projects', icon: 'Boxes', file: 'resilience4j-order-service' },
]

const SHORTCUTS = [
  { keys: 'Ctrl + Shift + P', desc: 'Command palette' },
  { keys: 'Ctrl + P', desc: 'Quick open' },
  { keys: 'Ctrl + `', desc: 'Toggle terminal' },
  { keys: 'Ctrl + B', desc: 'Toggle sidebar' },
  { keys: 'Ctrl + K  T', desc: 'Toggle theme' },
]

export default function WelcomeScreen() {
  const ws = useWorkspace()

  return (
    <div className="welcome">
      <div className="welcome-logo">SD</div>
      <h1>{profile.name}</h1>
      <div className="tagline">{profile.title}</div>
      <div className="sub">
        {profile.location} · {profile.experienceYears} years · {profile.currentEmployer}
      </div>

      <div className="welcome-cols">
        <div className="welcome-col">
          <h3>Start</h3>
          {START_ACTIONS.map((a) => (
            <button key={a.id} className="welcome-action" onClick={() => ws.openFile(a.file)}>
              <Icon name={a.icon} size={16} />
              {a.label}
            </button>
          ))}
          <button className="welcome-action" onClick={() => ws.setPalette(true)}>
            <Icon name="Command" size={16} />
            Show All Commands
            <span className="wa-kbd">Ctrl+Shift+P</span>
          </button>
        </div>

        <div className="welcome-col">
          <h3>Recent</h3>
          {ws.recent.length === 0 && (
            <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>No files opened yet — pick one from Start or the Explorer.</div>
          )}
          {ws.recent.map((id) => {
            const f = getFile(id)
            if (!f) return null
            return (
              <button key={id} className="recent-item" onClick={() => ws.openFile(id)}>
                <FileIcon name={f.name} size={15} />
                {f.name}
                <span className="ri-path">{f.path.join('/')}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="welcome-cols" style={{ marginTop: 28 }}>
        <div className="welcome-col">
          <h3>Keyboard Shortcuts</h3>
          {SHORTCUTS.map((s) => (
            <div key={s.keys} className="welcome-action" style={{ cursor: 'default' }}>
              <span style={{ color: 'var(--text)' }}>{s.desc}</span>
              <span className="wa-kbd">{s.keys}</span>
            </div>
          ))}
        </div>
        <div className="welcome-col">
          <h3>Quick Links</h3>
          <button className="welcome-action" onClick={() => ws.openFile('certifications')}>
            <Icon name="Award" size={16} /> Certifications
          </button>
          <button className="welcome-action" onClick={() => ws.openFile('architecture-microservices')}>
            <Icon name="Network" size={16} /> Architecture
          </button>
          <button className="welcome-action" onClick={() => ws.openFile('contact')}>
            <Icon name="Mail" size={16} /> Contact
          </button>
        </div>
      </div>

      <div className="pillars">
        {profile.pillars.map((p) => (
          <div key={p.key} className="pillar" style={{ '--pillar-accent': p.accent }}>
            <div className="p-label">{p.label}</div>
            <div className="p-detail">{p.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
