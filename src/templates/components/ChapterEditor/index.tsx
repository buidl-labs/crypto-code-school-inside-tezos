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
import { useMediaQuery } from 'react-responsive';
import RefreshSVG from '../../../assets/refresh.svg';

interface Props {
  children: React.ReactNode;
  setShowOutput(input: boolean): void;
  setButtonClicked(input: boolean): void;
  setEditorHeight(input: string): void;
  resetEditor(): void;
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
  resetEditor,
}: Props) {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <>
      <ContractFile>
        <p>Contract.py</p>
        <span onClick={() => resetEditor()}>
          <RefreshSVG />
        </span>
      </ContractFile>
      <Editor>{children}</Editor>
      <Option>
        <ShowAnswerButton
          onClick={() => {
            setShowOutput(true);
            setButtonClicked(true);
            setEditorHeight(
              `${
                isMobile
                  ? `calc(100vh - (130px)) `
                  : `calc(100vh - (250px + 200px + 40px))`
              }`,
            );
          }}
        >
          <AiOutlineQuestion /> <span>Show Answer</span>
        </ShowAnswerButton>
        <CheckAnswerButton
          onClick={() => {
            setShowOutput(false);
            setButtonClicked(true);
            setEditorHeight(
              `${
                isMobile
                  ? `calc(100vh - (130px)) `
                  : `calc(100vh - (250px + 200px + 40px))`
              }`,
            );
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
