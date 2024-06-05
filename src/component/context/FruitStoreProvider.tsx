import { useState, useMemo, PropsWithChildren } from 'react';
import {
  FRUIT,
  Fruit,
  FruitStore,
  FruitStoreContext,
  FruitStoreDisPatchContext,
  FruitType,
} from './FruitStore';
import { Vector3 } from '@react-three/fiber';

const FruitProvider = ({ children }: PropsWithChildren) => {
  const map = new Map<string, Fruit>();

  const [store, setStore] = useState<FruitStore>(map);

  const makeKey = () => {
    return String(Math.random());
  };

  const isSameFruit = (targetKey: string, otherKey: string) => {
    const targetType = store.get(targetKey)?.type;
    const otherType = store.get(otherKey)?.type;

    if (!targetType || !otherType) return false;

    return targetType === otherType;
  };

  const colliderFruit = (
    targetKey: string,
    otherKey: string,
    position: Vector3
  ) => {
    const fruitType = store.get(targetKey)?.type;

    if (fruitType && isSameFruit(targetKey, otherKey)) {
      if (targetKey >= otherKey) return; // if two object collision, add one object

      const fruitKeys = Object.keys(FRUIT) as FruitType[];
      const newFruitIdx = fruitKeys.indexOf(fruitType) + 1;

      if (newFruitIdx + 1 > fruitKeys.length) return;

      const newFruitValue = { type: fruitKeys[newFruitIdx], position };
      console.log(newFruitValue);

      remove(targetKey);
      remove(otherKey);

      add(makeKey(), newFruitValue);
    }
  };

  const generate = (position: Vector3, type?: FruitType) => {
    const key = makeKey();
    add(key, { type: type ?? 'strawberry', position });
    return key;
  };

  const add = (key: string, value: Fruit) => {
    setStore((prev) => {
      const newStore = new Map(prev);
      newStore.set(key, value);
      return newStore;
    });
  };

  const remove = (key: string) => {
    setStore((prev) => {
      const newStore = new Map(prev);
      newStore.delete(key);
      return newStore;
    });
  };

  const storeDispatch = useMemo(
    () => ({ add, remove, colliderFruit, generate }),
    [store]
  );

  return (
    <FruitStoreContext.Provider value={store}>
      <FruitStoreDisPatchContext.Provider value={storeDispatch}>
        {children}
      </FruitStoreDisPatchContext.Provider>
    </FruitStoreContext.Provider>
  );
};

export default FruitProvider;
