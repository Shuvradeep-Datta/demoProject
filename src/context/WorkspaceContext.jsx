import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { getFile } from '../data/fileTree.js'

const WorkspaceContext = createContext(null)

const THEME_KEY = 'portfolio-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark'
}

const initialState = {
  tabs: [], // array of file ids
  activeId: null, // active tab id, or null => welcome screen
  recent: [], // recently opened file ids (most recent first)
  theme: getInitialTheme(),
  activityView: 'explorer', // 'explorer' | 'search'
  panelOpen: true, // terminal panel
  paletteOpen: false,
  sidebarOpenMobile: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_FILE': {
      const { id } = action
      if (!getFile(id)) return state
      const tabs = state.tabs.includes(id) ? state.tabs : [...state.tabs, id]
      const recent = [id, ...state.recent.filter((r) => r !== id)].slice(0, 8)
      return { ...state, tabs, activeId: id, recent, sidebarOpenMobile: false }
    }
    case 'CLOSE_TAB': {
      const { id } = action
      const idx = state.tabs.indexOf(id)
      if (idx === -1) return state
      const tabs = state.tabs.filter((t) => t !== id)
      let activeId = state.activeId
      if (state.activeId === id) {
        activeId = tabs.length ? tabs[Math.max(0, idx - 1)] : null
      }
      return { ...state, tabs, activeId }
    }
    case 'SET_ACTIVE':
      return { ...state, activeId: action.id, sidebarOpenMobile: false }
    case 'CLOSE_ALL':
      return { ...state, tabs: [], activeId: null }
    case 'SET_THEME':
      return { ...state, theme: action.theme }
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
    case 'SET_ACTIVITY_VIEW':
      return { ...state, activityView: action.view }
    case 'SET_PANEL':
      return { ...state, panelOpen: action.open }
    case 'TOGGLE_PANEL':
      return { ...state, panelOpen: !state.panelOpen }
    case 'SET_PALETTE':
      return { ...state, paletteOpen: action.open }
    case 'TOGGLE_PALETTE':
      return { ...state, paletteOpen: !state.paletteOpen }
    case 'SET_SIDEBAR_MOBILE':
      return { ...state, sidebarOpenMobile: action.open }
    case 'TOGGLE_SIDEBAR_MOBILE':
      return { ...state, sidebarOpenMobile: !state.sidebarOpenMobile }
    default:
      return state
  }
}

export function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Apply + persist theme.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
    try {
      window.localStorage.setItem(THEME_KEY, state.theme)
    } catch {
      /* ignore storage errors */
    }
  }, [state.theme])

  const api = useMemo(
    () => ({
      openFile: (id) => dispatch({ type: 'OPEN_FILE', id }),
      closeTab: (id) => dispatch({ type: 'CLOSE_TAB', id }),
      setActive: (id) => dispatch({ type: 'SET_ACTIVE', id }),
      closeAll: () => dispatch({ type: 'CLOSE_ALL' }),
      setTheme: (theme) => dispatch({ type: 'SET_THEME', theme }),
      toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
      setActivityView: (view) => dispatch({ type: 'SET_ACTIVITY_VIEW', view }),
      setPanel: (open) => dispatch({ type: 'SET_PANEL', open }),
      togglePanel: () => dispatch({ type: 'TOGGLE_PANEL' }),
      setPalette: (open) => dispatch({ type: 'SET_PALETTE', open }),
      togglePalette: () => dispatch({ type: 'TOGGLE_PALETTE' }),
      setSidebarMobile: (open) => dispatch({ type: 'SET_SIDEBAR_MOBILE', open }),
      toggleSidebarMobile: () => dispatch({ type: 'TOGGLE_SIDEBAR_MOBILE' }),
    }),
    [],
  )

  const value = useMemo(() => ({ ...state, ...api }), [state, api])

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider')
  return ctx
}
