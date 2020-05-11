import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import SEO from 'src/components/Seo';
import landingPage from 'src/images/landing_page.jpg';

//redirect homepage view to /tezos
const HomePage = () => {
  useEffect(() => {
    navigate('/tezos');
  });
  return (
    <>
      <SEO
        title="Smartpy tutorial and tezos blockchain programming course"
        keywords={[
          `smartpy`,
          `python`,
          `interactive`,
          `programming`,
          `tutorial`,
          `tezos`,
          `blockchain`,
        ]}
        image={{
          src: landingPage,
          width: 560,
          height: 300,
        }}
      />
    </>
  );
};

export default HomePage;
