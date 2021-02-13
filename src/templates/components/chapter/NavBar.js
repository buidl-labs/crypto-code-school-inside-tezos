import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import Theme from 'src/assets/theme.svg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { BeaconContext } from 'src/context/beacon-context';
import { useAtom } from 'jotai';
import { createUser } from 'src/api';

function UserDisplay({ user, beacon }) {
  return (
    <div className={`flex items-center`}>
      <Link
        className={`bg-primary-600 px-6 py-2 rounded text-lg font-bold ml-12`}
        to="/tezos/profile"
      >
        {user.name}
      </Link>
    </div>
  );
}

const NavBar = ({ heading, module }) => {
  let beacon = useContext(BeaconContext);
  const [user, setUser] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);

  async function signInHandler() {
    if (beacon === null) {
      return;
    }
    const url = typeof window !== 'undefined' ? window.location.pathname : '';
    console.log(url);
    let acc = await beacon.client.getActiveAccount();

    if (acc) {
      let u = await createUser(acc.address);
      if (u.verified) {
        console.log(`u is verified`);
        setUser(u);
        return;
      } else navigate('/auth', { state: { pathname: url } });
      console.log(acc);
    } else {
      navigate('/auth', { state: { pathname: url } });
    }
  }

  return (
    <nav
      className={`flex justify-between items-center px-9 h-20 bg-base-900 text-white`}
    >
      <Link className={`flex items-center`} to={`/tezos/academy/${module}`}>
        <ChevronLeftIcon />
        <Theme className={`h-18 w-auto ml-4`} />
      </Link>
      <div className={`text-lg font-bold pr-4`}>{heading}</div>
      <div>
        {!isUser ? (
          <button
            className={`bg-primary-600 px-6 py-2 rounded text-lg font-bold ml-12`}
            onClick={signInHandler}
          >
            Sign in
          </button>
        ) : (
          <div style={{ display: 'flex' }}>
            <UserDisplay user={user} beacon={beacon} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
