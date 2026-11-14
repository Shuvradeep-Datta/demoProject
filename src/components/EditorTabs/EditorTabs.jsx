import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { getFile } from '../../data/fileTree.js'
import { FileIcon, Icon } from '../../utils/icons.jsx'

export default function EditorTabs() {
  const ws = useWorkspace()
  if (ws.tabs.length === 0) return null

  return (
    <div className="tabs-bar" role="tablist" aria-label="Open editors">
      {ws.tabs.map((id) => {
        const f = getFile(id)
        if (!f) return null
        const active = ws.activeId === id
        return (
          <div
            key={id}
            className={`tab ${active ? 'active' : ''}`}
            role="tab"
            aria-selected={active}
            onClick={() => ws.setActive(id)}
            onMouseDown={(e) => {
              // middle-click closes tab (VS Code behavior)
              if (e.button === 1) {
                e.preventDefault()
                ws.closeTab(id)
              }
            }}
          >
            <FileIcon name={f.name} size={15} />
            <span className="tab-name">{f.name}</span>
            <button
              className="tab-close"
              aria-label={`Close ${f.name}`}
              onClick={(e) => {
                e.stopPropagation()
                ws.closeTab(id)
              }}
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
