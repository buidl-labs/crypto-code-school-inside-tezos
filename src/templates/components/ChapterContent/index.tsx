import React from 'react';
import {
  Content,
  ContentHeader,
  ContentFrontmatterChapter,
  ContentFrontmatterTitle,
} from './styled';

interface Props {
  title: string;
  chapter: string;
  children: React.ReactNode;
}

function ChapterContent({ title, chapter, children }: Props) {
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
