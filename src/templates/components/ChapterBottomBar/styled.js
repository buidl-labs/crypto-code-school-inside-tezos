import styled from '@emotion/styled';
import {
  ContractFileHeight,
  OptionHeight,
  EditorContainerMinWidth,
} from '../../chapter.styled';
export const ContractFile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: contractFile;
  background: #12293c;
  height: ${ContractFileHeight};
  width: 100% !important;

  span {
    margin-right: 10px;
    :hover {
      cursor: pointer;
    }
  }

  svg {
    align-self: center;
    display: flex;
  }

  @media only screen and (min-width: 768px) {
    width: ${EditorContainerMinWidth};
  }

  > p {
    background: #253f54;
    display: inline-block;
    margin-left: 1rem;
    color: #64839a;
    padding-top: 10px;
    padding-right: 25px;
    padding-left: 25px;
    margin-bottom: 0;
    height: 100%;
    font-size: 0.85rem;
  }
`;
export const Editor = styled.div`
  grid-area: editor;
  overflow-y: hidden;
  overflow-x: hidden;
`;
export const Option = styled.div`
  grid-area: option;
  background: #12293b;
  height: ${OptionHeight};
  display: flex;
  justify-content: flex-end;
  width: 100% !important;
  @media only screen and (min-width: 768px) {
    width: ${EditorContainerMinWidth};
  }
`;
export const CheckAnswerButton = styled.button`
  display: flex;
  padding: 0 30px 0 25px;
  background-color: #2897ff;
  color: #fff;
  margin: 0 15px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  outline: none;

  svg {
    align-self: center;
  }

  span {
    align-self: center;
    vertical-align: middle;
  }

  :hover {
    background: #3e97ea;
    color: #fff;
  }

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }

    padding: 1rem 2rem;
  }
`;
export const ShowAnswerButton = styled.button`
  display: flex;
  padding: 0 30px 0 20px;
  background-color: #203d54;
  color: #fff;
  margin: 0 10px;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  outline: none;

  span {
    align-self: center;
    vertical-align: middle;
  }

  svg {
    align-self: center;
  }

  :hover {
    background: #2a4961;
    color: #fff;
  }

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }
    padding: 1rem 2rem;
  }
`;

export const RunCodeButton = styled.button`
  display: flex;
  padding: 0 30px 0 25px;
  background-color: #2897ff;
  color: #fff;
  margin: 0 15px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  outline: none;

  svg {
    align-self: center;
  }

  span {
    align-self: center;
    vertical-align: middle;
  }

  :hover {
    background: #3e97ea;
    color: #fff;
  }

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }

    padding: 1rem 2rem;
  }
`;