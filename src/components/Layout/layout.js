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
