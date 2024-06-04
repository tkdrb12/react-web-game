import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Watermelon = (props: MeshProps) => (
  <Fruit {...props} scale={1} type="watermelon" />
);

export default Watermelon;
