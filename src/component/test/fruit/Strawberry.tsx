import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const StrawBerry = (props: MeshProps) => (
  <Fruit {...props} scale={0.4} type="strawberry" />
);

export default StrawBerry;
