import { useState } from 'react'
import { fileTree, ROOT_NAME } from '../../data/fileTree.js'
import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { Icon, FileIcon } from '../../utils/icons.jsx'

function FileRow({ node, depth }) {
  const ws = useWorkspace()
  const active = ws.activeId === node.id
  return (
    <div
      className={`tree-row ${active ? 'active' : ''}`}
      style={{ paddingLeft: 10 + depth * 14 }}
      role="treeitem"
      aria-selected={active}
      tabIndex={0}
      onClick={() => ws.openFile(node.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          ws.openFile(node.id)
        }
      }}
    >
      <span className="twisty" />
      <span className="file-ico">
        <FileIcon name={node.name} />
      </span>
      <span className="label">{node.name}</span>
    </div>
  )
}

function FolderRow({ node, depth }) {
  const [open, setOpen] = useState(true)
  return (
    <div role="group">
      <div
        className="tree-row"
        style={{ paddingLeft: 6 + depth * 14 }}
        role="treeitem"
        aria-expanded={open}
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((o) => !o)
          }
        }}
      >
        <span className="twisty">
          <Icon name={open ? 'ChevronDown' : 'ChevronRight'} size={16} />
        </span>
        <span className="file-ico">
          <Icon name={open ? 'FolderOpen' : 'Folder'} size={16} color="#dcb67a" />
        </span>
        <span className="label">{node.name}</span>
      </div>
      {open && node.children.map((child) => <TreeNode key={child.id} node={child} depth={depth + 1} />)}
    </div>
  )
}

function TreeNode({ node, depth }) {
  if (node.kind === 'folder') return <FolderRow node={node} depth={depth} />
  return <FileRow node={node} depth={depth} />
}

export default function Explorer() {
  const [rootOpen, setRootOpen] = useState(true)
  return (
    <div className="explorer-root" role="tree" aria-label="Portfolio files">
      <div
        className="tree-row"
        role="treeitem"
        aria-expanded={rootOpen}
        tabIndex={0}
        onClick={() => setRootOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setRootOpen((o) => !o)
          }
        }}
      >
        <span className="twisty">
          <Icon name={rootOpen ? 'ChevronDown' : 'ChevronRight'} size={16} />
        </span>
        <span className="label root-label">{ROOT_NAME}</span>
      </div>
      {rootOpen && fileTree.map((node) => <TreeNode key={node.id} node={node} depth={1} />)}
    </div>
  )
}
