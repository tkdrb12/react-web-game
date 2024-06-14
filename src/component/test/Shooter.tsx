import { Box } from '@react-three/drei';
import { MeshProps, useFrame } from '@react-three/fiber';
import {
  CollisionPayload,
  MeshCollider,
  RigidBody,
  useRapier,
} from '@react-three/rapier';
import { Mesh, Vector3 } from 'three';
import { FruitStoreDisPatchContext } from '../context/FruitStore';
import { useContext, useEffect, useRef, useState } from 'react';
import { RigidBody as RigidType } from '@dimforge/rapier3d-compat';

const shootDirection = new Vector3(0, 7, -4);

const Shooter = (props: MeshProps) => {
  const [bullet, setBullet] = useState<RigidType | null>(null);
  const ref = useRef<Mesh>(null!);
  const { generate } = useContext(FruitStoreDisPatchContext);

  const { world } = useRapier();

  useFrame(() => {
    world.step();
  });

  const load = (delayTime: number, callback?: () => void) => {
    setTimeout(() => {
      if (callback) callback();
      generate(ref.current.position);
    }, delayTime);
  };

  const shot = () => {
    if (!bullet) return;

    bullet?.setLinvel(shootDirection, true);

    setBullet(null);
    load(1000);
  };

  const onIntersectionEnter = ({ other }: CollisionPayload) => {
    const { rigidBodyObject, rigidBody } = other;

    if (bullet) return;

    if (rigidBody && rigidBodyObject && rigidBodyObject.userData.isFruit) {
      setBullet(rigidBody as unknown as RigidType);
    }
  };

  useEffect(() => {
    load(0);
  }, []);

  return (
    <RigidBody
      sensor={true}
      lockTranslations={true}
      name="shooter"
      onIntersectionEnter={onIntersectionEnter}
    >
      <MeshCollider type="cuboid">
        <Box position={[0, 1, 0]} scale={0.5} ref={ref} onClick={shot}>
          <meshStandardMaterial color={'red'}></meshStandardMaterial>
        </Box>
      </MeshCollider>
    </RigidBody>
  );
};

export default Shooter;
