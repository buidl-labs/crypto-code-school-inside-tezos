import React, { useEffect } from 'react';

const ErrorMessage = ({ errors }) => {
  useEffect(() => {
    console.log(errors);
  }, []);
  return (
    <ul>
      {errors
        .filter(err => err !== '')
        .map(err => (
          <li key={err}>
            {'>'} {err}
          </li>
        ))}
      <li>{'>'} Click on "Show Answer" for reference.</li>
    </ul>
  );
};

const DisplayResult = ({ result: { success, error } }) => {
  return (
    <div
      className={`bg-editor-console font-mono px-4 py-2 text-lg h-48 overflow-auto ${
        success ? 'text-success-500' : 'text-error-500'
      }`}
    >
      {success !== undefined ? (
        success ? (
          <p>{'>'} Yay you're good to go</p>
        ) : (
          <ErrorMessage errors={error} />
        )
      ) : null}
    </div>
  );
};

export default DisplayResult;
