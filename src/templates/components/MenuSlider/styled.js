import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const SideDrawer = styled.div`
  height: 100%;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  z-index: 200;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-out;
  background-color: #1b3738;
  overflow-y: auto;
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
  font-size: 20px;
  color: #fdf7f7;
  font-family: Roboto;
  font-weight: 400;
  text-align: left;
  margin: 1rem;
`;

export const ListItem = styled.li`
  color: #fff;
  text-align: left;
  padding: 0.5rem;
  font-size: 22px;
`;

export const ChapterLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  :hover {
    color: #18b77e;
  }
`;

export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
