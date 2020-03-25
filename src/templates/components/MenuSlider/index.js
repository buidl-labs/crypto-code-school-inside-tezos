import React from 'react';
import useChapters from '../../../hooks/use-chapters';
import {
  SideDrawer,
  Backdrop,
  Title,
  ListItem,
  ChapterLink,
  SliderHeader,
} from './styled';
import { IoIosClose } from 'react-icons/io';

const ContentMenu = ({ openDrawer = false, toggle, ...args }) => {
  const chapters = useChapters();
  console.log('chapters', chapters);
  console.log('menu', args);
  return (
    <>
      {openDrawer ? <Backdrop onClick={toggle} show={openDrawer} /> : null}
      <SideDrawer show={openDrawer}>
        <SliderHeader>
          <Title>Chapters</Title>
          <IoIosClose
            style={{ margin: '1rem' }}
            color="#fff"
            size={48}
            onClick={toggle}
          />
        </SliderHeader>
        <ul>
          {chapters.map(chapter => {
            return (
              <>
                <ChapterLink
                  partiallyActive={true}
                  activeStyle={{ background: '#18B77E' }}
                  to={`/lesson/${chapter.slug}`}
                >
                  {chapter.chapter}: {chapter.title}
                </ChapterLink>
              </>
            );
          })}
        </ul>
      </SideDrawer>
    </>
  );
};

export default ContentMenu;
