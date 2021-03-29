import React, { useState, useMemo, useEffect, useRef } from 'react';
import { graphql, navigate } from 'gatsby';
import ChapterList from './components/chapter/ChapterList';
import useChapters from '../hooks/use-chapters';
import { getChaptersIndex } from '../utils/index';
import NavBar from './components/chapter/NavBar';
import Footer from './components/chapter/Footer';
import LearningInterface from './components/chapter/LearningInterface';
import CodingInterfaceTaquito from './components/chapter/CodingInterfaceTaquito';

import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { useAtom } from 'jotai';
import { updateProgress } from 'src/api';

import { trackEventWithProperties } from 'src/utils/analytics';

export const query = graphql`
  query($slug: String!, $module: String!) {
    mdx(frontmatter: { slug: { eq: $slug }, filterBy: { eq: $module } }) {
      frontmatter {
        title
        chapter
        slug
        filterBy
        editor {
          language
          startingCode
          answer
        }
      }
      body
    }
  }
`;

const ChapterWithLiveEditorTemplate = ({
  data: { mdx: chapter },
  location,
}) => {
  const [user] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState(false);
  const progress =
    typeof window !== `undefined` &&
    JSON.parse(localStorage.getItem('progress') || '{}');

  const chapterHeading = useMemo(
    () => `${chapter.frontmatter.chapter} - ${chapter.frontmatter.title}`,
  );

  const chapters = useMemo(() => useChapters(chapter.frontmatter.filterBy));

  const chapterIndex = useMemo(
    () => getChaptersIndex(chapters, chapter.frontmatter.slug),
    [chapters],
  );

  useEffect(() => {
    trackEventWithProperties('view modules chapters', {
      slug: `${chapter.frontmatter.filterBy}/${chapter.frontmatter.slug}`,
      title: chapter.frontmatter.title,
    });
  }, []);

  async function markChapterAsDone() {
    if (!progress[chapter.frontmatter.filterBy])
      progress[chapter.frontmatter.filterBy] = {};

    progress[chapter.frontmatter.filterBy][chapter.frontmatter.slug] = true;
    typeof window != 'undefined' &&
      localStorage.setItem('progress', JSON.stringify(progress));

    trackEventWithProperties('successfully complete modules chapters', {
      slug: `${chapter.frontmatter.filterBy}/${chapter.frontmatter.slug}`,
      title: chapter.frontmatter.title,
    });

    if (isUser) {
      console.log('🔥Sync with backend');
      updateProgress(
        user,
        Number.parseInt(chapter.frontmatter.slug.split('-')[1]),
        Number.parseInt(chapter.frontmatter.filterBy.split('-')[1]),
      ).then(res => console.log('🔥', res));
    }
  }

  return (
    <div className={`overflow-hidden`}>
      <NavBar
        chapter={chapterHeading}
        module={chapter.frontmatter.filterBy}
        location={location}
      />
      <main
        className={`grid grid-cols-2 gap-x-6 bg-base-900 h-full relative`}
        style={{ height: 'calc(100vh - 5rem - 3.5em)' }}
      >
        <ChapterList
          isOpen={isChapterDrawerOpen}
          setIsOpen={setIsChapterDrawerOpen}
          chapters={chapters}
          activeSlug={chapter.frontmatter.slug}
        />

        <LearningInterface
          heading={chapter.frontmatter.title}
          body={chapter.body}
          setDrawerOpen={setIsChapterDrawerOpen}
        />
        <CodingInterfaceTaquito
          code={chapter.frontmatter.editor.startingCode}
          answer={chapter.frontmatter.editor.answer}
        />
      </main>

      <Footer
        chapterIndex={chapterIndex}
        module={chapter.frontmatter.filterBy}
        markDone={markChapterAsDone}
      />
    </div>
  );
};

export default ChapterWithLiveEditorTemplate;
