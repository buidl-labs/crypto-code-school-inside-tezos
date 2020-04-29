import React from 'react';

import {
  Modal,
  ModalMask,
  ModalWrapper,
  ModalBottom,
  Heading,
  SubHeading,
  ProceedLink,
} from '../../PagesStyle/GamePage/styled';

const WelcomeModal = ({ display = false, changeDisplay }) => {
  console.log(display)
  return (
    <>
      {display === true ? (
        <div>
          <ModalWrapper>
            <ModalMask />
            <Modal style={{ height: '45%', top: '25%' }}>
              <ModalBottom style={{ height: '100%' }}>
                <Heading style={{ paddingTop: '1.25rem' }}>Congratulations!</Heading>
                <SubHeading style={{ padding: '1rem 4rem' }}>
                  You have successfully completed the task of incubating the
                  seed and evolve before the zombies reaches you. Use your plant
                  to defend against the zombie apocalyspe.
                </SubHeading>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    margin: '1rem 0',
                  }}
                >
                  <ProceedLink onClick={() => changeDisplay()}>Battle it Out</ProceedLink>
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

export default WelcomeModal;
