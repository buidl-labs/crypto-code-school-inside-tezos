import React from 'react';
import styled from '@emotion/styled';

function ChapterContent({ title, chapter, children }) {
  return (
    <Content>
      <ContentHeader>
        <ContentFrontmatterChapter>{chapter}</ContentFrontmatterChapter>
        <ContentFrontmatterTitle>{title}</ContentFrontmatterTitle>
      </ContentHeader>
      <div style={{ margin: 20 }}>{children}</div>
    </Content>
  );
}

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  height: calc(100vh - 140px);
  width: calc(((100vw) / 2.4));
`;

const ContentHeader = styled.div`
  background: #f1f1f1;
  height: 119px;
  padding: 1.5rem;
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

export default ChapterContent;
