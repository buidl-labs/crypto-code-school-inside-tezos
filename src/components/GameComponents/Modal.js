import React from 'react';

import {
  Modal,
  ModalMask,
  ModalWrapper,
} from '../../PagesStyle/GamePage/styled';

const GameOverModal = ({ totalDeadZombies = 4, status = 'lost' }) => {
  return (
    <>
      {totalDeadZombies === 4 ? (
        <div>
          <ModalWrapper>
            <ModalMask />
            <Modal>
              <div>
                <h1>{status === 'won' ? 'Congratulations !' : ' Oops !'}</h1>
                <p>
                  {status === 'won' ? 'You won the game' : 'You lose the game'}
                </p>
                <div>
                  <button
                    onClick={() => {
                      typeof window !== 'undefined' && window.location.reload();
                    }}
                    style={{
                      outline: 'none',
                      border: 'none',
                      borderRadius: 5,
                      padding: '20px 40px',
                      background: '#06d19c',
                      margin: '20px',
                      color: '#fff',
                    }}
                  >
                    Retry
                  </button>
                </div>
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
