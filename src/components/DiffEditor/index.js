//import { graphql, StaticQuery } from 'gatsby';
import React, { Component } from 'react';
//import * as monaco from "monaco-editor"; NOT HERE!
class TryItPage extends Component {
  render() {
    return (
      <div>
        <div className="page-content">
          <h1>Try it!</h1>
          <div
            id="container"
            style={{ width: 800, height: 600, border: '1px solid #ccc' }}
          ></div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    import('monaco-editor').then(monaco => {
      //     // Define a new theme that constains only rules that match this language
      //   monaco.editor.defineTheme('myCoolTheme', {
      //     base: 'vs',
      //     inherit: false,
      //     rules: [
      //       { token: 'custom-info', background: '000000' },
      //       { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
      //       { token: 'custom-notice', foreground: 'FFA500' },
      //       { token: 'custom-date', foreground: '008800' },
      //     ],
      //   });

      // HERE!!
      const diffEditor = monaco.editor.createDiffEditor(
        document.getElementById('container'),
        {
          renderSideBySide: false,
        },
      );
      diffEditor.setModel({
        original: monaco.editor.createModel('yo', 'javascript'),
        modified: monaco.editor.createModel('hi', 'javascript'),
      });
    });
  }
}
export default TryItPage;
