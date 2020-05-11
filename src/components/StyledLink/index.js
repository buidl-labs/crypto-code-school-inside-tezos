import { Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledLink = ({ to = '/', children, style }) => {
  return (
    <CustomLink style={style} to={to}>
      {children}
    </CustomLink>
  );
};

export const CustomLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  padding: 8px 25px;
  border: 5px solid rgba(41, 203, 106, 0.41);
  background: #29cb6a;
  border-radius: 7px;
  color: #ffffff;
  transition: 0.3s;
  cursor: pointer;

  :hover {
    color: #fff;
    box-shadow: 0 0 0 0.4rem rgba(41, 203, 106, 0.4);
  }
`;

export default StyledLink;
