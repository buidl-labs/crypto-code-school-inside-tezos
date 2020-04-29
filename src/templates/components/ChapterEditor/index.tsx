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
import { Check, ShowAnswer } from '../../../components/IconSet';
import ReactTooltip from 'react-tooltip';

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
  chapterCompletedSuccessfully,
}: Props) {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <>
      <ReactTooltip place="left" type="light" effect="float" />
      <ContractFile>
        <p>Contract.py</p>
        {!chapterCompletedSuccessfully ? (
          <span
            data-delay-show="600"
            data-tip="reset editor content"
            onClick={() => resetEditor()}
          >
            <RefreshSVG />
          </span>
        ) : null}
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
          <ShowAnswer /> <span>Show Answer</span>
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
          <Check /> <span>Check</span>
        </CheckAnswerButton>
      </Option>
    </>
  );
}

export default ChapterEditor;
