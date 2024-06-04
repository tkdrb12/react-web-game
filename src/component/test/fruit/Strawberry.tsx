import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const StrawBerry = (props: MeshProps) => (
  <Fruit {...props} scale={1} type="strawberry" />
);

export default StrawBerry;
