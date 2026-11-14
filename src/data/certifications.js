// ─────────────────────────────────────────────────────────────
// Certifications. `status` is one of: 'passed' | 'in-progress' | 'planned'.
// Pending certifications are NEVER represented as earned.
// Fill credentialId / verifyUrl / date as they become available.
// ─────────────────────────────────────────────────────────────

export const certifications = [
  {
    id: 'az-900',
    name: 'Microsoft Certified: Azure Fundamentals',
    code: 'AZ-900',
    issuer: 'Microsoft',
    issuerAccent: '#0078d4',
    status: 'passed',
    date: { value: '', placeholder: true },
    credentialId: { value: '', placeholder: true },
    verifyUrl: { value: '', placeholder: true },
  },
  {
    id: 'az-104',
    name: 'Microsoft Certified: Azure Administrator Associate',
    code: 'AZ-104',
    issuer: 'Microsoft',
    issuerAccent: '#0078d4',
    status: 'passed',
    date: { value: 'April 2026', placeholder: false },
    credentialId: { value: '', placeholder: true },
    verifyUrl: { value: '', placeholder: true },
  },
  {
    id: 'az-400',
    name: 'Microsoft Certified: DevOps Engineer Expert',
    code: 'AZ-400',
    issuer: 'Microsoft',
    issuerAccent: '#0078d4',
    status: 'passed',
    date: { value: 'May 2026', placeholder: false },
    credentialId: { value: '', placeholder: true },
    verifyUrl: { value: '', placeholder: true },
  },
  {
    id: 'saa-c03',
    name: 'AWS Certified Solutions Architect – Associate',
    code: 'SAA-C03',
    issuer: 'Amazon Web Services',
    issuerAccent: '#ff9900',
    // Configurable — do NOT assume passed. Change to 'passed' once earned.
    status: 'passed',
    date: { value: 'August 2026', placeholder: false },
    credentialId: { value: '', placeholder: true },
    verifyUrl: { value: '', placeholder: true },
  },
  {
    id: 'claude-architect-foundations',
    // Use the official certificate title exactly as shown on your credential.
    name: 'Claude Certified Architect – Foundations',
    code: '',
    issuer: 'Anthropic',
    issuerAccent: '#d97757',
    // Configurable — do NOT assume passed. Change to 'passed' once earned.
    status: 'passed',
    date: { value: 'September 2026', placeholder: false },
    credentialId: { value: '', placeholder: true },
    verifyUrl: { value: '', placeholder: true },
  },
]

export const CERT_STATUS_META = {
  passed: { label: 'Passed', color: '#4ec9b0', bg: 'rgba(78,201,176,0.12)', icon: 'BadgeCheck' },
  'in-progress': { label: 'In Progress', color: '#dcdcaa', bg: 'rgba(220,220,170,0.12)', icon: 'Clock' },
  planned: { label: 'Planned', color: '#569cd6', bg: 'rgba(86,156,214,0.12)', icon: 'CalendarClock' },
}

export default certifications
