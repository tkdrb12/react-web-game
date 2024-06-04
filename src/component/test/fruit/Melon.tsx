import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Melon = (props: MeshProps) => (
  <Fruit {...props} scale={1} type="watermelon" />
);

export default Melon;
