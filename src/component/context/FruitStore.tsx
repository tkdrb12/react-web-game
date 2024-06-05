import { MeshProps } from '@react-three/fiber';
import { createContext } from 'react';
import { Vector3 } from 'three';

export const FRUIT = {
  strawberry: 'strawberry',
  pear: 'pear',
  persimmon: 'persimmon',
  apple: 'apple',
  banana: 'banana',
  pineapple: 'pineapple',
  watermelon: 'watermelon',
};

export type FruitType = keyof typeof FRUIT;

export type Fruit = { type: FruitType } & MeshProps;

export type FruitStore = Map<string, Fruit>;

export type FruitStoreDispatch = {
  add: (key: string, value: Fruit) => void;
  remove: (key: string) => void;
  generate: (position: Vector3) => void;
  colliderFruit: (
    targetKey: string,
    otherKey: string,
    position: Vector3
  ) => void;
};

export const FruitStoreContext = createContext<FruitStore>({} as FruitStore);

export const FruitStoreDisPatchContext = createContext<FruitStoreDispatch>({
  add: (key: string, value: Fruit) => {},
  remove: (key: string) => {},
  generate: (position: Vector3) => {},
  colliderFruit: (targetKey: string, otherKey: string, position: Vector3) => {},
});
