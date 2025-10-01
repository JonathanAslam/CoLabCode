import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function BouncingCube({ position, size, color, speed }) {
  const meshRef = useRef();
  const velocity = useRef({ x: speed.x, y: speed.y });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const { viewport } = state;
    const rightBoundary = viewport.width / 2 - size[0] / 2;
    const topBoundary = viewport.height / 2 - size[1] / 2;

    meshRef.current.position.x += velocity.current.x * delta;
    meshRef.current.position.y += velocity.current.y * delta;
    
    meshRef.current.rotation.x += 0.1 * delta;
    meshRef.current.rotation.y += 0.1 * delta;

    if (meshRef.current.position.x >= rightBoundary || meshRef.current.position.x <= -rightBoundary) {
      velocity.current.x *= -1;
    }

    if (meshRef.current.position.y >= topBoundary || meshRef.current.position.y <= -topBoundary) {
      velocity.current.y *= -1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function BouncingCubeScene() {
  const cubeSize = [3, 3, 3];

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <BouncingCube 
        position={[-2, 2, 0]}
        size={cubeSize}
        color={"white"}
        speed={{ x: 0.3, y: 0.5 }}
      />

      <BouncingCube 
        position={[2, -2, 0]}
        size={cubeSize}
        color={"white"}
        speed={{ x: -0.5, y: -0.3 }}
      />
    </Canvas>
  );
}

