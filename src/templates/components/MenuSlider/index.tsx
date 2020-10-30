import React, {useEffect} from 'react';
import useChapters from '../../../hooks/use-chapters';
import {
  SideDrawer,
  Backdrop, 
  Title,
  ChapterLink,
  SliderHeader,
} from './styled';
import { IoIosClose } from 'react-icons/io';

interface Props {
  openDrawer: boolean;
  toggle(input: boolean): void;
  currentModule: string;
}

const ContentMenu = ({ openDrawer = false, toggle, currentModule}: Props) => {
  const chapters = useChapters(currentModule);
  
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
                  activeStyle={{ background: '#2897ff' }}
                  to={`/tezos/lesson/${chapter.slug}`}
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
