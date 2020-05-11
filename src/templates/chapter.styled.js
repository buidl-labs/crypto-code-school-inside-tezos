import styled from '@emotion/styled';

/**
 * (Required) Learning Interface UI Calculations
 */
//Header
export const HeaderHeight = '70px';

//Content
export const ContentWidth = 'calc(((100vw) / 2.4))';
export const ContentHeight = 'calc(100vh - 140px)';

//Editor
//Contract File Container
export const ContractFileHeight = '50px';

//Option(Check & Show Answer) Container
export const OptionHeight = '60px';
export const EditorContainerMinWidth = 'calc(100vw - (100vw / 2.4))';

//Output Container
export const OutputHeaderHeight = '40px';
export const OutputContentHeight = '200px';
//Footer
export const FooterHeight = '70px';

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
