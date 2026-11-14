import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WorkspaceProvider } from './context/WorkspaceContext.jsx'
import App from './App.jsx'
import './styles/app.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkspaceProvider>
      <App />
    </WorkspaceProvider>
  </StrictMode>,
)
