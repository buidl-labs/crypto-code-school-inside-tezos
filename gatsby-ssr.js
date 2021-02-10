/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React, { Suspense } from 'react';
import { Provider } from 'jotai';

export const wrapRootElement = ({ element }) => {
  return (
    <Suspense fallback={null}>
      <Provider>{element}</Provider>
    </Suspense>
  );
};
