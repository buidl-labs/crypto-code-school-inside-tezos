import React from 'react';
import Layout from '../components/Layout/layout';
import { navigate } from 'gatsby';
const IndexPage = () => {
  return (
    <Layout>
      <button
        onClick={() => {
          navigate('/lesson/chapter-01');
        }}
      >
        Start learning
      </button>
    </Layout>
  );
};

export default IndexPage;
