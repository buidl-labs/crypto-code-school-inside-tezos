import styled from '@emotion/styled';

export const Footer = styled.footer`
  background: #1a2a28;
  height: 100%;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    background: #1a2a28;
    padding-bottom: 20px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #335a55;
  }
`;

export const FooterInner = styled.div`
  background: #1a2a28;
  display: flex;
  justify-content: space-between;
  list-style: none;

  > div:first-of-type {
    margin: 2rem;
    h3 {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 34px;
      line-height: 40px;

      color: #ffffff;
    }
  }
  > div:last-of-type {
    display: flex;
    flex-direction: row;
    margin-right: 2rem;
  }

  @media only screen and (max-width: 550px) {
    display: grid;
    > div:first-of-type {
      grid-row: 2;
    }

    > div:last-of-type {
      display: flex;
      flex-direction: column;

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
  margin: 2rem;

  h4 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 26px;
    color: #ffffff;
  }

  ul {
    list-style: none;
    margin-top: 0.5rem;
    padding: 0;

    li {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 26px;
      margin-top: 2rem;
      /* identical to box height */

      color: #768987;
    }
  }

  @media only screen and (max-width: 321px) {
    margin: 0rem;
  }
`;
