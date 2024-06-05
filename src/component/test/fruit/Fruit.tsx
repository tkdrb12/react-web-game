import { useGLTF } from '@react-three/drei';
import {
  CollisionEnterPayload,
  CollisionPayload,
  RigidBody,
  useRapier,
} from '@react-three/rapier';
import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { Mesh, Vector, Vector3 } from 'three';
import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import { FruitStoreDisPatchContext, FruitType } from '../../context/FruitStore';
import { MODELS } from './models';
import { RigidBody as RigidType } from '@dimforge/rapier3d-compat';
import { useRigidBodyContext } from '@react-three/rapier/dist/declarations/src/components/RigidBody';

interface FruitProps {
  type: FruitType;
}

const Fruit = ({
  userData,
  type,
  position,
  ...props
}: MeshProps & FruitProps) => {
  const { nodes, materials } = useGLTF<string>(MODELS[type]);
  const ref = useRef(null!);
  const meshRef = useRef<Mesh>(null!);
  const { colliderFruit } = useContext(FruitStoreDisPatchContext);

  const { world } = useRapier();

  const onCollisionEnter = ({ other, target }: CollisionPayload) => {
    if (
      target.rigidBodyObject?.name === 'ground' ||
      other.rigidBodyObject?.name === 'ground'
    )
      return;

    target.rigidBody?.setLinvel(new Vector3(0.1, 0.1, 0.1), true);
    other.rigidBody?.setLinvel(new Vector3(0.1, 0.1, 0.1), true);

    setTimeout(() => {
      if (!target.rigidBodyObject || !other.rigidBodyObject) return;

      const pos = new Vector3();
      pos
        .add(target.rigidBodyObject.position)
        .add(other.rigidBodyObject.position)
        .multiplyScalar(0.5);

      colliderFruit(
        target.rigidBodyObject.userData.id,
        other.rigidBodyObject.userData.id,
        pos
      );
    }, 50);
  };

  useEffect(() => {
    (ref as unknown as MutableRefObject<RigidType>).current.setLinvel(
      new Vector3(0, 1, 0),
      true
    );
  }, [ref, meshRef]);

  return (
    <RigidBody
      name={type}
      userData={userData}
      type="dynamic"
      colliders="hull"
      onCollisionEnter={onCollisionEnter}
      ref={ref}
      position={position}
    >
      <mesh
        ref={meshRef}
        geometry={(nodes.Mesh1 as Mesh).geometry}
        material={materials.defaultMat}
        {...props}
      />
    </RigidBody>
  );
};

export default Fruit;
