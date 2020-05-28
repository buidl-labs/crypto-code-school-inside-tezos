import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const SideDrawer = styled.div`
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 420px;
  z-index: 200;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-130%)')};
  transition: transform 0.3s ease-out;
  background-color: #091a28;
  overflow-y: auto;

  ul {
    list-style-type: none;
    padding: 0;
    margin-left: 0;
  }

  @media only screen and (max-width: 767px) {
    width: 100vw;
  }
`;

export const Backdrop = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  top: 0;
  left: 0;
`;

export const Title = styled.h2`
  align-self: center;
  margin: 1rem;
  color: #ffffff;
`;

export const ChapterLink = styled(Link)`
  display: block;
  color: #fff;
  text-align: left;
  padding: 0.5rem;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 300;
  text-decoration: none;
  transition: 0.25s ease-in;

  :hover {
    background: rgba(109, 179, 243, 0.1);
    color: #fff;
  }
`;

export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
