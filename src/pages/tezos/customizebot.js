import React, { Suspense, useRef, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Button from '../../components/Buttons';

import { Canvas, useFrame } from 'react-three-fiber';
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
  Html,
} from '@react-three/drei';

import { proxy, useProxy } from 'valtio';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import GLTFExporter from 'three-gltf-exporter';

// TODO: Make every mesh part colorable -- dependent on how the material is named inside blender
const state = proxy({
  current: null,
  items: {
    head: '#ffffff',
    body: '#ffffff',
    hands: '#ffffff',
    legs: '#ffffff',
  },
});

function useGroup(scene, type) {
  const result = [];

  const filterType = [type];
  const regexType = new RegExp(filterType.join('|'), 'i');

  scene.children.forEach(group => {
    if (regexType.test(group.name)) {
      result.push(group);
    }
  });

  // console.log('result', result);
  return result;
}

const renderGroup = (groupObject, id = 0, color, color_name) => {
  return (
    <>
      <group
        name="bot_head"
        position={groupObject.length > 0 && groupObject[id].position}
        rotation={groupObject.length > 0 && groupObject[id].rotation}
        scale={groupObject.length > 0 && groupObject[id].scale}
      >
        {groupObject.length > 0 &&
          groupObject[id].children.map(child => {
            child.material.name = color_name;
            return (
              <mesh
                name={child.name}
                material={child.material}
                geometry={child.geometry}
                position={child.position}
                scale={child.scale}
                material-color={color}
              />
            );
          })}
      </group>
    </>
  );
};

const Bot = ({ headCount, legCount, bodyCount }) => {
  const group = useRef();
  const { scene } = useGLTF('cryptobot.glb');
  const snap = useProxy(state);

  const link = useRef();

  const head = useGroup(scene, 'head');
  const hand = useGroup(scene, 'hand');
  const body = useGroup(scene, 'body');
  const leg = useGroup(scene, 'leg');
  return (
    <group
      onPointerOver={e => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={e => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={e => {
        e.stopPropagation();
        console.log(e.object);
        state.current = e.object.material.name;
      }}
      ref={group}
      dispose={null}
    >
      {renderGroup(head, headCount, snap.items.head, 'head')}
      {renderGroup(hand, bodyCount, snap.items.hands, 'hands')}
      {renderGroup(body, bodyCount, snap.items.body, 'body')}
      {renderGroup(leg, legCount, snap.items.legs, 'legs')}
    </group>
  );
};

const Customizer = () => {
  const [selectPart, setselectPart] = React.useState(1);
  return (
    <div className="h-screen bg-base-900 ">
      <NavBar />
      <div id="main" className="relative h-full">
        <div
          id="customizer-canvas"
          className="absolute border-base-50 border-2 w-full h-full"
        >
          {' '}
          <Canvas
            concurrent
            pixelRatio={[1, 1.5]}
            camera={{ position: [0, 0, 5.75], fov: 80 }}
          >
            <ambientLight intensity={0.5} />
            <spotLight
              intensity={0.3}
              angle={0.1}
              penumbra={1}
              position={[5, 25, 20]}
            />
            <Suspense fallback={null}>
              <Bot />
              <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -0.8, 0]}
                opacity={0.25}
                width={10}
                height={10}
                blur={2}
                far={1}
              />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        <div
          id="editor"
          className=" absolute h-full min-h-screen grid grid-cols-8 gap-4 w-full"
        >
          <div
            id="left-menu"
            className="col-start-1 col-span-2 px-4 pt-4 rounded"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col w-full list-none" role="tablist">
                <a
                  className={
                    'text-white px-4 py-6  ' +
                    (selectPart === 1
                      ? 'bg-base-600 border-2 border-base-400'
                      : 'bg-base-700')
                  }
                  onClick={e => {
                    e.preventDefault();
                    setselectPart(1);
                  }}
                  data-toggle="tab"
                  href="#part1"
                  role="tablist"
                >
                  Head
                </a>

                <a
                  className={
                    'text-white px-4 py-6  ' +
                    (selectPart === 2
                      ? 'bg-base-600 border-2 border-base-400'
                      : 'bg-base-700')
                  }
                  onClick={e => {
                    e.preventDefault();
                    setselectPart(2);
                  }}
                  data-toggle="tab"
                  href="#part2"
                  role="tablist"
                >
                  Body
                </a>
                <a
                  className={
                    'text-white px-4 py-6  ' +
                    (selectPart === 3
                      ? 'bg-base-600 border-2 border-base-400'
                      : 'bg-base-700')
                  }
                  onClick={e => {
                    e.preventDefault();
                    setselectPart(3);
                  }}
                  data-toggle="tab"
                  href="#part3"
                  role="tablist"
                >
                  Arms
                </a>
                <a
                  className={
                    'text-white px-4 py-6  ' +
                    (selectPart === 4
                      ? 'bg-base-600 border-2 border-base-400'
                      : 'bg-base-700')
                  }
                  onClick={e => {
                    e.preventDefault();
                    setselectPart(4);
                  }}
                  data-toggle="tab"
                  href="#part4"
                  role="tablist"
                >
                  Legs
                </a>
              </div>
              <div id="floating-menu" className="">
                <div
                  className={selectPart === 1 ? 'block' : 'hidden'}
                  id="part1"
                >
                  {' '}
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Head 1
                  </div>
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Head 2
                  </div>
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Head 3
                  </div>
                </div>
                <div
                  className={selectPart === 2 ? 'block' : 'hidden'}
                  id="part2"
                >
                  {' '}
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Body 1
                  </div>
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Body 2
                  </div>
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Body 3
                  </div>
                </div>
                <div
                  className={selectPart === 3 ? 'block' : 'hidden'}
                  id="part2"
                >
                  {' '}
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Arms 1
                  </div>
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Arms 2
                  </div>
                  <div className="px-4 py-6 bg-base-700  text-white">
                    Arms 3
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="right-menu"
            className="col-span-2 col-start-7 bg-base-900 px-4 "
          >
            <div className="grid grid-cols-2 gap-4  mx-auto justify-center text-white  py-4">
              <Button size="sm" type="secondary">
                Randomize
              </Button>

              <Button size="sm" type="primary">
                Claim Bot
              </Button>
            </div>
            <hr className="my-2 bg-base-400 border-2 h-0.5" />
            <div className="space-y-6">
              <div>
                {' '}
                <h4 className="text-xl text-white font-bold">
                  Colors & Textures
                </h4>
              </div>

              <div id="textures" className="space-y-4">
                <h5 className="text-lg text-white font-bold">Textures</h5>
                <div className=" grid grid-cols-4 gap-x-2 gap-y-4">
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                </div>
              </div>
              <div id="colors" className="space-y-4">
                <h5 className="text-lg text-white font-bold">
                  Colors : <span>(Head)</span>
                </h5>
                <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                  <div className="w-16 h-16 bg-primary-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
