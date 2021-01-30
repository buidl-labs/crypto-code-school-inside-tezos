import React, { useEffect } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { ControlledEditor, monaco, DiffEditor } from '@monaco-editor/react';

const CodingInterface = () => {
  useEffect(() => {
    // monaco
    //   .init()
    //   .then(monacoInstance => {
    //     monacoInstance.editor.defineTheme('myCustomTheme', {
    //       base: 'vs-dark',
    //       inherit: true,
    //       automaticLayout: true,
    //       rules: [
    //         { token: 'comment', foreground: '989898', fontStyle: 'italic' },
    //         { token: 'keyword', foreground: 'EA4192' },
    //         { token: 'number', foreground: '00FF47' },
    //         { token: 'string', foreground: 'FA00FF' },
    //       ],
    //       colors: {
    //         'editor.foreground': '#F8F8F8',
    //         'editor.background': '#253F54',
    //         'editor.selectionBackground': '#DDF0FF33',
    //         'editor.lineHighlightBackground': '#FFFFFF08',
    //         'editorCursor.foreground': '#A7A7A7',
    //         'editorWhitespace.foreground': '#FFFFFF40',
    //       },
    //     });
    //   })
    //   .catch(error =>
    //     console.error(
    //       'An error occurred during initialization of Monaco: ',
    //       error,
    //     ),
    //   );
    monaco.init();
  }, []);

  return (
    <main>
      <header
        className={`flex justify-between items-center text-white space-x-6 h-12 bg-base-800 flex-shrink-0 w-auto`}
      >
        <div
          className={`bg-editor-console p-4 flex items-center justify-center h-full font-mono text-lg font-bold`}
        >
          filename.py
        </div>
        <div className={`mr-12`}>
          <button className={`mr-6`}>
            <RefreshIcon />
          </button>
          <button className={`mr-9`}>
            <HelpOutlineIcon />
          </button>
        </div>
      </header>
      <div>
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
    </main>
  );
};

export default CodingInterface;
