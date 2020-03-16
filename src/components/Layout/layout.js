import React from 'react';
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import useSiteMetadata from '../../hooks/use-sitemetadata';

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Global
        styles={css`
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
            margin: 0;
            color: #555;
            font-family: 'Roboto';
            font-size: 16px;
            line-height: 19px;
            /* remove margin for the main div that Gatsby mounts into */
            > div {
              margin-top: 0;
            }
          }
          .react-icons {
            vertical-align: middle;
          }
          ${'' /* h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: #222;
            line-height: 1.1;
            + * {
              margin-top: 0.5rem;
            }
          } */}
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
