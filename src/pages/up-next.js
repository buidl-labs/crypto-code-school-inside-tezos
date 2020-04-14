import React, { useEffect } from 'react';
import Layout from '../components/Layout/layout';
import Footer from '../components/Footer';
import BackLink from '../components/BackLink';
import Logo from '../assets/theme.svg';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import LockSVG from '../assets/lock.svg';
import GrownPlant from '../components/PlantGrowthModal/GrownPlant';
import { trackEvent } from '../utils/analytics';

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
      <TopContainer>
        <BackLink />
        <div>
          <Logo />
        </div>
      </TopContainer>
      <MidContainer>
        <div>
          <h2>Success</h2>
          <div style={{ background: 'rgba(208, 252, 255, 0.15)' }}>
            <GrownPlant />
          </div>
          <p>
            You have successfully evolved your plant to face the incoming wave
            of zombie attack.
          </p>
          <BattleLink>
            <span />
            Battle it out
          </BattleLink>
        </div>
        <div>
          <h2>Learn Next</h2>
          <LearnNextContainer>
            <div>
              <LockSVG />
            </div>
            <div>
              <h3>Creating New Generation of Plants</h3>
              <p>about the course</p>
            </div>
          </LearnNextContainer>
          <LearnNextContainer>
            <div>
              <LockSVG />
            </div>
            <div>
              <h3>Army of Plant Defenders</h3>
              <p>about the course</p>
            </div>
          </LearnNextContainer>
          <LearnNextContainer>
            <div>
              <LockSVG />
            </div>
            <div>
              <h3>Advance concept in Smartpy</h3>
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

    h2 {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 44px;
      line-height: 52px;
      /* identical to box height */
      color: #ffffff;
      text-align: center;
    }

    div {
      position: relative;
      width: 250px;
      height: 250px;
      border-radius: 500px;
      margin-top: 42px;
    }

    p {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 34px;
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
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 28px;
      line-height: 110%;
      color: #ffffff;
    }
    p {
      margin-top: 13px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 23px;
      line-height: 110%;
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
      h3 {
        font-size: 24px;
      }
      p {
        font-size: 18px;
      }
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
  font-family: Roboto;
  font-style: normal;
  font-weight: 900;
  font-size: 19px;
  line-height: 22px;
  color: #ffffff;
  transition: 0.3s;

  :hover {
    cursor: pointer;
  }
`;

export default UpNextPage;
