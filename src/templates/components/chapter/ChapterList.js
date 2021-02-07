import React from 'react';
import { Link } from 'gatsby';
import CloseIcon from '@material-ui/icons/Close';

const Chapter = ({ chapter, active }) => {
  return (
    <li
      key={chapter.slug}
      className={`m-0 text-lg ${active && 'bg-base-600 font-extrabold'}`}
    >
      <Link
        to={`/tezos/academy/${chapter.module}/${chapter.slug}`}
        className={`block h-full w-full hover:no-underline  py-6 px-9 `}
      >
        {chapter.chapter}: {chapter.title}
      </Link>
    </li>
  );
};
const ChapterList = ({ isOpen, setIsOpen, chapters, activeSlug }) => {
  return (
    <>
      {isOpen && (
        <div
          className={`absolute inset-x-0 inset-y-0 bg-base-900 bg-opacity-50 z-10`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`absolute left-0 inset-y-0 z-20 bg-base-800 text-white pt-6 overflow-hidden flex flex-col transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ minWidth: '40vw' }}
      >
        <header
          className={`flex justify-between items-center pb-9 pl-9 pr-5 flex-shrink-0`}
        >
          <span className={`text-2xl font-extrabold`}>Chapters</span>
          <button onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </button>
        </header>
        <ul className={`flex-1 overflow-y-auto`}>
          {chapters.map(c =>
            activeSlug === c.slug ? (
              <Chapter chapter={c} active key={c.slug} />
            ) : (
              <Chapter chapter={c} key={c.slug} />
            ),
          )}
        </ul>
      </div>
    </>
  );
};

export default ChapterList;
