import React from 'react';

import Layout from '../components/Layout/layout';
import useChapters from '../hooks/use-chapters';
const IndexPage = () => {
  const chapters = useChapters();
  return (
    <Layout>
      <h1>Hello World</h1>
      {chapters.map(chapter => (
        <pre>{JSON.stringify(chapter, null, 2)}</pre>
      ))}
    </Layout>
  );
};

export default IndexPage;
