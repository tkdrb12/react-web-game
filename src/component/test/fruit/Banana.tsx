import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Banana = (props: MeshProps) => (
  <Fruit {...props} scale={1.4} type="banana" />
);

export default Banana;
