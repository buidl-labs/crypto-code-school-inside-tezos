import React from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { TezosToolkit } from '@taquito/taquito';
import { importKey, InMemorySigner } from '@taquito/signer';

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

export default SemiLiveProvider;