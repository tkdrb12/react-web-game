import { MeshProps } from '@react-three/fiber';
import Fruit from './Fruit';

const Apple = (props: MeshProps) => <Fruit {...props} scale={1} type="apple" />;

export default Apple;
