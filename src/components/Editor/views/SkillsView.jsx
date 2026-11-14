import { categoriesForFile, LEVELS } from '../../../data/skills.js'
import JsonView from '../JsonView.jsx'
import { Icon } from '../../../utils/icons.jsx'

function LevelMeter({ level }) {
  const idx = LEVELS.indexOf(level) // 0..3
  return (
    <span className="level-meter">
      <span className="level-dots" aria-hidden="true">
        {LEVELS.map((_, i) => (
          <span key={i} className={`level-dot ${i <= idx ? 'on' : ''}`} />
        ))}
      </span>
      <span className="level-label">{level}</span>
    </span>
  )
}

function CategoryBlock({ cat }) {
  return (
    <div className="skill-cat">
      <div className="skill-cat-head" style={{ color: cat.accent }}>
        <Icon name={cat.icon} size={18} />
        {cat.label}
      </div>
      {cat.note && <div className="skill-cat-note">{cat.note}</div>}
      <div>
        {cat.skills.map((s) => (
          <div className="skill-row" key={s.name}>
            <span className="skill-name">{s.name}</span>
            <LevelMeter level={s.level} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SkillsView({ file }) {
  const cats = categoriesForFile(file.ref)

  // The object we show as the "raw JSON" header for authenticity.
  const jsonValue = {}
  cats.forEach((c) => {
    jsonValue[c.label] = c.skills.reduce((acc, s) => {
      acc[s.name] = s.level
      return acc
    }, {})
  })

  return (
    <div className="animate-in">
      <h1 className="doc-title">
        <Icon name={cats[0]?.icon || 'Code2'} size={24} />
        {cats.map((c) => c.label).join(' + ')}
      </h1>
      <p className="doc-sub">
        Proficiency is qualitative — {LEVELS.join(' · ')} — not an arbitrary percentage.
      </p>

      {cats.map((c) => (
        <CategoryBlock key={c.id} cat={c} />
      ))}

      <div className="section-h">
        <Icon name="FileJson" size={15} /> {file.name}
      </div>
      <JsonView value={jsonValue} comments={[`Proficiency levels: ${LEVELS.join(' | ')}`]} />
    </div>
  )
}
