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
  chapterSolution: string;
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
            // setEditorHeight(
            //   `${
            //     isMobile
            //       ? `calc(100vh - (130px)) `
            //       : `calc(100vh - (250px + 200px + 40px))`
            //   }`,
            // );
          }}
        >
          <ShowAnswer /> <span>Show Answer</span>
        </ShowAnswerButton>
        <CheckAnswerButton
          onClick={() => {
            setShowOutput(false);
            setButtonClicked(true);
            // setEditorHeight(
            //   `${
            //     isMobile
            //       ? `calc(100vh - (130px)) `
            //       : `calc(100vh - (250px + 200px + 40px))`
            //   }`,
            // );
            let result;
            if(currentLesson === "lesson-1"){
              result = checkCode(editorInputValue, chapterSolution);
            
              updateValidation(result);
            }else{
              console.log("Running code...")
              const res = window !== undefined && window.runCode(editorInputValue);
              console.log(res);
              if(res.success){
                res.error = [""]
                updateValidation(res);
              }else{
                res.error = [res.error]
                updateValidation(res);
              }
            }
            
            
          }}
        >
          <Check /> <span>Check</span>
        </CheckAnswerButton>
      </Option>
    </>
  );
}

export default ChapterEditor;
