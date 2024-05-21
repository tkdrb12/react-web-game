import { useGLTF } from '@react-three/drei';
import strawberry from '../../assets/strawberry.glb';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

const Strawberry = (props: JSX.IntrinsicElements['mesh']) => {
  const { nodes, materials } = useGLTF<string>(strawberry);
  const ref = useRef<Mesh>(null!);

  return (
    <RigidBody name="strawberry" type="dynamic">
      <mesh
        ref={ref}
        geometry={(nodes.Mesh1 as Mesh).geometry}
        material={materials.defaultMat}
        {...props}
      />
    </RigidBody>
  );
};

export default Strawberry;
