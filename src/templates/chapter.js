import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from '@emotion/styled';
import Layout from '../components/Layout/layout';
import { MDXProvider } from '@mdx-js/react';
import { ControlledEditor, monaco, DiffEditor } from '@monaco-editor/react';
import './prism-custom.css';
import {
  ChapterFooter,
  ChapterHeader,
  ChapterContent,
  ChapterEditor,
} from './components/index';
import useChapters from '../hooks/use-chapters';
import { getChaptersIndex } from '../utils/index';
import { checkCode } from '../utils/compiler';

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        chapter
        slug
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

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header header header'
    'content contractFile contractFile contractFile'
    'content editor editor editor'
    'content option option option'
    'footer footer footer footer';
`;
const Output = styled.div`
  height: 40px;
  background: #112425;

  > div {
    background: #1b3738;
    height: 40px;
    display: inline-block;
    margin-left: 1rem;
    color: #729e9f;
    padding-top: 13px;
    padding-right: 10px;
    padding-left: 10px;
    border-top: 1px solid #112425;
    font-family: Roboto;
    padding-bottom: -28px;
    margin: 1p;
    padding: 10px;
  }
`;

const ChapterTemplate = ({ data: { mdx: chapter } }) => {
  const chapterList = useChapters();
  const [index] = useState(() => {
    const { current, total, nextSlug, prevSlug } = getChaptersIndex(
      chapterList,
      chapter.frontmatter.slug,
    );
    return {
      current,
      total,
      nextSlug,
      prevSlug,
    };
  });

  const [validation, updateValidation] = useState({
    success: false,
    error: [''],
  });

  const [editorInputValue, setEditorInputValue] = useState(
    `${chapter.frontmatter.editor.startingCode}`,
  );
  const [showOutput, setShowOutput] = useState(false);
  useEffect(() => {
    monaco
      .init()
      .then(monacoInstance => {
        monacoInstance.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'comment', foreground: '989898', fontStyle: 'italic' },
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
  // useEffect(() => {
  //   /*
  //   Current state user can pass the test even if spaces are not as per the answer
  //   */
  //   if (
  //     editorInputValue.trim().replace(/\s/g, '') ===
  //     chapter.frontmatter.editor.answer.trim().replace(/\s/g, '')
  //   ) {
  //     console.log('Yo, right answer');
  //   } else {
  //     console.log(editorInputValue);
  //     console.log(chapter.frontmatter.editor.answer);
  //   }
  // }, [editorInputValue]);
  console.log('Data body', validation);
  return (
    <Layout>
      <Container>
        <ChapterHeader />
        <ChapterContent
          chapter={chapter.frontmatter.chapter}
          title={chapter.frontmatter.title}
        >
          <MDXProvider
            components={{
              p: props => (
                <p {...props} style={{ marginBottom: 10, marginTop: 5 }} />
              ),
              h2: props => (
                <h2
                  {...props}
                  style={{ marginTop: 40, marginBottom: 5, color: '#2e2d2d' }}
                />
              ),
            }}
          >
            <MDXRenderer>{chapter.body}</MDXRenderer>
          </MDXProvider>
        </ChapterContent>
        <ChapterEditor
          setShowOutput={setShowOutput}
          chapterIndex={index}
          updateValidation={updateValidation}
          editorInputValue={editorInputValue}
        >
          <ControlledEditor
            height={`calc(100vh - (250px + 200px + 40px))`}
            width={`calc(100vw - (100vw / 2.4))`}
            value={editorInputValue}
            onChange={(_, value) => {
              setEditorInputValue(value);
            }}
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
          <Output>
            <div>output</div>
          </Output>
          {showOutput ? (
            <DiffEditor
              height="200px"
              original={showOutput ? chapter.frontmatter.editor.answer : '\n'}
              modified={showOutput ? editorInputValue : '\n'}
              language="python"
              theme="myCustomTheme"
              options={{
                lineNumbers: false,
                scrollBeyondLastLine: true,
                minimap: { enabled: false },
                scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
                folding: false,
                readOnly: true,
                fontSize: 18,
                fontFamily: 'Inconsolata',
                renderSideBySide: false,
              }}
            />
          ) : (
            <div style={{ height: 200, background: '#1B3738', color: '#fff' }}>
              {validation.success ? (
                <div style={{ padding: 10 }}>
                  <p style={{ color: '#18b77e', paddingBottom: 5 }}>
                    <span> > </span>Great, you got it right!
                  </p>
                  <p style={{ color: '#18b77e' }}>
                    <span> > </span>Click 'next >' to continue.
                  </p>
                </div>
              ) : (
                <div style={{ padding: 10 }}>
                  {validation.error.map(errorMessage => {
                    return (
                      <p style={{ color: '#d0454c', paddingBottom: 5 }}>
                        <span> {errorMessage ? '>' : ''} </span>
                        {errorMessage}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </ChapterEditor>
        <ChapterFooter
          chapter={chapter.frontmatter.chapter}
          title={chapter.frontmatter.title}
          chapterIndex={index}
        />
      </Container>
    </Layout>
  );
};

export default ChapterTemplate;
