import React, { useEffect, useRef, useState } from 'react';

// CSS
import '../assets/GameAssets/game.css';

// Components
import { FaChevronLeft } from 'react-icons/fa';
import Zombie from '../components/GameComponents/Zombie';
import Plant from '../components/GameComponents/Plant';
import WinnerModal from '../components/GameComponents/Modal';

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

// shooter balls
import iceBall from '../assets/GameAssets/shooters/ice.png';
import fireBall from '../assets/GameAssets/shooters/fire.png';
import waterBall from '../assets/GameAssets/shooters/water.png';
import grassBall from '../assets/GameAssets/shooters/grass.png';
import electricBall from '../assets/GameAssets/shooters/electric.png';

const Game = () => {
  useEffect(() => {}, []);

  // DOM controllers which will direct the game
  const gameContainer = useRef(null);
  const startButton = useRef(null);
  const shooter = useRef(null);
  const zombieRef = useRef(null);

  let zombieInterval;

  const [totalDeadZombies, updateDeadZombieCount] = useState(0);

  const playGame = () => {
    startAnimations();
    startButton.current.style.display = 'none';
    window.addEventListener('keydown', keyboardInput);
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
      shooter.current.classList.add('fire-animation');
      setTimeout(() => {
        shooterBall();
        shooter.current.classList.remove('fire-animation');
      }, 700);
    }
  };

  const createZombie = zombieIndex => {
    let newZombie = zombieRef.current.cloneNode(true);
    newZombie.id = `zombie-${zombieIndex}`;
    newZombie.classList.add('zombie');
    newZombie.classList.add('zombie-transition');
    newZombie.style.bottom = `${randomNumber(12, 16)}%`;
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
    //   clearInterval(moveShooterBallInterval);
    console.log(`Game Over! The zombies made it to Earth!`);
  };

  const shooterBall = () => {
    const ball = createShooterBallElement();
    gameContainer.current.appendChild(ball);
    moveShooterBall(ball);
  };

  const createShooterBallElement = () => {
    let xPosition = parseInt(
      window.getComputedStyle(shooter.current).getPropertyValue('left'),
    );
    let newShooterBall = document.createElement('img');
    setBallImage(newShooterBall); // according to Plant type
    newShooterBall.classList.add('fireball');
    newShooterBall.style.position = 'absolute';
    newShooterBall.style.left = `${254.5}px`;
    newShooterBall.style.bottom = '36.5%';
    return newShooterBall;
  };

  const setBallImage = ball => {
    const plantType = JSON.parse(localStorage.getItem('plant'));
    switch (plantType.type) {
      case 'electric':
        ball.src = electricBall;
        break;
      case 'ice':
        ball.src = iceBall;
        break;
      case 'water':
        ball.src = waterBall;
        break;
      case 'grass':
        ball.src = grassBall;
        break;
      case 'fire':
        ball.src = fireBall;
        break;
      default:
        ball.src = grassBall;
        break;
    }
  };

  const moveShooterBall = ball => {
    let moveShooterBallInterval = setInterval(() => {
      let zombie = document.querySelectorAll('.zombie')[0] || 0;
      let xPosition = parseInt(ball.style.left) || 0;

      if (zombie) {
        // check collision
        if (checkShooterballCollision(ball, zombie)) {
          // zombie.classList.remove('zombie');
          // zombie.classList.add('dead-zombie');

          zombieDeathAnimations(zombie);

          updateDeadZombieCount(count => count + 1);
          
          setTimeout(() => zombie.remove(), 1250);
          ball.remove();
          clearInterval(moveShooterBallInterval);
        } else if (xPosition > 800) {
          ball.remove();
        } else {
          ball.style.left = `${xPosition + 4}px`;
        }
      }
    }, 17);
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
    if (shooterBallLeft < 800 && shooterBallLeft + 40 >= zombieLeft)
      return true;
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
          <WinnerModal totalDeadZombies={totalDeadZombies} />
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
          <div id="initialzombie" ref={zombieRef}>
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
