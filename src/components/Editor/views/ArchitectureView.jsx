import { content } from '../../../data/content.js'
import Markdown from '../Markdown.jsx'
import ArchitectureDiagram from '../../ArchitectureDiagram/ArchitectureDiagram.jsx'

// file.ref is one of: 'microservices' | 'aws' | 'cicd'
export default function ArchitectureView({ file }) {
  const key = `architecture-${file.ref}`
  return (
    <div className="animate-in">
      <Markdown source={content[key] || ''} />
      <ArchitectureDiagram type={file.ref} />
    </div>
  )
}
