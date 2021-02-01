import React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../../hooks/use-sitemetadata';
import NavBar from '../NavBar';

const Layout = ({ children, background }) => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <NavBar />
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
