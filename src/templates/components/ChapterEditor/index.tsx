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
  chapterCompletedSuccessfully: boolean;
  chapterIndex: {
    current: number;
    total: number;
    nextSlug: string | undefined;
    prevSlug: string | undefined;
  };
  updateValidation(input: string): void;
  editorInputValue: string;
  currentLesson: string;
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
  chapterSolution,
  currentLesson
}: Props) {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <>
      <ReactTooltip place="left" type="light" effect="solid" />
      <ContractFile>
        <p>Contract.py</p>
        {!chapterCompletedSuccessfully ? (
          <span data-tip="Reset Editor Content" onClick={() => resetEditor()}>
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
  
              console.log("Show answer clicked.")
            }
          }
        >
          <ShowAnswer /> <span>Show Answer</span>
        </ShowAnswerButton>
        <CheckAnswerButton
          onClick={() => {
              setShowOutput(false);
              setButtonClicked(true);
              console.log("Check answer clicked.")
              const result = checkCode(editorInputValue, chapterSolution);
              updateValidation(result);
            }
          }
        >
          <Check /> <span>Check</span>
        </CheckAnswerButton>
      </Option>
    </>
  );
}

export default ChapterEditor;
