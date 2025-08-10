import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Matrix4, Quaternion, Vector3, Color } from 'three'

// Procedural plant using instanced meshes for performance
// Exposes props for interactivity and animation
export default function Plant({
  seed = 1,
  maxDepth = 6,
  branchFactor = 3,
  baseLength = 1.2,
  lengthDecay = 0.72,
  baseRadius = 0.15,
  radiusDecay = 0.75,
  branchAngle = 28,
  randomness = 0.25,
  curvature = 6,
  windStrength = 0.12,
  growth = 1,
}) {
  const branchesRef = useRef()
  const leavesRef = useRef()

  const branchesColor = new Color('#6a4a3c')
  const leavesColor = new Color('#5dbb63')

  // Geometry parameters reused across instances
  const branchGeomArgs = useMemo(() => [1, 1, 1, 8, 1, true], [])
  const leafGeomArgs = useMemo(() => [0.2, 0], [])

  // Simple seeded RNG for deterministic shapes
  const rng = useMemo(() => {
    let s = Math.max(1, Math.floor(seed))
    return () => {
      // xmur3-ish
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5
      return (s >>> 0) / 4294967295
    }
  }, [seed])

  const degToRad = (deg) => (deg * Math.PI) / 180

  // Precompute branch and leaf descriptors
  const { branches, leaves } = useMemo(() => {
    const up = new Vector3(0, 1, 0)

    const branchDescriptors = []
    const leafDescriptors = []

    const createBranching = (basePosition, baseDirection, depth, currentLength, currentRadius) => {
      const clampedLength = Math.max(0.2, currentLength)
      const clampedRadius = Math.max(0.02, currentRadius)

      // Slight curvature per segment (bend towards +X/+Z softly)
      const curvatureAxis = new Vector3(1, 0, 0).add(new Vector3(0, 0, 1)).normalize()
      const bendQuat = new Quaternion().setFromAxisAngle(curvatureAxis, degToRad(curvature))
      const curvedDirection = baseDirection.clone().applyQuaternion(bendQuat).normalize()

      // Descriptor for this segment
      branchDescriptors.push({
        position: basePosition.clone(),
        direction: curvedDirection.clone(),
        length: clampedLength,
        radius: clampedRadius,
        depth,
      })

      const endPoint = basePosition.clone().add(curvedDirection.clone().multiplyScalar(clampedLength))

      if (depth >= maxDepth) {
        // Add a few leaves at the tips
        const leavesAtTip = 3 + Math.floor(rng() * 3)
        for (let i = 0; i < leavesAtTip; i++) {
          const jitter = new Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).multiplyScalar(0.15)
          const normal = curvedDirection.clone().normalize()
          leafDescriptors.push({ position: endPoint.clone().add(jitter), normal, depth })
        }
        return
      }

      // Child branches
      const childLength = clampedLength * lengthDecay
      const childRadius = clampedRadius * radiusDecay

      const baseQuat = new Quaternion().setFromUnitVectors(up, curvedDirection.clone().normalize())

      for (let i = 0; i < branchFactor; i++) {
        const yaw = degToRad((i - (branchFactor - 1) / 2) * branchAngle * (0.9 + rng() * 0.2))
        const pitch = degToRad(branchAngle * (0.8 + rng() * 0.4))
        const roll = degToRad((rng() - 0.5) * branchAngle * 0.3)

        const childQuat = baseQuat.clone()
        // Rotate around local axes
        childQuat.multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), yaw))
        childQuat.multiply(new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), pitch))
        childQuat.multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), roll))

        const childDir = up.clone().applyQuaternion(childQuat).normalize()

        // Randomness/jitter
        const jitterAngle = (rng() - 0.5) * randomness
        const jitterAxis = new Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize()
        const jitterQuat = new Quaternion().setFromAxisAngle(jitterAxis, jitterAngle)
        childDir.applyQuaternion(jitterQuat).normalize()

        createBranching(endPoint, childDir, depth + 1, childLength, childRadius)
      }
    }

    // Trunk from ground up with slight initial tilt
    const trunkTilt = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), degToRad(2))
    const trunkDir = new Vector3(0, 1, 0).applyQuaternion(trunkTilt).normalize()
    createBranching(new Vector3(0, 0, 0), trunkDir, 1, baseLength, baseRadius)

    return { branches: branchDescriptors, leaves: leafDescriptors }
  }, [seed, maxDepth, branchFactor, baseLength, lengthDecay, baseRadius, radiusDecay, branchAngle, randomness, curvature])

  // Animate wind sway and growth
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const up = new Vector3(0, 1, 0)

    const visibleBranches = Math.floor(branches.length * Math.max(0, Math.min(1, growth)))
    const visibleLeaves = Math.floor(leaves.length * Math.max(0, Math.min(1, (growth - 0.7) / 0.3)))

    if (branchesRef.current) {
      const mat = new Matrix4()
      const quat = new Quaternion()
      for (let i = 0; i < branches.length; i++) {
        const b = branches[i]
        const depthFactor = 1 - b.depth / (maxDepth + 1)
        const swayPhase = i * 0.23 + b.depth * 0.7
        const swayAmount = windStrength * (0.6 + depthFactor * 0.8)
        const swayAngle = Math.sin(t * 1.2 + swayPhase) * swayAmount

        const baseDir = b.direction
        const swayAxis = new Vector3().crossVectors(baseDir, up).normalize()
        const swayQuat = new Quaternion().setFromAxisAngle(swayAxis.lengthSq() > 0 ? swayAxis : new Vector3(1, 0, 0), swayAngle)

        const dir = baseDir.clone().applyQuaternion(swayQuat).normalize()

        const growFactor = i < visibleBranches ? 1 : 0.0001

        // Align unit cylinder (Y-up, height=1) to dir
        quat.setFromUnitVectors(up, dir)

        // Position so that base sits at b.position and height scales along dir
        const half = (b.length * growFactor) / 2
        const center = b.position.clone().add(dir.clone().multiplyScalar(half))

        // Compose: translation * rotation * scale
        mat.compose(center, quat, new Vector3(b.radius, b.length * growFactor, b.radius))
        branchesRef.current.setMatrixAt(i, mat)
      }
      branchesRef.current.count = branches.length
      branchesRef.current.instanceMatrix.needsUpdate = true
    }

    if (leavesRef.current) {
      const mat = new Matrix4()
      const quat = new Quaternion()
      for (let i = 0; i < leaves.length; i++) {
        const l = leaves[i]
        const appear = i < visibleLeaves ? 1 : 0.0001

        // Sway leaves a bit more for a lively look
        const swayPhase = i * 0.37 + l.depth * 1.1
        const swayAngle = Math.sin(t * 1.6 + swayPhase) * windStrength * 1.4
        const axis = new Vector3(0, 1, 0).applyAxisAngle(new Vector3(1, 0, 0), (i % 3) * 0.7)
        quat.setFromAxisAngle(axis, swayAngle)

        const pos = l.position
        const scale = 0.6 + (l.depth / (maxDepth + 1)) * 0.7
        mat.compose(pos, quat, new Vector3(scale * appear, scale * appear, scale * appear))
        leavesRef.current.setMatrixAt(i, mat)
      }
      leavesRef.current.count = leaves.length
      leavesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Branches */}
      {/* Use MeshStandardMaterial for soft shaded wood */}
      <instancedMesh ref={branchesRef} args={[null, null, branches.length]} castShadow receiveShadow frustumCulled={false}>
        <cylinderGeometry args={branchGeomArgs} />
        <meshStandardMaterial color={branchesColor} roughness={0.9} metalness={0.0} />
      </instancedMesh>

      {/* Leaves */}
      <instancedMesh ref={leavesRef} args={[null, null, leaves.length]} castShadow receiveShadow frustumCulled={false}>
        <icosahedronGeometry args={leafGeomArgs} />
        <meshStandardMaterial color={leavesColor} roughness={0.7} metalness={0.0} emissive={new Color('#1a3')} emissiveIntensity={0.05} />
      </instancedMesh>
    </group>
  )
}


