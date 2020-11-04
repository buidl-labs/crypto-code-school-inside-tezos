import styled from '@emotion/styled';

/**
 * (Required) Learning Interface UI Calculations
 */
//Header
export const HeaderHeight = '55px';

//Content
export const ContentWidth = 'calc(((100vw) / 2.4))';
export const ContentHeight = 'calc(100vh - 140px)';

//Editor
//Contract File Container
export const ContractFileHeight = '45px';

//Option(Check & Show Answer) Container
export const OptionHeight = '50px';
export const EditorContainerMinWidth = 'calc(100vw - (100vw / 2))';

//Output Container
export const OutputHeaderHeight = '40px';
export const OutputContentHeight = '180px';

//Footer
export const FooterHeight = '55px';

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
  height: ${OutputHeaderHeight};
  background: #12293b;

  > div {
    background: #253f54;
    display: inline-block;
    margin-left: 1rem;
    color: #64839a;
    padding: 8px 10px 0 10px;
    border-top: 1px solid #112425;
    font-family: Roboto;
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

export const CodeOutputHeader = styled.div`
  > div:first-of-type {
    display: flex;
    justify-content: space-between;
    height: ${OutputHeaderHeight};
    background: #12293b;
    
      > div {
        background: #253f54;
        display: inline-block;
        margin-left: 1rem;
        color: #64839a;
        padding: 8px 10px 0 10px;
        border-top: 1px solid #112425;
        font-family: Roboto;
      }
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

export const CodeOutputContent = styled.div`

  > div{
    min-height: ${OutputContentHeight}
    background: red;
  }
`

export const OutputWithCopyButton = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${OutputHeaderHeight};
  background: #12293b;

  > div:first-of-type {
    background: #253f54;
    display: inline-block;
    margin-left: 1rem;
    color: #64839a;
    padding: 6px 10px 6px 10px;
    border-top: 1px solid #112425;
    font-family: Roboto;
  }
  
  > div{
    display: flex;
    align-items: center;
  }
  
  button {
    border-radius: 2px;
    background: #253f54;
    display: inline-block;
    margin-right: 1rem;
    color: #64839a;
    padding: 4px 10px 4px 10px;
    border: none;
    border: 1px solid #64839a;
    font-family: Roboto;
    font-size: inherit;
    cursor: pointer;
    transition: .2s all;
    
    :hover{
      background: #152f44;
      color: #84a3ba;
      border-color: #64839a;
    }
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