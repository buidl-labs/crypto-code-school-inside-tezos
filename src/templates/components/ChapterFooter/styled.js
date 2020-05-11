import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { FooterHeight } from '../../chapter.styled';

export const Footer = styled.footer`
  grid-area: footer;
  background: #0e1817;
  height: ${FooterHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
  }
`;

export const MenuButton = styled.button`
  margin-left: 1rem;
  background: #0e1817;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
`;

export const ChapterTitle = styled.p`
  color: #fff;
  margin-left: 1rem;
  align-self: center;
  margin-bottom: 5px;
`;

export const PrevLink = styled(Link)`
  display: flex;
  color: #fff;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1px;
  text-decoration: none;
  outline: none;
  > span {
    margin-left: 3px;
    align-self: center;
  }

  svg {
    display: flex;
    align-self: center;
  }

  :hover {
    color: #fff;
  }

  ${'' /* > svg {
    display: inline-block;
    vertical-align: middle;
  } */}

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }
  }
`;

export const ContentIndex = styled.span`
  align-self: center;
  color: #fff;
`;

export const NextLink = styled(Link)`
  display: flex;
  color: #fff;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1px;
  text-decoration: none;
  outline: none;
  transition: 0.3s;

  span {
    align-self: center;
    margin-right: 3px;
  }

  svg {
    display: flex;
    align-self: center;
  }

  :hover {
    color: rgba(238, 234, 234, 0.88);
  }

  ${'' /* > svg {
    display: inline-block;
    vertical-align: middle;
  } */}

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }
  }
`;
