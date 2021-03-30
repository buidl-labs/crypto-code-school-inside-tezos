import React, { useContext, useState, useEffect } from 'react';
import { BeaconContext } from '../../context/beacon-context';
import { Link, navigate } from 'gatsby';
import Theme from 'src/assets/theme.svg';
import userAtom from '../../atoms/user-atom';
import isUserAtom from '../../atoms/is-user-atom';
import { useAtom } from 'jotai';
import { createUser, batchUpdateProgress } from '../../api';
import checkIfUserActive from 'src/utils/automaticLogin';
import Popper from 'popper.js';
import { MdExpandMore, MdWarning, MdClose } from 'react-icons/md';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import model from 'src/images/Col-1.png';
import { ThanosWallet } from '@thanos-wallet/dapp';

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
      className={`bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded text-white text-lg font-bold focus:outline-none`}
    >
      {children}
    </button>
  );
}

function UserDisplay({ user, beacon }) {
  return <Dropdown beacon={beacon} user={user} />;
}

function NavBar(props) {
  const [user, setUser] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);

  let beacon = useContext(BeaconContext);
  //fix: sync this with localStorage
  const [alertBanner, setAlertBanner] = useState(false);

  useEffect(() => {
    typeof window !== 'undefined' &&
      checkIfUserActive(setUser, beacon, window.location);
  }, []);

  async function signInHandler() {
    if (beacon === null) {
      return;
    }

    const url = typeof window !== 'undefined' ? window.location.pathname : '';
    console.log(url);
    const thanosIsAvailable = await ThanosWallet.isAvailable();

    let acc = await beacon.client.getActiveAccount();

    if (acc && thanosIsAvailable) {
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let banner = localStorage.getItem('alertBanner');
      if (banner !== null) {
        setAlertBanner(JSON.parse(banner));
      } else {
        setAlertBanner(true);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alertBanner', JSON.stringify(alertBanner));
  }, [alertBanner]);

  return (
    <nav className={`bg-base-900  font-mulish`}>
      <div
        style={{ background: 'rgba(245,158,11,0.2)' }}
        className={`text-white top-0 px-30 py-2 flex items-center justify-between ${
          alertBanner === true ? 'flex' : 'hidden'
        }`}
      >
        <div className="inline-flex justify-center items-center">
          <div
            className="mr-2 w-8 h-8 flex-shrink-0 rounded-full inline-flex items-center justify-center"
            style={{
              color: 'rgba(245,158,11,1)',
              background: 'rgba(245,158,11,0.3)',
            }}
          >
            <MdWarning size="16" />
          </div>
          <div>
            <p className="text-sm ">
              Cryptoverse Wars is on mainnet now. Caution, smart contract have
              not been audited by a third party.
            </p>
          </div>
        </div>
        <button onClick={() => setAlertBanner(false)}>
          <MdClose size="24" />
        </button>
      </div>
      <div className="px-30 py-8 flex justify-between items-center">
        <Link to="/tezos">
          <Theme className={`h-18 w-auto`} />
        </Link>
        <ul className={`flex items-center space-x-12`}>
          <li>
            <NavLink to={'/tezos/academy'}>Academy</NavLink>
          </li>
          <li>
            <NavLink to={'/tezos/marketplace'}>Marketplace</NavLink>
          </li>
          {!isUser ? (
            <li>
              <NavButton clickHandler={signInHandler}>Sign in</NavButton>
            </li>
          ) : (
            <li>
              <div style={{ display: 'flex' }}>
                <UserDisplay user={user} beacon={beacon} />
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

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
