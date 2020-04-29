import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { Header, BackLink, LessonTitle, HelpButton } from './styled';
import { LeftArrow } from '../../../components/IconSet';
function ChapterHeader() {
  return (
    <Header>
      <BackLink
        data-delay-show="600"
        data-tip="go back"
        onClick={() => navigate('/tezos/overview')}
      >
        <LeftArrow />
      </BackLink>
      <LessonTitle>Lesson: Introduction to SmartPy</LessonTitle>
      <div style={{ width: 120 }} />
    </Header>
  );
}

export default ChapterHeader;
