import React, { useState, useEffect, useRef } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { TezosToolkit } from '@taquito/taquito';
import { importKey, InMemorySigner } from '@taquito/signer';
export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        filterBy
      }
      body
    }
  }
`;

class SemiLiveProvider extends LiveProvider {
  constructor() {
    super();

    this.onChange = code => {
      // Override to prevent LiveProvider transpiling code on every change but
      // keep the code. We will need it later.
      console.log(code);
      this.code = code;
    };
  }

  UNSAFE_componentWillMount() {
    // Override to prevent LiveProvider transpiling code on mount but
    // keep the code. We will need it later.
    this.code = this.props.code;
  }

  componentDidUpdate() {
    // Override to prevent LiveProvider transpiling code on update but
    // keep the code. We will need it later.
  }

  run() {
    const { scope, transformCode, noInline } = this.props;

    // The following piece of code provides additional functionality
    // to the user code such as print function and key import
    const code = `
    let _printlnBuffer = "";
    function print(value) {
      _printlnBuffer += value + "\\n";
      render(_printlnBuffer);
    }
    Tezos.setProvider({ rpc: 'https://api.tez.ie/rpc/carthagenet' });
    ${`fetch('https://api.tez.ie/keys/carthagenet/', {
        method: 'POST',
        headers: { Authorization: 'Bearer taquito-example' },
      })
      .then(response => response.text())
      .then(privateKey => {
        return importKey(Tezos, privateKey);
       })
      .then(() => {
        ${this.code}
       });`}`;

    this.transpile({ code, scope, transformCode, noInline });
  }
}

function ChapterWithLiveEditor() {
  const live = useRef(null);

  const handleRunCode = () => {
    live.current && live.current.run();
  };

  const input = `
    Tezos.tz
    .getBalance('tz1h3rQ8wBxFd8L9B3d7Jhaawu6Z568XU3xY')
    .then(balance => print(balance.toNumber() / 1000000 + "ꜩ"))
    .catch(error => print(JSON.stringify(error)));
  `.trim();

  const Tezos = new TezosToolkit('https://api.tez.ie/rpc/carthagenet');

  return (
    <div>
      <SemiLiveProvider
        transformCode={code => code.replace(/import .*/g, '')}
        noInline={true}
        ref={live}
        code={input}
        scope={{ ...React, Tezos, importKey, InMemorySigner }}
      >
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </SemiLiveProvider>
      <button onClick={() => handleRunCode()}>run code</button>
    </div>
  );
}

export default ChapterWithLiveEditor;
