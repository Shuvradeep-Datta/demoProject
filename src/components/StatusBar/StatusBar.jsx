import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { getFile } from '../../data/fileTree.js'
import { Icon } from '../../utils/icons.jsx'

export default function StatusBar() {
  const ws = useWorkspace()
  const file = ws.activeId ? getFile(ws.activeId) : null

  return (
    <footer className="statusbar" aria-label="Status Bar">
      <button className="sb-item" onClick={() => ws.openFile('readme')} title="Open README">
        <Icon name="GitBranch" size={13} /> main
      </button>
      <button className="sb-item" onClick={() => ws.setPanel(true)} title="Toggle Terminal">
        <Icon name="TerminalSquare" size={13} /> Terminal
      </button>
      <span className="sb-item" title="No problems">
        <Icon name="CheckCircle2" size={13} /> 0 &nbsp;
        <Icon name="AlertTriangle" size={13} /> 0
      </span>

      <div className="sb-right">
        <button className="sb-item" onClick={() => ws.setPalette(true)} title="Command Palette">
          <Icon name="Command" size={13} /> Ctrl+Shift+P
        </button>
        {file && <span className="sb-item">{file.lang}</span>}
        <span className="sb-item">UTF-8</span>
        <button className="sb-item" onClick={() => ws.toggleTheme()} title="Toggle Theme">
          <Icon name={ws.theme === 'dark' ? 'Moon' : 'Sun'} size={13} />
          {ws.theme === 'dark' ? 'Dark+' : 'Light+'}
        </button>
      </div>
    </footer>
  )
}
