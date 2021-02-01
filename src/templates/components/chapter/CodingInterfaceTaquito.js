import React, { useEffect, useState, useRef } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import styled from '@emotion/styled';
import { ControlledEditor, monaco } from '@monaco-editor/react';
import { TezosToolkit } from '@taquito/taquito';
import { importKey, InMemorySigner } from '@taquito/signer';
import StyledProvider from 'src/components/SemiLiveProvider';
import { LiveEditor, LivePreview, LiveError } from 'react-live';

import theme from 'src/templates/customVSDarkTheme';

import CODE_JSON from 'src/data/code';
import STORAGE_JSON from 'src/data/storage';
import FAUCET_KEY from 'src/data/account';

const CodingInterface = ({ code, answer }) => {
  const [editorValue, setEditorValue] = useState(code);

  const [showAnswer, setShowAnswer] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);

  const liveProvider = useRef(null);

  useEffect(() => {
    monaco.init().then(monacoInstance => {
      monacoInstance.editor.defineTheme('cryptoverse-theme', {
        base: 'vs-dark',
        inherit: true,
        automaticLayout: true,
        rules: [
          { token: 'comment', foreground: '989898', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'EA4192' },
          { token: 'number', foreground: '00FF47' },
          { token: 'string', foreground: 'AA00FA' },
        ],
        colors: {
          'editor.foreground': '#F8F8F8',
          'editor.background': '#030D18',
          'editor.selectionBackground': '#DDF0FF33',
          'editor.lineHighlightBackground': '#FFFFFF08',
          'editorCursor.foreground': '#A7A7A7',
          'editorWhitespace.foreground': '#FFFFFF40',
        },
      });
    });
  }, []);

  const resetEditorCode = () => setEditorValue(code);

  return (
    <StyledProvider
      transformCode={code => code.replace(/import .*/g, '')}
      noInline={true}
      ref={liveProvider}
      //code={editorInputValue}

      code={code}
      // scope={{
      //   ...React,
      //   Tezos,
      //   importKey,
      //   InMemorySigner,
      //   CODE_JSON,
      //   STORAGE_JSON,
      //   FAUCET_KEY,
      // }}
      // // To edit the theme, you need to edit - node_modules/prism-react-renderer/themes/vsDark/index.js
      theme={theme}
      style={{ overflow: 'hidden' }}
    >
      <main className={`flex flex-col`}>
        <header
          className={`flex flex-shrink-0 justify-between items-center text-white space-x-6 h-12 bg-base-800 w-auto`}
        >
          <div
            className={`bg-editor-console p-4 flex items-center justify-center h-full font-mono text-lg font-bold`}
          >
            filename.py
          </div>
          <div className={`mr-12`}>
            <button className={`mr-6`} onClick={resetEditorCode}>
              <RefreshIcon />
            </button>
            <button className={`mr-9`}>
              <HelpOutlineIcon />
            </button>
          </div>
        </header>
        <div className={`flex-1`}>
          <LiveEditor
            style={{
              height: `calc(100vh - 14rem)`,
              fontFamily: `"Ubuntu Mono", monospace`,
              fontSize: '15.75px',
              overflow: 'auto',
            }}
          />
        </div>
        <div
          className={`flex justify-start flex-shrink-0 bg-base-800 text-white text-lg h-12 space-x-4`}
        >
          <button
            className={`bg-primary-600 hover:bg-primary-700 flex items-center  pl-2 pr-4 focus:outline-none`}
            onClick={() => setCheckAnswer(true)}
          >
            <DoneIcon />
            Check
          </button>
          <button
            className={`bg-base-500 hover:bg-base-600 flex items-center pl-2 pr-4 focus:outline-none`}
            onClick={() => setShowAnswer(true)}
          >
            <HelpOutlineIcon />
            Show Answer
          </button>
        </div>
        {(showAnswer || checkAnswer) && (
          <div
            className={`h-12 bg-editor-console flex justify-between items-center`}
          >
            <button
              onClick={() => {
                setShowAnswer(false);
                setCheckAnswer(false);
              }}
              className={`text-white font-mono text-lg p-4 pr-3 flex items-center space-x-3 focus:outline-none`}
            >
              <span>Console</span>
              <CloseIcon />
            </button>
          </div>
        )}
        {showAnswer ? (
          <ControlledEditor
            height={`12rem`}
            value={answer}
            language="javascript"
            theme="cryptoverse-theme"
            options={{
              lineNumbers: false,
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'hidden',
                verticalScrollbarSize: 0,
              },
              folding: false,
              readOnly: true,
              fontSize: 15.75,
              fontFamily: "'Ubuntu Mono', monospace",
              renderSideBySide: false,
              wordWrap: true,
              ignoreTrimWhitespace: false,
              renderWhitespace: 'all',
              lineHeight: 26,
            }}
          />
        ) : null}
      </main>
    </StyledProvider>
  );
};

export default CodingInterface;
