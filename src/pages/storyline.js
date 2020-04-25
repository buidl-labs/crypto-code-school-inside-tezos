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

  useEffect(() => {
    let plantType = null;
    const plantJSON =
      typeof window != 'undefined' && localStorage.getItem('plant');
    if (plantJSON !== null) {
      plantType = JSON.parse(plantJSON).type;
    }
    setPlantTypeSeed(plantType);

    setTimeout(() => {
        setStoryModalDisplay(true);
    }, 5000)
  }, []);

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
        <GameContainer id="game-container">
          <StoryTeller display={showStoryModal} plantType={plantType} />
          <RightCloud />
          <LeftCloud />
          <div id="initialzombie">
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
