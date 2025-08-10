import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei'
import Plant from './Plant'

export default function Scene({ params }) {

  // Keep stable quality settings
  const dpr = useMemo(() => [1, Math.min(2, window.devicePixelRatio || 1.5)], [])

  return (
    <Canvas dpr={dpr} shadows camera={{ position: [3, 2, 5], fov: 45 }}>
      <color attach="background" args={[0.04, 0.06, 0.08]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Suspense fallback={null}>
        {/* Centered plant at origin (0,0,0) */}
        <group position={[0, 0, 0]}>
          <Plant {...params} />
        </group>
        {/* Ground plane for spatial reference */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0c141e" roughness={1} />
        </mesh>
        {/* Origin marker */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ff4d4d" emissive="#320000" emissiveIntensity={0.2} />
        </mesh>
        <ContactShadows position={[0, -0.01, 0]} opacity={0.5} blur={2.6} far={6} scale={8} />
        <Environment preset="sunset" />
      </Suspense>
      <axesHelper args={[1]} position={[0, 0.001, 0]} />
      <gridHelper args={[20, 40, '#224', '#112']} position={[0, -0.001, 0]} />
      <OrbitControls target={[0, 1, 0]} enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI * 0.49} minDistance={1.2} maxDistance={20} />
    </Canvas>
  )
}


