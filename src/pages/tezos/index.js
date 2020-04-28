import React, { useEffect } from 'react';
import Layout from 'src/components/Layout/layout';
import Plants from 'src/assets/plants.svg';
import learningInterface from 'src/images/Interface.png';
import HomepageHeroImage from 'src/components/BackgroundImages/HomepageHero';
import { Link } from 'gatsby';
import Footer from 'src/components/Footer';
import { trackEvent } from 'src/utils/analytics';
import {
  LeftCloud,
  RightCloud,
  HeroContainer,
  HeroTitle,
  HeroSubheading,
  FlexContainer,
  InnerContainer,
  GridContainer,
  ButtonContainer,
  Zombie,
  StartLearning,
  Plant,
  Logo,
} from 'src/PagesStyle/LandingPage/styled';
import SEO from 'src/components/Seo';
import landingPage from 'src/images/landing_page.jpg';
import StyledLink from 'src/components/StyledLink';
import { RightArrow } from 'src/components/IconSet';

const HomePage = () => {
  useEffect(() => {
    trackEvent('Homepage-View');
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
      <SEO
        title="Smartpy tutorial and tezos blockchain programming course"
        keywords={[
          `smartpy`,
          `python`,
          `interactive`,
          `programming`,
          `tutorial`,
          `tezos`,
          `blockchain`,
        ]}
        image={{
          src: landingPage,
          width: 560,
          height: 300,
        }}
      />
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
            in smartpy which can be deployed on tezos blockchain by growing your
            own plant to fight against upcoming zombie apocalypse.
          </HeroSubheading>
          <InnerContainer>
            <div>
              <Plant />
            </div>
            <div>
              <Link to="/tezos/overview">
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
          <div className="render-second-in-mobile-view">
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
          <StyledLink to="/tezos/overview">
            Start Now <RightArrow />
          </StyledLink>
        </ButtonContainer>
      </div>
      <Footer />
    </Layout>
  );
};

export default HomePage;
