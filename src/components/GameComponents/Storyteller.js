import React from 'react';

// Seed Images
import IceSeed from '../../assets/Seeds/Ice.svg';
import ElectricSeed from '../../assets/Seeds/electricity.svg';
import FireSeed from '../../assets/Seeds/fire.svg';
import GrassSeed from '../../assets/Seeds/grass.svg';
import WaterSeed from '../../assets/Seeds/water.svg';
import { navigate } from 'gatsby';
import {
  Modal,
  ModalMask,
  ModalWrapper,
  ModalBottom,
  Heading,
  SubHeading,
  SuccessLights,
  BackLink,
} from '../../PagesStyle/GamePage/styled';

import styled from '@emotion/styled';

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

const ProceedLink = styled.button`
  padding: 18px 30px;
  background: #29cb6a;
  border: none;
  outline: none;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: 2px;
  border-radius: 5px;
  transition: all 0.4s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  font-size: 1.2rem;
  width: inherit;

  :before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    height: 100%;
    width: 100%;
    background: #29cb6a;
    transform: scale(0.9);
    filter: blur(15px);
    opacity: 0.5;
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  }

  :hover {
    box-shadow: 0 0 0 0.4rem rgba(102, 204, 167, 0.25);
  }

  :hover:before {
    top: 20px;
  }

  :active {
    transform: scale(0.8);
  }
`;

export default StoryTeller;
