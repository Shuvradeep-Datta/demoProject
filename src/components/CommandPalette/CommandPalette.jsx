import { useEffect, useMemo, useRef, useState } from 'react'
import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { buildCommands } from '../../utils/commands.js'
import { Icon } from '../../utils/icons.jsx'

export default function CommandPalette() {
  const ws = useWorkspace()
  const commands = useMemo(() => buildCommands(ws), [ws])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [query, commands])

  // Reset + focus on open.
  useEffect(() => {
    if (ws.paletteOpen) {
      setQuery('')
      setActive(0)
      // focus after paint
      const t = setTimeout(() => inputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
    return undefined
  }, [ws.paletteOpen])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!ws.paletteOpen) return null

  const run = (cmd) => {
    if (!cmd) return
    ws.setPalette(false)
    cmd.run()
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(filtered[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      ws.setPalette(false)
    }
  }

  // keep active item in view
  const setActiveAndScroll = (i) => {
    setActive(i)
  }

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) ws.setPalette(false)
      }}
    >
      <div className="palette" role="dialog" aria-label="Command Palette">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a command… (e.g. 'Open Projects', 'Toggle Theme')"
          aria-label="Command input"
        />
        <div className="palette-list" ref={listRef}>
          {filtered.length === 0 && <div className="palette-empty">No matching commands.</div>}
          {filtered.map((cmd, i) => (
            <div
              key={cmd.id}
              className={`palette-item ${i === active ? 'active' : ''}`}
              onMouseEnter={() => setActiveAndScroll(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                run(cmd)
              }}
              ref={(el) => {
                if (i === active && el) el.scrollIntoView({ block: 'nearest' })
              }}
            >
              <span className="pi-icon">
                <Icon name={cmd.icon} size={16} />
              </span>
              <span className="pi-label">{cmd.label}</span>
              {cmd.kbd && <span className="pi-kbd">{cmd.kbd}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
