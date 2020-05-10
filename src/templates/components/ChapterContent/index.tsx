import React from 'react';
import {
  Content,
  ContentHeader,
  ContentFrontmatterChapter,
  ContentFrontmatterTitle,
  InnerContent,
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
      <InnerContent>{children}</InnerContent>
    </Content>
  );
}

export default ChapterContent;
