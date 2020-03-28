import styled from '@emotion/styled';

export const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
  overflow-x: auto;
  grid-area: 2/1/5/3;
`;

export const ContentHeader = styled.div`
  background: #f1f1f1;
  height: 119px;
  padding: 1.5rem;
`;

export const ContentFrontmatterTitle = styled.p`
  display: block;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 31px;
  line-height: 36px;
  color: #0e1817;
`;

export const ContentFrontmatterChapter = styled.p`
  display: block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 21px;
  line-height: 25px;
  color: #0e1817;
`;
