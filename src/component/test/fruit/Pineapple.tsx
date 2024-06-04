import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Pineapple = (props: MeshProps) => (
  <Fruit {...props} scale={1} type="pineapple" />
);

export default Pineapple;
