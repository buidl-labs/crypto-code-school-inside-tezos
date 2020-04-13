import React, { useEffect, useRef } from 'react';

// CSS
import '../assets/GameAssets/game.css';

// components from external libraries
import { Link } from 'gatsby';
import { FaChevronLeft } from 'react-icons/fa';
import Title from '../assets/GameAssets/title.svg';

// custom styles
import Layout from '../components/Layout/layout';
import {
  MainContainer,
  Header,
  Footer,
  GameContainer,
  StartButton,
  Instructions,
  Plant,
  Zombie,
} from '../PagesStyle/GamePage/styled';

const Game = () => {
  useEffect(() => {}, []);

  // DOM controllers which will direct the game
  const gameContainer = useRef(null);
  const startButton = useRef(null);
  const shooter = useRef(null);

  let zombieInterval;

  const playGame = () => {
    startButton.current.style.display = 'none';
    window.addEventListener('keydown', keyboardInput);
    createZombie();
    zombieInterval = setInterval(() => {
      createZombie();
    }, 4000);
    // window.requestAnimationFrame(createZombie);
  };

  const keyboardInput = event => {
    if (event.keyCode === 32) {
      event.preventDefault();
      shooter.current.classList.add('fire-animation');
      setTimeout(() => {
        fireBall();
        shooter.current.classList.remove('fire-animation');
      }, 700);
    }
  };

  const createZombie = () => {
    let newZombie = document.createElement('div');
    newZombie.classList.add('zombie');
    newZombie.classList.add('zombie-transition');
    gameContainer.current.appendChild(newZombie);
    moveZombie(newZombie);
  };

  const moveZombie = zombie => {
    let moveZombieInterval = setInterval(() => {
      let xPosition = parseInt(
        window.getComputedStyle(zombie).getPropertyValue('left'),
      );
      if (Array.from(zombie.classList).includes('dead-zombie')) {
        zombie.remove();
      }
      if (xPosition <= 200) {
        gameOver();
      } else {
        zombie.style.left = `${xPosition - 2}px`;
      }
    }, 30);
  };

  const gameOver = () => {
    window.removeEventListener('keydown', keyboardInput);
    clearInterval(zombieInterval);
    clearInterval(moveZombieInterval);
    //   clearInterval(moveFirballInterval);
    // setTimeout(() => {
    console.log(`Game Over! The zombies made it to Earth!`);
    // }, 1000);
  };

  const fireBall = () => {
    const fire = createFireElement();
    gameContainer.current.appendChild(fire);
    moveFireBall(fire);
  };

  const createFireElement = () => {
    let xPosition = parseInt(
      window.getComputedStyle(shooter.current).getPropertyValue('left'),
    );
    let newFireBall = document.createElement('div'); // TODO img
    // newFireBall.src = 'images/fireball.svg';
    newFireBall.classList.add('fireball');
    newFireBall.style.position = 'absolute';
    newFireBall.style.left = `${xPosition + 154.5}px`;
    newFireBall.style.bottom = '36.5%';
    return newFireBall;
  };

  const moveFireBall = fire => {
    let moveFirballInterval = setInterval(() => {
      let zombie = document.querySelectorAll('.zombie')[0];
      let xPosition = parseInt(fire.style.left);

      // check collision
      if (checkFireballCollision(fire, zombie)) {
        zombie.classList.remove('zombie');
        zombie.classList.add('dead-zombie');
        fire.remove();
        clearInterval(moveFirballInterval);
      } else if (xPosition > 800) {
        fire.remove();
      } else {
        fire.style.left = `${xPosition + 3}px`;
      }
    }, 17);
  };

  const checkFireballCollision = (fire, zombie) => {
    let fireballLeft = parseInt(fire.style.left);
    let zombieLeft = parseInt(zombie.style.left);

    // collision logic
    if (fireballLeft < 800 && fireballLeft - 20 >= zombieLeft) return true;
    else return false;
  };

  return (
    <Layout
      background={`radial-gradient(
        198.67% 198.67% at 53.06% -50.22%,
        #13282d 53.32%,
        #296460 100%
      )
      no-repeat center center fixed`}
    >
      <MainContainer>
        <Header>
          <Title />
        </Header>
        <GameContainer ref={gameContainer} id="game-container">
          <StartButton ref={startButton} id="start" onClick={() => playGame()}>
            Start
          </StartButton>
          <Instructions>Press SPACEBAR to throw the fireball</Instructions>
          <Plant ref={shooter} id="plant-shooter" />
        </GameContainer>
        <Footer />
      </MainContainer>
    </Layout>
  );
};

export default Game;
