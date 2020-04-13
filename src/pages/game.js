import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/layout';

import { FaChevronLeft } from 'react-icons/fa';
import Theme from '../assets/theme.svg';
import { Link } from 'gatsby';
import {
  Container,
  BackLink,
  ThemeContainer,
  OverviewContainer,
} from '../PagesStyle/OverviewPage/styled';

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
      <Container>
        <div>
          <BackLink to={`/`}>
            <FaChevronLeft />
            <span>Back</span>
          </BackLink>
        </div>
        <ThemeContainer>
          <Theme />
        </ThemeContainer>
        <OverviewContainer>
          <div>
            <p>
              In Lesson 1, you're going to incubate your plant to fight against
              zombie apocalypse at end of the lesson.
            </p>
            <p>
              A zombie apocalypse has begun. You’ve luckily found the seed of a
              plant that is known to stop zombies. Your task is to incubate the
              seed and help it evolve before the zombies reach you. In the
              lesson, you’re going to learn how to evolve your plant and train
              it to defend against the incoming apocalypse by building a simple
              smart contract in SmartPy which can be deployed on tezos
              blockchain.
            </p>
          </div>
          <div></div>
        </OverviewContainer>
      </Container>
    </Layout>
  );
}

export default Game;
