import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useContext,
  createRef,
} from 'react';
import Loadable from 'react-loadable';
import NavBar from '../../components/NavBar';
import Button from '../../components/Buttons';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { navigate, Link } from 'gatsby';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import {
  Environment,
  useGLTF,
  OrbitControls,
  Html,
  Octahedron,
} from '@react-three/drei';
import Loader from 'react-loader-spinner';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import 'react-colorful/dist/index.css';
import 'src/utils/react-colorful.css';
import namedColors from 'color-name-list';

import isUserAtom from 'src/atoms/is-user-atom';
import userAtom from 'src/atoms/user-atom';
import { useAtom } from 'jotai';
import checkIfUserActive from 'src/utils/automaticLogin';
import cryptobots from 'src/images/crypto-modal.png';

import GLTFExporter from 'three-gltf-exporter';

import { NETWORK } from 'src/defaults';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Popper from 'popper.js';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { BeaconContext } from 'src/context/beacon-context';
import { createUser, batchUpdateProgress } from 'src/api';
import { trackEvent } from 'src/utils/analytics';
import { isMobile, isTablet } from 'react-device-detect';

import head1 from '../../assets/CryptobotImages/Head/01xhead.png';
import head2 from '../../assets/CryptobotImages/Head/02xhead.png';
import head3 from '../../assets/CryptobotImages/Head/03xhead.png';
import head4 from '../../assets/CryptobotImages/Head/04xhead.png';
import head5 from '../../assets/CryptobotImages/Head/05xhead.png';

import arms1 from '../../assets/CryptobotImages/Arm/01xarms.png';
import arms2 from '../../assets/CryptobotImages/Arm/02xarms.png';
import arms3 from '../../assets/CryptobotImages/Arm/03xarms.png';
import arms4 from '../../assets/CryptobotImages/Arm/04xarms.png';
import arms5 from '../../assets/CryptobotImages/Arm/05xarms.png';

import body1 from '../../assets/CryptobotImages/Body/01xbody.png';
import body2 from '../../assets/CryptobotImages/Body/02xbody.png';
import body3 from '../../assets/CryptobotImages/Body/03xbody.png';
import body4 from '../../assets/CryptobotImages/Body/04xbody.png';
import body5 from '../../assets/CryptobotImages/Body/05xbody.png';

import legs1 from '../../assets/CryptobotImages/Leg/01xlegs.png';
import legs2 from '../../assets/CryptobotImages/Leg/02xlegs.png';
import legs3 from '../../assets/CryptobotImages/Leg/03xlegs.png';
import legs4 from '../../assets/CryptobotImages/Leg/04xlegs.png';
import legs5 from '../../assets/CryptobotImages/Leg/05xlegs.png';

const state = {
  current: null,
  items: {
    head: null,
    body: null,
    arm: null,
    leg: null,
  },
};

const Loading = props => {
  const mesh = useRef();
  return (
    <group>
      <mesh {...props} ref={mesh} position={[0, 1.2, 0]}>
        <Octahedron args={[1, 1, 1]}>
          <meshBasicMaterial attach="material" color="#fff" wireframe />
        </Octahedron>
      </mesh>
      <Html center>
        <h1 className="text-white text-2xl font-bold mt-4">Loading...</h1>
      </Html>
    </group>
  );
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

const renderGroup = (groupObject, id = 0, colors, getMeshName) => {
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
}) => {
  const group = useRef();
  const { scene } = useGLTF('/compressedv11.glb');

  // console.log('scene', scene);

  const [hovered, set] = useState(null);

  useEffect(() => {
    const cursor = `<svg width="84" height="84" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="#fff"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#fff " style="white-space:pre" font-family="Inter var, sans-serif" font-size="12" letter-spacing="-.01em"><tspan x="4" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    document.getElementById(
      'middle-menu',
    ).style.cursor = `url('data:image/svg+xml;base64,${btoa(
      hovered ? cursor : auto,
    )}'), auto`;
  });

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

        setBotColors(current => {
          const copy = { ...current };
          copy.current = getMeshName(e.object.name);
          return copy;
        });
      }}
      ref={group}
      dispose={null}
      position={[0, 0.8, 0]}
      scale={[0.5, 0.5, 0.5]}
    >
      {renderGroup(head, headCount, colors, getMeshName)}
      {renderGroup(arm, armCount, colors, getMeshName)}
      {renderGroup(body, bodyCount, colors, getMeshName)}
      {renderGroup(leg, legCount, colors, getMeshName)}
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
    <div
      className={`bg-base-900 bg-opacity-80 absolute inset-0 flex items-center justify-center text-white`}
    >
      <div
        className={`absolute bg-base-700 flex items-center justify-center flex-col py-9 px-24 rounded-3xl`}
        style={{ maxWidth: `65vw` }}
      >
        <div className="flex justify-center w-full mb-5">
          <Loader type="BallTriangle" color="#2563EB" height={80} width={80} />
        </div>
        <ModalHeading>Saving your 3D Cryptobot</ModalHeading>
      </div>
    </div>
  );
};

const WelcomeModal = ({ close, isUser }) => {
  const [user, setUser] = useAtom(userAtom);
  const signedIn = isUser && user.verified;

  const beacon = useContext(BeaconContext);

  async function signInHandler() {
    const thanosIsAvailable = await ThanosWallet.isAvailable();

    typeof window !== 'undefined' &&
      localStorage.setItem('last-page', '/tezos/customizebot');

    if (typeof beacon === `undefined`) {
      return;
    }
    const url =
      typeof window !== 'undefined' ? window.location.pathname : '/tezos';

    let acc = await beacon.client.getActiveAccount({
      network: {
        type: NETWORK,
      },
    });

    if (acc && thanosIsAvailable) {
      let u = await createUser(acc.address);
      if (u.verified) {
        // console.log(`u is verified`);
        setUser(u);
        let progress =
          typeof window !== `undefined` && localStorage.getItem('progress');
        if (progress) {
          progress = JSON.parse(progress);
          const res = await batchUpdateProgress(u, progress);
          console.log(res);
        }
        return;
      } else navigate('/auth', { state: { pathname: url } });
      // console.log(acc);
    } else {
      navigate('/auth', { state: { pathname: url } });
    }
  }

  return (
    <div
      className={`bg-base-900 bg-opacity-80 absolute inset-0 flex items-center justify-center text-white`}
    >
      <div
        className={`absolute bg-base-700 flex items-center justify-center flex-col py-9 px-24 rounded-3xl z-50`}
        style={{ maxWidth: `65vw` }}
      >
        <h3 className={`text-4xl font-black`}>Congratulations</h3>
        <p className={`text-lg mt-4 text-center`}>
          You have earned a Unique Cryptobot You can customise it and share it
          with your friends.
          {signedIn ? (
            <p>Let’s do it 🚀</p>
          ) : (
            <p>Please Sign in to customise and claim your bot.</p>
          )}
        </p>
        <img src={cryptobots} className={`mt-6`} />
        <div className={`flex items-center flex-col`}>
          <button
            className={`bg-primary-700 font-bold text-2xl px-9 py-3 rounded focus:outline-none`}
            onClick={signedIn ? close : signInHandler}
          >
            {signedIn ? `Take me to my Cryptobot` : `Sign in`}
          </button>
          <Link
            to={'/tezos/academy'}
            className={`flex mt-6 justify-center text-lg font-bold items-center`}
          >
            <span>Go back to academy</span>
            <span>
              {' '}
              <ChevronRightIcon className={`ml-2`} />
            </span>
          </Link>
        </div>
      </div>
      ;
    </div>
  );
};

const Tooltip = () => {
  const [tooltipShow, setTooltipShow] = useState(false);
  const btnRef = createRef();
  const tooltipRef = createRef();
  const openLeftTooltip = () => {
    new Popper(btnRef.current, tooltipRef.current, {
      placement: 'top',
    });
    setTooltipShow(true);
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <button
            className={
              'text-white text-xs  outline-none focus:outline-none mr-1 mb-1'
            }
            type="button"
            style={{ transition: 'all .15s ease' }}
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            ref={btnRef}
          >
            <InfoOutlinedIcon fontSize="small" />
          </button>
          <div
            className={
              (tooltipShow ? '' : 'hidden ') +
              'bg-primary-600 border-0 mb-3 block z-50 leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
            ref={tooltipRef}
          >
            <div className="text-white p-3 font-mulish">
              Click multiple times on a color palette to create variations
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CustomAmbientLight = ({ setImage, grabImage }) => {
  const canvas = useThree().gl.domElement;

  useEffect(() => {
    if (grabImage) {
      setImage(canvas.toDataURL('image/png'));
    }
  }, [grabImage]);

  return <ambientLight intensity={0.5} />;
};

//INTRO TO CUSTOMIZER TOUR
const steps = [
  {
    selector: '.first-step',
    content: () => {
      return (
        <div className="space-y-1 mt-1">
          <h3 className="font-extrabold">Give your Cryptobot some muscles!</h3>
          <p>Choose different body parts for your cryptobot.</p>
        </div>
      );
    },
    style: {
      backgroundColor: '#061B2F',
      color: 'white',
    },
  },
  {
    selector: '.second-step',
    content: () => {
      return (
        <div className="space-y-1 mt-1">
          <h3 className="font-extrabold">
            Give your Cryptobot a Unique Style!
          </h3>
          <p>
            Select a body part to give it a color from the palette below or
            choose a custom color.
          </p>
        </div>
      );
    },
    style: {
      backgroundColor: '#061B2F',
      color: 'white',
    },
  },
  {
    selector: '.third-step',
    content: () => {
      return (
        <div className="space-y-1 mt-1">
          <h3 className="font-extrabold">Claim your Unique Cryptobot!</h3>
          <p>After you are done customizing claim your cryptobot🤖</p>
        </div>
      );
    },
    style: {
      backgroundColor: '#061B2F',
      color: 'white',
    },
  },
];

const Tour = Loadable({
  loader: () => import('reactour'),
  loading: () => null,
});

const Customizer = ({ location }) => {
  const [selectPart, setselectPart] = useState(1);
  const [headCount, setHeadCount] = useState(getRandomNumber(0, 4));
  const [armCount, setArmCount] = useState(getRandomNumber(0, 4));
  const [bodyCount, setBodyCount] = useState(getRandomNumber(0, 4));
  const [legCount, setLegCount] = useState(getRandomNumber(0, 4));

  const beacon = useContext(BeaconContext);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [claimButtonClicked, setClaimButtonClicked] = useState(false);
  const [image, setImage] = useState('');
  const [grabImage, setGrabImage] = useState(false);
  const [showSavingBotModel, setShowSavingBotModel] = useState(false);
  const [showColorPicker, updateShowColorPicker] = useState(false);
  const [showPaletteColorPicker, updateShowPaletteColorPicker] = useState(
    false,
  );
  const [colorPicker, setColorPicker] = useState('#ffffff');
  const [colorPalettePicker, setColorPalettePicker] = useState('#ffffff');
  const [colorPalette, setColorPalette] = useState([]);
  const [customColorPaletteList, updateCustomColorPaletteList] = useState([]);
  const [botColors, setBotColors] = useState({
    current: null,
    items: {
      Face: '#ffffff',
      Ears: '#ffffff',
      InnerEyes: '#ffffff',
      OuterEyes: '#ffffff',
      Joints: '#ffffff',
      BodyBase: '#ffffff',
      BodyDetails: '#ffffff',
      Gem: '#ffffff',
      ShellGem: '#ffffff',
      DetailsLeg: '#ffffff',
      ArmsDetails: '#ffffff',
      DetailsArmsInner: '#ffffff',
      Hands: '#ffffff',
      Mount: '#ffffff',
      Foot: '#ffffff',
      LowerLeg: '#ffffff',
      EyeScreen: '#ffffff',
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
      base_jointsL: '#ffffff',
      base_jointsR: '#ffffff',
      Body_Base: '#ffffff',
      LowerLegR: '#ffffff',
      LowerLegL: '#ffffff',
      leg_jointsR: '#ffffff',
      leg_jointsL: '#ffffff',
      floor: '#ffffff',
    },
  });

  function uploadData() {
    upload3dModel(
      state.items.head,
      state.items.arm,
      state.items.body,
      state.items.leg,
    );
  }

  //redirect to home if in mobile/tablet
  useEffect(() => {
    if (isMobile || isTablet) {
      navigate('/tezos');
    }
  });

  const [isTourOpen, setIsTourOpen] = useState(true);

  //persist tour to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let tour = localStorage.getItem('isTourOpen');
      if (tour !== null) {
        setIsTourOpen(JSON.parse(tour));
      } else {
        setIsTourOpen(true);
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    localStorage.setItem('isTourOpen', JSON.stringify(isTourOpen));
  }, [isTourOpen]);

  const [isUser] = useAtom(isUserAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    checkIfUserActive(setUser, beacon, location);
  }, []);

  useEffect(() => {
    if (claimButtonClicked) {
      /*
        1. Upload 3d model to ipfs.
        2. Upload Cryptobot image to ipfs
        3. Navigate to /claim-transaction with ipfsHash of image and 3d model as state
      */
      setGrabImage(true);
    }
  }, [claimButtonClicked]);

  useEffect(() => {
    if (image !== '') {
      uploadData();
    }
  }, [image]);

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

  const colorPaletteList = [
    {
      hex: ['#161426', '#252140', '#F23D3D', '#D93250', '#8C2048'],
    },
    {
      hex: ['#FF00F2', '#BA00F2', '#8000FF', '#3000CC', '#0005A1'],
    },
    {
      hex: ['#F2AF5C', '#F2CDA0', '#F28A2E', '#D95204', '#BF3604'],
    },
    {
      hex: ['#008893', '#009F9D', '#52CDC3', '#8DDCCE', '#026775'],
    },
    {
      hex: ['#8C354C', '#0B1226', '#122140', '#F2B9B3', '#F28D8D'],
    },
    {
      hex: ['#260B12', '#F2D06B', '#F2AF5C', '#BF7E45', '#8C2323'],
    },
    {
      hex: ['#012340', '#03658C', '#F23827', '#A60A0A', '#400101'],
    },
    {
      hex: ['#F90112', '#BF0404', '#730202', '#260101', '#F2F2F2'],
    },
    {
      hex: ['#177580', '#1C3F4D', '#012533', '#8A6341', '#CCA06B'],
    },
    {
      hex: ['#1D5902', '#57A608', '#F2CC0F', '#F2B90F', '#D9910D'],
    },
  ];

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

    async function upload(blob) {
      setShowSavingBotModel(true);

      var fdModel = new FormData();

      fdModel.append('file', blob);
      const res = await fetch(
        'https://cryptoverse-wars-backend-nfjp.onrender.com/api/upload-3d-model-to-ipfs',
        {
          method: 'post',
          body: fdModel,
        },
      );

      const resJSON = await res.json();

      var fdImage = new FormData();
      // console.log('img before converting to blob 🔥->', image);
      const imageBlob = new Blob([image], {
        type: 'image/png',
      });
      // console.log('blob 🔥', imageBlob);
      fdImage.append('file', imageBlob);
      // console.log('fdImage 🔥', fdImage);
      // ('https://cryptoverse-wars-backend-nfjp.onrender.com/api/upload-image-to-ipfs');
      const resImage = await fetch(
        'https://cryptoverse-wars-backend-nfjp.onrender.com/api/upload-image-to-ipfs',
        {
          method: 'post',
          body: fdImage,
        },
      );

      const resImageJSON = await resImage.json();

      // console.log('resImageJSON', resImageJSON);
      // console.log('resJSON', resJSON);

      const resMetadata = await fetch(
        'https://cryptoverse-wars-backend-nfjp.onrender.com/api/upload-json-metadata-to-ipfs',
        {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            artifactURI: resJSON.body.ipfsHash,
            displayURI: resImageJSON.body.ipfsHash,
            xtzAddress: user.xtzAddress,
          }),
        },
      );

      const jsonMetadata = await resMetadata.json();

      // console.log('jsonMetadata', jsonMetadata);

      // console.log('3d model hash --> 🔥', await resJSON.body.ipfsHash);
      // console.log('image hash -> 🔥', await resImageJSON.body.ipfsHash);
      // console.log('yo', await resJSON);
      navigate('/tezos/claim-transaction', {
        state: {
          modelURI: resJSON.body.ipfsHash,
          jsonURI: jsonMetadata.ipfsHash,
        },
      });
    }
  };

  const isBrowser = typeof window !== 'undefined';

  return (
    <div
      style={{ background: 'rgba(55, 65, 81)' }}
      className="h-screen bg-base-900 fixed"
    >
      <div
        id="main"
        className="relative h-full"
        style={{ background: 'rgba(55, 65, 81)' }}
      >
        <div
          id="editor"
          className="relative h-full min-h-screen grid grid-cols-8 gap-4 w-full"
          style={{ background: 'rgba(55, 65, 81)' }}
        >
          {!isModalOpen ? (
            <Tour
              steps={steps}
              isOpen={isTourOpen}
              onRequestClose={() => setIsTourOpen(false)}
              accentColor="#2563EB"
              closeWithMask={false}
              lastStepNextButton={
                <div className="text-white font-mulish">Let's get started!</div>
              }
              className="text-white"
              prevButton={
                <div className="text-base-50 font-mulish text-base space-x-1">
                  {' '}
                  <ArrowBackIosIcon />
                  Prev
                </div>
              }
              nextButton={
                <div className="text-base-50 font-mulish text-base space-x-1">
                  Next
                  <ArrowForwardIosIcon />
                </div>
              }
              disableKeyboardNavigation={true}
            />
          ) : (
            ''
          )}

          <div
            id="left-menu"
            className="col-start-1 col-span-2 px-4 pt-4 rounded first-step"
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
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (headCount === 0 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setHeadCount(0)}
                  >
                    <img src={head1} alt="head1" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (headCount === 1 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setHeadCount(1)}
                  >
                    <img src={head2} alt="head2" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (headCount === 2 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setHeadCount(2)}
                  >
                    <img src={head3} alt="head3" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (headCount === 3 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setHeadCount(3)}
                  >
                    <img src={head4} alt="head4" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (headCount === 4 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setHeadCount(4)}
                  >
                    <img src={head5} alt="head5" />
                  </button>
                </div>
                <div
                  className={selectPart === 2 ? 'block' : 'hidden'}
                  id="part2"
                >
                  {' '}
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (armCount === 0 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setArmCount(0)}
                  >
                    <img src={arms1} alt="arms1" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (armCount === 1 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setArmCount(1)}
                  >
                    <img src={arms2} alt="arms2" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (armCount === 2 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setArmCount(2)}
                  >
                    <img src={arms3} alt="arms3" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (armCount === 3 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setArmCount(3)}
                  >
                    <img src={arms4} alt="arms4" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (armCount === 4 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setArmCount(4)}
                  >
                    <img src={arms5} alt="arms5" />
                  </button>
                </div>
                <div
                  className={selectPart === 3 ? 'block' : 'hidden'}
                  id="part3"
                >
                  {' '}
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (bodyCount === 0 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setBodyCount(0)}
                  >
                    <img src={body1} alt="body1" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (bodyCount === 1 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setBodyCount(1)}
                  >
                    <img src={body2} alt="body2" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (bodyCount === 2 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setBodyCount(2)}
                  >
                    <img src={body3} alt="body3" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (bodyCount === 3 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setBodyCount(3)}
                  >
                    <img src={body4} alt="body4" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (bodyCount === 4 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setBodyCount(4)}
                  >
                    <img src={body5} alt="body5" />
                  </button>
                </div>
                <div
                  className={selectPart === 4 ? 'block' : 'hidden'}
                  id="part4"
                >
                  {' '}
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (legCount === 0 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setLegCount(0)}
                  >
                    <img src={legs1} alt="legs1" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (legCount === 1 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setLegCount(1)}
                  >
                    <img src={legs2} alt="legs2" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (legCount === 2 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setLegCount(2)}
                  >
                    <img src={legs3} alt="legs3" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (legCount === 3 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setLegCount(3)}
                  >
                    <img src={legs4} alt="legs4" />
                  </button>
                  <button
                    className={
                      ' bg-base-700 w-32 h-32 focus:outline-none ' +
                      (legCount === 4 ? 'border-2 border-base-400' : '')
                    }
                    onClick={() => setLegCount(4)}
                  >
                    <img src={legs5} alt="legs5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="middle-menu"
            className="relative col-span-2 col-start-3 col-end-7 row-start-0 row-span-full z-0"
          >
            {isBrowser && (
              <div id="customizer-canvas" className="w-full h-full">
                <Canvas
                  concurrent
                  pixelRatio={[1, 1.5]}
                  camera={{ position: [0, 1.4, 6.45], fov: 35 }}
                  gl={{ preserveDrawingBuffer: true }}
                >
                  <CustomAmbientLight
                    setImage={setImage}
                    image={image}
                    grabImage={claimButtonClicked == true}
                  />
                  <spotLight
                    intensity={0.3}
                    angle={0.1}
                    penumbra={1}
                    position={[5, 27, 20]}
                  />
                  <Suspense fallback={<Loading />}>
                    <Bot
                      headCount={headCount}
                      armCount={armCount}
                      bodyCount={bodyCount}
                      legCount={legCount}
                      colors={botColors}
                      getMeshName={getMeshName}
                      setBotColors={setBotColors}
                    />
                    <Environment files="royal_esplanade_1k_compressed_50ppi.hdr" />
                  </Suspense>
                  <OrbitControls enableZoom={true} />
                </Canvas>
              </div>
            )}
          </div>
          <div
            id="right-menu"
            className="col-span-2 col-start-7 bg-base-900 px-4 overflow-y-scroll pb-4"
          >
            <div className="grid grid-cols-2 gap-4  mx-auto justify-center text-white  py-4 third-step">
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
                    const palette = colorPaletteList[getRandomNumber(0, 9)];
                    Object.keys(copy.items).forEach(elm => {
                      const item =
                        palette.hex[
                          Math.floor(Math.random() * palette.hex.length)
                        ];

                      copy.items[elm] = item;
                    });
                    return copy;
                  });
                }}
              >
                Randomize
              </Button>

              <Button
                onClick={() => {
                  setClaimButtonClicked(true);
                  setHeadCount(headCount);
                  setBodyCount(bodyCount);
                  setArmCount(armCount);
                  setLegCount(legCount);

                  trackEvent('click claim bot button');
                }}
                size="sm"
                type="primary"
              >
                Claim Bot
              </Button>
            </div>
            <hr className="my-2 bg-base-400 border-2 h-0.5" />
            <div className="space-y-6 mt-4 second-step">
              <div className="flex flex-row">
                {' '}
                <h4 className="text-xl text-white font-bold flex-1">
                  Colors & Textures
                </h4>
                <button
                  className="text-white focus:outline-none"
                  onClick={() => {
                    setIsTourOpen(true);
                  }}
                >
                  <HelpOutlineIcon /> Help
                </button>
              </div>
              <div id="palette" className="space-y-4">
                {showPaletteColorPicker ? (
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-base text-white font-bold">
                        Create Your Own Custom Color Palette
                      </h4>
                    </div>
                    <div
                      style={{ display: true ? 'block' : 'none' }}
                      className="space-y-3 picker"
                    >
                      <HexColorPicker
                        color={colorPalettePicker}
                        onChange={setColorPalettePicker}
                      />
                      <HexColorInput
                        color={colorPalettePicker}
                        onChange={setColorPalettePicker}
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-x-2 gap-y-4 cursor-pointer">
                      {colorPalette.map(col => (
                        <div
                          style={{ backgroundColor: col }}
                          className="flex w-14 h-16 rounded"
                        ></div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      type="secondary"
                      style={{ width: '100%' }}
                      onClick={() => {
                        if (colorPalette && colorPalette.length >= 5) {
                          //Add color palette to custom color palette section
                          updateCustomColorPaletteList(el => [
                            ...el,
                            { hex: colorPalette },
                          ]);
                          //clear ColorPicker
                          setColorPalette([]);
                          //close color picker
                          updateShowPaletteColorPicker(false);
                        } else {
                          setColorPalette(el => [...el, colorPalettePicker]);
                        }
                      }}
                    >
                      {colorPalette && colorPalette.length >= 5
                        ? 'Create Color Palette'
                        : 'Add'}
                    </Button>
                  </div>
                ) : (
                  <>
                    {customColorPaletteList &&
                    customColorPaletteList.length > 0 ? (
                      <>
                        <div>
                          <h4 className="text-lg text-white font-bold">
                            Custom Color Palettes
                          </h4>
                        </div>
                        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                          {customColorPaletteList.map((color, index) => (
                            <div
                              onClick={() => {
                                setBotColors(current => {
                                  const copy = { ...current };
                                  Object.keys(copy.items).forEach(elm => {
                                    const item =
                                      color.hex[
                                        Math.floor(
                                          Math.random() * color.hex.length,
                                        )
                                      ];

                                    copy.items[elm] = item;
                                  });
                                  return copy;
                                });
                              }}
                              key={index}
                              className="flex w-16 h-16 rounded cursor-pointer"
                            >
                              {color.hex.map(hex => (
                                <div
                                  className="w-3 h-16"
                                  style={{ backgroundColor: hex }}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div className="inline-flex space-x-1 items-center justify-center">
                      <h4 className="text-lg text-white font-bold">
                        Color Palettes{' '}
                      </h4>
                      <span>
                        {' '}
                        <Tooltip />
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-x-2 gap-y-4 cursor-pointer	">
                      {colorPaletteList.map((color, index) => (
                        <div
                          onClick={() => {
                            setBotColors(current => {
                              const copy = { ...current };
                              Object.keys(copy.items).forEach(elm => {
                                const item =
                                  color.hex[
                                    Math.floor(Math.random() * color.hex.length)
                                  ];

                                copy.items[elm] = item;
                              });
                              return copy;
                            });
                          }}
                          key={index}
                          className="flex w-16 h-16 rounded"
                        >
                          {color.hex.map(hex => (
                            <div
                              className="w-3 h-16"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <Button
                  size="sm"
                  type="outline_secondary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    showPaletteColorPicker
                      ? updateShowPaletteColorPicker(false)
                      : updateShowPaletteColorPicker(true);
                    //clear color palette
                    setColorPalette([]);
                  }}
                >
                  {showPaletteColorPicker ? `Close` : `+ Custom Color Palette`}
                </Button>
              </div>

              <div id="colors" className="space-y-4">
                <h5 className="text-lg text-white font-bold">
                  Body Part :{' '}
                  <span className="font-normal">( {botColors.current} )</span>
                </h5>
                {showColorPicker ? (
                  <div
                    style={{ display: true ? 'block' : 'none' }}
                    className=" space-y-3 picker"
                  >
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
                    <HexColorInput
                      color={colorPicker}
                      onChange={setColorPicker}
                    />
                  </div>
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
                <Button
                  size="sm"
                  type="outline_secondary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    showColorPicker
                      ? updateShowColorPicker(false)
                      : updateShowColorPicker(true);
                  }}
                >
                  {showColorPicker ? `Close` : `+ Custom Color`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <WelcomeModal close={() => setIsModalOpen(false)} isUser={isUser} />
      )}
      {showSavingBotModel && <SavingBotModal />}
    </div>
  );
};

export default Customizer;
