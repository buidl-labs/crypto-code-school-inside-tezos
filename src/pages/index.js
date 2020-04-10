import React from 'react';
import Layout from '../components/Layout/layout';
import styled from '@emotion/styled';
import LogoSVG from '../assets/theme.svg';
import StartLearningSVG from '../assets/start_learning.svg';
import PlantSVG from '../assets/plant.svg';
import ZombieSVG from '../assets/zombie.svg';
import Plants from '../assets/plants.svg';
import LeftCloudSvg from '../assets/left_cloud.svg';
import RightCloudSvg from '../assets/right_cloud.svg';
import learningInterface from '../images/Interface.png';
import HomepageHeroImage from '../components/BackgroundImages/HomepageHero';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'gatsby';
import { keyframes } from '@emotion/core';

const move = keyframes`
  0% { transform: translateX(30%); opacity: 0.9; }
  100% { transform: translateX(-100%); opacity: 0.9; }
`;

const LeftCloud = styled(LeftCloudSvg)`
  animation-name: ${move};
  animation-duration: 40s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: reverse;
  position: absolute;
  z-index: -1;
  left: 10px;
  right: 10;
  top: 5rem;
`;

const RightCloud = styled(RightCloudSvg)`
  animation-name: ${move};
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: -1;
  right: 10px;
  right: 10;
  top: 10rem;
`;

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
      <HomepageHeroImage>
        {/* <RightCloud /> */}
        {/* <LeftCloud /> */}
        <HeroContainer>
          <div>
            <Logo />
          </div>
          <HeroTitle>Learn to Code Blockchain apps in SmartPy</HeroTitle>
          <HeroSubheading>
            Explore interactive code school and learn to create smart contract
            in smartpy which can be deployed on tezos blockchain.
          </HeroSubheading>
          <InnerContainer>
            <div>
              <Plant />
            </div>
            <div>
              <Link to="/overview">
                <StartLearning />
              </Link>
            </div>
            <div>
              <Zombie />
            </div>
          </InnerContainer>
        </HeroContainer>
      </HomepageHeroImage>
      <div
        style={{
          background: 'linear-gradient(180deg, #1C423C 0%, #366961 100%)',
          paddingBottom: '2rem',
        }}
      >
        <GridContainer style={{ paddingTop: '10rem' }}>
          <div>
            <img src={learningInterface} width="90%" height="90%" />
          </div>
          <FlexContainer>
            <h2>The Interactive School to master Smartpy</h2>
            <p>
              Interactive In-Browser based code editor, with step-by-step
              chapter to help you with an intuitive and effective Smart contract
              language smartpy to creating your own simple smart contract by the
              end of Lesson 1, by end you'll know enough to call your self a
              tezos blockchain developer.
            </p>
          </FlexContainer>
        </GridContainer>
        <GridContainer>
          <FlexContainer>
            <h2>Evolve your plant to fight against a zombie apocalypse</h2>
            <p>
              As you progress through the chapters, you will grow your plant
              which will be generated automatically to help you fight against
              upcoming zombie apocalypse at the end of lessons 1.
            </p>
          </FlexContainer>
          <div>
            <Plants width="auto" height="auto" />
          </div>
        </GridContainer>
        <ButtonContainer>
          <StartLink to="/overview">
            Start Now <FaChevronRight />
          </StartLink>
        </ButtonContainer>
      </div>
      <Footer>
        <FooterInner>
          <div>
            <h3>BUIDL LABS</h3>
            <h3>LOGO X Tezos</h3>
          </div>
          <div>
            <LinkContainer>
              <h4>Navigation</h4>
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Blog</li>
              </ul>
            </LinkContainer>
            <LinkContainer>
              <h4>Social</h4>
              <ul>
                <li>Github</li>
                <li>Twitter</li>
                <li>ProductHunt</li>
              </ul>
            </LinkContainer>
          </div>
        </FooterInner>
        <p>2020 | Footnote</p>
      </Footer>
    </Layout>
  );
};

const Zombie = styled(ZombieSVG)`
  width: 75%;
  max-width: 193px;
  height: auto;
`;

const StartLearning = styled(StartLearningSVG)`
  width: 75%;
  height: auto;
  max-width: 278px;

  :hover {
    cursor: pointer;
    transform: scale(1.1) rotate(-5deg);
  }
`;

const Plant = styled(PlantSVG)`
  width: 75%;
  height: auto;
  max-width: 202px;
`;

const Logo = styled(LogoSVG)`
  max-width: 100%;
  width: 500px;
  height: auto;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 95vh;

  @media only screen and (max-width: 425px) {
    margin: 0 1rem;
    >div: first-of-type {
      margin: 0 1rem;
    }

    h1 {
      font-size: 27px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const HeroTitle = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 95.69%;
  text-align: center;
  color: #ffffff;
  max-width: 800px;
`;

const HeroSubheading = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 162.69%;
  /* or 31px */
  text-align: center;
  color: #98a4a6;
  max-width: 650px;
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 4rem 1rem 0 1rem;
  justify-content: space-between;
  align-items: baseline;
  position: absolute;
  bottom: 0;

  > div:first-of-type {
    margin-left: 4%;
  }
`;

const StartLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  border: 5px solid rgba(41, 203, 106, 0.41);
  background: #29cb6a;
  border-radius: 7px;
  width: 187px;
  height: 74px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 97.69%;
  /* identical to box height, or 20px */
  color: #ffffff;
  transition: 0.3s;
  cursor: pointer;

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: 1px;
  }

  :hover {
    background: rgba(41, 203, 106, 0.41);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 0 1rem 1rem 1rem;

  @media only screen and (max-width: 425px) {
    grid-template-columns: 1fr;

    >div: first-of-type {
      grid-row: 2;
    }

    h2 {
      font-size: 33px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const LinkContainer = styled.div`
  margin: 2rem;

  h4 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    color: #ffffff;
  }

  ul {
    list-style: none;
    margin-top: 0.5rem;
    padding: 0;

    li {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 26px;
      margin-top: 2rem;
      /* identical to box height */

      color: #768987;
    }
  }

  @media only screen and (max-width: 321px) {
    margin: 0rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;

  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 95.69%;
    /* or 43px */
    color: #ffffff;
    margin-bottom: 1rem;
  }

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 162.69%;
    /* or 31px */
    color: #98a4a6;
  }
`;

const Footer = styled.footer`
  background: #1a2a28;
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    background: #1a2a28;
    padding-bottom: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #335a55;
  }
`;

const FooterInner = styled.div`
  background: #1a2a28;
  display: flex;
  justify-content: space-between;
  list-style: none;

  > div:first-of-type {
    margin: 2rem;
    h3 {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 34px;
      line-height: 40px;

      color: #ffffff;
    }
  }
  > div:last-of-type {
    display: flex;
    flex-direction: row;
    margin-right: 2rem;
  }

  @media only screen and (max-width: 550px) {
    display: grid;
    > div:first-of-type {
      grid-row: 2;
    }

    > div:last-of-type {
      display: flex;
      flex-direction: column;

      ul {
        display: flex;

        li {
          padding-right: 1rem;
          margin-top: 1rem;
        }
      }
    }
  }
`;

export default HomePage;
