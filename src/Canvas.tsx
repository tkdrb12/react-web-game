import React, { useEffect } from 'react';
import Matter from 'matter-js';
import { useRef } from 'react';

const Canvas = () => {
  const Bodies = Matter.Bodies;
  const Body = Matter.Body;

  const element = Bodies.rectangle(0, 0, 100, 100, {
    chamfer: {
      radius: [10, 10], // border-radius 설정이 가능합니다.
    },
    render: {
      fillStyle: '#fff',
      sprite: {
        texture:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmfO1TWIsTTEgVDdAgeKxXSoOiyUR0F2_2fw&usqp=CAU', // 이미지를 입힐 수 있습니다.
        xScale: 0.75,
        yScale: 0.75,
      },
    },
    restitution: 0.6, // 충격을 받으면 튀어오르는 정도를 조절합니다.
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const engine = Engine.create();
    engine.gravity.y = 1.5; // 중력의 세기를 설정합니다.

    const render = Render.create({
      element: containerRef.current as HTMLElement | undefined,
      engine: engine,
      canvas: canvasRef.current as HTMLCanvasElement | undefined,
      bounds: {
        min: { x: 0, y: 0 },
        max: { x: 1000, y: 1000 },
      },
      options: {
        showSeparations: true,
        width: 1000,
        height: 500,
        background: '',
        wireframes: false,
      },
    });

    // 마우스를 이용해 조작을 가능하게 해줍니다.
    const mouse = Matter.Mouse.create(render.canvas),
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

    // 그릴 요소들을 world에 모읍니다.
    World.add(engine.world, [element, mouseConstraint]);

    Matter.Runner.run(engine); // 엔진을 구동합니다.
    Render.run(render); // 렌더를 진행합니다.
    Body.rotate(element, Math.PI / 6);

    return () => {
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <section ref={containerRef}>
      <canvas ref={canvasRef} id="viewport" width="500" height="500" />
    </section>
  );
};

export default Canvas;
