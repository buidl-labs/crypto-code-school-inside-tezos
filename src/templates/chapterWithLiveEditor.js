import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout/layout';
import { MDXProvider } from '@mdx-js/react';
import { ControlledEditor, monaco } from '@monaco-editor/react';
import {
  ChapterFooter,
  ChapterHeader,
  ChapterContent,
  ChapterEditor,
} from './components/index';
import useChapters from '../hooks/use-chapters';
import { getChaptersIndex } from '../utils/index';
import {
  Container,
  Output,
  OutputWithCopyButton
} from './chapter.styled';
import { trackEventWithProperties } from '../utils/analytics';
import SEO from '../components/Seo';
import { IoIosClose } from 'react-icons/io';

import {
  HeaderHeight,
  FooterHeight,
  ContractFileHeight,
  OptionHeight,
  OutputHeaderHeight,
  OutputContentHeight,
  CopyConfirmModal
} from './chapter.styled';

import { TezosToolkit } from '@taquito/taquito';
import { importKey, InMemorySigner } from '@taquito/signer';
import SemiLiveProvider from 'src/components/SemiLiveProvider';
import { LiveEditor, LivePreview, LiveError } from 'react-live';

import theme from './customVSDarkTheme';

import Clipboard from "react-clipboard.js";

import CODE_JSON from "src/data/code";
import STORAGE_JSON from "src/data/storage";
import FAUCET_KEY from "src/data/account";

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
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

/*
Saving user progress locally
if user successfully completes the chapter: validation.success === true
save user code and chapter success status via local-storage
[{chapterSlug: "", completed: true/false, code: ""}]

mapping stored progress with current chapter/ chapter list
chapters view
loop over chapters list
  //compare if chapterslug matches then show tick icon if true
learning interface
  //check if saved code is available for current slug then show the 
  //saved code otherwise show starting code for the current chapter
Retrieving stored progress
//learning interface
//check if chapter is already completed or not
  //if yes --> show code
//chapters view
  // show tick icon if chapter completed successfully
//This feature will act as a foundation
  // for tracking users via analytics
    // for tracking users via analytics
    //tracking individual chapters
      //if all chapter are completed --> lesson was successfully completed
    //tracking --> homeview, chapters-view, learning-interface-view, up-next-view, game-view 
*/

const ChapterTemplate = ({ data: { mdx: chapter } }) => {
  const chapterList = useChapters(chapter.frontmatter.filterBy);
  const [chapterCompletedSuccessfully, setChapterCompletionState] = useState(
    false,
  );

  const [codeCopied, setCodeCopied] = useState(false);
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

  const liveProvider = useRef(null);

  useEffect(() => {
    trackEventWithProperties('Learning_Interface_View', {
      slug: chapterList[index.current - 1].slug,
      title: chapterList[index.current - 1].title,
    });
  }, [index.current]);

  const [validation, updateValidation] = useState({
    success: false,
    error: [''],
  });

  /**
   * Returns default editor value that is the starting point or completed code
   * if  individual chapter is already completed
   */
  const getDefaultEditorValue = () => {
    let list = [];
    const listJSON =
      typeof window != 'undefined' &&
      localStorage.getItem(chapter.frontmatter.filterBy);
    if (listJSON !== null) {
      list = JSON.parse(listJSON);
    }
    if (list.length > 0) {
      const savedChapter = list.find(chapter => {
        return chapter.chapterSlug === chapterList[index.current - 1].slug;
      });
      if (savedChapter) {
        if (!(savedChapter.code === chapter.frontmatter.editor.answer)) {
          //remove saved chapter since it's out of sync from local storage
          //with current correct answer and show starting code as default state
          const updateList = list.filter(chapter => {
            return !(chapter.chapterSlug === savedChapter.chapterSlug);
          });
          localStorage.setItem(
            chapter.frontmatter.filterBy,
            JSON.stringify(updateList),
          );
          return `${chapter.frontmatter.editor.startingCode}`;
        }
        setChapterCompletionState(true);
        return savedChapter.code;
      }
    }
    return `${chapter.frontmatter.editor.startingCode}`;
  };

  const [editorInputValue, setEditorInputValue] = useState(
    getDefaultEditorValue,
  );
  const [showOutput, setShowOutput] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  var [editorHeight, setEditorHeight] = useState(
    `calc(100vh - (210px + 40px))`,
  );

  // const [showCodeOutput, setShowCodeOutput] = useState(false);
  // const [runCodeClicked, setRunCodeClicked] = useState(false);

  // useEffect(() => {
  //   if (runCodeClicked) runCode();
  // }, [runCodeClicked]);

  useEffect(() => {
    if (validation.success) {
      const ch = {
        chapterSlug: chapterList[index.current - 1].slug,
        completed: true,
        code: chapter.frontmatter.editor.answer,
        current: index.current,
      };

      //get the previous stored if available otherwise create a new one
      let list = [];
      const listJSON = localStorage.getItem(chapter.frontmatter.filterBy);
      if (listJSON !== null) {
        list = JSON.parse(listJSON);
      }
      //update user stored progress
      //only store progress if chapter has not been already completed before
      const chapterAlreadyExists = list.some(chapter => {
        return chapter.chapterSlug === chapterList[index.current - 1].slug;
      });

      //only update locally stored progress if chapter completion is already stored
      if (!chapterAlreadyExists) {
        list.push(ch);
        //track user progress on successful chapter completion
        trackEventWithProperties('Chapter-Completed', {
          chapterSlug: chapterList[index.current - 1].slug,
        });
      }
      localStorage.setItem(chapter.frontmatter.filterBy, JSON.stringify(list));
    }
  }, [validation.success]);

  const resetEditor = () => {
    setEditorInputValue(getDefaultEditorValue);
  };

  const Tezos = new TezosToolkit('https://api.tez.ie/rpc/carthagenet');

  function runCode() {
    // setShowCodeOutput(status => {
    //   if (!status) setShowCodeOutput(!status);
    //   else setShowCodeOutput(status);
    // });
    // setButtonClicked(false);
    liveProvider.current && liveProvider.current.run();
  }

  useEffect(() => {
    monaco
      .init()
      .then(monacoInstance => {
        monacoInstance.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark',
          inherit: true,
          automaticLayout: true,
          rules: [
            { token: 'comment', foreground: '989898', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'EA4192' },
            { token: 'number', foreground: '00FF47' },
            { token: 'string', foreground: 'FA00FF' },
          ],
          colors: {
            'editor.foreground': '#F8F8F8',
            'editor.background': '#253F54',
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

  return (
    <Layout>
      <SEO title={`Ch ${index.current}: ${chapter.frontmatter.title}`} />

      <Container>
        {codeCopied?
          
          <CopyConfirmModal>
            <div>Reference code has been copied to clipboard!</div>
            <span
              onClick={() => {
                setCodeCopied(false);
              }}
            >
              <IoIosClose />
            </span>
          </CopyConfirmModal>
          
        : null}
        <ChapterHeader
          backLink={`/tezos/overview/${chapter.frontmatter.slug.slice(
            0,
            chapter.frontmatter.slug.indexOf('/'),
          )}`}
          title={chapter.frontmatter.title}
        />
        <ChapterContent
          chapter={chapter.frontmatter.chapter}
          title={chapter.frontmatter.title}
        >
          <MDXProvider
            components={{
              p: props => (
                <p
                  {...props}
                  style={{
                    marginBottom: 16,
                    marginTop: 5,
                    lineHeight: '1.75rem',
                    color: '#333',
                  }}
                />
              ),
              ol: props => (
                <ol
                  {...props}
                  style={{
                    marginBottom: 16,
                    marginTop: 5,
                    lineHeight: '1.75rem',
                    color: '#333',
                  }}
                />
              ),
              li: props => (
                <li
                  {...props}
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                    lineHeight: '1.75rem',
                    color: '#333',
                  }}
                />
              ),
              h2: props => (
                <h2
                  {...props}
                  style={{
                    marginTop: 40,
                    marginBottom: 16,
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    paddingBottom: '0.3rem',
                    borderBottom: '1px solid #eee',
                  }}
                />
              ),
              h3: props => (
                <h3
                  {...props}
                  style={{
                    marginTop: 40,
                    marginBottom: 16,
                    color: '#000',
                    fontSize: '1.25rem',
                    fontWeight: 500,
                  }}
                />
              ),
              h4: props => (
                <h4
                  {...props}
                  style={{
                    marginTop: 30,
                    marginBottom: 16,
                    color: '#000',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  }}
                />
              ),
              a: props => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            <MDXRenderer>{chapter.body}</MDXRenderer>
          </MDXProvider>
        </ChapterContent>

        {/* SemiLiveProvider needed to wrap all three - 
        1. LiveEditor
        2. LivePreview
        3. LiveError
        Hence, it needs to be placed at a place in the tree where it wraps all three components. */}
        <SemiLiveProvider
          transformCode={code => code.replace(/import .*/g, '')}
          noInline={true}
          ref={liveProvider}
          //code={editorInputValue}
          // Right now for testing I've used an arbitrary code snippet, will be replaced by code snippet for the particular chapter.
          code={chapter.frontmatter.editor.startingCode}
          scope={{ ...React, Tezos, importKey, InMemorySigner, CODE_JSON, STORAGE_JSON, FAUCET_KEY }}
          // To edit the theme, you need to edit - node_modules/prism-react-renderer/themes/vsDark/index.js
          theme={theme}
        >
          <ChapterEditor
            setShowOutput={setShowOutput}
            setButtonClicked={setButtonClicked}
            setEditorHeight={setEditorHeight}
            chapterIndex={index}
            updateValidation={updateValidation}
            editorInputValue={editorInputValue}
            resetEditor={resetEditor}
            chapterCompletedSuccessfully={chapterCompletedSuccessfully}
            chapterSolution={chapter.frontmatter.editor.answer}
            currentLesson={chapter.frontmatter.filterBy}
            runCode={runCode}
          >
            <div
              style={{
                height: `${
                  buttonClicked
                    ? `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight} + ${OutputHeaderHeight} + ${OutputContentHeight}))`
                    : `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight}))`
                }`,
                width: `calc(100vw - (100vw / 2.4))`,
                overflowX: 'auto',
              }}
            >
              <LiveEditor
                style={{
                  minHeight: `${
                    buttonClicked
                      ? `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight} + ${OutputHeaderHeight} + ${OutputContentHeight}))`
                      : `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight}))`
                  }`,
                }}
              />
            </div>

            {buttonClicked ? (
              showOutput ? (
                <div>
                  <OutputWithCopyButton>
                    
                    <div>output</div>
                    <div>
                        <Clipboard data-clipboard-text={chapter.frontmatter.editor.answer}
                          onClick={() => {
                            setCodeCopied(true);
                          }}
                        >
                          copy code
                        </Clipboard>
                      <span
                        onClick={() => {
                          setButtonClicked(false);
                        }}
                      >
                        <IoIosClose />
                      </span>
                    </div>
                    
                    
                  </OutputWithCopyButton>
                  
                  <ControlledEditor
                    height={OutputContentHeight}
              
                    value={chapter.frontmatter.editor.answer}
                    language="javascript"
                    theme="myCustomTheme"
                    options={{
                      lineNumbers: false,
                      scrollBeyondLastLine: false,
                      minimap: { enabled: false },
                      scrollbar: {
                        vertical: 'hidden',
                        verticalScrollbarSize: 0,
                      },
                      folding: false,
                      readOnly: true,
                      fontSize: 14,
                      fontFamily: "'Inconsolata', monospace",
                      renderSideBySide: false,
                      wordWrap: true,
                      ignoreTrimWhitespace: false,
                      renderWhitespace: 'all',
                      lineHeight: 26,
                    }}
                  />
                </div>
              ) : (
                <div>
                  <Output>
                    <div>output</div>
                    <span
                      onClick={() => {
                        setButtonClicked(false);
                      }}
                    >
                      <IoIosClose />
                    </span>
                  </Output>
                  <div
                    style={{
                      height: `${OutputContentHeight}`,
                      background: '#253f54',
                      color: '#fff',
                    }}
                  >
                    <LivePreview />
                    <LiveError />
                  </div>
                </div>
              )
            ) : (
              console.log('No Output')
            )}
          </ChapterEditor>
          <ChapterFooter
            chapter={chapter.frontmatter.chapter}
            title={chapter.frontmatter.title}
            chapterIndex={index}
            currentModule={chapter.frontmatter.filterBy}
          />
        </SemiLiveProvider>
      </Container>
    </Layout>
  );
};

export default ChapterTemplate;
