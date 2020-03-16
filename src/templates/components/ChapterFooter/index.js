import React from 'react';
import styled from '@emotion/styled';
import { IoIosMenu } from 'react-icons/io';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'gatsby';

function ChapterFooter() {
  return (
    <Footer>
      <div>
        <MenuButton>
          <IoIosMenu size={36} color="#fff" />
        </MenuButton>
        <ChapterTitle>Chapter 1: Scaffolding A Contract</ChapterTitle>
      </div>
      <div>
        <PrevLink>
          <FaChevronLeft />
          <span>Prev</span>
        </PrevLink>
        <ContentIndex>1/15</ContentIndex>
        <NextLink>
          <span>Next</span> <FaChevronRight />
        </NextLink>
      </div>
    </Footer>
  );
}

const Footer = styled.footer`
  grid-area: footer;
  background: #0e1817;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
  }
`;

const MenuButton = styled.button`
  margin-left: 1rem;
  background: #0e1817;
  border: none;
  cursor: pointer;
  transition: 0.3s;
`;

const ChapterTitle = styled.p`
  color: #fff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1.1rem;
  line-height: 27px;
  margin-left: 1rem;
  display: flex;
  align-self: center;
`;

const PrevLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;

  > span {
    margin-left: 6px;
  }

  > svg {
    display: inline-block;
    vertical-align: middle;
  }
`;

const ContentIndex = styled.span`
  color: #fff;
`;

const NextLink = styled(Link)`
  color: #fff;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  > svg {
    display: inline-block;
    vertical-align: middle;
  }
`;

export default ChapterFooter;
