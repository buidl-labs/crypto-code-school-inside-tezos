import React from 'react';

import {
  WelcomeModalContainer,
  ModalMask,
  ModalWrapper,
  ModalBottom,
  Heading,
  SubHeading,
  ProceedLink,
} from '../../PagesStyle/GamePage/styled';

const WelcomeModal = ({ display = false, changeDisplay }) => {
  return (
    <>
      {display === true ? (
        <div>
          <ModalWrapper>
            <ModalMask />
            <WelcomeModalContainer>
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
            </WelcomeModalContainer>
          </ModalWrapper>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default WelcomeModal;
