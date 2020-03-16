import React, { useState, useEffect } from 'react';
import { graphql, Link, navigate } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Layout from '../components/Layout/layout';
import { ControlledEditor, monaco } from '@monaco-editor/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { AiOutlineQuestion } from 'react-icons/ai';
import { IoIosMenu } from 'react-icons/io';
import './prism-custom.css';

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

const Header = styled.header`
  grid-area: header;
  height: 70px;
  background-color: #0e1817;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackLink = styled.button`
  color: white;
  margin-left: 1rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 27px;
  text-decoration: none;
  background: #0e1817;
  border: none;
  height: 50px;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background: #fff;
    color: #0e1817;
    border-radius: 50%;
  }

  > svg {
    vertical-align: middle;
  }
`;

const LessonTitle = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  text-align: center;
  line-height: 27px;
  color: #ffffff;
`;

const HelpButton = styled.button`
  border: 2px solid #ffffff;
  box-sizing: border-box;
  width: 118px;
  height: 45px;
  background-color: #0e1817;
  color: #fff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  transition: 0.3s;
  margin-right: 1rem;
  cursor: pointer;

  :hover {
    background-color: #fff;
    color: #0e1817;
  }
`;

const Footer = styled.footer`
  grid-area: footer;
  background: #0e1817;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
  }
`;

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  height: calc(100vh - 140px);
  width: calc(((100vw) / 2.4));
`;

const ContractFile = styled.div`
  grid-area: contractFile;
  background: #112425;
  height: 50px;
  width: calc(100vw - (100vw / 2.4));

  > p {
    background: #1b3738;
    height: 50px;
    display: inline-block;
    margin-left: 1rem;
    color: #729e9f;
    padding-top: 13px;
    padding-right: 10px;
    padding-left: 10px;
  }
`;
const Editor = styled.div`
  grid-area: editor;
`;
const Option = styled.div`
  grid-area: option;
  background: #112425;
  height: 60px;
  width: calc(100vw - (100vw / 2.4));
  display: flex;
  justify-content: flex-end;
`;

const ChapterTitle = styled.p`
  color: #fff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1.1rem;
  line-height: 27px;
  margin-left: 1rem;
  display: flex;
  align-self: center;
`;

const PrevLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;

  > span {
    margin-left: 6px;
  }

  > svg {
    display: inline-block;
    vertical-align: middle;
  }
`;

const ContentIndex = styled.span`
  color: #fff;
`;

const NextLink = styled(Link)`
  color: #fff;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  > svg {
    display: inline-block;
    vertical-align: middle;
  }
`;

const ContentFrontmatterTitle = styled.p`
  display: block;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 31px;
  line-height: 36px;
  color: #0e1817;
`;

const ContentFrontmatterChapter = styled.p`
  display: block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 25px;
  color: #0e1817;
`;

const ContentHeader = styled.div`
  background: #f1f1f1;
  height: 119px;
  padding: 1.5rem;
`;

const CheckAnswerButton = styled.button`
  height: 60px;
  background-color: #18b77e;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #fff;
  padding: 0 1rem;
  margin: 0 15px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background: #fff;
    color: #18b77e;
  }
`;

const ShowAnswerButton = styled.button`
  height: 60px;
  background-color: #162f30;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #fff;
  margin: 0 10px;
  padding: 0 1rem;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background: #fff;
    color: #162f30;
  }
`;

const MenuButton = styled.button`
  margin-left: 1rem;
  background: #0e1817;
  border: none;
  cursor: pointer;
  transition: 0.3s;
`;
const PostTemplate = ({ data: { mdx: post } }) => {
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
  console.log('Data body', post.body);
  return (
    <Layout>
      <Container>
        <Header>
          <BackLink onClick={() => window.history.back()}>
            <FaChevronLeft size={34} />
          </BackLink>
          <LessonTitle>Lesson: Introduction to SmartPy</LessonTitle>
          <HelpButton>Get Help!</HelpButton>
        </Header>
        <Content>
          <ContentHeader>
            <ContentFrontmatterChapter>
              {post.frontmatter.chapter}
            </ContentFrontmatterChapter>
            <ContentFrontmatterTitle>
              {post.frontmatter.title}
            </ContentFrontmatterTitle>
          </ContentHeader>
          <p
            css={css`
              font-size: 0.75rem;
            `}
          ></p>
          <div style={{ margin: 20 }}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </Content>
        <ContractFile>
          <p>Contract.py</p>
        </ContractFile>
        <Editor>
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
        </Editor>
        <Option>
          <ShowAnswerButton>
            {' '}
            <AiOutlineQuestion /> Show Answer
          </ShowAnswerButton>
          <CheckAnswerButton>
            <TiTick /> Check
          </CheckAnswerButton>
        </Option>
        <Footer>
          <div>
            <MenuButton>
              <IoIosMenu size={36} color="#fff" />
            </MenuButton>
            <ChapterTitle>Chapter 1: Scaffolding A Contract</ChapterTitle>
          </div>
          <div>
            <PrevLink>
              <FaChevronLeft />
              <span>Prev</span>
            </PrevLink>
            <ContentIndex>1/15</ContentIndex>
            <NextLink>
              <span>Next</span> <FaChevronRight />
            </NextLink>
          </div>
        </Footer>
      </Container>
    </Layout>
  );
};

export default PostTemplate;
