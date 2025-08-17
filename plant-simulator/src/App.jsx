import { useEffect, useState, useCallback } from 'react'
import './App.css'
import Scene from './components/Scene'
import ControlsPanel from './components/ControlsPanel'

function App() {
  const [params, setParams] = useState({
    seed: 3,
    maxDepth: 6,
    branchFactor: 3,
    baseLength: 1.4,
    lengthDecay: 0.72,
    baseRadius: 0.12,
    radiusDecay: 0.75,
    branchAngle: 26,
    randomness: 0.22,
    curvature: 5,
    windStrength: 0.12,
    growth: 1,
  })

  const onChange = useCallback((partial) => {
    setParams((prev) => ({ ...prev, ...partial }))
  }, [])

  useEffect(() => {
    document.title = '3D Plant Simulator'
  }, [])

  return (
    <div className="app-root">
      <div className="canvas-wrap">
        <Scene params={params} />
        <ControlsPanel params={params} onChange={onChange} />
      </div>
    </div>
  )
}

export default App
