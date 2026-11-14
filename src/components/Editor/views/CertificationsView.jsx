import certifications from '../../../data/certifications.js'
import CertificationCard from '../../CertificationCard/CertificationCard.jsx'
import { Icon } from '../../../utils/icons.jsx'

const GROUPS = [
  { title: 'Microsoft', match: (c) => c.issuer === 'Microsoft' },
  { title: 'AWS', match: (c) => c.issuer === 'Amazon Web Services' },
  { title: 'AI & Architecture', match: (c) => c.issuer === 'Anthropic' },
]

export default function CertificationsView() {
  const passed = certifications.filter((c) => c.status === 'passed').length
  return (
    <div className="animate-in">
      <h1 className="doc-title">
        <Icon name="Award" size={24} /> Certifications
      </h1>
      <p className="doc-sub">
        {passed} passed · {certifications.length} tracked. Pending certifications are shown as planned / in progress —
        never as earned.
      </p>

      {GROUPS.map((g) => {
        const items = certifications.filter(g.match)
        if (items.length === 0) return null
        return (
          <div key={g.title}>
            <div className="section-h">
              <Icon name="BadgeCheck" size={15} /> {g.title}
            </div>
            <div className="cert-grid">
              {items.map((c) => (
                <CertificationCard key={c.id} cert={c} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
