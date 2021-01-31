import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import SubjectIcon from '@material-ui/icons/Subject';

const LearningInterface = ({ heading, body }) => {
  return (
    <main className={`overflow-hidden flex flex-col`}>
      <header
        className={`flex items-center text-white space-x-6 py-3 h-12 px-6 bg-base-800 flex-shrink-0`}
      >
        <button>
          <SubjectIcon />
        </button>
        <h5 className={`font-extrabold text-lg`}>{heading}</h5>
      </header>
      <div className={`py-8 px-10 overflow-y-auto flex-1`}>
        <MDXProvider
          components={{
            p: props => <p {...props} className={`text-white text-lg mb-6`} />,
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
                className={`text-white text-3xl font-extrabold mt-12 mb-3`}
              />
            ),
            h2: props => (
              <h2
                {...props}
                className={`text-white text-2xl font-bold mt-10 mb-2`}
              />
            ),
            h3: props => (
              <h3
                {...props}
                className={`text-white text-xl font-bold mt-8 mb-2`}
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
                className={`text-primary-300`}
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
