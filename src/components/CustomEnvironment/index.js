import React, { useEffect } from 'react';

//Custom Environment function
import { UnsignedByteType, PMREMGenerator } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { useThree } from 'react-three-fiber';

const CustomEnvironment = () => {
  const { gl, scene } = useThree();
  const pmremGenerator = new PMREMGenerator(gl);
  const loader = new RGBELoader();
  loader.setDataType(UnsignedByteType);
  pmremGenerator.compileEquirectangularShader();

  useEffect(() => {
    loader.load('/royal_esplanade_1k_compressed_50ppi.hdr', texture => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;

      scene.environment = envMap;
      // one can also set scene.background to envMap here

      texture.dispose();
      pmremGenerator.dispose();
    });
  }, [scene, loader, pmremGenerator]);

  return null;
};

export default CustomEnvironment;
