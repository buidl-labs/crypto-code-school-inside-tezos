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
        data-tip="Go Back"
        onClick={() => navigate('/tezos/overview')}
      >
        <LeftArrow style={{ maxWidth: '40px' }} />
      </BackLink>
      <LessonTitle>Lesson: Introduction to SmartPy</LessonTitle>
      <div style={{ width: 120 }} />
    </Header>
  );
}

export default ChapterHeader;
