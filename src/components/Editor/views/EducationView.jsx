import education, { timeline, TIMELINE_META } from '../../../data/education.js'
import { Icon } from '../../../utils/icons.jsx'

function EduField({ field }) {
  if (field.placeholder || !field.value) return <span style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>{field.value || 'to be added'}</span>
  return <span>{field.value}</span>
}

export default function EducationView() {
  return (
    <div className="animate-in">
      <h1 className="doc-title">
        <Icon name="GraduationCap" size={24} /> Education & Career Timeline
      </h1>
      <p className="doc-sub">College name, specialization and marks are editable placeholders.</p>

      <div className="section-h">
        <Icon name="GraduationCap" size={15} /> Education
      </div>
      {education.map((e) => (
        <div className="card" key={e.id} style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 600, color: 'var(--text-strong)', fontSize: 16 }}>
            {e.degree} · {e.year}
          </div>
          <div className="cert-meta" style={{ marginTop: 6 }}>
            <span>Institution: <EduField field={e.institution} /></span>
            <span>Specialization: <EduField field={e.specialization} /></span>
            <span>Score: <EduField field={e.score} /></span>
          </div>
        </div>
      ))}

      <div className="section-h">
        <Icon name="Activity" size={15} /> Timeline
      </div>
      <div className="timeline">
        {timeline.map((t) => {
          const m = TIMELINE_META[t.type] || TIMELINE_META.focus
          return (
            <div className="tl-item" key={t.id} style={{ '--tl-color': m.color }}>
              <span className="tl-dot" />
              <div className="tl-date">
                <Icon name={m.icon} size={12} /> {t.date}
              </div>
              <div className="tl-title">{t.title}</div>
              <div className="tl-detail">{t.detail}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
