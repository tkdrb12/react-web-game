import { useContext } from 'react';
import { FruitStoreContext, FruitType } from '../../context/FruitStore';
import StrawBerry from './Strawberry';
import { MeshProps } from '@react-three/fiber';
import Banana from './Banana';
import Melon from './Melon';
import Apple from './Apple';
import Pineapple from './Pineapple';
import Watermelon from './Watermelon';
import Persimmon from './Persimmon';
import Pear from './Pear';

const FRUIT_MAP = {
  banana: Banana,
  strawberry: StrawBerry,
  melon: Melon,
  pear: Pear,
  persimmon: Persimmon,
  watermelon: Watermelon,
  apple: Apple,
  pineapple: Pineapple,
} as Record<FruitType, (props: MeshProps) => JSX.Element>;

const Fruits = () => {
  const fruitStore = useContext(FruitStoreContext);
  const fruitArray = Array.from(fruitStore.entries());

  return (
    <>
      {fruitArray.map(([key, value]) => {
        const FruitJSX = FRUIT_MAP[value.type];
        return FruitJSX({
          key,
          userData: { id: key, isFruit: true },
          ...value,
        });
      })}
    </>
  );
};

export default Fruits;
