import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from '../components/Layout/layout';
import { ControlledEditor, monaco } from '@monaco-editor/react';
import './prism-custom.css';
import {
  ChapterFooter,
  ChapterHeader,
  ChapterContent,
  ChapterEditor,
} from './components/index';

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        chapter
      }
      body
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header header header'
    'content contractFile contractFile contractFile'
    'content editor editor editor'
    'content option option option'
    'footer footer footer footer';
`;

const ChapterTemplate = ({ data: { mdx: chapter } }) => {
  const [editorInputValue, setEditorInputValue] = useState('');
  useEffect(() => {
    monaco
      .init()
      .then(monacoInstance => {
        monacoInstance.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'comment', foreground: '666666', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'EA4192' },
            { token: 'number', foreground: '00FF47' },
            { token: 'string', foreground: 'FA00FF' },
          ],
          colors: {
            'editor.foreground': '#F8F8F8',
            'editor.background': '#1B3738',
            'editor.selectionBackground': '#DDF0FF33',
            'editor.lineHighlightBackground': '#FFFFFF08',
            'editorCursor.foreground': '#A7A7A7',
            'editorWhitespace.foreground': '#FFFFFF40',
          },
        });
      })
      .catch(error =>
        console.error(
          'An error occurred during initialization of Monaco: ',
          error,
        ),
      );
    return () => {
      // cleanup;
    };
  }, []);
  console.log('Data body', chapter.body);
  return (
    <Layout>
      <Container>
        <ChapterHeader />
        <ChapterContent
          chapter={chapter.frontmatter.chapter}
          title={chapter.frontmatter.title}
        >
          <MDXRenderer>{chapter.body}</MDXRenderer>
        </ChapterContent>
        <ChapterEditor>
          <ControlledEditor
            height={`calc(100vh - 250px)`}
            width={`calc(100vw - (100vw / 2.4))`}
            value={editorInputValue}
            onChange={(_, value) => setEditorInputValue(value)}
            language="python"
            theme="myCustomTheme"
            options={{
              lineNumbers: true,
              scrollBeyondLastLine: true,
              minimap: { enabled: false },
              scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
              folding: true,
              readOnly: false,
              fontSize: 18,
              fontFamily: 'Inconsolata',
            }}
          />
        </ChapterEditor>
        <ChapterFooter />
      </Container>
    </Layout>
  );
};

export default ChapterTemplate;
