import React, { Suspense, useRef, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Button from '../../components/Buttons';
import { navigate } from 'gatsby';
import { Canvas, useFrame } from 'react-three-fiber';
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
  Html,
} from '@react-three/drei';
import Loader from 'react-loader-spinner';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import 'src/utils/react-colorful.css';
import namedColors from 'color-name-list';

import isUserAtom from 'src/atoms/is-user-atom';
import { useAtom } from 'jotai';

import GLTFExporter from 'three-gltf-exporter';

const state = {
  current: null,
  items: {
    head: null,
    body: null,
    arm: null,
    leg: null,
  },
};

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

  // console.log('result', result);
  return result;
}

const renderGroup = (groupObject, id = 0, colors, getMeshName, shininess) => {
  // console.log('group object', colors, getMeshName);
  return (
    <>
      <group
        name={groupObject.name}
        position={groupObject.length > 0 && groupObject[id].position}
        rotation={groupObject.length > 0 && groupObject[id].rotation}
        scale={groupObject.length > 0 && groupObject[id].scale}
      >
        {groupObject.length > 0 &&
          groupObject[id].children.map(child => {
            return (
              <mesh
                key={child.uuid}
                name={child.name}
                material={child.material}
                geometry={child.geometry}
                position={child.position}
                rotation={child.rotation}
                scale={child.scale}
                material-color={
                  colors.items[getMeshName(child.name)] || '#ffffff'
                }
                material-shininess={shininess}
              ></mesh>
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
  colors,
  getMeshName,
  setBotColors,
  shininess,
}) => {
  const group = useRef();
  const { scene } = useGLTF('/compressed.glb');
  const [hovered, set] = useState(null);

  const link = useRef();

  const head = useGroup(scene, 'head');
  const arm = useGroup(scene, 'arm');
  const body = useGroup(scene, 'body');
  const leg = useGroup(scene, 'leg');

  // set export objects
  state.items.head = head[headCount];
  state.items.arm = arm[armCount];
  state.items.body = body[bodyCount];
  state.items.leg = leg[legCount];

  return (
    <group
      onPointerOver={e => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={e => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={e => {
        e.stopPropagation();
        console.log(e.object.name);
        setBotColors(current => {
          const copy = { ...current };
          copy.current = getMeshName(e.object.name);
          return copy;
        });
      }}
      ref={group}
      dispose={null}
    >
      {renderGroup(head, headCount, colors, getMeshName, shininess)}
      {renderGroup(arm, armCount, colors, getMeshName, shininess)}
      {renderGroup(body, bodyCount, colors, getMeshName, shininess)}
      {renderGroup(leg, legCount, colors, getMeshName, shininess)}
    </group>
  );
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function BaseModal({ children, img_src }) {
  return (
    <div
      className={`bg-base-700 px-12 py-16 rounded-lg relative flex flex-col items-center shadow-lg text-center`}
      style={{ maxWidth: '40vw' }}
    >
      {img_src && <img className={`m-0 w-auto`} src={img_src}></img>}
      {children}
    </div>
  );
}

function ModalHeading({ children }) {
  return <h4 className={`text-2xl font-extrabold mb-2`}>{children}</h4>;
}

function ModalTextSection({ children }) {
  return <div className={`mt-6`}>{children}</div>;
}

const SavingBotModal = () => {
  return (
    <BaseModal>
      <ModalTextSection>
        <ModalHeading>Saving your 3D Cryptobot on IPFS</ModalHeading>
        <div className="flex justify-center w-full">
          <Loader type="BallTriangle" color="#2563EB" height={80} width={80} />
        </div>
      </ModalTextSection>
    </BaseModal>
  );
};

const Customizer = () => {
  const [selectPart, setselectPart] = useState(1);
  const [headCount, setHeadCount] = useState(0);
  const [armCount, setArmCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);
  const [legCount, setLegCount] = useState(0);

  const [showSavingBotModel, setShowSavingBotModel] = useState(false);
  const [shininess, setShininess] = useState(0);
  const [showColorPicker, updateShowColorPicker] = useState(false);
  const [colorPicker, setColorPicker] = useState('#ffffff');
  const [botColors, setBotColors] = useState({
    current: null,
    items: {
      face: '#ffffff',
      eye: '#ffffff',
      neck: '#ffffff',
      bodybase: '#ffffff',
      gem: '#ffffff',
      armsR: '#ffffff',
      handsR: '#ffffff',
      armsL: '#ffffff',
      handsL: '#ffffff',
      torso: '#ffffff',
      legsL: '#ffffff',
      footL: '#ffffff',
      legsR: '#ffffff',
      footR: '#ffffff',
      waist: '#ffffff',
      jointR: '#ffffff',
      jointL: '#ffffff',
      shoulderR: '#ffffff',
      shoudlerR: '#ffffff',
      shoudlerL: '#ffffff',
      shoulderL: '#ffffff',
      upper_armsL: '#ffffff',
      elbowR: '#ffffff',
      elbowL: '#ffffff',
      lowerArmR: '#ffffff',
      HandL: '#ffffff',
      HandsL: '#ffffff',
      HandR: '#ffffff',
      HandsR: '#ffffff',
      weaponR: '#ffffff',
      weaponL: '#ffffff',
      gem_holder: '#ffffff',
      ears: '#ffffff',
      thumbL: '#ffffff',
      thumbR: '#ffffff',
      foot_jointsL: '#ffffff',
      foot_jointsR: '#ffffff',
      thighsR: '#ffffff',
      thighsL: '#ffffff',
      upper_armsR: '#ffffff',
      torso: '#ffffff',
      base_jointsL: '#ffffff',
      base_jointsR: '#ffffff',
      Body_base: '#ffffff',
      LowerLegR: '#ffffff',
      LowerLegL: '#ffffff',
      leg_jointsR: '#ffffff',
      leg_jointsL: '#ffffff',
    },
  });

  const [isUser] = useAtom(isUserAtom);

  useEffect(() => {
    // console.log(user, isUser);
    if (!isUser) {
      const url =
        typeof window !== 'undefined' ? window.location.pathname : '/tezos';
      navigate('/auth', { state: { pathname: url } });
    }
  }, []);

  const getMeshName = name => {
    const filterType = Object.keys(botColors.items);

    const value = filterType.find(elm => {
      const regexType = new RegExp(elm, 'i');
      if (regexType.test(name)) {
        return true;
      }
    });

    return value;
  };

  const colors = [
    {
      backgroundColor: '#FFBF41',
    },
    {
      backgroundColor: '#FF6161',
    },
    {
      backgroundColor: '#4AA4FF',
    },
    {
      backgroundColor: '#43E871',
    },
    {
      backgroundColor: '#E7E7E7',
    },
    {
      backgroundColor: '#9148E7',
    },
    {
      backgroundColor: '#E76F16',
    },
    {
      backgroundColor: '#00D8E7',
    },
    {
      backgroundColor: '#1D1D1D',
    },
    {
      backgroundColor: '#643C28',
    },
    {
      backgroundColor: '#FFB6EB',
    },
    {
      backgroundColor: '#0C2661',
    },
  ];

  function Picker() {
    return (
      <div style={{ display: true ? 'block' : 'none' }}>
        <HexColorPicker
          className="picker"
          color={colorPicker}
          onChange={color => {
            setColorPicker(color);
            setBotColors(current => {
              const copy = { ...current };
              copy.items[copy.current] = color;
              return copy;
            });
          }}
        />
      </div>
    );
  }

  const upload3dModel = (head, arm, body, leg) => {
    const gltfExporter = new GLTFExporter();

    gltfExporter.parse(
      [head, arm, body, leg],
      function(result) {
        // console.log('result', result);
        const blob = new Blob([result], {
          type: 'application/octet-stream',
        });

        upload(blob);
      },
      { binary: true },
    );

    function upload(blob) {
      setShowSavingBotModel(true);
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
        .then(res => {
          console.log(res.body.ipfsHash);
          console.log('yo', res);
          navigate('/tezos/claim-transaction', {
            state: { uri: res.body.ipfsHash },
          });
        })
        .catch(err => {
          console.log(err);
          setShowSavingBotModel(false);
        });
    }
  };

  const isBrowser = typeof window !== 'undefined';

  return (
    <div
      style={{ background: 'rgba(55, 65, 81)' }}
      className="h-screen bg-grey-900"
    >
      {showSavingBotModel && (
        <div
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center`}
        >
          <SavingBotModal />
        </div>
      )}
      <div id="main" className="relative h-full">
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
            id="middle-menu"
            className="relative col-span-2 col-start-3 col-end-7 row-start-0 row-span-full"
          >
            {isBrowser && (
              <div id="customizer-canvas" className="w-full h-full">
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
                      colors={botColors}
                      getMeshName={getMeshName}
                      setBotColors={setBotColors}
                      shininess={shininess}
                      upload3dModel={upload3dModel}
                    />
                    <Environment files="royal_esplanade_1k.hdr" />
                  </Suspense>
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </div>
            )}
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

                  setBotColors(current => {
                    const copy = { ...current };
                    Object.keys(copy.items).forEach(elm => {
                      const item =
                        namedColors[
                          Math.floor(Math.random() * namedColors.length)
                        ];
                      console.log(elm, item);
                      copy.items[elm] = item.hex;
                    });
                    return copy;
                  });
                }}
              >
                Randomize
              </Button>

              <Button
                onClick={() => {
                  setHeadCount(headCount);
                  setBodyCount(bodyCount);
                  setArmCount(armCount);
                  setLegCount(legCount);

                  upload3dModel(
                    state.items.head,
                    state.items.arm,
                    state.items.body,
                    state.items.leg,
                  );
                }}
                size="sm"
                type="primary"
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
              {/* <div className="flex flex-col  text-white ">
                <label className="font-regular text-lg ">Metallic</label>
                <input
                  type="range"
                  id="metallic"
                  name="metallic"
                  min="0"
                  max="10"
                />
              </div> */}
              <div className="flex flex-col  text-white ">
                <label className="font-regular text-lg ">Shininess</label>
                <input
                  type="range"
                  id="roughness"
                  name="roughness"
                  value={shininess}
                  onChange={e => {
                    console.log(e.target.value);
                    setShininess(e.target.value);
                  }}
                  min="0"
                  max="100"
                />
              </div>
              <div id="colors" className="space-y-4">
                <h5 className="text-lg text-white font-bold">
                  Body Part : <span>{botColors.current}</span>
                </h5>
                {showColorPicker ? (
                  <Picker />
                ) : (
                  <div className="grid grid-cols-4 gap-x-2 gap-y-4 cursor-pointer	">
                    {colors.map((color, index) => (
                      <div
                        onClick={() => {
                          setBotColors(current => {
                            const copy = { ...current };
                            copy.items[copy.current] = color.backgroundColor;
                            return copy;
                          });
                        }}
                        key={index}
                        className="w-16 h-16 rounded"
                        style={{ backgroundColor: color.backgroundColor }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              <Button
                size="sm"
                type="secondary"
                style={{ width: '100%' }}
                onClick={() => {
                  showColorPicker
                    ? updateShowColorPicker(false)
                    : updateShowColorPicker(true);
                }}
              >
                {showColorPicker ? `Close` : `+ Custom color`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
