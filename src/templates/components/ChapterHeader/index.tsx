import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { Header, BackLink, LessonTitle, HelpButton } from './styled';
import { LeftArrow } from '../../../components/IconSet';

interface Props {
  backLink: string;
}

function ChapterHeader({backLink}: Props) {
  return (
    <Header>
      <BackLink onClick={() => navigate(backLink)}>
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
