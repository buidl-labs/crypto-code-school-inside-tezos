import React from 'react';
import { Link } from 'gatsby';
import Theme from 'src/assets/theme.svg';

function NavLink({ to, children }) {
  console.log(children);
  return (
    <Link className={`text-white text-lg font-bold`} to={to}>
      {children}
    </Link>
  );
}

function NavButton({ children }) {
  return (
    <button className={`bg-primary-600 px-6 py-2 rounded`}>{children}</button>
  );
}

function NavBar(props) {
  return (
    <nav
      className={`bg-base-900 px-30 py-8 flex justify-between items-center font-mulish`}
    >
      <Theme className={`h-18 w-auto`} />
      <ul className={`flex items-center space-x-12`}>
        <li>
          <NavLink to={'/overview'}>Academy</NavLink>
        </li>
        <li>
          <NavLink to={'/marketplace'}>Marketplace</NavLink>
        </li>
        <li>
          <NavButton>
            <NavLink to={'/auth'}>Sign in</NavLink>
          </NavButton>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
