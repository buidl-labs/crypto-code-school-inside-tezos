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
  background: #112425;
  height: ${ContractFileHeight};

  span {
    margin-right: 10px;
    :hover {
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 768px) {
    width: ${EditorContainerMinWidth};
  }

  > p {
    background: #1b3738;
    display: inline-block;
    margin-left: 1rem;
    color: #729e9f;
    padding-top: 10px;
    padding-right: 25px;
    padding-left: 25px;
    margin-bottom: 0;
    height: 100%;
  }
`;
export const Editor = styled.div`
  grid-area: editor;
  overflow-y: hidden;
  overflow-x: hidden;
`;
export const Option = styled.div`
  grid-area: option;
  background: #112425;
  height: ${OptionHeight};
  display: flex;
  justify-content: flex-end;
  @media only screen and (min-width: 768px) {
    width: ${EditorContainerMinWidth};
  }
`;
export const CheckAnswerButton = styled.button`
  display: flex;
  padding: 0 30px 0 25px;
  background-color: #18b77e;
  color: #fff;
  margin: 0 15px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  outline: none;

  span {
    align-self: center;
    vertical-align: middle;
  }

  :hover {
    background: #66cca7;
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
  background-color: #162f30;
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

  :hover {
    background: #436061;
    color: #fff;
  }

  @media only screen and (max-width: 767px) {
    span {
      display: none;
    }
    padding: 1rem 2rem;
  }
`;
