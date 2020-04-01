import React from 'react';
import { Global, css } from '@emotion/core';
import Helmet from 'react-helmet';
import useSiteMetadata from '../../hooks/use-sitemetadata';
import { normalize } from 'polished';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
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
            margin: 0;
            color: #555;
            font-family: 'Roboto';
            font-size: 16px;
            line-height: 19px;
            /* remove margin for the main div that Gatsby mounts into */
            > div {
              margin-top: 0;
            }
            background: radial-gradient(198.67% 198.67% at 53.06% -50.22%, #13282D 53.32%, #296460 100%) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            height: 100vh;
          }
          .react-icons {
            vertical-align: middle;
          }
          body::-webkit-scrollbar {
            background-color: background: radial-gradient(198.67% 198.67% at 53.06% -50.22%, #13282D 53.32%, #296460 100%);
            width: 16px;
          }
          body::-webkit-scrollbar-track {
            background-color: #fff;
          }
          body::-webkit-scrollbar-thumb {
            background-color: #babac0;
            border-radius: 16px;
            border: 4px solid #fff;
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
