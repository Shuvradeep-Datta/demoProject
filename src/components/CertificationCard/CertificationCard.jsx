import { CERT_STATUS_META } from '../../data/certifications.js'
import { Icon } from '../../utils/icons.jsx'

function Field({ label, field, link }) {
  if (field.placeholder || !field.value) {
    return (
      <span>
        {label}: <span className="ph">to be added</span>
      </span>
    )
  }
  if (link) {
    return (
      <span>
        {label}:{' '}
        <a href={field.value} target="_blank" rel="noreferrer noopener">
          verify
        </a>
      </span>
    )
  }
  return (
    <span>
      {label}: {field.value}
    </span>
  )
}

export default function CertificationCard({ cert }) {
  const meta = CERT_STATUS_META[cert.status] || CERT_STATUS_META.planned
  const badgeText = cert.code || cert.issuer.slice(0, 2).toUpperCase()

  return (
    <div className="cert-card" style={{ '--cert-accent': cert.issuerAccent }}>
      <div className="cert-top">
        <div className="cert-badge" style={{ background: cert.issuerAccent }}>
          {badgeText}
        </div>
        <div>
          <div className="cert-name">{cert.name}</div>
          <div className="cert-issuer">{cert.issuer}{cert.code ? ` · ${cert.code}` : ''}</div>
        </div>
      </div>

      <span className="pill" style={{ color: meta.color, background: meta.bg, borderColor: meta.color, alignSelf: 'flex-start' }}>
        <Icon name={meta.icon} size={12} /> {meta.label}
      </span>

      <div className="cert-meta">
        <Field label="Date" field={cert.date} />
        <Field label="Credential ID" field={cert.credentialId} />
        <Field label="Verification" field={cert.verifyUrl} link />
      </div>
    </div>
  )
}
