import styled from '@emotion/styled';
import { ContentHeight, ContentWidth } from '../../chapter.styled';
export const Content = styled.div`
  grid-area: content;
  overflow-y: auto;

  @media only screen and (min-width: 768px) {
    height: ${ContentHeight};
    width: ${ContentWidth};
  }
`;

export const ContentHeader = styled.div`
  background: #f1f1f1;
  height: auto;
  padding: 1.5rem;
`;

export const ContentFrontmatterTitle = styled.h2`
  display: block;
  color: #0e1817;
  margin-bottom: 0;
  margin-top: 0;
  font-size: 1.8rem;
  border-bottom: none;
`;

export const ContentFrontmatterChapter = styled.p`
  display: block;
  color: #0e1817;
  margin-bottom: 0;
`;

export const InnerContent = styled.div`
  margin: 20px;
`;
