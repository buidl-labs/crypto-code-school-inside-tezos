import React from 'react';
import { navigate } from 'gatsby';
import { Header, BackLink, LessonTitle, HelpButton, LeftArrow } from './styled';
function ChapterHeader() {
  return (
    <Header>
      <BackLink onClick={() => navigate('/overview')}>
        <LeftArrow size={30} />
      </BackLink>
      <LessonTitle>Lesson: Introduction to SmartPy</LessonTitle>
      <HelpButton>Get Help</HelpButton>
    </Header>
  );
}

export default ChapterHeader;
