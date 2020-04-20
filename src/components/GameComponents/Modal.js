import React from 'react';

import WinnersImg from '../../assets/GameAssets/undraw_winners.svg';

import {
  BackLink,
  Modal,
  ModalMask,
  ModalWrapper,
} from '../../PagesStyle/GamePage/styled';
import { FaChevronLeft } from 'react-icons/fa';

const GameOverModal = ({ totalDeadZombies = 4, status = 'lost' }) => {
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
                <h1>{status === 'won' ? 'Congratulations !' : ' Oops !'}</h1>
                <p>{status === 'won' ? 'You won the game' : 'You lose the game'}</p>
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

export default GameOverModal;
