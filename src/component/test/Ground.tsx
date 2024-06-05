import { useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import wood from '../../assets/wood_texture.jpg';
import { useRef } from 'react';
import { MeshProps } from '@react-three/fiber';

const Ground = (props: MeshProps) => {
  const ref = useRef(null);
  const texture = useTexture<string>(wood);
  texture.wrapS = texture.wrapT = RepeatWrapping;

  return (
    <RigidBody
      {...props}
      type="fixed"
      colliders={false}
      ref={ref}
      name="ground"
    >
      <group>
        <mesh
          receiveShadow
          position={[12, 0, 12]}
          scale={0.5}
          rotation-x={-Math.PI / 2}
        >
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial map={texture} map-repeat={[24, 24]} />
        </mesh>
        <CuboidCollider args={[1000, 4, 1000]} position={[0, -4, 0]} />
      </group>
    </RigidBody>
  );
};

export default Ground;
