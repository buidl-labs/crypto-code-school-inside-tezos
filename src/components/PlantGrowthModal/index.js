import Portal from '../Portal/index';
import PlantContainer from './Plant';
import styled from '@emotion/styled';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { FaTwitter } from 'react-icons/fa';
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics';

const stages = [
  {
    stage: 0,
    description: {
      before:
        'You have successfully completed this chapter. You can now try to evolve your plant to stage one.',
      after:
        'You have successfully completed this chapter. You can now try to evolve your plant to stage one.',
    },
    nextChapterLink: '',
  },
  {
    stage: 1,
    description: {
      before:
        'You have successfully completed this chapter. You can now try to evolve your plant to stage two.',
      after:
        "You have successfully completed the chapter and evolved your plant's seed  into leaves",
    },
    nextChapterLink: '',
  },
  {
    stage: 2,
    description: {
      before:
        'You have successfully completed this chapter. You can now try to evolve your plant to stage three.',
      after:
        "You have successfully completed the chapter and evolved your plant's body",
    },
    nextChapterLink: '',
  },
  {
    stage: 3,
    description: {
      before:
        'You have successfully completed this chapter. You can now try to evolve your plant to stage four.',
      after:
        "You have successfully completed the chapter and evolved your plant's head",
    },
    nextChapterLink: '',
  },
  {
    stage: 4,
    description: {
      before:
        'You have successfully completed this chapter. You can now try to evolve your plant to stage five.',
      after:
        "You have successfully completed the chapter and evolved your plant's eyes",
    },
    nextChapterLink: '',
  },
  {
    stage: 5,
    description: {
      before:
        'You have successfully completed this chapter. You can now try to evolve your plant to final stage.',
      after:
        'You have successfully completed the chapter and evolved your plant to defend against the zombies.',
    },
    nextChapterLink: '',
  },
];

const PlantGrowthModalView = ({ currentChapter, nextSlug, onToggle }) => {
  const [stage, updateStage] = useState(() => {
    let stage = 0;
    switch (currentChapter) {
      case 1:
        stage = 0;
        break;
      case 3:
        stage = 1;
        break;
      case 6:
        stage = 2;
        break;
      case 11:
        stage = 3;
        break;
      case 14:
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
          case 1:
            updateStage(1);
            break;
          case 3:
            updateStage(2);
            break;
          case 6:
            updateStage(3);
            break;
          case 11:
            updateStage(4);
            break;
          case 14:
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
          href={`https://twitter.com/intent/tweet?text=I just completed Chapter ${currentChapter}! %23CryptoCodeSchool%20I Evolved my plant and learned more about %23Smartpy development. Evolve your own plant and battle out zombie apocalypse: &url=https://cryptocodeschool.in/tezos`}
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
          <PlantContainer isEvolved={isEvolved} stage={stage} />
        </div>
        <Container>
          <ContentContainer>
            <h3>Success</h3>
            <p>
              {stage > 6
                ? `You have successfully completed the chapter and evolved your
              plants to defend against the zombies.`
                : !isEvolved
                ? stages[stage].description.before
                : stages[stage].description.after}
            </p>
            {!isEvolved ? (
              <EvolutionButton
                onClick={() => {
                  setEvolved(true);
                }}
              >
                Evolve
              </EvolutionButton>
            ) : nextSlug ? (
              <ProceedLink to={`/lesson/${nextSlug}`}>
                Proceed <FaChevronRight />
              </ProceedLink>
            ) : (
              <ProceedLink to={`/tezos/game`}>
                Proceed <FaChevronRight />
              </ProceedLink>
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
  margin-top: 10px;

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
`;

const EvolutionButton = ProceedLink.withComponent('button');

const NextLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  margin-top: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 30px;
  color: #fff;
  transition: 0.3s;
  outline: none;

  :hover {
    cursor: pointer;
  }
`;

const StyledOutboundLink = styled(OutboundLink)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
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
  }
`;

export default PlantGrowthModalView;
