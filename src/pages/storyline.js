import React, { useEffect, useRef, useState } from 'react';

// CSS
// import '../assets/GameAssets/game.css';

// Components
import { FaChevronLeft } from 'react-icons/fa';
import Zombie from '../components/GameComponents/Zombie';
import StoryTeller from '../components/GameComponents/Storyteller';

// Images
import Title from '../assets/GameAssets/title.svg';
import House from '../assets/GameAssets/house.svg';
import ForestLand from '../assets/GameAssets/forestland.svg';

// Custom styles and styled images
import Layout from '../components/Layout/layout';
import {
  MainContainer,
  Header,
  Footer,
  GameContainer,
  RightCloud,
  LeftCloud,
  BackLink,
} from '../PagesStyle/GamePage/styled';

const Game = () => {
  const [plantType, setPlantTypeSeed] = useState(null);
  const [showStoryModal, setStoryModalDisplay] = useState(false);

  const gameContainer = useRef(null);
  const zombieRef = useRef(null);

  useEffect(() => {
    let plantType = null;
    const plantJSON =
      typeof window != 'undefined' && localStorage.getItem('plant');
    if (plantJSON !== null) {
      plantType = JSON.parse(plantJSON).type;
    }
    setPlantTypeSeed(plantType);

    for (let i = 0; i < 8; i++) {
      (function(i) {
        setTimeout(function() {
          createZombie(i);
        }, 4000 * i + 3000 / i);
      })(i);
    }
  }, []);

  const createZombie = zombieIndex => {
    let newZombie = zombieRef.current.cloneNode(true);
    newZombie.id = `zombie-${zombieIndex}`;
    newZombie.style.display = 'block';
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
      if (xPosition <= window.innerWidth / 2) {
        zombie.style.left = `${xPosition - 1}px`;
        clearInterval(moveZombieInterval);
        setStoryModalDisplay(true);
        setTimeout(() => zombie.remove(), 3500)
      } else {
        zombie.style.left = `${xPosition - 1}px`;
      }
    }, 30);
  };

  const randomNumber = (start, end) => Math.floor(Math.random() * end) + start;

  return (
    <Layout>
      <MainContainer>
        <Header>
          <BackLink to={`/`}>
            <FaChevronLeft />
            <span>Back</span>
          </BackLink>
          <Title />
          <BackLink to={`/overview`}>
            <span>Skip ></span>
          </BackLink>
        </Header>
        <GameContainer id="game-container" ref={gameContainer}>
          <StoryTeller display={showStoryModal} plantType={plantType} />
          <RightCloud />
          <LeftCloud />
          <div id="initialzombie" ref={zombieRef} style={{ display: 'none' }}>
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
