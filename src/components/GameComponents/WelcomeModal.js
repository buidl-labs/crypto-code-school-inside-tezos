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
  console.log(display);
  return (
    <>
      {display === true ? (
        <div>
          <ModalWrapper>
            <ModalMask />
            <Modal style={{ height: '60%', top: '20%' }}>
              <ModalBottom style={{ height: '100%', borderRadius: '10px' }}>
                <Heading style={{ paddingTop: '2rem' }}>
                  Congratulations!
                </Heading>
                <SubHeading style={{ padding: '2rem 4rem' }}>
                  You have successfully evolved your plant, battle it out to
                  defend against the upcoming zombie apocalypse.
                </SubHeading>
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    margin: '1rem 0',
                  }}
                >
                  <ProceedLink onClick={() => changeDisplay()}>
                    Battle it Out
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

export default WelcomeModal;
