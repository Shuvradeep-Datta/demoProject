import { useWorkspace } from './context/WorkspaceContext.jsx'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts.js'
import TitleBar from './components/TitleBar/TitleBar.jsx'
import ActivityBar from './components/ActivityBar/ActivityBar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import EditorTabs from './components/EditorTabs/EditorTabs.jsx'
import Editor from './components/Editor/Editor.jsx'
import Terminal from './components/Terminal/Terminal.jsx'
import StatusBar from './components/StatusBar/StatusBar.jsx'
import CommandPalette from './components/CommandPalette/CommandPalette.jsx'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton.jsx'

export default function App() {
  const ws = useWorkspace()
  useKeyboardShortcuts()

  return (
    <div className="app">
      <TitleBar />
      <div className="workbench">
        <ActivityBar />
        <Sidebar />
        {ws.sidebarOpenMobile && (
          <div className="sidebar-backdrop show" onClick={() => ws.setSidebarMobile(false)} aria-hidden="true" />
        )}
        <main className="main-area">
          <EditorTabs />
          <Editor />
          <Terminal />
        </main>
      </div>
      <StatusBar />
      <CommandPalette />
      <WhatsAppButton />
    </div>
  )
}
