import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Layout from '../components/Layout/layout';

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
    'content content contractFile contractFile'
    'content content editor editor'
    'content content option option'
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

const BackLink = styled(Link)`
  color: white;
  margin-left: 1rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 27px;
  text-decoration: none;
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
  height: calc(100vh - 140px);
  width: calc(((100vw) / 2.4));
`;

const ContractFile = styled.div`
  grid-area: contractFile;
`;
const Editor = styled.div`
  grid-area: editor;
`;
const Option = styled.div`
  grid-area: option;
`;

const ChapterTitle = styled.p`
  color: #fff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1.1rem;
  line-height: 27px;
  margin-left: 1rem;
`;

const PrevLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  margin: 0 1rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
`;

const ContentIndex = styled.span`
  color: #fff;
`;

const NextLink = styled(Link)`
  color: #fff;
  margin: 0 1rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
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

const PostTemplate = ({ data: { mdx: post } }) => {
  console.log('Data body', post.body);
  return (
    <Layout>
      <Container>
        <Header>
          <BackLink>{'< '}Back</BackLink>
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
        <ContractFile>filename.py</ContractFile>
        <Editor>In-Browser editor</Editor>
        <Option>
          options
          <button>show answer</button>
          <button>check</button>
        </Option>
        <Footer>
          <div>
            <nav>Content Menu</nav>
            <ChapterTitle>Chapter 1: Scaffolding A Contract</ChapterTitle>
          </div>
          <div>
            <PrevLink>{'< '} Prev</PrevLink>
            <ContentIndex>1/15</ContentIndex>
            <NextLink>Next {' >'}</NextLink>
          </div>
        </Footer>
      </Container>
    </Layout>
  );
};

export default PostTemplate;
