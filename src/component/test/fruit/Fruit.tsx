import { useGLTF } from '@react-three/drei';
import { CollisionEnterPayload, RigidBody } from '@react-three/rapier';
import { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { MeshProps } from '@react-three/fiber';
import { FruitStoreDisPatchContext, FruitType } from '../../context/FruitStore';
import { MODELS } from './models';
import { RigidBody as RigidType } from '@dimforge/rapier3d-compat';

interface FruitProps {
  type: FruitType;
}

const Fruit = ({ userData, type, ...props }: MeshProps & FruitProps) => {
  const { nodes, materials } = useGLTF<string>(MODELS[type]);
  const ref = useRef(null!);
  const { colliderFruit } = useContext(FruitStoreDisPatchContext);

  const onCollisionEnter = (payload: CollisionEnterPayload) => {
    const { other, target } = payload;

    if (target.rigidBodyObject && other.rigidBodyObject) {
      console.log(
        target.rigidBodyObject.position,
        other.rigidBodyObject.position
      );

      colliderFruit(
        target.rigidBodyObject.userData.id,
        other.rigidBodyObject.userData.id,
        new Vector3(
          other.rigidBodyObject.position.x,
          other.rigidBodyObject.position.y,
          other.rigidBodyObject.position.z
        )
      );
    }
  };

  useEffect(() => {
    (ref as unknown as MutableRefObject<RigidType>).current.setLinvel(
      new Vector3(0, 2, 0),
      true
    );
  }, [ref]);

  return (
    <RigidBody
      name={type}
      userData={userData}
      type="dynamic"
      colliders="hull"
      onCollisionEnter={onCollisionEnter}
      ref={ref}
    >
      <mesh
        geometry={(nodes.Mesh1 as Mesh).geometry}
        material={materials.defaultMat}
        {...props}
      />
    </RigidBody>
  );
};

export default Fruit;
