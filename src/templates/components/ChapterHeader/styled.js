import styled from '@emotion/styled';
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics';
import { HeaderHeight } from '../../chapter.styled';
export const Header = styled.header`
  grid-area: header;
  height: ${HeaderHeight};
  background-color: #0e1817;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BackLink = styled.button`
  color: white;
  margin-left: 2rem;
  text-decoration: none;
  background: #0e1817;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  padding: 0.6rem;
  border-radius: 50%;
  outline: none;
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }

  > svg {
    vertical-align: middle;
  }
`;

export const LessonTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 0;

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export const HelpButton = styled(OutboundLink)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  background-color: #0e1817;
  color: #fff;
  transition: 0.3s;
  margin-right: 1rem;
  cursor: pointer;
  padding: 5px 15px;

  :hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;
