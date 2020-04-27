import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledLink = ({ to = '/', children }) => {
  return (
    <ButtonWrapper>
      <CustomLink to={to}>{children}</CustomLink>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 2rem 0;
`;

const CustomLink = styled(Link)`
  display: inline-block;
  color: #fff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  font-size: 23px;
  line-height: 175%;
  margin: 0 10px;
  padding: 18px 30px;
  background: #29cb6a;
  border: none;
  outline: none;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  letter-spacing: 2px;
  border-radius: 5px;
  transition: all 0.4s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  font-size: 1.2rem;
  width: inherit;

  :before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    height: 100%;
    width: 100%;
    background: #29cb6a;
    transform: scale(0.9);
    filter: blur(15px);
    opacity: 0.5;
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  }

  :hover {
    box-shadow: 0 0 0 0.4rem rgba(102, 204, 167, 0.25);
  }

  :hover:before {
    top: 20px;
  }

  :active {
    transform: scale(0.8);
  }
`;

export default StyledLink;
