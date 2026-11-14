// Renders a JS object as pretty, syntax-highlighted JSON with a line-number
// gutter — mimicking a JSON file open in the editor.
import { Fragment } from 'react'

function colorizeLine(line) {
  // Tokenize a single pretty-printed JSON line into colored spans.
  const parts = []
  const regex =
    /("(?:\\.|[^"\\])*"\s*:)|("(?:\\.|[^"\\])*")|(\b-?\d+(?:\.\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],])/g
  let last = 0
  let m
  let k = 0
  while ((m = regex.exec(line)) !== null) {
    if (m.index > last) parts.push(<Fragment key={k++}>{line.slice(last, m.index)}</Fragment>)
    if (m[1]) {
      // key with trailing colon
      const key = m[1].replace(/:\s*$/, '')
      parts.push(
        <Fragment key={k++}>
          <span className="jk">{key}</span>
          <span className="jp">:</span>
        </Fragment>,
      )
    } else if (m[2]) {
      parts.push(
        <span className="js" key={k++}>
          {m[2]}
        </span>,
      )
    } else if (m[3]) {
      parts.push(
        <span className="jn" key={k++}>
          {m[3]}
        </span>,
      )
    } else if (m[4]) {
      parts.push(
        <span className="jb" key={k++}>
          {m[4]}
        </span>,
      )
    } else if (m[5]) {
      parts.push(
        <span className="jp" key={k++}>
          {m[5]}
        </span>,
      )
    }
    last = regex.lastIndex
  }
  if (last < line.length) parts.push(<Fragment key={k++}>{line.slice(last)}</Fragment>)
  return parts
}

export default function JsonView({ value, comments = [] }) {
  const json = JSON.stringify(value, null, 2)
  const lines = json.split('\n')
  let lineNo = 0

  return (
    <div className="json-view">
      {comments.map((c, i) => {
        lineNo += 1
        return (
          <div className="gutter-line" key={`c${i}`}>
            <span className="gutter">{lineNo}</span>
            <span className="lc">
              <span className="jc">// {c}</span>
            </span>
          </div>
        )
      })}
      {lines.map((line, i) => {
        lineNo += 1
        return (
          <div className="gutter-line" key={`l${i}`}>
            <span className="gutter">{lineNo}</span>
            <span className="lc">{colorizeLine(line)}</span>
          </div>
        )
      })}
    </div>
  )
}
