import React from 'react';

import Layout from '../components/Layout/layout';
import useChapters from '../hooks/use-chapters';
import { DiffEditor } from '@monaco-editor/react';

const IndexPage = () => {
  const chapters = useChapters();
  return (
    <Layout>
      <h1>Hello World</h1>
      {chapters.map(chapter => (
        <pre>{JSON.stringify(chapter, null, 2)}</pre>
      ))}
      <DiffEditor
        height="440px"
        original={'yo'}
        modified={'hi'}
        language="python"
        options={{
          lineNumbers: true,
          scrollBeyondLastLine: true,
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
          folding: true,
          readOnly: false,
          fontSize: 14,
          fontFamily: 'Electrolize',
          renderSideBySide: false,
        }}
      />
    </Layout>
  );
};

export default IndexPage;
