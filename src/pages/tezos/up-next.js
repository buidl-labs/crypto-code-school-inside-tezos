import React, { useEffect } from 'react';
import Layout from 'src/components/Layout/layout';
import Footer from 'src/components/Footer';
import BackLink from 'src/components/BackLink';
import Theme from 'src/assets/theme.svg';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import LockSVG from 'src/assets/lock.svg';
import GrownRobot from 'src/components/PlantGrowthModal/GrownRobot';
import { trackEvent } from 'src/utils/analytics';
import SEO from 'src/components/Seo';
import { ThemeContainer } from 'src/PagesStyle/OverviewPage/styled';
import { css } from '@emotion/core';
import StyledLink from '../../components/StyledLink';
function UpNextPage() {
  useEffect(() => {
    trackEvent('Up-Next-View');
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
      <SEO title="Up Next" />
      <>
        <div
          css={css`
            margin-left: 10px;
            margin-top: 20px;
          `}
        >
          <BackLink to="/tezos/overview" />
        </div>
        <ThemeContainer>
          <Theme />
        </ThemeContainer>
      </>
      <MidContainer>
        <div>
          <h1>Success</h1>
          <div style={{ background: 'rgba(208, 252, 255, 0.15)' }}>
            <GrownRobot />
          </div>
          <p>
            You have successfully evolved your Cryptobot to face the incoming
            wave of alien attack.
          </p>
          <StyledLink style={{ padding: '15px 30px' }} to="/tezos/game">
            Battle it out
          </StyledLink>
        </div>
        <div>
          <h2>Learn Next</h2>
          <LearnNextContainer>
            <div>
              <LockSVG />
            </div>
            <div>
              <h3>Creating New Generation of Cryptobots</h3>
              <p>about the course</p>
            </div>
          </LearnNextContainer>
          <LearnNextContainer>
            <div>
              <LockSVG />
            </div>
            <div>
              <h3>Army of Cryptobot Defenders</h3>
              <p>about the course</p>
            </div>
          </LearnNextContainer>
          <LearnNextContainer>
            <div>
              <LockSVG />
            </div>
            <div>
              <h3>Advance concepts in SmartPy</h3>
              <p>about the course</p>
            </div>
          </LearnNextContainer>
        </div>
      </MidContainer>
      <Footer />
    </Layout>
  );
}
const TopContainer = styled.div`
  div {
    display: flex;
    justify-content: center;
  }
`;
const MidContainer = styled.div`
  margin: 30px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 30px;

  > div:first-of-type {
    max-width: 559px;
    width: 100%;
    max-height: 695px;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 50px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: #ffffff;
      text-align: center;
      margin: 0;
      font-size: 2.5rem;
    }

    div {
      position: relative;
      width: 250px;
      height: 250px;
      border-radius: 500px;
      margin-top: 42px;
    }

    p {
      color: #ffffff;
      width: 348px;
      max-width: 100%;
      height: 118px;
      max-height: 100%;
      text-align: center;
      margin-top: 16px;
    }
  }

  > div:last-of-type {
    h2 {
      font-family: Sigmar One;
      font-style: normal;
      font-weight: normal;
      font-size: 34px;
      line-height: 175%;
      /* identical to box height, or 59px */
      letter-spacing: -0.1em;
      color: #ffffff;
    }
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 100%;
    grid-gap: 0;
    margin: 0;

    > div:first-of-type {
      width: 90%;
      margin: 0 auto;
    }

    > div:last-of-type {
      width: 90%;
      margin: 10px auto;
      h2 {
        margin-top: 32px;
      }
    }
  }
`;

const LearnNextContainer = styled.div`
  display: flex;
  margin-top: 35px;
  > div:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    max-width: 100%;
    height: 155px;
    max-height: 100%;
    background: rgba(196, 196, 196, 0.2);
    border-radius: 10px;
  }

  > div:last-of-type {
    margin-left: 36px;
    h3 {
      color: #ffffff;
    }
    p {
      margin-top: 13px;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  @media only screen and (max-width: 425px) {
    display: grid;
    grid-template-columns: 116px 1fr;

    > div:first-of-type {
      width: 166px;
      max-width: 100%;
      height: 125px;
      max-height: 100%;
    }

    > div:last-of-type {
      ${'' /* h3 {
        font-size: 24px;
      }
      p {
        font-size: 18px;
      } */}
    }
  }
`;

const BattleLink = styled(Link)`
  margin-top: 28px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #29cb6a;
  border: 5px solid rgba(41, 203, 106, 0.41);
  border: none;
  border-radius: 10px;
  width: 228px;
  height: 70px;
  color: #ffffff;
  transition: 0.3s;

  :hover {
    cursor: pointer;
    box-shadow: 0 0 0 0.25rem rgba(41, 203, 106, 0.2);
  }
`;

export default UpNextPage;
