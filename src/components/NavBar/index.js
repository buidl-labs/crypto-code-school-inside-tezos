import React, { useContext } from 'react';
import { BeaconContext } from '../../context/beacon-context';
import { Link, navigate } from 'gatsby';
import Theme from 'src/assets/theme.svg';
import userAtom from '../../atoms/user-atom';
import isUserAtom from '../../atoms/is-user-atom';
import { useAtom } from 'jotai';
import { createUser, batchUpdateProgress } from '../../api';
import Popper from 'popper.js';
import { MdExpandMore } from 'react-icons/md';

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

function UserDisplay({ user, beacon }) {
  return (
    <div className={`flex space-x-3 items-center`}>
      <Dropdown beacon={beacon} />
      <Link style={{ display: 'flex' }} to="/tezos/profile">
        <NavButton className={`text-lg text-white`}>{user.name}</NavButton>
      </Link>
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
    const url = typeof window !== 'undefined' ? window.location.pathname : '';
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
      className={`bg-base-900 px-30 py-8 flex justify-between items-center font-mulish`}
    >
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
    </nav>
  );
}

export default NavBar;

const Dropdown = ({ color = 'white', beacon }) => {
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
                'cursor-pointer text-white font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none'
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
              <MdExpandMore color="white" size="38px" />
            </div>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? 'block ' : 'hidden ') +
                (color === 'white' ? 'bg-white ' : bgColor + ' ') +
                'text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1'
              }
              style={{ minWidth: '12rem' }}
            >
              <a
                href="#pablo"
                className={
                  'text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent ' +
                  (color === 'white' ? ' text-gray-800' : 'text-white')
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
