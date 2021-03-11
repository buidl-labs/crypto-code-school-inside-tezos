import React, { useContext, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import Theme from 'src/assets/theme.svg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { BeaconContext } from 'src/context/beacon-context';
import { useAtom } from 'jotai';
import { createUser, batchUpdateProgress } from 'src/api';
import Popper from 'popper.js';
import { MdExpandMore } from 'react-icons/md';

import model from 'src/images/Col-1.png';

function UserDisplay({ user, beacon }) {
  return <Dropdown beacon={beacon} user={user} />;
}

const NavBar = ({ heading, module, location }) => {
  let beacon = useContext(BeaconContext);
  const [user, setUser] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);

  useEffect(() => {
    checkIfActive();
  }, []);

  async function checkIfActive() {
    const acc = await beacon.client.getActiveAccount();

    if (acc) {
      const u =
        typeof window !== 'undefined' &&
        JSON.parse(localStorage.getItem('user') || '{}');

      if (u && acc.address === u.xtzAddress) {
        if (u.verified) {
          setUser(u);

          let progress =
            typeof window !== `undefined` && localStorage.getItem('progress');
          if (progress) {
            progress = JSON.parse(progress);
            const res = await batchUpdateProgress(u, progress);
          }
        }
      }
    }
  }

  async function signInHandler() {
    if (beacon === null) {
      return;
    }

    const url = typeof window !== 'undefined' ? location.pathname : '/tezos';

    typeof window !== 'undefined' && localStorage.setItem('last-page', url);

    console.log(url);
    let acc = await beacon.client.getActiveAccount();

    if (acc) {
      let u = await createUser(acc.address);
      if (u.verified) {
        console.log(`u is verified`);
        setUser(u);
        let progress =
          typeof window !== `undefined` && localStorage.getItem('progress');
        if (progress) {
          progress = JSON.parse(progress);
          const res = await batchUpdateProgress(u, progress);
          console.log(res);
        }
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

const Dropdown = ({ color = 'white', beacon, user }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <div
              className={
                'cursor-pointer text-white font-bold text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none'
              }
              style={{ transition: 'all .15s ease' }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <div className={`flex items-center`}>
                <div
                  className={`text-white text-lg font-bold inline-flex items-center space-x-2`}
                >
                  <img
                    src={model}
                    className="w-8 h-8 rounded-full bg-primary-800"
                  />
                  <span className="select-none">{user.name}</span>
                  <span>
                    {' '}
                    <MdExpandMore color="white" size="24px" />
                  </span>
                </div>
              </div>
            </div>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? 'block ' : 'hidden ') +
                (color === 'white' ? 'bg-base-700 ' : bgColor + ' ') +
                'text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1'
              }
              style={{ minWidth: '12rem' }}
            >
              <a
                href="#profile"
                className={
                  'text-base py-2 px-4 font-bold block w-full whitespace-no-wrap bg-transparent' +
                  (color === 'white' ? ' text-white' : 'text-white')
                }
              >
                <Link to="/tezos/profile"> My Profile</Link>
              </a>
              <a
                href="#sign out"
                className={
                  'text-base py-2 px-4 font-bold block w-full whitespace-no-wrap bg-transparent ' +
                  (color === 'white' ? ' text-error-500' : 'text-error-500')
                }
                onClick={e => {
                  e.preventDefault();
                  //close the drop down
                  dropdownPopoverShow ? closeDropdownPopover() : null;

                  beacon.client.destroy().then(() => {
                    window.location.href = '/tezos';
                  });
                }}
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
