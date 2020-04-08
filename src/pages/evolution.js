import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import FirePlant from '../components/Plants/Fire';
import WaterPlant from '../components/Plants/Water';
import ElectricPlant from '../components/Plants/Electric';
import GrassPlant from '../components/Plants/Grass';
import IcePlant from '../components/Plants/Ice';
import Modal from '../components/EvolutionModal/index';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'gatsby';

const plantsList = [FirePlant, WaterPlant, ElectricPlant, IcePlant, GrassPlant];
const randomPlant = plantsList[Math.floor(Math.random() * plantsList.length)];

function Evolution() {
  const [stage, updateStage] = useState(1);
  //TODO: randomly select plant b/w fire, water, electric, grass and ice type
  //select plants sub parts randomly from options given before showing plant growth
  const plantsType = {
    fire: randomPlant,
  };

  const Body = styled(plantsType.fire.body[2])`
    position: absolute;
    top: 45%;
    width: 100%;
    height: 35%;
    left: 0;
  `;
  const Eye = styled(plantsType.fire.eyes[2])`
    position: absolute;
    height: 50%;
    z-index: 2;
    width: 50%;
    left: 38.5%;
    top: -18%;
  `;
  const Hair = styled(plantsType.fire.hair[0])`
    position: absolute;
    top: -31px;
    height: 40%;
    z-index: -1;
    left: -35%;
    transform: translate(14px, 10px);
  `;
  const HeadSVG = styled(plantsType.fire.head[0])`
    height: 100%;
    position: absolute;
    left: 22.5%;
    top: -27%;
    width: 100%;
  `;
  const BackLeaves = styled(plantsType.fire.backLeaves[0])`
    position: absolute;
    top: 60%;
    width: 100%;
    height: 30%;
    left: 0;
  `;
  const FrontLeaves = styled(plantsType.fire.frontLeaves[0])`
    position: absolute;
    top: 70%;
    width: 100%;
    height: 30%;
    left: 0;
  `;
  const PatternSVG = styled(plantsType.fire.patterns[0])`
    position: absolute;
    height: 15%;
    z-index: 2;
    width: 40%;
    left: 21.5%;
    top: 14%;
  `;

  const Plant = styled.div`
    position: absolute;
    top: 41%;
    left: 50%;
    transform: translate(-55%, -70%);
    width: 150px;
    height: 210px;
  `;

  const glowAnimation = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(0.9); }
    50% {
        transform: translate(-50%, -50%) scale(1); }
    100% {
        transform: translate(-50%, -50%) scale(0.9); }
  `;
  const Glow = styled.div`
    height: 350px;
    width: 350px;
    position: relative;
    top: 30%;
    left: 50%;
    animation: ${glowAnimation} 3s infinite;
    background: rgba(208, 252, 255, 0.15);
    border-radius: 100%;
  `;

  const SeedSVG = styled(plantsType.fire.seed[0])`
    position: absolute;
    top: 26%;
    left: 25%;
    transform: translate(-55%, -70%);
  `;

  return (
    <>
      <Modal>
        <Glow />
        <Plant>
          <SeedSVG
            style={{ transform: `${stage === 1 ? 'scale(1)' : 'scale(0)'}` }}
          />
          <BackLeaves
            style={{ transform: `${stage >= 2 ? 'scale(1)' : 'scale(0)'}` }}
          />
          <Body
            style={{ transform: `${stage >= 3 ? 'scale(1)' : 'scale(0)'}` }}
          />
          <HeadSVG
            style={{ transform: `${stage >= 4 ? 'scale(1)' : 'scale(0)'}` }}
          />
          <Eye
            style={{ transform: `${stage >= 5 ? 'scale(1)' : 'scale(0)'}` }}
          />
          <Hair
            style={{ transform: `${stage >= 6 ? 'scale(1)' : 'scale(0)'}` }}
          />
          <FrontLeaves
            style={{ transform: `${stage >= 2 ? 'scale(1)' : 'scale(0)'}` }}
          />
          <PatternSVG
            style={{ transform: `${stage >= 6 ? 'scale(1)' : 'scale(0)'}` }}
          />
        </Plant>
        <ContentContainer>
          <h3>Success</h3>
          <p>
            You have successfully completed the chapter and evolved your plants
            to defend against the zombies.
          </p>
          <ProceedLink to="/">
            Proceed <FaChevronRight />
          </ProceedLink>
          <button
            onClick={() => {
              updateStage(prevStage => prevStage + 1);
              //set background color to dark
              //setTimeout after 2000 milliseconds
              //lighten the background color
              //setTimeout for showing plant growth to 1000 milliseconds
              console.log('stage', stage);
            }}
          >
            Evolve
          </button>
        </ContentContainer>
      </Modal>
    </>
  );
}

const ContentContainer = styled.div`
  color: white;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 54px;
    line-height: 63px;
    text-align: center;
    color: #ffffff;
    margin: 10px 0;
  }

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    margin-top: 0;
    max-width: 600px;
  }
`;

const ProceedLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  background: #18b77e;
  border-radius: 10px;
  border: none;
  width: 196px;
  height: 68px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 30px;
  color: #fff;
  transition: 0.3s;

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: 1px;
  }

  :hover {
    background: #18a472;
  }
`;

export default Evolution;

//body-eyes-fire-hair-head-backLeaves-frontLeaves-patterns: plant-type
//[0-3][0-3][1][0-3][0-3][0-3][0-3][1-2][0-3]

// const plantsType = {
//   fire: {
//     body: [1, 2, 3, 4],
//     eyes: [1, 2, 3, 4],
//     fire: [1],
//     hair: [1, 2],
//     head: [1],
//     backLeaves: [1, 2, 3, 4],
//     frontLeaves: [1, 2, 3, 4],
//     patterns: [1, 2, 3, 4],
//   },
// };

//Evolution growth cycle
//seed --> bottom back_front-leaves --> body --> head --> eyes --> hair --> addition attribute(spark, ice/fire head etc)
// const stages = [
//   'seedIncubation',
//   'seedToLeaves',
//   'AddBody',
//   'AddHead',
//   'AddEyes',
//   'AddHair',
// ];

//chapter 1 --> `*(Animation of seed being set in an incubator)*`
//chapter 3(state variables) `*(Animation of seed growing into leaves)*`
//chapter 6(booleans) `*(Animation of body growing)*`
//chapter 8(Math Operations) `*(Animation of head growing)*`
//chapter 11(Address) `*(Animation of eyes growing)*`
//chapter 12(Verify) `*(Animation of hair growing)*` --> plant has fully grown --> to battle zombie apocalypse

//Approach one
//Select seed type at random b/w [fire, water, electric, grass, ice]
//build the selected plant type in 6 stages
//for every stage select plant body part at random from available list
//Approach two
