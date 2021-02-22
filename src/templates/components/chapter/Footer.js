import React, { useMemo } from 'react';
import { Link, navigate } from 'gatsby';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const Footer = ({
  chapterIndex: { current, total, prevSlug, nextSlug },
  module,
  markDone = null,
}) => {
  const [nextLink, nextText] = useMemo(() => {
    return nextSlug
      ? [`/tezos/academy/${module}/${nextSlug}`, 'Next']
      : ['/tezos/claim-bot', 'Finish'];
  });

  const progress =
    typeof window !== `undefined` &&
    JSON.parse(localStorage.getItem('progress') || '{}');
  const prev = useMemo(() =>
    prevSlug ? `/tezos/academy/${module}/${prevSlug}` : '',
  );
  return (
    <footer
      className={`bg-base-800 text-white flex justify-end text-lg px-12 h-14 relative z-0`}
    >
      <div className={`flex items-center space-x-10`}>
        {prev && (
          <Link className={`flex items-center hover:no-underline`} to={prev}>
            <ChevronLeftIcon />
            <span>Prev</span>
          </Link>
        )}
        <p className={`text-base-50`}>
          {current}/{total}
        </p>
        <button
          className={`flex items-center hover:no-underline`}
          onClick={() => {
            if (module === 'module-04') {
              markDone();
            }

            navigate(nextLink);
          }}
        >
          <span>{nextText}</span>
          <ChevronRightIcon />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
