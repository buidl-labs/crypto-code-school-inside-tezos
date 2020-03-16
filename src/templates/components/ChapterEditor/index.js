import React from 'react';
import styled from '@emotion/styled';
import { TiTick } from 'react-icons/ti';
import { AiOutlineQuestion } from 'react-icons/ai';

function ChapterEditor({ children }) {
  return (
    <>
      <ContractFile>
        <p>Contract.py</p>
      </ContractFile>
      <Editor>{children}</Editor>
      <Option>
        <ShowAnswerButton>
          <AiOutlineQuestion /> Show Answer
        </ShowAnswerButton>
        <CheckAnswerButton>
          <TiTick /> Check
        </CheckAnswerButton>
      </Option>
    </>
  );
}

const ContractFile = styled.div`
  grid-area: contractFile;
  background: #112425;
  height: 50px;
  width: calc(100vw - (100vw / 2.4));

  > p {
    background: #1b3738;
    height: 50px;
    display: inline-block;
    margin-left: 1rem;
    color: #729e9f;
    padding-top: 13px;
    padding-right: 10px;
    padding-left: 10px;
  }
`;
const Editor = styled.div`
  grid-area: editor;
`;

const Option = styled.div`
  grid-area: option;
  background: #112425;
  height: 60px;
  width: calc(100vw - (100vw / 2.4));
  display: flex;
  justify-content: flex-end;
`;

const CheckAnswerButton = styled.button`
  height: 60px;
  background-color: #18b77e;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #fff;
  padding: 0 1rem;
  margin: 0 15px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background: #fff;
    color: #18b77e;
  }
`;

const ShowAnswerButton = styled.button`
  height: 60px;
  background-color: #162f30;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #fff;
  margin: 0 10px;
  padding: 0 1rem;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background: #fff;
    color: #162f30;
  }
`;

export default ChapterEditor;
