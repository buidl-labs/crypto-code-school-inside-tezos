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
      <div style={{ willChange: 'transform' }}>
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
            <HeroTitle>
              Learn to code Tezos blockchain DApps in Smartpy <br />
            </HeroTitle>
            <HeroSubheading>
              Crypto Plants Vs Zombies teaches you to write smart contracts in
              SmartPy by evolving a crypto-plant that unleashes hell on the
              incoming zombie apocalypse!
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
              <h2>Interactive Code School to master Smartpy</h2>
              <p>
                The school walks you through the very basics of SmartPy to
                kickstart your smart contract development journey in the Tezos
                ecosystem!
                <br />
                <br />
                By the end of Lesson 1, you'll know enough to officially call
                yourself a Tezos Blockchain developer!
              </p>
            </FlexContainer>
          </GridContainer>
          <GridContainer>
            <FlexContainer>
              <h2>Evolve your plant to fight against a zombie apocalypse!</h2>
              <p>
                At the starting of your journey, the school bestowes upon you a
                unique seed of a plant that is known to stop zombies! *ooh
                exciting*
                <br />
                <br />
                But the seed needs to grow into a full plant to battle the
                zombie apocalypse! *oh no! what do I have to do?*
                <br />
                <br />
                Your mission is to evolve the seed into a plant to fight the
                incoming zombie apocalypse by progressing through the chapters!
                <br />
                <br />
                Are you ready? The world's hope is in your hands!
              </p>
            </FlexContainer>
            <div>
              <Plants width="auto" height="auto" />
            </div>
          </GridContainer>
          <ButtonContainer>
            <StyledLink to="/tezos/overview">
              I'm ready. Take me to my mission! <RightArrow />
            </StyledLink>
          </ButtonContainer>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default HomePage;
