import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { getFile } from '../../data/fileTree.js'
import { Icon } from '../../utils/icons.jsx'
import { ROOT_NAME } from '../../data/fileTree.js'

const MENU = ['File', 'Edit', 'View', 'Go', 'Run', 'Help']

export default function TitleBar() {
  const ws = useWorkspace()
  const file = ws.activeId ? getFile(ws.activeId) : null
  const title = file ? `${file.name} — ${ROOT_NAME}` : `Welcome — ${ROOT_NAME}`

  return (
    <div className="titlebar">
      <div className="traffic">
        <span className="r" />
        <span className="y" />
        <span className="g" />
      </div>
      <button className="mobile-menu-btn" aria-label="Toggle sidebar" onClick={() => ws.toggleSidebarMobile()}>
        <Icon name="Menu" size={16} />
      </button>
      <div className="menu">
        {MENU.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <span>{title}</span>
    </div>
  )
}
