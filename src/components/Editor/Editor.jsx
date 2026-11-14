import { useWorkspace } from '../../context/WorkspaceContext.jsx'
import { getFile } from '../../data/fileTree.js'
import { content } from '../../data/content.js'
import Breadcrumb from './Breadcrumb.jsx'
import Markdown from './Markdown.jsx'
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen.jsx'
import SkillsView from './views/SkillsView.jsx'
import ExperienceView from './views/ExperienceView.jsx'
import ProjectView from './views/ProjectView.jsx'
import ArchitectureView from './views/ArchitectureView.jsx'
import CertificationsView from './views/CertificationsView.jsx'
import EducationView from './views/EducationView.jsx'
import ContactView from './views/ContactView.jsx'

function renderView(file) {
  switch (file.view) {
    case 'markdown':
      return (
        <div className="animate-in">
          <Markdown source={content[file.id] || ''} />
        </div>
      )
    case 'skills':
      return <SkillsView file={file} />
    case 'experience':
      return <ExperienceView file={file} />
    case 'project':
      return <ProjectView file={file} />
    case 'architecture':
      return <ArchitectureView file={file} />
    case 'certifications':
      return <CertificationsView />
    case 'education':
      return <EducationView />
    case 'contact':
      return <ContactView />
    default:
      return <div className="editor-empty">Unknown file type.</div>
  }
}

export default function Editor() {
  const ws = useWorkspace()
  const file = ws.activeId ? getFile(ws.activeId) : null

  if (!file) return <WelcomeScreen />

  return (
    <div className="editor-region">
      <Breadcrumb file={file} />
      <div className="editor-scroll">
        <div className="editor-inner" key={file.id}>
          {renderView(file)}
        </div>
      </div>
    </div>
  )
}
