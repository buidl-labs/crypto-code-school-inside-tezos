import React, { useState } from 'react';
import useChapters from '../../../hooks/use-chapters';
import {
  SideDrawer,
  Backdrop,
  Title,
  ListItem,
  ChapterLink,
  SliderHeader,
} from './styled';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ContentMenu = ({ openDrawer = false, toggle }) => {
  const chapters = useChapters();
  console.log('chapters', chapters);
  return (
    <>
      {openDrawer ? <Backdrop onClick={toggle} show={openDrawer} /> : null}
      <SideDrawer show={openDrawer}>
        <SliderHeader>
          <Title>Introduction to SmartPy</Title>
          <AiOutlineCloseCircle
            style={{ margin: '1rem' }}
            color="#fff"
            size={30}
            onClick={toggle}
          />
        </SliderHeader>
        <hr />
        <ul>
          {chapters.map(chapter => {
            return (
              <ListItem>
                <ChapterLink to={`/lesson/${chapter.slug}`}>
                  {chapter.chapter}: {chapter.title}
                </ChapterLink>
              </ListItem>
            );
          })}
        </ul>
      </SideDrawer>
    </>
  );
};

// const SideDrawer = styled.div`
//   height: 100%;
//   background: white;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 400px;
//   z-index: 200;
//   box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
//   transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-100%)')};
//   transition: transform 0.3s ease-out;
//   background-color: #1b3738;
//   overflow-y: auto;
// `;

// const Backdrop = styled.div`
//   display: ${props => (props.show ? 'block' : 'none')};
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 100;
//   top: 0;
//   left: 0;
// `;

// const Title = styled.h2`
//   font-size: 20px;
//   color: #fdf7f7;
//   font-family: Roboto;
//   font-weight: 400;
//   text-align: left;
//   margin: 1rem;
// `;

// const ListItem = styled.li`
//   color: #fff;
//   text-align: left;
//   padding: 0.5rem;
//   font-size: 26px;
// `;

// const ChapterLink = styled(Link)`
//   text-decoration: none;
//   color: #fff;

//   :hover {
//     color: #18b77e;
//   }
// `;

export default ContentMenu;
