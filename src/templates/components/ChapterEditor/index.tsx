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

interface Props {
  children: React.ReactNode;
  setShowOutput(input: boolean): void;
  chapterIndex: {
    current: number;
    total: number;
    nextSlug: string | undefined;
    prevSlug: string | undefined;
  };
  updateValidation(input: string): void;
  editorInputValue: string;
}

function ChapterEditor({
  children,
  setShowOutput,
  chapterIndex,
  updateValidation,
  editorInputValue,
}: Props) {
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
