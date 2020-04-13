import React, { useEffect } from 'react';

// components from external libraries
import { Link } from 'gatsby';
import { FaChevronLeft } from 'react-icons/fa';

// custom styles
import Layout from '../components/Layout/layout';
import {
  MainContainer,
  Header,
  Footer,
  GameContainer,
} from '../PagesStyle/GamePage/styled';


const Game = () => {
  useEffect(() => {}, []);

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
        <Header />
        <GameContainer></GameContainer>
        <Footer />
      </MainContainer>
    </Layout>
  );
};

export default Game;
