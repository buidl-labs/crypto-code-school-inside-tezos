import React from 'react';
import styled from '@emotion/styled';
import { FaChevronLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';

function ChapterHeader() {
  return (
    <Header>
      <BackLink onClick={() => navigate('/')}>
        <FaChevronLeft size={30} />
      </BackLink>
      <LessonTitle>Lesson: Introduction to Smartpy</LessonTitle>
      <HelpButton>Get Help</HelpButton>
    </Header>
  );
}

const Header = styled.header`
  grid-area: header;
  height: 70px;
  background-color: #0e1817;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackLink = styled.button`
  color: white;
  margin-left: 1rem;
  text-decoration: none;
  background: #0e1817;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  padding: 0.8rem;
  border-radius: 50%;
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  > svg {
    vertical-align: middle;
  }
`;

const LessonTitle = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  text-align: center;
  line-height: 27px;
  color: #ffffff;
`;

const HelpButton = styled.button`
  border: 2px solid #ffffff;
  box-sizing: border-box;
  width: 118px;
  height: 45px;
  background-color: #0e1817;
  color: #fff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  transition: 0.3s;
  margin-right: 1rem;
  cursor: pointer;

  :hover {
    background-color: #fff;
    color: #0e1817;
  }
`;

export default ChapterHeader;
