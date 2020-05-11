import React, { useRef, useState } from 'react';

// CSS
import 'src/assets/GameAssets/game.css';

// Components
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Zombie from 'src/components/GameComponents/Zombie';
import Plant from 'src/components/GameComponents/Plant';
import GameOverModal from 'src/components/GameComponents/Modal';
import WelcomeModal from 'src/components/GameComponents/WelcomeModal';

// Images
import Title from 'src/assets/GameAssets/title.svg';
import House from 'src/assets/GameAssets/house.svg';
import ForestLand from 'src/assets/GameAssets/forestland.svg';
import StartSymbol from 'src/assets/GameAssets/start.svg';

// Custom styles and styled images
import Layout from 'src/components/Layout/layout';
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
} from 'src/PagesStyle/GamePage/styled';

// Shooter balls
import iceBall from 'src/assets/GameAssets/shooters/ice.png';
import fireBall from 'src/assets/GameAssets/shooters/fire.png';
import waterBall from 'src/assets/GameAssets/shooters/water.png';
import grassBall from 'src/assets/GameAssets/shooters/grass.png';
import electricBall from 'src/assets/GameAssets/shooters/electric.png';

import { LeftArrow, RightArrow } from '../../components/IconSet';

const Game = () => {
  // DOM controllers which will direct the game
  const gameContainer = useRef(null);
  const startButton = useRef(null);
  const shooter = useRef(null);
  const zombieRef = useRef(null);

  let zombieInterval,
    deadZombieList = [];

  const [isGameLost, updateGameStatus] = useState(false);
  const [totalDeadZombies, updateDeadZombieCount] = useState(0);
  const [showWelcomeModal, updateWelcomeModalDisplay] = useState(true);

  const playGame = () => {
    startAnimations();
    startButton.current.style.display = 'none';
    window.addEventListener('keydown', debounce(keyboardInput, 500));
    for (let i = 0; i < 4; i++) {
      (function(i) {
        zombieInterval = setTimeout(function() {
          createZombie(i);
        }, 5000 * i + 3000 / i);
      })(i);
    }
  };

  const startAnimations = () => {
    document.getElementById('lightening').remove();
    document.getElementById('instructions').style.display = 'block';
    document.getElementById('initialzombie').remove();
  };

  const randomNumber = (start, end) => Math.floor(Math.random() * end) + start;

  const keyboardInput = event => {
    if (event.keyCode === 32) {
      event.preventDefault();
      shooterBall();
      shootingPlantAnimation();
    }
  };

  const debounce = (func, wait, immediate) => {
    let timeout;

    return function executedFunction() {
      const context = this;
      const args = arguments;

      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };

  const shootingPlantAnimation = () => {
    const plantUpperBody = shooter.current.children[0].children[0];

    plantUpperBody.style.animation = 'none';
    setTimeout(() => {
      plantUpperBody.style.transform = 'rotate(-10deg)';
    }, 50);
    setTimeout(() => {
      plantUpperBody.style.transform = 'rotate(5deg)';
    }, 800);
    setTimeout(() => {
      plantUpperBody.style.transform = 'rotate(-5deg)';
      plantUpperBody.style.animation = 'sway 3s infinite alternate';
    }, 1800);
  };

  const createZombie = zombieIndex => {
    if (!zombieRef.current || typeof zombieRef.current == 'undefined') return;
    let newZombie = zombieRef.current.cloneNode(true);
    newZombie.id = `zombie-${zombieIndex}`;
    newZombie.classList.add('zombie');
    newZombie.classList.add('zombie-transition');
    newZombie.style.bottom = `${randomNumber(9, 12)}%`;
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
      if (xPosition <= 350) {
        clearInterval(moveZombieInterval);
        gameOver();
      } else {
        zombie.style.left = `${xPosition - 1}px`;
      }
    }, 30);
  };

  const gameOver = () => {
    window.removeEventListener('keydown', keyboardInput);
    updateGameStatus(true);
    clearInterval(zombieInterval);
  };

  const shooterBall = () => {
    const ball = createShooterBallElement();
    gameContainer.current.appendChild(ball);
    setTimeout(() => {
      moveShooterBall(ball);
    }, 800);
  };

  const createShooterBallElement = () => {
    let newShooterBall = document.createElement('img');
    setBallImage(newShooterBall); // according to Plant type
    newShooterBall.classList.add('shooter-ball');
    newShooterBall.style.left = `360px`;
    newShooterBall.style.bottom = '36%';
    setTimeout(() => {
      newShooterBall.style.transform = 'scale(1)';
    }, 100);
    return newShooterBall;
  };

  const setBallImage = ball => {
    const plantType = JSON.parse(localStorage.getItem('plant'));
    switch (plantType.type) {
      case 'electric':
        ball.src = electricBall;
        ball.style.height = '50px';
        break;
      case 'ice':
        ball.src = iceBall;
        ball.style.height = '40px';
        break;
      case 'water':
        ball.src = waterBall;
        ball.style.height = '50px';
        break;
      case 'grass':
        ball.src = grassBall;
        ball.style.height = '40px';
        break;
      case 'fire':
        ball.src = fireBall;
        ball.style.height = '50px';
        break;
      default:
        ball.src = grassBall;
        break;
    }
  };

  const moveShooterBall = ball => {
    let moveShooterBallInterval = setInterval(() => {
      let zombie = document.querySelectorAll('.zombie')[0] || 0;
      let xPosition = parseInt(ball.style.left) || 375;

      if (zombie) {
        // check collision
        if (checkShooterballCollision(ball, zombie)) {
          zombieDeathAnimations(zombie);

          // increases dead zombie count if it's unique
          uniqueDeadZombieCount(zombie.id);

          ball.classList.add('fade-out');
          setTimeout(() => zombie.remove(), 1250);
          setTimeout(() => ball.remove(), 500);

          clearInterval(moveShooterBallInterval);
        } else if (xPosition > 0.75 * window.innerWidth) {
          ball.classList.add('fade-out');
          setTimeout(() => ball.remove(), 500);
        } else {
          ball.style.left = `${xPosition + 5}px`;
        }
      } else {
        ball.style.left = `${xPosition + 5}px`;
      }
    }, 17);
  };

  const uniqueDeadZombieCount = zombieID => {
    if (!deadZombieList.includes(zombieID)) {
      deadZombieList.push(zombieID);
      updateDeadZombieCount(count => count + 1);
    } else {
      return;
    }
  };

  const zombieDeathAnimations = zombie => {
    // Zombie head fly away animation (layered animation)
    zombie.children[0].children[0].classList.add('demo-dot-y');
    zombie.children[0].children[0].children[0].classList.add('demo-dot-x');
    // Zombie body fall down animation
    zombie.children[0].children[1].classList.add('fall-down');
    // Zombie face rotetes animation
    zombie.children[0].children[0].children[0].children[0].classList.add(
      'role-face',
    );
  };

  const checkShooterballCollision = (ball, zombie) => {
    let shooterBallLeft = parseInt(ball.style.left) || 0;
    let zombieLeft = parseInt(zombie.style.left) || 0;

    // collision logic
    if (
      shooterBallLeft < 0.75 * window.innerWidth &&
      shooterBallLeft + 20 >= zombieLeft
    )
      return true;
    else return false;
  };

  //TODO: Limit shooting one ball at a time, other wise lead to weird bugs
  //[if more than 1 ball hits a single zombie it will end the game there and then]

  return (
    <Layout>
      <MainContainer>
        <Header>
          <BackLink to={`/lesson/chapter-15`}>
            <LeftArrow />
            <span>Back</span>
          </BackLink>
          <Title maxWidth="15vh" />
          <BackLink to={`/tezos/up-next`}>
            <span>Skip</span>
            <RightArrow />
          </BackLink>
        </Header>
        <GameContainer ref={gameContainer} id="game-container">
          {isGameLost ? (
            <GameOverModal status="lost" />
          ) : (
            <GameOverModal totalDeadZombies={totalDeadZombies} status="won" />
          )}
          <RightCloud />
          <LeftCloud />
          <Instructions id="instructions">Use Spacebar to shoot</Instructions>
          {showWelcomeModal ? (
            <WelcomeModal
              display
              changeDisplay={() => updateWelcomeModalDisplay(false)}
            />
          ) : (
            <>
              <Lightening id="lightening" />
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
              <div id="initialzombie" ref={zombieRef}>
                <Zombie />
              </div>
            </>
          )}
          <House className="house-img" />
          <ForestLand className="forest-land-img" />
        </GameContainer>
        <Footer />
      </MainContainer>
    </Layout>
  );
};

export default Game;
