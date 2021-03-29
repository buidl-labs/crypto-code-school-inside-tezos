import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';

export default function MichelsonResult({
  data: { success, result },
  closeDrawer,
  drawerOpen,
  isAnswerCorrect,
}) {
  const [activeContent, setActiveContent] = useState({
    index: 0,
    type: 'code',
  });

  const [currentOutput, setCurrentOutput] = useState('');

  useEffect(() => {
    if (success == true && isAnswerCorrect)
      setActiveContent({ index: 0, type: 'code' });
    else
      setActiveContent({
        index: null,
        type: null,
      });
  }, [success, isAnswerCorrect]);

  useEffect(() => {
    if (success == true && result != undefined && isAnswerCorrect)
      setCurrentOutput(result[activeContent.index][activeContent.type]);
  }, [activeContent.index, activeContent.type]);

  return (
    <>
      {drawerOpen && success ? (
        <div
          className={`absolute inset-x-0 inset-y-0 bg-base-900 bg-opacity-50 z-10`}
          onClick={closeDrawer}
        ></div>
      ) : null}
      <div
        className={`absolute overflow-hidden inset-y-0 right-0 h-full flex flex-col bg-editor-code z-20 transition-transform duration-300 transform ${
          drawerOpen && success ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '50vw', bottom: '3.5rem' }}
      >
        <header
          className={`bg-editor-code flex justify-between items-center text-white px-8 py-7`}
        >
          <h3 className={`font-extrabold text-2xl`}>Compiled Code</h3>
          <button onClick={closeDrawer}>
            <CloseIcon />
          </button>
        </header>
        <div className={`bg-base-900 text-white font-bold flex justify-start`}>
          {result?.map((_, i) => (
            <div className={`mr-6`}>
              <button
                className={`bg-editor-console mr-2 p-4 focus:outline-none ${
                  activeContent.index == i && activeContent.type == 'code'
                    ? 'border border-base-300'
                    : ''
                }`}
                onClick={() => setActiveContent({ index: i, type: 'code' })}
              >
                Contract-{i}
              </button>
              <button
                className={`bg-editor-console mr-2 p-4 focus:outline-none ${
                  activeContent.index == i &&
                  activeContent.type == 'initialStorage'
                    ? 'border border-base-300'
                    : ''
                }`}
                onClick={() =>
                  setActiveContent({ index: i, type: 'initialStorage' })
                }
              >
                Storage-{i}
              </button>
            </div>
          ))}
        </div>

        <pre
          className={`text-base-50 relative block z-20 text-lg p-6 font-mono overflow-auto h-full`}
        >
          {currentOutput}
        </pre>
      </div>
    </>
  );
}
