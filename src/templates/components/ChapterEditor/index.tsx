import React, { useEffect, useState } from 'react';
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

import { EditorResponsiveView } from '../../chapter';

interface Props {
  children: React.ReactNode;
  setShowOutput(input: boolean): void;
  setButtonClicked(input: boolean): void;
  setEditorHeight(input: string): void;
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
  setButtonClicked,
  setEditorHeight,
  chapterIndex,
  updateValidation,
  editorInputValue,
}: Props) {
  const [editorHeight, setResponsiveEditorHeight] = useState('');
  useEffect(() => {
    setResponsiveEditorHeight(EditorResponsiveView);
  }, []);

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
            setButtonClicked(true);
            setEditorHeight(editorHeight);
          }}
        >
          <AiOutlineQuestion /> <span>Show Answer</span>
        </ShowAnswerButton>
        <CheckAnswerButton
          onClick={() => {
            setShowOutput(false);
            setButtonClicked(true);
            setEditorHeight(editorHeight);
            const result = checkCode(editorInputValue, chapterIndex.current);
            // console.log('result', result);
            updateValidation(result);
          }}
        >
          <TiTick /> <span>Check</span>
        </CheckAnswerButton>
      </Option>
    </>
  );
}

export default ChapterEditor;
