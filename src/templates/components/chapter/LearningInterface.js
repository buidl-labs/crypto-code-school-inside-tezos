import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import SubjectIcon from '@material-ui/icons/Subject';
import '../../prism-custom.css';

const LearningInterface = ({ heading, body, setDrawerOpen }) => {
  return (
    <main className={`overflow-hidden flex flex-col`}>
      <header
        className={`flex items-center text-white space-x-6 py-3 h-12 px-6 bg-base-800 flex-shrink-0`}
      >
        <button onClick={() => setDrawerOpen(true)}>
          <SubjectIcon />
        </button>
        <h5
          className={`font-extrabold text-lg overflow-ellipsis overflow-hidden`}
        >
          {heading}
        </h5>
      </header>
      <div className={`py-8 px-10 overflow-y-auto flex-1`}>
        <MDXProvider
          components={{
            p: props => (
              <p
                {...props}
                className={`text-white mb-6 text-lg`}
                style={{ color: '#CACACA' }}
              />
            ),
            ol: props => (
              <ol
                {...props}
                className={`text-white mt-6 space-y-3 list-disc list-inside text-lg`}
              />
            ),
            ul: props => (
              <ul
                {...props}
                className={`text-white mt-6 space-y-3 list-disc list-inside text-lg`}
              />
            ),
            li: props => <li {...props} className={`text-white`} />,
            h1: props => (
              <h1
                {...props}
                className={`text-white font-extrabold mt-12 mb-3 text-4xl`}
              />
            ),
            h2: props => (
              <h2
                {...props}
                className={`text-white font-bold mt-10 mb-2 text-3xl`}
              />
            ),
            h3: props => (
              <h3
                {...props}
                className={`text-white font-bold mt-8 mb-2 text-2xl`}
              />
            ),
            h4: props => (
              <h4 {...props} className={`text-white text-xl mt-8 mb-2`} />
            ),
            a: props => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline text-primary-400`}
              />
            ),
          }}
        >
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
    </main>
  );
};

export default LearningInterface;
