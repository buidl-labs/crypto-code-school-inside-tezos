import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header header header'
    'content content contractFile contractFile'
    'content content editor editor'
    'content content option option'
    'footer footer footer footer';
`;
export const Output = styled.div`
  height: 40px;
  background: #112425;

  > div {
    background: #1b3738;
    height: 40px;
    display: inline-block;
    margin-left: 1rem;
    color: #729e9f;
    padding: 10px 5px 0 5px;
    border-top: 1px solid #112425;
    font-family: Roboto;
    margin: 1p;
  }
`;
