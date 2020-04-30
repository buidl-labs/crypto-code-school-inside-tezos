import React from 'react';
import {
  Footer,
  FooterInner,
  LinkContainer,
  NavigationLink,
  StyledOutboundLink,
  LOGO,
} from './styled';

import BuidlLabsLogo from '../../images/buidl_labs_logo.png';
import Tezos from '../../images/tezos.png';
function FooterPage() {
  return (
    <Footer>
      <FooterInner>
        <div>
          <div></div>
          <LOGO rel="noopener" target="_blank" href="https://tezos.com/">
            <img src={Tezos} alt="build labs logo" />
            <div>
              <h3>Tezos</h3>
            </div>
          </LOGO>
          <LOGO
            style={{ marginTop: 20 }}
            rel="noopener"
            target="_blank"
            href="https://buidllabs.io/"
          >
            <img
              style={{ marginTop: '1rem' }}
              src={BuidlLabsLogo}
              alt="build labs logo"
            />
            <div>
              <h3>BUIDL</h3>
              <h4>LABS</h4>
            </div>
          </LOGO>
        </div>
        <div>
          <LinkContainer style={{ width: 200 }}>
            <h4>Navigation</h4>
            <ul>
              <li>
                <NavigationLink to="/tezos">Home Page</NavigationLink>
              </li>
              <li>
                <NavigationLink to="/tezos/overview">
                  Curriculum Overview
                </NavigationLink>
              </li>
              <li>
                <NavigationLink to="/tezos/privacy-policy">
                  Privacy Policy
                </NavigationLink>
              </li>
            </ul>
          </LinkContainer>
          <LinkContainer>
            <h4>Social</h4>
            <ul>
              <li>
                <StyledOutboundLink
                  rel="noopener"
                  target="_blank"
                  href="https://github.com/buidl-labs/crypto-code-school-inside-tezos"
                >
                  Github
                </StyledOutboundLink>
              </li>
              {/* <li>
                <StyledOutboundLink
                  rel="noopener"
                  target="_blank"
                  href="https://twitter.com/BuidlLabs"
                >
                  Twitter
                </StyledOutboundLink>
              </li> */}
              {/* <li>ProductHunt</li> */}
            </ul>
          </LinkContainer>
        </div>
      </FooterInner>
      <p>2020 | Made with ❤️ by people @ BUIDL Labs</p>
    </Footer>
  );
}

export default FooterPage;
