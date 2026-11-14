// Build the command palette command list from the workspace api.
// Each command: { id, label, icon, kbd?, run() }
export function buildCommands(ws) {
  const open = (fileId) => () => ws.openFile(fileId)

  return [
    { id: 'open-about', label: 'Open: About Me', icon: 'UserRound', run: open('about-me') },
    { id: 'open-journey', label: 'Open: Career Journey', icon: 'BookOpen', run: open('career-journey') },
    { id: 'open-goals', label: 'Open: Career Goals', icon: 'Target', run: open('career-goals') },
    { id: 'open-experience', label: 'Open: Experience', icon: 'Briefcase', run: open('cognizant') },
    { id: 'open-skills', label: 'Open: Technical Skills', icon: 'Code2', run: open('java-backend') },
    { id: 'open-projects', label: 'Open: Projects', icon: 'Boxes', run: open('resilience4j-order-service') },
    { id: 'open-architecture', label: 'Open: Architecture', icon: 'Network', run: open('architecture-microservices') },
    { id: 'open-certifications', label: 'Open: Certifications', icon: 'Award', run: open('certifications') },
    { id: 'open-education', label: 'Open: Education & Timeline', icon: 'GraduationCap', run: open('education') },
    { id: 'open-contact', label: 'Open: Contact', icon: 'Mail', run: open('contact') },
    { id: 'open-readme', label: 'Open: README', icon: 'FileText', run: open('readme') },
    {
      id: 'toggle-theme',
      label: 'Preferences: Toggle Color Theme',
      icon: 'Sun',
      kbd: 'Ctrl K T',
      run: () => ws.toggleTheme(),
    },
    {
      id: 'show-terminal',
      label: 'View: Toggle Terminal',
      icon: 'TerminalSquare',
      kbd: 'Ctrl `',
      run: () => ws.setPanel(true),
    },
    {
      id: 'focus-search',
      label: 'View: Show Search',
      icon: 'Search',
      run: () => {
        ws.setActivityView('search')
        ws.setSidebarMobile(true)
      },
    },
    {
      id: 'focus-explorer',
      label: 'View: Show Explorer',
      icon: 'Files',
      run: () => {
        ws.setActivityView('explorer')
        ws.setSidebarMobile(true)
      },
    },
    { id: 'close-all', label: 'View: Close All Editors', icon: 'X', run: () => ws.closeAll() },
  ]
}

export default buildCommands
