import { useMemo, useState } from 'react'
import { search, markParts } from '../../utils/searchIndex.js'
import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { Icon, FileIcon } from '../../utils/icons.jsx'

export default function SearchPanel() {
  const ws = useWorkspace()
  const [query, setQuery] = useState('')
  const results = useMemo(() => search(query), [query])

  return (
    <div className="search-panel">
      <div className="search-input-wrap">
        <Icon name="Search" size={14} />
        <input
          type="text"
          autoFocus
          placeholder="Search portfolio"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search portfolio content"
        />
      </div>

      <div className="search-results">
        {query && (
          <div className="search-group-title">
            {results.length} result{results.length === 1 ? '' : 's'}
          </div>
        )}
        {results.map((r) => (
          <div
            key={r.id}
            className="search-hit"
            onClick={() => ws.openFile(r.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') ws.openFile(r.id)
            }}
          >
            <span className="hit-file">
              <FileIcon name={r.name} size={14} />
              {r.name}
              {r.path.length > 0 && <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>· {r.path.join('/')}</span>}
            </span>
            {r.snippet && (
              <span className="hit-snippet">
                {markParts(r.snippet, r.query).map((p, i) =>
                  p.mark ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>,
                )}
              </span>
            )}
          </div>
        ))}
        {query && results.length === 0 && <div className="palette-empty">No results found.</div>}
      </div>
    </div>
  )
}
