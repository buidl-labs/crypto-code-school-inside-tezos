import React, { useMemo } from 'react';
import { Link } from 'gatsby';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const Footer = ({
  chapterIndex: { current, total, prevSlug, nextSlug },
  module,
}) => {
  const [nextLink, nextText] = useMemo(() => {
    return nextSlug
      ? [`/tezos/academy/${module}/${nextSlug}`, 'Next']
      : ['/tezos/academy', 'Finish'];
  });

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
        <Link className={`flex items-center hover:no-underline`} to={nextLink}>
          <span>{nextText}</span>
          <ChevronRightIcon />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
