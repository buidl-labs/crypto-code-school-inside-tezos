import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const Footer = styled.footer`
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    background: #152023;
    padding-bottom: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #335a55;
  }
`;

export const FooterInner = styled.div`
  background: #152023;
  display: flex;
  justify-content: space-between;
  list-style: none;

  > div:first-of-type {
    margin: 4rem;
    h3 {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 40px;

      color: #ffffff;
    }
  }
  > div:last-of-type {
    display: flex;
    flex-direction: row;
    margin: 4rem;
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
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 26px;
    color: #ffffff;
  }

  ul {
    list-style: none;
    margin-top: 1.5rem;
    padding: 0;

    li {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 26px;
      margin-top: 1.5rem;
      /* identical to box height */

      color: #768987;
    }
  }

  @media only screen and (max-width: 321px) {
    margin: 0rem;
  }
`;

export const NavigationLink = styled(Link)`
  text-decoration: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  margin-top: 2rem;
  /* identical to box height */

  color: #768987;
  transition: 0.25s ease-in;
  :hover {
    color: #fff;
  }
`;
