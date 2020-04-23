import React from 'react';

import {
  Modal,
  ModalMask,
  ModalWrapper,
  ModalBottom,
  Heading,
  SubHeading,
  SuccessLights,
} from '../../PagesStyle/GamePage/styled';
import PlantCircle from '../../components/PlantGrowthModal/Plant';
import Plant from '../../components/PlantGrowthModal/GrownPlant';

const GameOverModal = ({ totalDeadZombies = 4, status = 'lost' }) => {
  return (
    <>
      {totalDeadZombies === 4 ? (
        <div>
          <ModalWrapper>
            <ModalMask />
            <Modal>
              <SuccessLights />
              <PlantCircle />
              <Plant positionTop="40%" positionLeft="50%" />
              <ModalBottom>
                {status === 'won' ? (
                  <>
                    <Heading>Victory</Heading>
                    <SubHeading>
                      Your plant has defeated the first wave of the zombie
                      apocalypse. <br /> But are you ready to take it to the
                      next level?
                    </SubHeading>
                  </>
                ) : (
                  <>
                    <Heading>You Lose</Heading>
                    <SubHeading>
                      Your plant was defeated in the first wave of the zombie
                      apocalypse. <br /> Are you ready to try again?
                    </SubHeading>
                  </>
                )}
                <button
                  onClick={() => {
                    typeof window !== 'undefined' && window.location.reload();
                  }}
                  style={{
                    outline: 'none',
                    border: 'none',
                    borderRadius: 5,
                    padding: '20px 40px',
                    background: '#1B2121',
                    margin: '20px',
                    color: '#fff',
                  }}
                >
                  Continue
                </button>
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

export default GameOverModal;
