import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header header header'
    'content contractFile contractFile contractFile'
    'content editor editor editor'
    'content option option option'
    'footer footer footer footer';

  @media only screen and (max-width: 767px) {
    grid-template-areas:
      'header '
      'content'
      'contractFile'
      'editor'
      'option'
      'footer';
  }
`;

export const Output = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  background: #112425;

  > div {
    background: #1b3738;
    height: 40px;
    display: inline-block;
    margin-left: 1rem;
    color: #729e9f;
    padding: 10px 10px 0 10px;
    border-top: 1px solid #112425;
    font-family: Roboto;
    margin: 1p;
  }

  span {
    svg {
      color: white;
      align-self: center;
      display: flex;
      width: 48px;
      height: 40px;

      :hover {
        cursor: pointer;
      }
    }
  }
`;
