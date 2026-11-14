import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import Explorer from '../Explorer/Explorer.jsx'
import SearchPanel from '../Search/SearchPanel.jsx'
import { Icon } from '../../utils/icons.jsx'

export default function Sidebar() {
  const ws = useWorkspace()
  const isExplorer = ws.activityView === 'explorer'

  return (
    <aside className={`sidebar ${ws.sidebarOpenMobile ? 'open' : ''}`} aria-label="Side Bar">
      <div className="sidebar-header">
        <span>{isExplorer ? 'Explorer' : 'Search'}</span>
        <div className="actions">
          {isExplorer && (
            <button title="Collapse" onClick={() => ws.setSidebarMobile(false)} aria-label="Collapse sidebar">
              <Icon name="X" size={15} />
            </button>
          )}
        </div>
      </div>
      <div className="sidebar-body">{isExplorer ? <Explorer /> : <SearchPanel />}</div>
    </aside>
  )
}
