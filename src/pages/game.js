import React, { useEffect, useRef } from 'react';

// CSS
import '../assets/GameAssets/game.css';

// components from external libraries
import { Link } from 'gatsby';
import { FaChevronLeft } from 'react-icons/fa';
import Zombie from '../components/GameComponents/Zombie';
import Plant from '../components/GameComponents/Plant';

// Images
import Title from '../assets/GameAssets/title.svg';
import House from '../assets/GameAssets/house.svg';
import ForestLand from '../assets/GameAssets/forestland.svg';
import StartSymbol from '../assets/GameAssets/start.svg';

// Custom styles and styled images
import Layout from '../components/Layout/layout';
import {
  MainContainer,
  Header,
  Footer,
  GameContainer,
  Instructions,
  PlantContainer,
  RightCloud,
  LeftCloud,
  BackLink,
  Lightening,
  StartSymbolContainer,
} from '../PagesStyle/GamePage/styled';

const Game = () => {
  useEffect(() => {}, []);

  // DOM controllers which will direct the game
  const gameContainer = useRef(null);
  const startButton = useRef(null);
  const shooter = useRef(null);
  const zombieRef = useRef(null);

  let zombieInterval;

  const playGame = () => {
    startAnimations();
    startButton.current.style.display = 'none';
    window.addEventListener('keydown', keyboardInput);
    for (let i = 0; i < 4; i++) {
      (function(i) {
        zombieInterval = setTimeout(function() {
          createZombie(i);
        }, 5000 * i);
      })(i);
    }
  };

  const startAnimations = () => {
    document.getElementById('lightening').remove();
    document.getElementById('instructions').style.display = 'block';
    // document.getElementById('initialzombie').remove();
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

  const createZombie = zombieIndex => {
    let newZombie = zombieRef.current.cloneNode(true);
    newZombie.id = `zombie-${zombieIndex}`;
    // console.log(newZombie);
    // let newZombie = document.createElement('div');
    // console.log(newZombie, zombieRef.current);
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
        zombie.style.left = `${xPosition - 1}px`;
      }
    }, 30);
  };

  const gameOver = () => {
    window.removeEventListener('keydown', keyboardInput);
    clearInterval(zombieInterval);
    clearInterval(moveZombieInterval);
    //   clearInterval(moveFirballInterval);
    console.log(`Game Over! The zombies made it to Earth!`);
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
    newFireBall.style.left = `${154.5}px`;
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
    <Layout>
      <MainContainer>
        <Header>
          <BackLink to={`/`}>
            <FaChevronLeft />
            <span>Back</span>
          </BackLink>
          <Title />
          <div style={{ width: '120px' }} />
        </Header>
        <GameContainer ref={gameContainer} id="game-container">
          <Lightening id="lightening" />
          <RightCloud />
          <LeftCloud />
          <Instructions id="instructions">Use Spacebar to shoot</Instructions>
          <StartSymbolContainer
            ref={startButton}
            id="start"
            onClick={() => playGame()}
          >
            <StartSymbol />
          </StartSymbolContainer>
          <PlantContainer id="plant-shooter" ref={shooter}>
            <Plant />
          </PlantContainer>
          <div id="intialzombie" ref={zombieRef}>
            <Zombie />
          </div>
          <House className="house-img" />
          <ForestLand className="forest-land-img" />
        </GameContainer>
        <Footer />
      </MainContainer>
    </Layout>
  );
};

export default Game;
