import React, { useState, useEffect } from 'react';
import Layout from 'src/components/Layout/layout';
import Theme from 'src/assets/theme.svg';
import StartIcon from 'src/assets/start_icon.svg';
import useChapters from 'src/hooks/use-chapters';
import { Link } from 'gatsby';
import BackLink from 'src/components/BackLink';
import {
  Container,
  ThemeContainer,
  StartLink,
  OverviewContainer,
} from 'src/PagesStyle/OverviewPage/styled';
import Completed from 'src/assets/completed.svg';
import { trackEvent } from 'src/utils/analytics';
import Footer from 'src/components/Footer';
import SEO from 'src/components/Seo';
import styled from '@emotion/styled';
import StyledLink from 'src/components/StyledLink';

function LessonsOverview() {
  const chapters = useChapters("module-1");
  const [chapterList, updateChapterList] = useState(chapters);
  const [continuationLink, setContinuationLink] = useState('/tezos/storyline');
  const [chapterZeroCompleted, setZeroChapterCompleted] = useState(() => {
    let result = false;
    const isChapterZeroCompleted =
      typeof window != 'undefined' && localStorage.getItem('chapter-0');
    if (isChapterZeroCompleted !== null) {
      result = isChapterZeroCompleted;
    }

    return result;
  });

  useEffect(() => {
    //get the previous stored if available otherwise create a new one
    let list = [];
    const listJSON =
      typeof window != 'undefined' && localStorage.getItem('lesson-v1');
    if (listJSON !== null) {
      list = JSON.parse(listJSON);
      //handle backward compatibility by removing chapters where current key isn't available
      list = list.filter(chapter => chapter && chapter.current);
      typeof window != 'undefined' &&
        localStorage.setItem('lesson-v1', JSON.stringify(list));
      // console.log('updatedList', updatedList);
      // console.log('chapters', chapters);
    }
    //Generate chapter continuation route link
    //check if first chapter zero is successfully completed or not
    if (!chapterZeroCompleted) {
      // console.log('storyline');
      setContinuationLink('/tezos/storyline');
      return;
    }
    //Go to next chapter route link from last successfully completed chapter
    // if no chapter completed --> show first-chapter
    // console.log('list', list);
    if (list.length === 0) {
      setContinuationLink('/lesson/chapter-01');
    } else if (list.length > 0) {
      const chapterSlug =
        chapters[list[list.length - 1].current] &&
        chapters[list[list.length - 1].current].slug;
      if (!chapterSlug) {
        // if if last chapter completed --> show up-next page
        setContinuationLink('/tezos/game');
      } else {
        // if 1st chapter completed show --> next chapter i.e 2nd chapter and so on
        setContinuationLink(`/lesson/${chapterSlug}`);
      }
    }
  }, []);

  useEffect(() => {
    trackEvent('Chapters-Overview-View');
  }, []);

  useEffect(() => {
    //get the previous stored if available otherwise create a new one
    let list = [];
    const listJSON =
      typeof window != 'undefined' && localStorage.getItem('lesson-v1');
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
        editor: chapter.editor,
      };
    });

    updateChapterList(newChapterList);
  }, []);

  useEffect(() => {
    SyncSavedUserProgressWithLatestUpdates();
  }, []);

  const SyncSavedUserProgressWithLatestUpdates = () => {
    let list = [];
    const listJSON =
      typeof window != 'undefined' && localStorage.getItem('lesson-v1');
    if (listJSON !== null) {
      list = JSON.parse(listJSON);
    }
    if (list.length > 0) {
      const updateList = list.filter(currentSavedChapter => {
        const result = chapterList.find(ch => {
          return ch.editor.answer === currentSavedChapter.code;
        });
        return result;
      });
      // console.log('updateList', updateList);
      //update stored user progress lesson chapters
      //sync it according to latest content
      localStorage.setItem('lesson-v1', JSON.stringify(updateList));
    }
  };

  return (
    <Layout
      background={`radial-gradient(
        144.9% 144.89% at 53.86% -49.56%,
        #09272E 43.89%,
        #1F476B 100%
      )
      no-repeat center center fixed`}
    >
      <SEO title="Chapters Overview" />
      <Container>
        <div>
          <BackLink to="/tezos" />
        </div>
        <ThemeContainer>
          <Theme />
        </ThemeContainer>
        <OverviewContainer>
          <div>
            <h1>Your mission's briefing:</h1>
            <p> 👽 An alien invasion is incoming! 👽</p>
            <p>
              At the starting of your journey, the school bestows upon you a
              unique gem. This gem, when inserted into the chest of any
              cryptobot, gives the cryptobot alien-killing cosmic superpowers!
              <br />
              🤖+ 💎 = 🤖++
            </p>
            <p>
              Your mission is to build and assemble the cryptobot from scratch
              and then use use the gem to power your cryptobot to battle the
              incoming alien invasion!
            </p>
            <p>
              In this lesson, you’re going to learn how to assemble your own
              cryptobot and give it defense and offense functionalities by
              building a simple smart contract in SmartPy which can be deployed
              on the Tezos blockchain.
            </p>
            <p>
              At the end of lesson, you will help your gem-powered cryptobot in
              aiming to blast the aliens out of our world!
              <br />
              🤖 ⚔️ 👽
            </p>
            <div>
              <StyledLink
                style={{ padding: '15px 35px' }}
                to="/tezos/storyline"
              >
                Let's roll!
              </StyledLink>
            </div>
          </div>
          <div>
            <div>
              <h2>Chapters</h2>
              <StartLink to={continuationLink}>
                <StartIcon />
              </StartLink>
            </div>
            <ul>
              <li>
                <Link to={`/tezos/storyline`}>
                  {chapterZeroCompleted ? (
                    <Completed width="38" height="38" />
                  ) : null}
                  Chapter 0 - Alien Invasion Begins
                </Link>
                <hr />
              </li>
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

const StartLessonLink = styled(Link)`
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

  margin: 3rem auto 3rem auto;

  :hover {
    box-shadow: 0 0 0 0.25rem rgba(41, 203, 106, 0.2);
  }
`;

export default LessonsOverview;
