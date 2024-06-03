import banana from '../../../assets/banana.glb';
import strawberry from '../../../assets/strawberry.glb';
import melon from '../../../assets/melon.glb';
import persimmon from '../../../assets/persimmon.glb';
import apple from '../../../assets/apple.glb';
import pineapple from '../../../assets/pineapple.glb';
import watermelon from '../../../assets/watermelon.glb';
import pear from '../../../assets/pear.glb';
import { FruitType } from '../../context/FruitStore';

export const MODELS: Record<FruitType, any> = {
  banana,
  strawberry,
  pear,
  persimmon,
  apple,
  pineapple,
  watermelon,
} as const;
