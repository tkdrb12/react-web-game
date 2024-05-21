import { Helper, useGLTF, useKeyboardControls } from '@react-three/drei';
import {
  CollisionEnterPayload,
  MeshCollider,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from '@react-three/rapier';
import { AxesHelper, BoxHelper, Mesh, Vector3 } from 'three';
import creeper from '../../assets/Creeper.glb';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Collider, Ray, World } from '@dimforge/rapier3d-compat';

const SPEED = 5;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

const Monster = (props: JSX.IntrinsicElements['mesh']) => {
  const ref = useRef<RapierRigidBody>(null);
  const { nodes, materials } = useGLTF<string>(creeper);

  const onCollisionEnter = (payload: CollisionEnterPayload) => {
    const { target } = payload;
  };

  return (
    <RigidBody
      type="dynamic"
      ref={ref}
      lockRotations={true}
      onCollisionEnter={onCollisionEnter}
    >
      <mesh
        scale={0.2}
        geometry={(nodes.Creeper as Mesh).geometry}
        material={materials.Material}
        position={[0, 2, 0]}
      ></mesh>
    </RigidBody>
  );
};

export default Monster;
