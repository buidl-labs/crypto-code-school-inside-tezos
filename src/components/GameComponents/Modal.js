import React from 'react';
import { navigate } from 'gatsby';
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
import styled from '@emotion/styled';

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
                <Button
                  onClick={() => {
                    if (status === 'won') {
                      navigate('/up-next');
                    } else {
                      typeof window !== 'undefined' && window.location.reload();
                    }
                  }}
                >
                  {status === 'won' ? 'Continue' : 'Retry'}
                </Button>
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

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 20px 40px;
  background: #1b2121;
  margin: 20px;
  color: #fff;
  transition: all 0.3s;

  :hover {
    box-shadow: 0 0 0 0.25rem rgb(59, 66, 66);
    cursor: pointer;
  }
`;

export default GameOverModal;
