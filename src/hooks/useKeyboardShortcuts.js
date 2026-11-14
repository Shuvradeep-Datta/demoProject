import { useEffect } from 'react'
import { useWorkspace } from '../context/WorkspaceContext.jsx'

// Global keyboard shortcuts, VS Code-style.
//   Ctrl/Cmd + Shift + P  → command palette
//   Ctrl/Cmd + P          → command palette (quick open)
//   Ctrl/Cmd + `          → toggle terminal panel
//   Ctrl/Cmd + B          → toggle sidebar (mobile) / activity focus
//   Ctrl/Cmd + K then T   → toggle theme (simple chord)
//   Escape                → close palette
export function useKeyboardShortcuts() {
  const ws = useWorkspace()

  useEffect(() => {
    let chordK = false
    let chordTimer = null

    const onKey = (e) => {
      const mod = e.ctrlKey || e.metaKey
      const key = e.key

      // Theme chord: Ctrl+K, then T
      if (chordK) {
        if (key.toLowerCase() === 't') {
          e.preventDefault()
          ws.toggleTheme()
        }
        chordK = false
        clearTimeout(chordTimer)
        return
      }

      if (mod && key.toLowerCase() === 'k') {
        chordK = true
        chordTimer = setTimeout(() => {
          chordK = false
        }, 1200)
        return
      }

      if (mod && e.shiftKey && key.toLowerCase() === 'p') {
        e.preventDefault()
        ws.setPalette(true)
        return
      }
      if (mod && !e.shiftKey && key.toLowerCase() === 'p') {
        e.preventDefault()
        ws.setPalette(true)
        return
      }
      if (mod && key === '`') {
        e.preventDefault()
        ws.togglePanel()
        return
      }
      if (mod && key.toLowerCase() === 'b') {
        e.preventDefault()
        ws.toggleSidebarMobile()
        return
      }
      if (key === 'Escape') {
        if (ws.paletteOpen) ws.setPalette(false)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(chordTimer)
    }
  }, [ws])
}

export default useKeyboardShortcuts
