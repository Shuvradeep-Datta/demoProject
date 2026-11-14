import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { Icon } from '../../utils/icons.jsx'

const topItems = [
  { id: 'explorer', title: 'Explorer', icon: 'Files' },
  { id: 'search', title: 'Search', icon: 'Search' },
]

export default function ActivityBar() {
  const ws = useWorkspace()

  const selectView = (id) => {
    ws.setActivityView(id)
    ws.setSidebarMobile(true)
  }

  return (
    <nav className="activitybar" aria-label="Activity Bar">
      <div className="ab-group">
        {topItems.map((item) => (
          <button
            key={item.id}
            className={`ab-btn ${ws.activityView === item.id ? 'active' : ''}`}
            title={item.title}
            aria-label={item.title}
            aria-pressed={ws.activityView === item.id}
            onClick={() => selectView(item.id)}
          >
            <Icon name={item.icon} size={24} />
          </button>
        ))}
        <button
          className="ab-btn"
          title="Source Control (external)"
          aria-label="Source Control"
          onClick={() => ws.openFile('readme')}
        >
          <Icon name="GitBranch" size={24} />
        </button>
      </div>

      <div className="ab-group bottom">
        <button
          className="ab-btn"
          title="Command Palette (Ctrl+Shift+P)"
          aria-label="Command Palette"
          onClick={() => ws.setPalette(true)}
        >
          <Icon name="Command" size={24} />
        </button>
        <button
          className="ab-btn"
          title="About / Contact"
          aria-label="Contact"
          onClick={() => ws.openFile('contact')}
        >
          <Icon name="UserRound" size={24} />
        </button>
        <button
          className="ab-btn"
          title="Toggle Theme"
          aria-label="Toggle Theme"
          onClick={() => ws.toggleTheme()}
        >
          <Icon name={ws.theme === 'dark' ? 'Moon' : 'Sun'} size={24} />
        </button>
      </div>
    </nav>
  )
}
