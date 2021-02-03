import React, { useContext } from 'react';
import { BeaconContext } from '../../context/beacon-context';
import { Link, navigate } from 'gatsby';
import Theme from 'src/assets/theme.svg';
import userAtom from '../../atoms/user-atom';
import isUserAtom from '../../atoms/is-user-atom';
import { useAtom } from 'jotai';
import { createUser } from '../../api';

function NavLink({ to, children }) {
  return (
    <Link className={`text-white text-lg font-bold`} to={to}>
      {children}
    </Link>
  );
}

function NavButton({ children, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className={`bg-primary-600 px-6 py-2 rounded text-white text-lg font-bold`}
    >
      {children}
    </button>
  );
}

function UserDisplay({ user }) {
  return (
    <div className={`flex space-x-3 items-center`}>
      <div className={`h-8 w-8 rounded-full bg-primary-600`}></div>
      <div className={`text-lg text-white`}>{user.name}</div>
    </div>
  );
}

function NavBar(props) {
  const [user, setUser] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);
  let beacon = useContext(BeaconContext);

  async function signInHandler() {
    if (beacon === null) {
      return;
    }
    let acc = await beacon.client.getActiveAccount();
    if (acc) {
      let u = await createUser(acc.address);
      if (u.verified) {
        console.log(`u is verified`);
        setUser(u);
        return;
      } else navigate('/auth');
      console.log(acc);
    } else {
      navigate('/auth');
    }
  }
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
          <NavLink to={'/tezos/marketplace'}>Marketplace</NavLink>
        </li>
        <li>
          <NavButton>
            <NavLink to={'/auth'}>Sign in</NavLink>
          </NavButton>
        </li>
        {!isUser ? (
          <li>
            <NavButton clickHandler={signInHandler}>Sign in</NavButton>
          </li>
        ) : (
          <li>
            <Link to="/tezos/profile">
              <UserDisplay user={user} />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
