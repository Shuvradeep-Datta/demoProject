import { useEffect, useRef, useState } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { runCommand, WELCOME_LINES } from '../../utils/terminalCommands.js'
import profile from '../../data/profile.js'
import { Icon } from '../../utils/icons.jsx'

const PROMPT_USER = 'shuvradeep'
const PROMPT_HOST = 'portfolio'

function PromptLabel() {
  return (
    <span className="term-input-line" style={{ display: 'inline-flex' }}>
      <span className="term-user">
        {PROMPT_USER}@{PROMPT_HOST}
      </span>
      <span className="term-muted">:</span>
      <span className="term-path">~</span>
      <span className="term-prompt">$</span>
    </span>
  )
}

export default function Terminal() {
  const ws = useWorkspace()
  const [history, setHistory] = useState(() => [...WELCOME_LINES]) // rendered lines
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([]) // past commands
  const [histIdx, setHistIdx] = useState(-1)
  const [activeTab, setActiveTab] = useState('terminal')
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [history])

  // Focus input when the panel becomes visible.
  useEffect(() => {
    if (ws.panelOpen) inputRef.current?.focus()
  }, [ws.panelOpen])

  const submit = () => {
    const raw = input
    const entryLines = [{ text: `${PROMPT_USER}@${PROMPT_HOST}:~$ ${raw}`, cls: 'term-cmd-echo' }]
    const { lines, clear } = runCommand(raw)
    if (clear) {
      setHistory([])
    } else {
      setHistory((h) => [...h, ...entryLines, ...lines, { text: '', cls: 'term-out' }])
    }
    if (raw.trim()) setCmdHistory((c) => [...c, raw])
    setHistIdx(-1)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const idx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setInput(cmdHistory[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const idx = histIdx + 1
      if (idx >= cmdHistory.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(idx)
        setInput(cmdHistory[idx])
      }
    }
  }

  if (!ws.panelOpen) return null

  return (
    <div className="panel" style={{ height: 'clamp(160px, 26vh, 300px)' }}>
      <div className="panel-tabs">
        <button className={`panel-tab ${activeTab === 'terminal' ? 'active' : ''}`} onClick={() => setActiveTab('terminal')}>
          Terminal
        </button>
        <button className={`panel-tab ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => setActiveTab('problems')}>
          Problems
        </button>
        <div className="panel-actions">
          <button title="Clear terminal" aria-label="Clear terminal" onClick={() => setHistory([])}>
            <Icon name="Trash2" size={14} />
          </button>
          <button title="Close panel" aria-label="Close panel" onClick={() => ws.setPanel(false)}>
            <Icon name="X" size={15} />
          </button>
        </div>
      </div>

      {activeTab === 'terminal' ? (
        <div
          className="terminal"
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          role="log"
          aria-label="Terminal output"
        >
          {history.map((l, i) => (
            <div
              key={i}
              className={`term-line ${l.cls === 'term-cmd-echo' ? '' : l.cls}`}
              style={l.cls === 'term-cmd-echo' ? { color: 'var(--text-strong)' } : undefined}
            >
              {l.text}
            </div>
          ))}
          <div className="term-input-line">
            <PromptLabel />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      ) : (
        <div className="terminal term-muted">
          No problems have been detected in the workspace. — {profile.name}
        </div>
      )}
    </div>
  )
}
