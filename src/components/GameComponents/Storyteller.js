import React from 'react';
import { navigate } from 'gatsby';

// Seed Images
import IceSeed from '../../assets/Seeds/Ice.svg';
import ElectricSeed from '../../assets/Seeds/electricity.svg';
import FireSeed from '../../assets/Seeds/fire.svg';
import GrassSeed from '../../assets/Seeds/grass.svg';
import WaterSeed from '../../assets/Seeds/water.svg';
import {
  GameModal,
  ModalMask,
  ModalWrapper,
  ModalBottom,
  Heading,
  SubHeading,
  ProceedLink,
} from '../../PagesStyle/GamePage/styled';
import { PLANT_TYPES } from '../Plants/PLANT_TYPES';

const StoryTeller = ({ display, plantType }) => {
  const renderPlantTypeSeed = (plantType = null) => {
    switch (plantType) {
      case PLANT_TYPES.ICE:
        return <IceSeed style={{ maxWidth: '30vw', maxHeight: '30vh' }} />;
      case PLANT_TYPES.ELECTRIC:
        return <ElectricSeed style={{ maxWidth: '30vw', maxHeight: '30vh' }} />;
      case PLANT_TYPES.GRASS:
        return <GrassSeed style={{ maxWidth: '30vw', maxHeight: '30vh' }} />;
      case PLANT_TYPES.WATER:
        return <WaterSeed style={{ maxWidth: '30vw', maxHeight: '30vh' }} />;
      case PLANT_TYPES.FIRE:
        return <FireSeed style={{ maxWidth: '30vw', maxHeight: '30vh' }} />;
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
            <GameModal>
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(50% - 130px)',
                  top: '5%',
                }}
              >
                {renderPlantTypeSeed(plantType)}
              </div>
              <ModalBottom
                style={{
                  height: '65%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Heading>Save the Planet</Heading>
                <SubHeading style={{ padding: '0 2rem' }}>
                  The school has bestowed upon you the <b> {plantType} </b>seed!
                  <br /> Your task now is to incubate the seed and help it
                  evolve before the zombies reach you.
                  <br />
                  After completing all chapters, you will help your
                  fully-evolved plant in aiming to kill the zombies!
                </SubHeading>
                <br />
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    margin: '1rem 0 2rem 0',
                    bottom: 0,
                  }}
                >
                  <ProceedLink
                    onClick={() => {
                      typeof window != 'undefined' &&
                        localStorage.setItem('chapter-0', true);
                      navigate(`/lesson/chapter-01`);
                    }}
                  >
                    Proceed to chapter 1!
                  </ProceedLink>
                </div>
              </ModalBottom>
            </GameModal>
          </ModalWrapper>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default StoryTeller;
