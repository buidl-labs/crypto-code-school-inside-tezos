import Portal from '../Portal/index';
import RobotContainer from './Robot';
import styled from '@emotion/styled';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa';
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics';
import { PLANT_GROWTH } from '../Plants/PLANT_GROWTH';
import StyledLink, { CustomLink } from '../StyledLink';
//TODO: Stage update doesn't work properly
const cryptobotsParts = ['legs', 'abdomen', 'chest + shooter', 'head'];

const stages = [
  {
    stage: 0,
    description: {
      before:
        'Virtual highfive! You have successfully completed stage 1 of your learning 👏👏\n You can now power on the cryptobot parts building machine to assemble your 1st part!',
      after: `Congratulations! You were able to build the ${cryptobotsParts[0]} of your cryptobot!`,
    },
    nextChapterLink: '',
  },
  {
    stage: 1,
    description: {
      before:
        'Virtual highfive! You have successfully completed stage 2 of your learning 👏👏\n You can now power on the cryptobot parts building machine to assemble your 2nd part!',
      after: `Congratulations! You were able to build the ${cryptobotsParts[0]} of your cryptobot!`,
    },
    nextChapterLink: '',
  },
  {
    stage: 2,
    description: {
      before:
        'Virtual highfive! You have successfully completed stage 3 of your learning 👏👏\n You can now power on the cryptobot parts building machine to assemble your 3rd part!',
      after: `Congratulations! You were able to build the ${cryptobotsParts[1]} of your cryptobot!`,
    },
    nextChapterLink: '',
  },
  {
    stage: 3,
    description: {
      before:
        'Virtual highfive! You have successfully completed stage 4 of your learning 👏👏\n You can now power on the cryptobot parts building machine to assemble your 4th part!',
      after: `Congratulations! You were able to build the ${cryptobotsParts[2]} of your cryptobot!`,
    },
    nextChapterLink: '',
  },
  {
    stage: 4,
    description: {
      before:
        'Virtual highfive! You have successfully completed stage 5 of your learning 👏👏\n You can now power on the cryptobot parts building machine to assemble your 5th part!',
      after: `Congratulations! You were able to build the ${cryptobotsParts[3]} of your cryptobot!`,
    },
    nextChapterLink: '',
  },
  {
    stage: 5,
    description: {
      before:
        'You have successfully completed this chapter. You can now try to evolve your Cryptobot to final stage.',
      after:
        'The machine has oiled up your parts and inserted your gem to power up your cryptobot!',
    },
    nextChapterLink: '',
  },
];

const InfoToUser = ({ currentStage, evolutionStatus }) => {
  const renderNewLines = infoString =>
    infoString.split('\n').map((i, key) => {
      return (
        <p style={{ marginBottom: '2px' }} key={key}>
          {i}
        </p>
      );
    });

  const stringToShowUser =
    currentStage > 6
      ? `You have successfully completed the chapter and evolved your
        Cryptobot to defend against the aliens.`
      : !evolutionStatus
      ? renderNewLines(stages[currentStage].description.before)
      : renderNewLines(stages[currentStage].description.after);

  return <p>{stringToShowUser}</p>;
};

const PlantGrowthModalView = ({ currentChapter, nextSlug, onToggle }) => {
  const [stage, updateStage] = useState(() => {
    let stage = 0;
    switch (currentChapter) {
      case PLANT_GROWTH.STAGE_1:
        stage = 0;
        break;
      case PLANT_GROWTH.STAGE_2:
        stage = 1;
        break;
      case PLANT_GROWTH.STAGE_3:
        stage = 2;
        break;
      case PLANT_GROWTH.STAGE_4:
        stage = 3;
        break;
      case PLANT_GROWTH.STAGE_5:
        stage = 4;
        break;
    }
    return stage;
  });
  const [isEvolved, setEvolved] = useState(false);
  useEffect(() => {
    if (isEvolved) {
      setTimeout(() => {
        switch (currentChapter) {
          case PLANT_GROWTH.STAGE_1:
            updateStage(1);
            break;
          case PLANT_GROWTH.STAGE_2:
            updateStage(2);
            break;
          case PLANT_GROWTH.STAGE_3:
            updateStage(3);
            break;
          case PLANT_GROWTH.STAGE_4:
            updateStage(4);
            break;
          case PLANT_GROWTH.STAGE_5:
            updateStage(5);
            break;
        }
      }, 2000);
    }
  }, [isEvolved]);

  return (
    <Portal>
      <div>
        <StyledOutboundLink
          rel="noopener"
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=I just completed Chapter ${currentChapter} of Cryptoverse Wars - a metaverse created by @buidllabs to help in learning to build DApps on @Tezos using @SmartPy_io!%0D%0DHaving super fun building my own Cryptobot 🤖 to fight the 👽 invasion!%0D%0D&url=https%3A%2F%2Fcryptocodeschool.in%2Ftezos&hashtags=Tezos,SmartPy,DApps&related=twitter%3ABUIDLabs
          `}
        >
          <FaTwitter />
          <span>Tweet</span>
        </StyledOutboundLink>
        <CloseIconContainer>
          <IoIosClose
            style={{ margin: '5px' }}
            color="#fff"
            size={48}
            onClick={() => {
              onToggle();
            }}
          />
        </CloseIconContainer>
        <div>
          <RobotContainer isEvolved={isEvolved} stage={stage} />
        </div>
        <Container>
          <ContentContainer>
            <h3>3D printing cryptobot parts 🤖</h3>
            <InfoToUser currentStage={stage} evolutionStatus={isEvolved} />
            {!isEvolved ? (
              <EvolutionButton
                onClick={() => {
                  setEvolved(true);
                }}
              >
                Power on the cryptobots part building machine!
              </EvolutionButton>
            ) : nextSlug ? (
              <StyledLink to={`/lesson/${nextSlug}`}>
                Proceed <FaChevronRight />
              </StyledLink>
            ) : (
              <StyledLink to={`/tezos/game`}>
                Proceed <FaChevronRight />
              </StyledLink>
            )}

            {nextSlug ? (
              <NextLink to={`/lesson/${nextSlug}`}>Skip and Continue</NextLink>
            ) : (
              <NextLink to={`/tezos/game`}>Skip and Continue</NextLink>
            )}
          </ContentContainer>
        </Container>
      </div>
    </Portal>
  );
};

const Container = styled.div`
  position: absolute;
  max-width: 90%;
  max-height: calc(100% - 200px);
  transform: translate(-2%, 50%);
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
  height: 60px;
  :hover {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const ContentContainer = styled.div`
  color: white;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    text-align: center;
    color: #ffffff;
    margin: 10px 0;

    @media only screen and (max-height: 700px) {
      font-size: 30px;
      line-height: 30px;
    }
  }

  p {
    text-align: center;
    margin-top: 0;
    max-width: 600px;

    @media only screen and (max-height: 700px) {
      font-size: 16px;
    }
  }

  @media only screen and (max-height: 700px) {
    margin-top: 1rem;
  }
`;

const ProceedLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-top: 10px;

  background: #18b77e;
  border-radius: 10px;
  border: none;
  width: 196px;
  height: 68px;
  color: #fff;
  transition: 0.3s;
  outline: none;

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: 1px;
  }

  :hover {
    background: #18a472;
    cursor: pointer;
  }

  @media only screen and (max-height: 700px) {
    width: inherit;
    height: inherit;
    padding: 5px 15px;
    font-size: 22px;
  }
`;

const EvolutionButton = CustomLink.withComponent('button');

const NextLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-top: 10px;
  color: #fff;
  transition: 0.3s;
  outline: none;

  :hover {
    cursor: pointer;
    color: #fff;
  }
`;

const StyledOutboundLink = styled(OutboundLink)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem 1rem;
  background: #1b95e0;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  border-radius: 5px;

  > svg {
    margin-right: 5px;
  }

  :hover {
    background: #2ea6f1;
    color: #fff;
  }
`;

export default PlantGrowthModalView;
