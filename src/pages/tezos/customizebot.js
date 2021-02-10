import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
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
import { MichelsonMap } from '@taquito/taquito';
import { proxy, useProxy } from 'valtio';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import GLTFExporter from 'three-gltf-exporter';
import { connectToBeacon, Tezos } from 'src/utils/wallet';
import { BeaconContext } from 'src/context/beacon-context';
import { CONTRACT_ADDRESS } from 'src/defaults';
// TODO: Make every mesh part colorable -- dependent on how the material is named inside blender
const state = proxy({
  current: null,
  items: {
    head: '#ffffff',
    body: '#ffffff',
    arm: '#ffffff',
    leg: '#ffffff',
  },
});

function useGroup(scene, type) {
  const result = [];

  const filterType = [type];
  const regexType = new RegExp(filterType.join('|'), 'i');

  // console.log('scene child',scene.children);
  scene.children.forEach(group => {
    if (regexType.test(group.name)) {
      result.push(group);
    }
  });

  console.log('result', result);
  return result;
}

const renderGroup = (groupObject, id = 0, color, color_name) => {
  // console.log('group object', groupObject);
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
                rotation={child.rotation}
                scale={child.scale}
                material-color={color}
              />
            );
          })}
      </group>
    </>
  );
};

const Bot = ({
  headCount,
  armCount,
  bodyCount,
  legCount,
  head,
  body,
  arm,
  leg,
}) => {
  const group = useRef();

  const snap = useProxy(state);
  const [hovered, set] = useState(null);

  const link = useRef();

  return (
    <group ref={group} dispose={null}>
      {renderGroup(head, headCount, snap.items.head, 'head')}
      {renderGroup(arm, armCount, snap.items.arm, 'arm')}
      {renderGroup(body, bodyCount, snap.items.body, 'body')}
      {renderGroup(leg, legCount, snap.items.leg, 'leg')}
    </group>
  );
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Customizer = () => {
  const [selectPart, setselectPart] = useState(1);
  const [headCount, setHeadCount] = useState(0);
  const [armCount, setArmCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);
  const [legCount, setLegCount] = useState(0);
  const beacon = useContext(BeaconContext);

  const { scene } = useGLTF('/c5bots.glb');
  const head = useGroup(scene, 'head');
  const arm = useGroup(scene, 'arm');
  const body = useGroup(scene, 'body');
  const leg = useGroup(scene, 'leg');

  async function mintNFT(ipfsHash) {
    console.log(ipfsHash);
    const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);
    const RnId = (deepness = 10) =>
      parseInt(Date.now() + Math.random() * deepness);
    const randomId = RnId();
    const metadata = MichelsonMap.fromLiteral({
      uri: ipfsHash,
      symbol: 'CB',
    });
    const u = await beacon.client.getActiveAccount({
      network: {
        type: 'https://api.tez.ie/rpc/delphinet',
      },
    });
    const address = u.address;

    const op = await contract.methods
      .mint(
        address,
        Number(1),
        metadata,
        randomId, // DONE: Make the token id increment dynamic
      )
      .send();

    console.log(`Awaiting for hash to be confirmed...`, op);

    const result = await op.confirmation(1);

    console.log('result', result);
    return;
  }

  const snap = useProxy(state);

  const colors = [
    {
      backgroundColor: '#66533C',
    },
    {
      backgroundColor: '#173A2F',
    },
    {
      backgroundColor: '#153944',
    },
    {
      backgroundColor: '#27548D',
    },
    {
      backgroundColor: '#438AAC',
    },
  ];

  return (
    <div className="h-screen bg-primary-900">
      <NavBar />
      <div id="main" className="relative h-full">
        <div id="customizer-canvas" className="absolute w-full h-full">
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
              <Bot
                headCount={headCount}
                armCount={armCount}
                bodyCount={bodyCount}
                legCount={legCount}
                head={head}
                arm={arm}
                body={body}
                leg={leg}
              />
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
          className="relative h-full min-h-screen grid grid-cols-8 gap-4 w-full"
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
                  Arms
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
                  Body
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
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setHeadCount(0)}
                  >
                    Head 1
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setHeadCount(1)}
                  >
                    Head 2
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setHeadCount(2)}
                  >
                    Head 3
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setHeadCount(3)}
                  >
                    Head 4
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setHeadCount(4)}
                  >
                    Head 5
                  </button>
                </div>
                <div
                  className={selectPart === 2 ? 'block' : 'hidden'}
                  id="part2"
                >
                  {' '}
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setArmCount(0)}
                  >
                    Arms 1
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setArmCount(1)}
                  >
                    Arms 2
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setArmCount(2)}
                  >
                    Arms 3
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setArmCount(3)}
                  >
                    Arms 4
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setArmCount(4)}
                  >
                    Arms 5
                  </button>
                </div>
                <div
                  className={selectPart === 3 ? 'block' : 'hidden'}
                  id="part3"
                >
                  {' '}
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setBodyCount(0)}
                  >
                    Body 1
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setBodyCount(1)}
                  >
                    Body 2
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setBodyCount(2)}
                  >
                    Body 3
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setBodyCount(3)}
                  >
                    Body 4
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setBodyCount(4)}
                  >
                    Body 5
                  </button>
                </div>
                <div
                  className={selectPart === 4 ? 'block' : 'hidden'}
                  id="part4"
                >
                  {' '}
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setLegCount(0)}
                  >
                    Legs 1
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setLegCount(1)}
                  >
                    Legs 2
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setLegCount(2)}
                  >
                    Legs 3
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setLegCount(3)}
                  >
                    Legs 4
                  </button>
                  <button
                    className="px-4 py-6 bg-base-700  text-white focus:outline-none"
                    onClick={() => setLegCount(4)}
                  >
                    Legs 5
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="right-menu"
            className="col-span-2 col-start-7 bg-base-900 px-4 "
          >
            <div className="grid grid-cols-2 gap-4  mx-auto justify-center text-white  py-4">
              <Button
                size="sm"
                type="secondary"
                onClick={() => {
                  setHeadCount(getRandomNumber(0, 4));
                  setBodyCount(getRandomNumber(0, 4));
                  setArmCount(getRandomNumber(0, 4));
                  setLegCount(getRandomNumber(0, 4));
                }}
              >
                Randomize
              </Button>
              <Button
                size="sm"
                type="primary"
                onClick={() => {
                  const gltfExporter = new GLTFExporter();

                  gltfExporter.parse(
                    [
                      head[headCount],
                      body[bodyCount],
                      arm[armCount],
                      leg[legCount],
                    ],
                    function(result) {
                      console.log('resulting...', result);
                      const blob = new Blob([result], {
                        type: 'application/octet-stream',
                      });

                      upload(blob);
                    },
                    { binary: true },
                  );

                  function upload(blob) {
                    var fd = new FormData();
                    // fd.append('bot', blob, 'bot.glb');
                    fd.append('file', blob);
                    fetch(
                      'https://cryptoverse-wars-backend-nfjp.onrender.com/api/upload-3d-model-to-ipfs',
                      {
                        method: 'post',
                        body: fd,
                      },
                    )
                      .then(res => {
                        // console.log(res)
                        return res.json();
                      })
                      .then(async res => {
                        await connectToBeacon(beacon);

                        mintNFT(res.body.ipfsHash);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                }}
              >
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
              <div className="flex flex-col  text-white ">
                <label className="font-regular text-lg ">Metallic</label>
                <input
                  type="range"
                  id="metallic"
                  name="metallic"
                  min="0"
                  max="10"
                />
              </div>
              <div className="flex flex-col  text-white ">
                <label className="font-regular text-lg ">Roughness</label>
                <input
                  type="range"
                  id="roughness"
                  name="roughness"
                  min="0"
                  max="10"
                />
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
                  Colors : <span>{snap.current}</span>
                </h5>
                <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                  {colors.map(color => (
                    <div
                      className="w-16 h-16 rounded"
                      style={{ backgroundColor: color.backgroundColor }}
                      key={color.backgroundColor}
                    ></div>
                  ))}
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
