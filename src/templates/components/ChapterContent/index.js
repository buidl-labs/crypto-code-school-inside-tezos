import React from 'react';
import {
  Content,
  ContentHeader,
  ContentFrontmatterChapter,
  ContentFrontmatterTitle,
} from './styled';

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

export default ChapterContent;
