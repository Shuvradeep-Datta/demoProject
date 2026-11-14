// Generic box-and-arrow SVG diagram renderer.
// Draw edges first (behind) then opaque nodes on top, so lines appear to
// terminate cleanly at box boundaries. Arrowheads are placed at the point
// where the center-to-center line intersects the target box.

function center(n) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 }
}

// Intersection of the segment (from outside toward box center) with the box.
function boxIntersection(box, fromPt) {
  const c = center(box)
  const dx = fromPt.x - c.x
  const dy = fromPt.y - c.y
  if (dx === 0 && dy === 0) return c
  const hw = box.w / 2
  const hh = box.h / 2
  const scaleX = dx !== 0 ? hw / Math.abs(dx) : Infinity
  const scaleY = dy !== 0 ? hh / Math.abs(dy) : Infinity
  const scale = Math.min(scaleX, scaleY)
  return { x: c.x + dx * scale, y: c.y + dy * scale }
}

function Edge({ from, to, label, dash, nodes }) {
  const a = nodes[from]
  const b = nodes[to]
  if (!a || !b) return null
  const ca = center(a)
  const cb = center(b)
  const start = boxIntersection(a, cb)
  const end = boxIntersection(b, ca)
  const mx = (start.x + end.x) / 2
  const my = (start.y + end.y) / 2
  return (
    <g>
      <line
        className={`dg-edge ${dash ? 'dash' : ''}`}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        markerEnd="url(#arrow)"
      />
      {label && (
        <text className="dg-edge-label" x={mx} y={my - 4} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  )
}

function Node({ n }) {
  return (
    <g>
      <rect
        className="dg-node-bg"
        x={n.x}
        y={n.y}
        width={n.w}
        height={n.h}
        rx={8}
        style={n.accent ? { stroke: n.accent, strokeWidth: 1.6 } : undefined}
      />
      {n.accent && <rect x={n.x} y={n.y} width={4} height={n.h} rx={2} fill={n.accent} />}
      <text
        className="dg-text strong"
        x={n.x + n.w / 2}
        y={n.sub ? n.y + n.h / 2 - 3 : n.y + n.h / 2 + 4}
        textAnchor="middle"
      >
        {n.label}
      </text>
      {n.sub && (
        <text className="dg-text muted" x={n.x + n.w / 2} y={n.y + n.h / 2 + 13} textAnchor="middle">
          {n.sub}
        </text>
      )}
    </g>
  )
}

export default function DiagramCanvas({ width, height, nodes, edges, caption }) {
  const nodeMap = {}
  nodes.forEach((n) => {
    nodeMap[n.id] = n
  })
  return (
    <div className="diagram-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={caption || 'Architecture diagram'}>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L8,3 L0,6 Z" fill="var(--text-muted)" />
          </marker>
        </defs>
        {edges.map((e, i) => (
          <Edge key={i} {...e} nodes={nodeMap} />
        ))}
        {nodes.map((n) => (
          <Node key={n.id} n={n} />
        ))}
      </svg>
    </div>
  )
}
