import React from 'react';
import { checkCode } from '../../../utils/checkCode';
import {
  ContractFile,
  Editor,
  Option,
  ShowAnswerButton,
  CheckAnswerButton,
} from './styled';
import RefreshSVG from '../../../assets/refresh.svg';
import { Check, ShowAnswer } from '../../../components/IconSet';
import ReactTooltip from 'react-tooltip';

function ChapterEditor({
  children,
  setShowOutput,
  setButtonClicked,
  updateValidation,
  editorInputValue,
  resetEditor,
  chapterCompletedSuccessfully,
  chapterSolution,
  currentLesson,
  isCode,
}) {
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
          }}
        >
          <ShowAnswer /> <span>Show Answer</span>
        </ShowAnswerButton>
        <CheckAnswerButton
          onClick={() => {
            setShowOutput(false);
            setButtonClicked(true);

            let result;
            if (currentLesson === 'lesson-1' || !isCode) {
              result = checkCode(editorInputValue, chapterSolution);

              updateValidation(result);
            } else {
              const res =
                window !== undefined && window.runCode(editorInputValue);
              console.log(res);
              if (res.success) {
                res.error = [''];
                updateValidation(res);
              } else {
                res.error = [res.error];
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
