import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Persimmon = (props: MeshProps) => (
  <Fruit {...props} scale={1} type="persimmon" />
);

export default Persimmon;
