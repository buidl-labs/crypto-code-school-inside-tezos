import React from 'react';
import { TiTick } from 'react-icons/ti';
import { AiOutlineQuestion } from 'react-icons/ai';
import { checkCode } from '../../../utils/compiler';
import {
  ContractFile,
  Editor,
  Option,
  ShowAnswerButton,
  CheckAnswerButton,
} from './styled';
function ChapterEditor({
  children,
  setShowOutput,
  chapterIndex,
  updateValidation,
  editorInputValue,
}) {
  return (
    <>
      <ContractFile>
        <p>Contract.py</p>
      </ContractFile>
      <Editor>{children}</Editor>
      <Option>
        <ShowAnswerButton
          onClick={() => {
            setShowOutput(true);
          }}
        >
          <AiOutlineQuestion /> Show Answer
        </ShowAnswerButton>
        <CheckAnswerButton
          onClick={() => {
            setShowOutput(false);
            const result = checkCode(editorInputValue, chapterIndex.current);
            // console.log('result', result);
            updateValidation(result);
          }}
        >
          <TiTick /> Check
        </CheckAnswerButton>
      </Option>
    </>
  );
}

export default ChapterEditor;
