import experience from '../../../data/experience.js'
import { Icon } from '../../../utils/icons.jsx'

function Achievement({ a }) {
  return (
    <div className="achievement">
      {a.verified ? (
        <span className="metric">{a.metric}</span>
      ) : (
        <span className="metric unverified" title="Enable once verified in data/experience.js">
          (metric)
        </span>
      )}
      <div>
        <div>{a.label}</div>
        {!a.verified && (
          <div className="note">
            <Icon name="Info" size={11} /> {a.metric} — shown once <code className="inline">verified: true</code>. {a.note}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ExperienceView({ file }) {
  const e = experience.find((x) => x.id === file.ref) || experience[0]
  return (
    <div className="animate-in">
      <div className="exp-head">
        <div>
          <div className="exp-company">{e.company}</div>
          <div className="exp-role">{e.role}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="exp-meta">{e.period}</div>
          <div className="exp-meta">{e.location}</div>
        </div>
      </div>

      <div className="chips">
        <span className="chip">
          <Icon name="Briefcase" size={13} /> Client: {e.client}
        </span>
      </div>

      <p className="md" style={{ lineHeight: 1.7 }}>
        {e.summary}
      </p>

      <div className="section-h">
        <Icon name="Layers" size={15} /> Responsibilities
      </div>
      <ul className="md">
        {e.responsibilities.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <div className="section-h">
        <Icon name="Zap" size={15} /> Achievements (editable metrics)
      </div>
      <p className="doc-sub" style={{ marginBottom: 12 }}>
        Metrics are intentionally hidden until attributed to a verified achievement.
      </p>
      {e.achievements.map((a) => (
        <Achievement key={a.id} a={a} />
      ))}

      <div className="section-h">
        <Icon name="Code2" size={15} /> Stack
      </div>
      <div className="chips">
        {e.stack.map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
