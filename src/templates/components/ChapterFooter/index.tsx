import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ContentMenuSlider from '../MenuSlider/index';
import {
  Footer,
  MenuButton,
  ChapterTitle,
  PrevLink,
  ContentIndex,
  NextLink,
} from './styled';
interface Props {
  chapter: string;
  title: string;
  chapterIndex: {
    current: number;
    total: number;
    nextSlug: string;
    prevSlug: string;
  };
}

function ChapterFooter({
  chapter,
  title,
  chapterIndex: { current, total, nextSlug, prevSlug },
}: Props) {
  const [openDrawer, toggleDrawer] = useState(false);
  const toggle = () => {
    toggleDrawer(openDrawer => !openDrawer);
  };
  return (
    <Footer>
      <div>
        <MenuButton>
          <IoIosMenu onClick={toggle} size={36} color="#fff" />
          <ContentMenuSlider openDrawer={openDrawer} toggle={toggle} />
        </MenuButton>
        <ChapterTitle>
          {chapter}
          {': '}
          {title}
        </ChapterTitle>
      </div>
      <div>
        {prevSlug ? (
          <PrevLink to={`/lesson/${prevSlug}`}>
            <FaChevronLeft />
            <span>Prev</span>
          </PrevLink>
        ) : null}

        <ContentIndex>
          {current}/{total}
        </ContentIndex>
        {nextSlug ? (
          <NextLink to={`/lesson/${nextSlug}`}>
            <span>Next</span> <FaChevronRight />
          </NextLink>
        ) : (
          <NextLink to="/">
            <span>Finish</span> <FaChevronRight />
          </NextLink>
        )}
      </div>
    </Footer>
  );
}

export default ChapterFooter;
