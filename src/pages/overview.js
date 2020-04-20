import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/layout';
import Theme from '../assets/theme.svg';
import IceSeed from '../assets/Seeds/Ice.svg';
import ElectricSeed from '../assets/Seeds/electricity.svg';
import FireSeed from '../assets/Seeds/fire.svg';
import GrassSeed from '../assets/Seeds/grass.svg';
import WaterSeed from '../assets/Seeds/water.svg';

import StartIcon from '../assets/start_icon.svg';
import useChapters from '../hooks/use-chapters';
import { Link } from 'gatsby';
import BackLink from '../components/BackLink';
import {
  Container,
  ThemeContainer,
  StartLink,
  OverviewContainer,
} from '../PagesStyle/OverviewPage/styled';
import Completed from '../assets/completed.svg';
import { trackEvent } from '../utils/analytics';
import Footer from '../components/Footer';
import SEO from '../components/Seo';
import { PLANT_TYPES } from '../components/Plants/PLANT_TYPES';

function LessonsOverview() {
  const chapters = useChapters();
  const [chapterList, updateChapterList] = useState(chapters);
  const [plantType, setPlantTypeSeed] = useState(null);

  useEffect(() => {
    trackEvent('Chapters-Overview-View');
  }, []);

  useEffect(() => {
    //get the previous stored if available otherwise create a new one
    let list = [];
    const listJSON =
      typeof window != 'undefined' && localStorage.getItem('lesson-1');
    if (listJSON !== null) {
      list = JSON.parse(listJSON);
    }
    const newChapterList = chapters.map(chapter => {
      const chapterAlreadyExists = list.some(savedChapter => {
        return savedChapter.chapterSlug === chapter.slug;
      });
      return {
        title: chapter.title,
        chapter: chapter.chapter,
        slug: chapter.slug,
        excerpt: chapter.excerpt,
        completed: chapterAlreadyExists,
      };
    });

    updateChapterList(newChapterList);
  }, []);

  useEffect(() => {
    let plantType = null;
    const plantJSON =
      typeof window != 'undefined' && localStorage.getItem('plant');
    if (plantJSON !== null) {
      plantType = JSON.parse(plantJSON).type;
    }
    setPlantTypeSeed(plantType);
  }, []);

  const renderPlantTypeSeed = (plantType = null) => {
    switch (plantType) {
      case PLANT_TYPES.ICE:
        return <IceSeed />;
      case PLANT_TYPES.ELECTRIC:
        return <ElectricSeed />;
      case PLANT_TYPES.GRASS:
        return <GrassSeed />;
      case PLANT_TYPES.WATER:
        return <WaterSeed />;
      case PLANT_TYPES.FIRE:
        return <FireSeed />;
      default:
        return null;
    }
  };
  return (
    <Layout
      background={`radial-gradient(
        198.67% 198.67% at 53.06% -50.22%,
        #13282d 53.32%,
        #296460 100%
      )
      no-repeat center center fixed`}
    >
      <SEO title="Chapters Overview" />
      <Container>
        <div>
          <BackLink to="/" />
        </div>
        <ThemeContainer>
          <Theme />
        </ThemeContainer>
        <OverviewContainer>
          <div>
            <div>{renderPlantTypeSeed(plantType)}</div>
            <p>
              In Lesson 1, you're going to incubate your plant to fight against
              zombie apocalypse at end of the lesson.
            </p>
            <p>
              A zombie apocalypse has begun. You’ve luckily found the seed of a
              plant that is known to stop zombies. Your task is to incubate the
              seed and help it evolve before the zombies reach you. In the
              lesson, you’re going to learn how to evolve your plant and train
              it to defend against the incoming apocalypse by building a simple
              smart contract in SmartPy which can be deployed on tezos
              blockchain.
            </p>
          </div>
          <div>
            <div>
              <h2>Chapters</h2>
              <StartLink to="/lesson/chapter-01">
                <StartIcon />
              </StartLink>
            </div>
            <ul>
              {chapterList.map((chapter, index) => {
                return (
                  <li key={index}>
                    <Link to={`/lesson/${chapter.slug}`}>
                      {chapter.completed ? (
                        <Completed width="38" height="38" />
                      ) : null}{' '}
                      {chapter.chapter} - {chapter.title}
                    </Link>
                    <hr />
                  </li>
                );
              })}
            </ul>
          </div>
        </OverviewContainer>
      </Container>
      <Footer />
    </Layout>
  );
}

export default LessonsOverview;
