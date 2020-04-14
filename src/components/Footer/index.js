import React from 'react';
import { Footer, FooterInner, LinkContainer, NavigationLink } from './styled';

function FooterPage() {
  return (
    <Footer>
      <FooterInner>
        <div>
          <h3>BUIDL LABS</h3>
          <h3>LOGO X Tezos</h3>
        </div>
        <div>
          <LinkContainer>
            <h4>Navigation</h4>
            <ul>
              <li>
                <NavigationLink to="/privacy-policy">
                  Privacy Policy
                </NavigationLink>
              </li>
              <li>About</li>
              <li>Blog</li>
            </ul>
          </LinkContainer>
          <LinkContainer>
            <h4>Social</h4>
            <ul>
              <li>Github</li>
              <li>Twitter</li>
              <li>ProductHunt</li>
            </ul>
          </LinkContainer>
        </div>
      </FooterInner>
      <p>2020 | Footnote</p>
    </Footer>
  );
}

export default FooterPage;
