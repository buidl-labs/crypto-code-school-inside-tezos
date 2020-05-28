import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-amplitude-analytics';
export const Footer = styled.footer`
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    background: #001c28;
    padding-bottom: 20px;
    text-align: center;
    color: #768b94;
    margin-bottom: 0;
  }
`;

export const FooterInner = styled.div`
  background: #001c28;
  display: flex;
  justify-content: space-between;
  list-style: none;

  > div:first-of-type {
    margin: 4rem;
    h3 {
      color: #ffffff;
    }
  }
  > div:last-of-type {
    display: flex;
    flex-direction: row;
    margin: 4rem;
  }

  @media only screen and (min-width: 800px) {
    > div:last-of-type {
      > div:first-of-type {
        ${'' /* margin-right: 5rem; */}
      }
    }
  }

  @media only screen and (max-width: 550px) {
    display: grid;
    > div:first-of-type {
      grid-row: 2;
    }

    > div:last-of-type {
      display: flex;
      flex-direction: column;
      margin: 4rem 0;

      > div:last-of-type {
        margin-top: 4rem;
      }

      ul {
        display: flex;

        li {
          padding-right: 1rem;
          margin-top: 1rem;
        }
      }
    }
  }
`;

export const LinkContainer = styled.div`
  margin: 0 2rem;

  h4 {
    color: #ffffff;
  }

  ul {
    list-style: none;
    margin-top: 1.5rem;
    padding: 0;
    margin-left: 0;

    li {
      color: #768987;
    }
  }

  @media only screen and (max-width: 321px) {
    margin: 0rem;
  }
`;

export const NavigationLink = styled(Link)`
  text-decoration: none;
  margin-top: 2rem;
  color: #768987;
  transition: 0.25s ease-in;
  :hover {
    color: #fff;
  }
`;

export const StyledOutboundLink = styled(OutboundLink)`
  text-decoration: none;
  margin-top: 2rem;

  color: #768987;
  transition: 0.25s ease-in;
  :hover {
    color: #fff;
  }
`;

export const LOGO = styled.a`
  display: flex;
  text-decoration: none;

  img {
    display: inline-block;
    vertical-align: middle;
    max-width: 30%;
    width: 48px;
    height: 60px;
  }
  div {
    margin-left: 20px;
    h3 {
      font-family: bebas-kai, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 1.5rem;
      margin-top: 20px;
      margin-left: 10px;
    }

    h4 {
      color: #d0d0d0;
      line-height: 1;
      font-weight: 200;
      font-size: 1rem;
      margin-left: 10px;
      margin-top: 1px;
    }
  }

  :hover {
    cursor: pointer;
  }
`;
