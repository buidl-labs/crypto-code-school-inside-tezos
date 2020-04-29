import React from 'react';
import { navigate } from 'gatsby';

// Seed Images
import IceSeed from '../../assets/Seeds/Ice.svg';
import ElectricSeed from '../../assets/Seeds/electricity.svg';
import FireSeed from '../../assets/Seeds/fire.svg';
import GrassSeed from '../../assets/Seeds/grass.svg';
import WaterSeed from '../../assets/Seeds/water.svg';

import {
  Modal,
  ModalMask,
  ModalWrapper,
  ModalBottom,
  Heading,
  SubHeading,
  SuccessLights,
  ProceedLink,
} from '../../PagesStyle/GamePage/styled';

const StoryTeller = ({ display, plantType }) => {
  const renderPlantTypeSeed = (plantType = null) => {
    switch (plantType) {
      case 'ice':
        return <IceSeed />;
      case 'electric':
        return <ElectricSeed />;
      case 'grass':
        return <GrassSeed />;
      case 'water':
        return <WaterSeed />;
      case 'fire':
        return <FireSeed />;
      default:
        return null;
    }
  };

  return (
    <>
      {display === true ? (
        <div>
          <ModalWrapper>
            <ModalMask />
            <Modal style={{ height: '75%', top: '12%' }}>
              <SuccessLights />
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(50% - 130px)',
                  top: '5%',
                }}
              >
                {renderPlantTypeSeed(plantType)}
              </div>
              <ModalBottom style={{ height: '65%' }}>
                <Heading>Save the Planet</Heading>
                <SubHeading style={{ padding: '0 4rem' }}>
                  A zombie apocalypse has begun. You’ve luckily found the seed
                  of a plant that is known to stop zombies. Your task is to
                  incubate the seed and help it evolve before the zombies reach
                  you. In the lesson, you’re going to learn how to evolve your
                  plant and train it to defend against the incoming apocalypse
                  by building a simple smart contract in SmartPy which can be
                  deployed on tezos blockchain.
                </SubHeading>
                <br />
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    margin: '2rem 0',
                  }}
                >
                  <ProceedLink
                    onClick={() => {
                      typeof window != 'undefined' &&
                        localStorage.setItem('chapter-0', true);
                      navigate(`/lesson/chapter-01`);
                    }}
                  >
                    Proceed
                  </ProceedLink>
                </div>
              </ModalBottom>
            </Modal>
          </ModalWrapper>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default StoryTeller;
