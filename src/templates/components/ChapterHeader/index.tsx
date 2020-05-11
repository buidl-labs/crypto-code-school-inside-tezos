import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { Header, BackLink, LessonTitle, HelpButton } from './styled';
import { LeftArrow } from '../../../components/IconSet';
function ChapterHeader() {
  return (
    <Header>
      <BackLink onClick={() => navigate('/tezos/overview')}>
        <LeftArrow />
      </BackLink>
      <LessonTitle>Lesson: Introduction to SmartPy</LessonTitle>
      <HelpButton
        rel="noopener"
        target="_blank"
        href="https://t.me/joinchat/Q4N7fRQPfT1YQvNL1G3xOw"
      >
        Ask Question
      </HelpButton>
    </Header>
  );
}

export default ChapterHeader;
