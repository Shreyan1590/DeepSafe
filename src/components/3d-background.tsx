
'use client';

import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

function Stars(props: any) {
  const ref = useRef<any>()
  
  const [sphere] = useState(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3;
      const r = Math.random() * 2 + 0.5;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      positions[i3] = r * Math.cos(theta) * Math.sin(phi);
      positions[i3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });


  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10
        ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}


export default function Background3D() {
    return (
        <div className="w-full h-full fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1]}}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
            </Canvas>
        </div>
    )
}
