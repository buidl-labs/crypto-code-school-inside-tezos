import React from 'react';
import Layout from '../components/Layout/layout';
import { navigate } from 'gatsby';
const IndexPage = () => {
  return (
    <Layout>
      <button
        onClick={() => {
          navigate('/lessons');
        }}
      >
        Start learning
      </button>
    </Layout>
  );
};

export default IndexPage;
