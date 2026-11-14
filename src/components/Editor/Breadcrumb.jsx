import { ROOT_NAME } from '../../data/fileTree.js'
import { Icon, FileIcon } from '../../utils/icons.jsx'

export default function Breadcrumb({ file }) {
  if (!file) return null
  const crumbs = [ROOT_NAME, ...file.path]
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <span className="crumb" key={`${c}-${i}`}>
          {i === 0 ? <Icon name="Home" size={13} /> : <Icon name="Folder" size={13} color="#dcb67a" />}
          {c}
          <Icon name="ChevronRight" size={13} />
        </span>
      ))}
      <span className="crumb">
        <FileIcon name={file.name} size={13} />
        {file.name}
      </span>
    </nav>
  )
}
