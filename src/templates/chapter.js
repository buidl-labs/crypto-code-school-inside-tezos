import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
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
import { Container, Output } from './chapter.styled';
import PlantGrowthModalView from '../components/PlantGrowthModal';
import { trackEventWithProperties } from '../utils/analytics';
import SEO from '../components/Seo';
import { PLANT_GROWTH } from '../components/Plants/PLANT_GROWTH';
import { IoIosClose } from 'react-icons/io';
import {
  HeaderHeight,
  FooterHeight,
  ContractFileHeight,
  OptionHeight,
  OutputHeaderHeight,
  OutputContentHeight,
} from './chapter.styled';

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
  const chapterList = useChapters();
  const [showModal, setModal] = useState(false);
  const [chapterCompletedSuccessfully, setChapterCompletionState] = useState(
    false,
  );
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
      typeof window != 'undefined' && localStorage.getItem('lesson-1');
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
          localStorage.setItem('lesson-1', JSON.stringify(updateList));
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

  useEffect(() => {
    switch (index.current) {
      case PLANT_GROWTH.STAGE_1:
      case PLANT_GROWTH.STAGE_2:
      case PLANT_GROWTH.STAGE_3:
      case PLANT_GROWTH.STAGE_4:
      case PLANT_GROWTH.STAGE_5:
        setModal(true);
        break;
    }
  }, [index.current]);

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
      const listJSON = localStorage.getItem('lesson-1');
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
      localStorage.setItem('lesson-1', JSON.stringify(list));
      // console.log(list);
    }
  }, [validation.success]);

  const resetEditor = () => {
    setEditorInputValue(getDefaultEditorValue);
  };

  const onToggle = () => {
    setModal(prevState => !prevState);
  };

  return (
    <Layout>
      <SEO title={`Ch ${index.current}: ${chapter.frontmatter.title}`} />
      {validation.success && showModal ? (
        <PlantGrowthModalView
          onToggle={onToggle}
          currentChapter={index.current}
          nextSlug={index.nextSlug}
        />
      ) : null}
      <Container>
        <ChapterHeader />
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
        >
          <ControlledEditor
            height={`${
              buttonClicked
                ? `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight} + ${OutputHeaderHeight} + ${OutputContentHeight}))`
                : `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight}))`
            }`}
            marWidth={`calc(100vw)`}
            value={editorInputValue}
            onChange={(_, value) => {
              setEditorInputValue(value);
            }}
            language="python"
            theme="myCustomTheme"
            options={{
              lineNumbers: true,
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
              scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
              folding: true,
              readOnly: false,
              fontSize: 14,
              fontFamily: "'Inconsolata', monospace",
              wordWrap: true,
              wordBasedSuggestions: false,
            }}
          />
          {buttonClicked ? (
            showOutput ? (
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
                <DiffEditor
                  height={OutputContentHeight}
                  original={
                    showOutput ? chapter.frontmatter.editor.answer : 'MODIFIED'
                  }
                  modified={showOutput ? editorInputValue : 'MODIFIED'}
                  language="python"
                  theme="myCustomTheme"
                  options={{
                    lineNumbers: false,
                    scrollBeyondLastLine: false,
                    minimap: { enabled: false },
                    scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
                    folding: false,
                    readOnly: true,
                    fontSize: 12,
                    fontFamily: "'Inconsolata', monospace",
                    renderSideBySide: false,
                    wordWrap: true,
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
                    background: '#1B3738',
                    color: '#fff',
                  }}
                >
                  {validation.success ? (
                    <div
                      style={{
                        fontFamily: "'Inconsolata', monospace",
                        padding: 10,
                      }}
                    >
                      <p
                        style={{
                          color: '#18b77e',
                          paddingBottom: 5,
                          fontSize: '0.9rem',
                          marginBottom: '0',
                        }}
                      >
                        <span> > </span>Bingo! You wrote the correct answer!
                      </p>
                      <p
                        style={{
                          color: '#18b77e',
                          fontSize: '0.9rem',
                          marginBottom: '0',
                        }}
                      >
                        <span> > </span>Proceed to the next chapter by clicking
                        on 'next >' to continue
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: 10,
                        height: '200px',
                        overflowY: 'auto',
                      }}
                    >
                      {validation.error.map((errorMessage, index) => {
                        return (
                          <p
                            key={index}
                            style={{
                              fontFamily: "'Inconsolata', monospace",
                              color: '#d0454c',
                              paddingBottom: 5,
                              fontSize: '0.9rem',
                              marginBottom: '0',
                            }}
                          >
                            <span> {errorMessage ? '>' : ''} </span>
                            {errorMessage}
                          </p>
                        );
                      })}
                    </div>
                  )}
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
        />
      </Container>
    </Layout>
  );
};

export default ChapterTemplate;
