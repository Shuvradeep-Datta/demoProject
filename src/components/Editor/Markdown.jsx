// A small, dependency-free Markdown renderer covering the subset used
// across the portfolio: headings, bold, inline code, links, blockquotes,
// horizontal rules, fenced code blocks, and unordered/ordered lists.
import { Fragment } from 'react'

// Inline formatting: **bold**, `code`, [text](url)
function renderInline(text, keyPrefix) {
  const nodes = []
  let remaining = text
  let k = 0
  // Order matters: code first (so ** inside code isn't parsed), then links, then bold.
  const pattern = /(`[^`]+`)|(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)/
  while (remaining.length) {
    const m = remaining.match(pattern)
    if (!m) {
      nodes.push(<Fragment key={`${keyPrefix}-t${k++}`}>{remaining}</Fragment>)
      break
    }
    const idx = m.index
    if (idx > 0) {
      nodes.push(<Fragment key={`${keyPrefix}-t${k++}`}>{remaining.slice(0, idx)}</Fragment>)
    }
    const token = m[0]
    if (token.startsWith('`')) {
      nodes.push(
        <code className="inline" key={`${keyPrefix}-c${k++}`}>
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('[')) {
      const lm = token.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const external = /^https?:/.test(lm[2])
      nodes.push(
        <a
          key={`${keyPrefix}-l${k++}`}
          href={lm[2]}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
        >
          {lm[1]}
        </a>,
      )
    } else {
      nodes.push(<strong key={`${keyPrefix}-b${k++}`}>{token.slice(2, -2)}</strong>)
    }
    remaining = remaining.slice(idx + token.length)
  }
  return nodes
}

function CodeBlock({ lines }) {
  return (
    <pre className="code-block">
      <code>{lines.join('\n')}</code>
    </pre>
  )
}

export default function Markdown({ source }) {
  const lines = (source || '').split('\n')
  const blocks = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.trim().startsWith('```')) {
      const code = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i])
        i++
      }
      i++ // skip closing fence
      blocks.push(<CodeBlock key={`k${key++}`} lines={code} />)
      continue
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      blocks.push(<hr key={`k${key++}`} />)
      i++
      continue
    }

    // Headings
    const h = line.match(/^(#{1,3})\s+(.*)$/)
    if (h) {
      const level = h[1].length
      const Tag = `h${level}`
      blocks.push(<Tag key={`k${key++}`}>{renderInline(h[2], `h${key}`)}</Tag>)
      i++
      continue
    }

    // Blockquote (possibly multi-line)
    if (line.trim().startsWith('>')) {
      const quote = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].replace(/^\s*>\s?/, ''))
        i++
      }
      blocks.push(
        <blockquote key={`k${key++}`}>{renderInline(quote.join(' '), `q${key}`)}</blockquote>,
      )
      continue
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''))
        i++
      }
      blocks.push(
        <ul key={`k${key++}`}>
          {items.map((it, j) => (
            <li key={j}>{renderInline(it, `ul${key}-${j}`)}</li>
          ))}
        </ul>,
      )
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      blocks.push(
        <ol key={`k${key++}`}>
          {items.map((it, j) => (
            <li key={j}>{renderInline(it, `ol${key}-${j}`)}</li>
          ))}
        </ol>,
      )
      continue
    }

    // Blank line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph (gather consecutive non-blank, non-special lines)
    const para = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('```') &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith('>') &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^---+\s*$/.test(lines[i])
    ) {
      para.push(lines[i])
      i++
    }
    blocks.push(<p key={`k${key++}`}>{renderInline(para.join(' '), `p${key}`)}</p>)
  }

  return <div className="md">{blocks}</div>
}
