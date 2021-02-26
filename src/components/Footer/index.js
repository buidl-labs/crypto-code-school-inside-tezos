import React, { useState } from 'react';
import { Link } from 'gatsby';
import Theme from 'src/assets/theme.svg';
import tezoslogo from '../../images/tezos_logo.png';
import buidllogo from '../../images/buidl_logo.png';
import CloseIcon from '@material-ui/icons/Close';

const OutboundLink = ({ href, children }) => {
  return (
    <li>
      <a
        rel="noopener"
        target="_blank"
        href={href}
        className="font-mulish text-lg text-base-100 hover:text-white hover:no-underline"
      >
        {children}
      </a>
    </li>
  );
};

const NavigationLink = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="font-mulish text-lg text-base-100 hover:text-white hover:no-underline transition duration-400 ease-in-out"
      >
        {children}
      </Link>
    </li>
  );
};

const Heading = ({ children }) => {
  return (
    <h2 className="text-xl font-mulish font-bold text-white mb-3 uppercase">
      {children}
    </h2>
  );
};

const LinkContainer = ({ children }) => {
  return <div className="lg:w-1/4 md:w-1/2 w-full px-4">{children}</div>;
};

const Footer = () => {
  const [cookieBanner, setCookieBanner] = useState(true);

  return (
    <footer className="bg-base-900 font-mulish">
      <div
        className={`text-white fixed inset-x-0 bottom-0 bg-primary-900 bg-opacity-90 px-30 py-6 flex justify-between items-center ${
          cookieBanner === true ? 'flex' : 'hidden'
        }`}
      >
        We use cookies to inform us of how you use the course. This lets us
        understand how to make the course better and track bugs.
        <button onClick={() => setCookieBanner(false)}>
          <CloseIcon />
        </button>
      </div>
      <div className="container px-30 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex flex-col justify-start text-white">
          <Heading>Powered By</Heading>
          <nav className="list-none mb-8 space-y-6">
            <OutboundLink href="https://tezos.com/">
              <img src={tezoslogo} className="h-14 w-auto" />
            </OutboundLink>
            <OutboundLink href="https://buidllabs.io/">
              <img src={buidllogo} className="h-14 w-auto" />
            </OutboundLink>
          </nav>
        </div>
        <div className="flex-grow flex flex-row flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center justify-end">
          <LinkContainer>
            <Heading>Navigation</Heading>
            <nav className="list-none mb-8">
              <NavigationLink to={`/tezos`}>Home</NavigationLink>
              <NavigationLink to={`/tezos/academy`}>Academy</NavigationLink>
              <NavigationLink to={`/tezos/marketplace`}>
                Marketplace
              </NavigationLink>
              <NavigationLink to="/tezos/auth">Sign In</NavigationLink>
            </nav>
          </LinkContainer>

          <LinkContainer>
            <Heading>Legal</Heading>
            <nav className="list-none mb-10">
              <NavigationLink to="/tezos/privacy-policy">
                Privacy Policy
              </NavigationLink>
              <NavigationLink to="/tezos/home">
                Terms and Conditions
              </NavigationLink>
            </nav>
          </LinkContainer>

          <LinkContainer>
            <Heading>Social</Heading>
            <nav className="list-none mb-10">
              <OutboundLink href="https://github.com/buidl-labs/crypto-code-school-inside-tezos">
                Github
              </OutboundLink>
              <OutboundLink href="https://t.me/joinchat/Q4N7fRQPfT1YQvNL1G3xOw">
                Telegram
              </OutboundLink>
            </nav>
          </LinkContainer>
        </div>
      </div>
      <div className="bg-gray-800 bg-opacity-75">
        <div className="container mx-auto py-8 px-5 flex flex-col justify-center">
          <p className="text-white text-xl text-center">
            2020 | Made with ❤️ by people @
            <a href="https://buidllabs.io/" className="underline">
              BUIDL Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
