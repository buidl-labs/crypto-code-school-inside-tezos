import React from 'react';
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import useSiteMetadata from '../../hooks/use-sitemetadata';
import { normalize } from 'polished';

const Layout = ({ children, background }) => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Global
        styles={css`
          ${normalize()}
          * {
            box-sizing: border-box;
            margin: 0;
          }
          /* More info: https://bit.ly/2PsCnzk */
          ${'' /* * + * {
            margin-top: 1rem;
          } */}
          html,
          body {
            background: ${background ? background : 'none'};
            /* remove margin for the main div that Gatsby mounts into */
            > div {
              margin-top: 0;
            }
          }
          .react-icons {
            vertical-align: middle;
          }
          /*Mixins and Essentials*/
          ::-webkit-scrollbar {
            width: 12px;
            height: 5px;
          }

          ::-webkit-scrollbar-thumb {
            height: 6px;
            border: 3px solid rgba(0, 0, 0, 0);
            background-clip: padding-box;
            -webkit-border-radius: 7px;
            background-color: rgba(0, 0, 0, 0.3);
          }

          ::-webkit-scrollbar-button {
            width: 0;
            height: 0;
            display: none;
          }

          ::-webkit-scrollbar-corner {
            background-color: transparent;
          }
        `}
      />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <main>{children}</main>
    </>
  );
};

export default Layout;

//TODO: add custom-scroll bar
// body::-webkit-scrollbar {
//   background-color: #fff;
//   width: 16px;
// }
// body::-webkit-scrollbar-track {
//   background-color: #fff;
// }
// body::-webkit-scrollbar-thumb {
//   background-color: #babac0;
//   border-radius: 16px;
//   border: 4px solid #fff;
// }
