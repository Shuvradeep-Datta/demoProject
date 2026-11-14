import profile from '../../data/profile.js'

// Official WhatsApp glyph (inline SVG — Lucide ships no brand icons).
function WhatsAppGlyph({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        fill="#fff"
        d="M16.004 0h-.008C7.174 0 .01 7.165.01 16c0 3.504 1.128 6.75 3.046 9.384L1.06 31.2l6.02-1.924A15.9 15.9 0 0 0 16.004 32C24.83 32 32 24.835 32 16S24.83 0 16.004 0z"
      />
      <path
        fill="#25D366"
        d="M16.004 2.4C8.5 2.4 2.41 8.49 2.41 16c0 3.06 1.012 5.89 2.72 8.17l-1.78 5.3 5.49-1.754A13.5 13.5 0 0 0 16.004 29.6C23.5 29.6 29.59 23.51 29.59 16S23.5 2.4 16.004 2.4z"
      />
      <path
        fill="#fff"
        d="M23.93 21.03c-.33.93-1.636 1.702-2.68 1.927-.714.152-1.646.273-4.787-1.028-4.02-1.666-6.61-5.75-6.81-6.016-.194-.266-1.626-2.164-1.626-4.128 0-1.963 1.003-2.92 1.407-3.32.33-.33.878-.48 1.403-.48.17 0 .323.008.46.015.404.017.606.04.872.677.33.8 1.136 2.762 1.232 2.96.098.198.196.466.064.733-.123.274-.232.39-.43.62-.197.23-.384.405-.58.653-.18.215-.384.447-.157.84.228.39 1.012 1.665 2.17 2.695 1.494 1.33 2.74 1.747 3.18 1.93.33.136.722.103.967-.154.31-.33.69-.877 1.078-1.418.274-.388.62-.436.98-.3.37.13 2.33 1.1 2.73 1.298.4.198.664.296.762.46.098.17.098.95-.232 1.88z"
      />
    </svg>
  )
}

export default function WhatsAppButton() {
  const wa = profile.contacts.whatsapp
  // Keep only digits (defensive) and hide the button if not configured.
  const number = (wa?.value || '').replace(/\D/g, '')
  if (!number) return null

  const message = `Hi ${profile.name.split(' ')[0]}, I came across your portfolio and would like to connect.`
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`

  return (
    <a
      className="wa-fab"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Message me on WhatsApp"
      title="Message me on WhatsApp"
    >
      <WhatsAppGlyph />
      <span className="wa-tooltip">Chat on WhatsApp</span>
    </a>
  )
}
