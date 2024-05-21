import {
  CameraControls,
  KeyboardControls,
  OrbitControls,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import styled from 'styled-components';
import Ground from './component/test/Ground';
import { Physics } from '@react-three/rapier';
import Monster from './component/test/Player';
import Strawberry from './component/test/StrawBerry';
import Banana from './component/test/Banana';

function App() {
  return (
    <div className="App">
      <div id="canvas-container">
        <CanvasBox>
          <Canvas>
            <CameraControls />
            <KeyboardControls
              map={[
                { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
                { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
                { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
                { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
                { name: 'jump', keys: ['Space'] },
              ]}
            >
              <color args={[255 / 255, 117 / 255, 0]} attach={'background'} />
              <OrbitControls />
              <ambientLight intensity={Math.PI / 2} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
              />
              <pointLight
                position={[-10, 100, -10]}
                decay={0}
                intensity={Math.PI}
              />

              <Suspense fallback={null}>
                <Physics>
                  <Strawberry />
                  <Banana position={[0, 10, 0]} />

                  <Ground />
                </Physics>
              </Suspense>
            </KeyboardControls>
          </Canvas>
        </CanvasBox>
      </div>
    </div>
  );
}

export default App;

const CanvasBox = styled.div`
  width: 100vw;
  height: 100vw;
`;
