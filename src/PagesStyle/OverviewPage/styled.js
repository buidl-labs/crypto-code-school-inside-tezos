import { Link } from 'gatsby';
import styled from '@emotion/styled';

export const Container = styled.div`
  background: radial-gradient(
      144.9% 144.89% at 53.86% -49.56%,
      #09272e 43.89%,
      #1f476b 100%
    )
    no-repeat center center fixed;
  background-size: cover;

  > div:first-of-type {
    margin-left: 10px;
    margin-top: 20px;
  }
`;

export const ThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

export const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  margin: 0rem 2rem 6rem 2rem;

  h1 {
    margin: 2rem auto;
    width: 80%;
    color: #ffffff;
  }

  > div:first-of-type {
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 1rem;

    p {
      color: #ded9d9;
      width: 80%;
      margin: 2rem auto;
    }

    div {
      display: flex;
      justify-content: center;
    }

    svg {
      width: 100%;
      height: 100%;
      max-width: 280px;
      max-height: 280px;
    }
  }

  > div:last-of-type {
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      h2 {
        font-family: 'Sigmar One';
        color: #ffffff;
        font-size: 3rem;
        margin-left: 1.16rem;
      }
    }

    ul {
      margin-top: 2rem;
      list-style: none;
      padding: 0;

      li {
        a {
          display: block;
          text-decoration: none;
          color: #ffffff;
          margin-top: 1rem;
          margin-bottom: 1rem;

          > svg {
            display: inline-block;
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 40px;
          }
        }
        hr {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          height: 1px;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 0;

    div {
      width: 90%;
      margin: 0 auto;
    }

    > div:last-of-type {
      > div {
        ${'' /* h2 {
          font-size: 29px;
        } */}

        svg {
          width: 56px;
          height: 56px;
        }
      }
    }
  }
`;

export const BackLink = styled(Link)`
  display: inline-block;
  color: #fff;
  text-decoration: none;
  margin: 10px;

  > span {
    margin-left: 6px;
    margin-top: 10px;
    display: inline-block;
  }

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: -2px;
  }
`;

export const StartLink = styled(Link)`
  margin: 0 2rem;
`;

export const ParentOverviewContainer = styled.main`
  color: #ffffff;
  margin: 4rem;
  margin-top: 0rem;
  h1{
    color: #ffffff;
    font-family: 'Sigmar One';
    text-align: center;
  }
  h2{
    margin: 0;
    margin-bottom: 1rem;
  }
`

export const MainOverviewWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 2rem;
margin-top: 2rem;
align-items: start; 
`

export const GeneralOverview = styled.div`
    background: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 2rem;
    p {
      margin-bottom: 3rem;
    }
`
export const ModuleOverview = styled.div`

`

export const ModuleBox = styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.25);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    h2{
      margin: 0;
    }
`

export const ModuleLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2897ff;
  transition: .2s all;
  :hover {
    color: #efefef;
  }
  svg{
    height: 2.75rem;
    width: 2.75rem;
  }
`;