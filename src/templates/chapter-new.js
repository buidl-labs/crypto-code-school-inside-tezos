import React, { useState, useEffect, useMemo } from 'react';
import { graphql } from 'gatsby';

import NavBar from './components/chapter/NavBar';
import Footer from './components/chapter/Footer';

import LearningInterface from './components/chapter/LearningInterface';
import CodingInterface from './components/chapter/CodingInterface';
import ChapterList from './components/chapter/ChapterList';
import MichelsonResult from './components/chapter/MichelsonResult';

import useChapters from '../hooks/use-chapters';
import useModules from '../hooks/use-modules';
import { getChaptersIndex } from '../utils/index';
import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { useAtom } from 'jotai';
import SEO from '../components/Seo';
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
        isCode
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

const ChapterTemplate = ({ data: { mdx: chapter }, location }) => {
  const [user] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState(false);
  const [isChapterCompleted, setIsChapterCompleted] = useState(false);
  const [result, setResult] = useState({});
  const [michelsonDrawer, setMichelsonDrawer] = useState(false);
  const [michelsonResult, setMichelsonResult] = useState('');
  const [editorValue, setEditorValue] = useState(getDefaultEditorValue);
  const [startingCode, setStartingCode] = useState(getDefaultEditorValue);
  const NavHeading = useMemo(() => {
    let { module, title } = useModules(chapter.frontmatter.filterBy);
    return `${(module.charAt(0).toUpperCase() + module.slice(1))
      .split('-')
      .reduce((acc, curr) => {
        let c = curr;
        if (c.indexOf('0') !== -1) {
          c = c.length > 1 ? c.slice(1) : c;
        }
        acc += ` ${c}`;
        return acc;
      }, '')} - ${title}`;
  }, [chapter.filterBy]);

  const chapters = useMemo(() => useChapters(chapter.frontmatter.filterBy));
  const chapterIndex = useMemo(
    () => getChaptersIndex(chapters, chapter.frontmatter.slug),
    [chapters],
  );

  useEffect(() => {
    trackEventWithProperties('Chapter-View', {
      slug: `${chapter.frontmatter.filterBy}/${chapter.frontmatter.slug}`,
      title: chapter.frontmatter.title,
    });
  }, []);

  useEffect(() => {
    if (result.success === true) {
      setIsChapterCompleted(true);
      setStartingCode(chapter.frontmatter.editor.answer);

      trackEventWithProperties('Chapter-Completed', {
        slug: `${chapter.frontmatter.filterBy}/${chapter.frontmatter.slug}`,
        title: chapter.frontmatter.title,
      });

      if (isUser) {
        updateProgress(
          user,
          Number.parseInt(chapter.frontmatter.slug.split('-')[1]),
          Number.parseInt(chapter.frontmatter.filterBy.split('-')[1]),
        ).then(res => console.log(res));
      }
    }
  }, [result.success]);

  useEffect(() => {
    if (isChapterCompleted) {
      let progress =
        typeof window != 'undefined' && localStorage.getItem('progress');
      console.log('progress', progress);
      progress = progress ? JSON.parse(progress) : {};

      if (!progress[chapter.frontmatter.filterBy])
        progress[chapter.frontmatter.filterBy] = {};
      progress[chapter.frontmatter.filterBy][chapter.frontmatter.slug] = true;
      typeof window != 'undefined' &&
        localStorage.setItem('progress', JSON.stringify(progress));
    }
  }, [isChapterCompleted]);

  function getDefaultEditorValue() {
    const module = chapter.frontmatter.filterBy;
    let progress =
      (typeof window != 'undefined' &&
        JSON.parse(localStorage.getItem('progress'))) ||
      '{}';
    console.log(progress, typeof progress);
    if (progress[module]) {
      console.log('getDef', progress[module]);
      console.log(progress[module][chapter.frontmatter.slug]);
      if (progress[module][chapter.frontmatter.slug]) {
        console.log(chapter.frontmatter.editor.answer);
        return chapter.frontmatter.editor.answer;
      }
    }
    return chapter.frontmatter.editor.startingCode;
  }

  return (
    <div className={`overflow-hidden`}>
      <NavBar
        heading={NavHeading}
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
        <CodingInterface
          code={startingCode}
          answer={chapter.frontmatter.editor.answer}
          editorValue={editorValue}
          setEditorValue={setEditorValue}
          module={chapter.frontmatter.filterBy}
          chapterSlug={chapter.frontmatter.slug}
          isCode={chapter.frontmatter.isCode}
          openMichelsonDrawer={() => setMichelsonDrawer(true)}
          michelsonResult={michelsonResult}
          setMichelsonResult={setMichelsonResult}
          setResult={setResult}
          result={result}
        />
        <MichelsonResult
          data={michelsonResult}
          closeDrawer={() => setMichelsonDrawer(false)}
          drawerOpen={michelsonDrawer}
          isAnswerCorrect={result.success}
        />
      </main>

      <Footer
        chapterIndex={chapterIndex}
        module={chapter.frontmatter.filterBy}
      />
    </div>
  );
};

export default ChapterTemplate;
