import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Pear = (props: MeshProps) => <Fruit {...props} scale={1} type="pear" />;

export default Pear;
