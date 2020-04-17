import React, { useEffect } from 'react';
import Layout from '../components/Layout/layout';
import Plants from '../assets/plants.svg';
import learningInterface from '../images/Interface.png';
import HomepageHeroImage from '../components/BackgroundImages/HomepageHero';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'gatsby';
import Footer from '../components/Footer';
import { trackEvent } from '../utils/analytics';
import {
  LeftCloud,
  RightCloud,
  HeroContainer,
  HeroTitle,
  HeroSubheading,
  FlexContainer,
  InnerContainer,
  StartLink,
  GridContainer,
  ButtonContainer,
  Zombie,
  StartLearning,
  Plant,
  Logo,
} from '../PagesStyle/LandingPage/styled';

const HomePage = () => {
  useEffect(() => {
    trackEvent('Chapters-Overview-View');
  }, []);

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
        <RightCloud />
        <LeftCloud />
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
      <Footer />
    </Layout>
  );
};

export default HomePage;
