import styled from '@emotion/styled';
import { Link } from 'gatsby';
export const Footer = styled.footer`
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

export const MenuButton = styled.button`
  margin-left: 1rem;
  background: #0e1817;
  border: none;
  cursor: pointer;
  transition: 0.3s;
`;

export const ChapterTitle = styled.p`
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

export const PrevLink = styled(Link)`
  color: #fff;
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

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }
  }
`;

export const ContentIndex = styled.span`
  color: #fff;
`;

export const NextLink = styled(Link)`
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

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }
  }
`;
