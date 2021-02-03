import React from 'react';

const ErrorMessage = ({ errors }) => {
  return (
    <ul>
      {errors.map(err => (
        <li>
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
      {success ? (
        <p>{'>'} Yay you're good to go</p>
      ) : (
        <ErrorMessage errors={error} />
      )}
    </div>
  );
};

export default DisplayResult;
