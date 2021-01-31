import React, { useEffect, useState } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DoneIcon from '@material-ui/icons/Done';
import { ControlledEditor, monaco, DiffEditor } from '@monaco-editor/react';

const CodingInterface = ({ code }) => {
  const [editorValue, setEditorValue] = useState(code);
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
          { token: 'string', foreground: 'FA00FF' },
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
        <ControlledEditor
          value={editorValue}
          onChange={(_, value) => setEditorValue(value)}
          height={`calc(100vh - 8.5rem - 6rem)`}
          language={`python`}
          theme={`cryptoverse-theme`}
          options={{
            lineNumbers: true,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
            folding: true,
            readOnly: false,
            fontSize: 15.75,
            fontFamily: "'Ubuntu Mono', monospace",
            wordWrap: true,
            wordBasedSuggestions: false,
          }}
        />

        {/* <ControlledEditor
          // height={`${
          //   buttonClicked
          //     ? `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight} + ${OutputHeaderHeight} + ${OutputContentHeight}))`
          //     : `calc(100vh - (${HeaderHeight} + ${FooterHeight} + ${ContractFileHeight} + ${OptionHeight}))`
          // }`}
          // width={`calc(100vw - (100vw / 2.4))`}
          value={editorInputValue}
          onChange={(_, value) => {
            setEditorInputValue(value);
          }}
          language="python"
          options={{
            lineNumbers: true,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
            folding: true,
            readOnly: false,
            fontSize: 14,
            fontFamily: "'Ubuntu Mono', monospace",
            wordWrap: true,
            wordBasedSuggestions: false,
          }}
        /> */}
      </div>
      <div
        className={`flex justify-start flex-shrink-0 bg-base-800 text-white text-lg h-12 space-x-4`}
      >
        <button className={`bg-primary-600 flex items-center  pl-2 pr-4`}>
          <DoneIcon />
          Check
        </button>
        <button className={`bg-base-500 flex items-center pl-2 pr-4`}>
          <HelpOutlineIcon />
          Show Answer
        </button>
      </div>
    </main>
  );
};

export default CodingInterface;
