import React from 'react';
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
}

const ContentMenu = ({ openDrawer = false, toggle }: Props) => {
  const chapters = useChapters();
  return (
    <>
      {openDrawer ? <Backdrop onClick={toggle} show={openDrawer} /> : null}
      <SideDrawer show={openDrawer}>
        <SliderHeader>
          <Title>Chapters</Title>
          <IoIosClose
            data-delay-show="600"
            data-tip="close"
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
