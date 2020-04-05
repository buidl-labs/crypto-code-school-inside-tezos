import React from 'react';
import Layout from '../components/Layout/layout';
import styled from '@emotion/styled';
import Theme from '../assets/theme.svg';
import StartLearning from '../assets/start_learning.svg';
import Plant from '../assets/plant.svg';
import Zombie from '../assets/zombie.svg';
import forest from '../images/forest.png';

const HomePage = () => {
  return (
    <Layout
      background={`radial-gradient(
      198.67% 198.67% at 53.06% -50.22%,
      #13282d 53.32%,
      #296460 100%
    )
    no-repeat center center fixed`}
    >
      <HeroContainer>
        <Theme width="400" height="250" />
        <HeroTitle>Learn to Code Blockchain apps in SmartPy</HeroTitle>
        <HeroSubheading>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias illum
          tempore magni maxime beatae hic cupiditate quae natus, non saepe eius
          perferendis! Fugiat delectus ducimus numquam vitae? Veritatis,
          corrupti debitis!
        </HeroSubheading>
        <InnerContainer
          style={{
            backgroundImage: `url(${forest})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        >
          <div>
            <Plant />
          </div>
          <div>
            <StartLearning />
          </div>
          <div>
            <Zombie />
          </div>
        </InnerContainer>
      </HeroContainer>
    </Layout>
  );
};

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  height: 95vh;
`;

const HeroTitle = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 53px;
  line-height: 97.69%;
  text-align: center;
  color: #ffffff;
  max-width: 730px;
`;

const HeroSubheading = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 162.69%;
  /* or 31px */
  text-align: center;
  color: #98a4a6;
  max-width: 730px;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: baseline;
`;

export default HomePage;
