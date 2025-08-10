import { useEffect } from 'react'

export default function ControlsPanel({ params, onChange }) {
  // Keyboard shortcuts: 1/2 growth, [/] wind, +/- seed
  useEffect(() => {
    const handler = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
      if (e.key === '1') onChange({ growth: Math.max(0, (params.growth ?? 1) - 0.1) })
      if (e.key === '2') onChange({ growth: Math.min(1, (params.growth ?? 1) + 0.1) })
      if (e.key === '[') onChange({ windStrength: Math.max(0, (params.windStrength ?? 0.1) - 0.02) })
      if (e.key === ']') onChange({ windStrength: Math.min(0.5, (params.windStrength ?? 0.1) + 0.02) })
      if (e.key === '=') onChange({ seed: (params.seed ?? 1) + 1 })
      if (e.key === '-') onChange({ seed: (params.seed ?? 1) - 1 })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [params, onChange])

  const slider = (label, key, min, max, step = 0.01) => (
    <label style={{ display: 'grid', gap: 4 }}>
      <span style={{ color: '#cfe8ff' }}>{label}: <b>{params[key]}</b></span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={params[key]}
        onChange={(e) => onChange({ [key]: Number(e.target.value) })}
      />
    </label>
  )

  const number = (label, key, step = 1) => (
    <label style={{ display: 'grid', gap: 4 }}>
      <span style={{ color: '#cfe8ff' }}>{label}</span>
      <input
        type="number"
        step={step}
        value={params[key]}
        onChange={(e) => onChange({ [key]: Number(e.target.value) })}
      />
    </label>
  )

  return (
    <div style={{
      position: 'absolute', top: 16, left: 16, padding: 12,
      background: 'rgba(12,18,26,0.7)', border: '1px solid #234', borderRadius: 8,
      display: 'grid', gap: 8, width: 280, backdropFilter: 'blur(6px)'
    }}>
      <h3 style={{ margin: 0, color: '#e9f4ff', fontWeight: 600 }}>Plant Controls</h3>
      {number('Seed', 'seed')}
      {slider('Growth (1/2)', 'growth', 0, 1, 0.01)}
      {slider('Wind ([ / ])', 'windStrength', 0, 0.5, 0.005)}
      {slider('Max Depth', 'maxDepth', 3, 9, 1)}
      {slider('Branch Factor', 'branchFactor', 2, 5, 1)}
      {slider('Base Length', 'baseLength', 0.6, 2.2, 0.02)}
      {slider('Length Decay', 'lengthDecay', 0.55, 0.9, 0.01)}
      {slider('Base Radius', 'baseRadius', 0.06, 0.22, 0.005)}
      {slider('Radius Decay', 'radiusDecay', 0.6, 0.9, 0.01)}
      {slider('Branch Angle', 'branchAngle', 10, 40, 1)}
      {slider('Randomness', 'randomness', 0, 0.5, 0.01)}
      {slider('Curvature', 'curvature', 0, 12, 0.5)}
      <div style={{ color: '#9cc1ff', fontSize: 12 }}>
        Tips: Drag to orbit, scroll to zoom. Keys: 1/2 grow, [/] wind, +/- seed
      </div>
    </div>
  )
}



