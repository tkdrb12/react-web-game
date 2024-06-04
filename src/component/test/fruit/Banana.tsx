import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Banana = (props: MeshProps) => (
  <Fruit {...props} scale={1} type="banana" />
);

export default Banana;
