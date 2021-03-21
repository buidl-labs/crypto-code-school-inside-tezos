import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="ahrefs-site-verification"
          content="8cd0305e74b2fd42de579434ad307197d6dd94c55c34246110be242c4df562ea"
        />
        <script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
        ></script>
        <script
          src={withPrefix('eztz.min.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script>
        <script
          src={withPrefix('sodium-sumo-master.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script>
        <script
          src={withPrefix('tezos-bls12-381.min.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script>
        {/*
        <script
          src={withPrefix('execute.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script>
        <script
          src={withPrefix('smartjs/smart.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script>
        <script
          src={withPrefix('smartjs/smartmljs.bc.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script> */}
        <script
          src={withPrefix('brython/brython.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script>
        <script
          src={withPrefix('brython/brython_stdlib.js')}
          type="text/javascript"
          charSet="utf-8"
          async
          defer
        ></script>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        {/* <script type="text/python" src={withPrefix('smartpyio.py')}></script> */}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
