import React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../../hooks/use-sitemetadata';

function AuthLayout({ children }) {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <main className={`min-h-screen`}>{children}</main>
    </>
  );
}

export default AuthLayout;
