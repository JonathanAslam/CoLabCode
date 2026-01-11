import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function BouncingCube({ position, size, color, speed }) {
  const meshRef = useRef();
  const velocity = useRef({ x: speed.x, y: speed.y });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const { viewport } = state;
    // viewport gives us the visible area in world units
    const halfWidth = size[0] / 2;
    const halfHeight = size[1] / 2;
    const rightBoundary = viewport.width / 2;
    const topBoundary = viewport.height / 2;

    // Move the cube
    meshRef.current.position.x += velocity.current.x * delta;
    meshRef.current.position.y += velocity.current.y * delta;

    meshRef.current.rotation.x += 0.1 * delta;
    meshRef.current.rotation.y += 0.1 * delta;

    // Compute min/max allowed positions (accounting for cube size)
    const maxX = rightBoundary - halfWidth;
    const minX = -rightBoundary + halfWidth;
    const maxY = topBoundary - halfHeight;
    const minY = -topBoundary + halfHeight;

    // If cube exceeded boundaries, clamp it and reverse velocity so it stays inside.
    if (meshRef.current.position.x > maxX) {
      meshRef.current.position.x = maxX;
      if (velocity.current.x > 0) velocity.current.x *= -1;
    } else if (meshRef.current.position.x < minX) {
      meshRef.current.position.x = minX;
      if (velocity.current.x < 0) velocity.current.x *= -1;
    }

    if (meshRef.current.position.y > maxY) {
      meshRef.current.position.y = maxY;
      if (velocity.current.y > 0) velocity.current.y *= -1;
    } else if (meshRef.current.position.y < minY) {
      meshRef.current.position.y = minY;
      if (velocity.current.y < 0) velocity.current.y *= -1;
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

