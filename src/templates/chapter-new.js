import React, { useState, useEffect, useMemo } from 'react';
import { graphql } from 'gatsby';
import NavBar from './components/chapter/NavBar';
import Footer from './components/chapter/Footer';
import LearningInterface from './components/chapter/LearningInterface';
import CodingInterface from './components/chapter/CodingInterface';
import Layout from '../components/Layout/layout';
import { MDXProvider } from '@mdx-js/react';
import { ControlledEditor, monaco, DiffEditor } from '@monaco-editor/react';
import useChapters from '../hooks/use-chapters';
import { getChaptersIndex } from '../utils/index';
import SEO from '../components/Seo';

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

const ChapterTemplate = ({ data: { mdx: chapter } }) => {
  const chapterHeading = useMemo(
    () => `${chapter.frontmatter.chapter} - ${chapter.frontmatter.title}`,
  );

  return (
    <div className={`overflow-hidden`}>
      <NavBar chapter={chapterHeading} />
      <main
        className={`grid grid-cols-2 gap-x-6 bg-base-900 h-full`}
        style={{ height: 'calc(100vh - 5rem - 3.5em)' }}
      >
        <LearningInterface heading={chapterHeading} body={chapter.body} />
        <CodingInterface code={chapter.frontmatter.editor.startingCode} />
      </main>

      <Footer />
    </div>
  );
};

export default ChapterTemplate;
