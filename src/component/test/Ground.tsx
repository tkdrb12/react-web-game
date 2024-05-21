import { useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import grass from '../../assets/grass.jpg';
import { useRef } from 'react';

const Ground = (props: JSX.IntrinsicElements['mesh']) => {
  const ref = useRef(null);
  const texture = useTexture<string>(grass);
  texture.wrapS = texture.wrapT = RepeatWrapping;

  return (
    <RigidBody {...props} type="fixed" colliders={false} ref={ref}>
      <group>
        <mesh
          receiveShadow
          position={[0, 0, 0]}
          scale={0.5}
          rotation-x={-Math.PI / 2}
        >
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial
            map={texture}
            map-repeat={[240, 240]}
            color="red"
          />
        </mesh>
        <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
      </group>
    </RigidBody>
  );
};

export default Ground;
