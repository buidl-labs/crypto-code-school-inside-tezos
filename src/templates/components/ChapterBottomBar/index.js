import React from 'react';
import { checkCode } from '../../../utils/compiler';
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
            const result = checkCode(editorInputValue, chapterSolution);
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
