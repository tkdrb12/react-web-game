import { useGLTF } from '@react-three/drei';
import banana from '../../assets/banana.glb';
import { CollisionEnterPayload, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Mesh } from 'three';

const Banana = (props: JSX.IntrinsicElements['mesh']) => {
  const { nodes, materials } = useGLTF<string>(banana);

  const ref = useRef<Mesh>(null!);

  const onCollisionEnter = (payload: CollisionEnterPayload) => {
    const { other } = payload;

    console.log(other.colliderObject?.name);
  };

  return (
    <RigidBody name="banana" type="dynamic" onCollisionEnter={onCollisionEnter}>
      <mesh
        ref={ref}
        geometry={(nodes.Mesh1 as Mesh).geometry}
        material={materials.defaultMat}
        {...props}
      />
    </RigidBody>
  );
};

export default Banana;
