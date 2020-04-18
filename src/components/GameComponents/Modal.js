import React from 'react';

import WinnersImg from '../../assets/GameAssets/undraw_winners.svg';

import {
  BackLink,
  Modal,
  ModalMask,
  ModalWrapper,
} from '../../PagesStyle/GamePage/styled';
import { FaChevronLeft } from 'react-icons/fa';

const WinnerModal = ({ totalDeadZombies }) => {
  return (
    <>
      {totalDeadZombies === 4 ? (
        <div>
          <ModalWrapper>
            <ModalMask />
            <Modal>
              <div>
                <WinnersImg />
              </div>
              <div>
                <h1>Congratulations !</h1>
                <p>You won the game</p>
                <BackLink to={`/`} id="back-btn">
                  <FaChevronLeft />
                  <span>Go to HomePage</span>
                </BackLink>
              </div>
            </Modal>
          </ModalWrapper>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default WinnerModal;
