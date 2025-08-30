import styled from "styled-components";
import { Link } from "react-router-dom";
import HeaderCart from "./HeaderCart";

const HeaderContainer = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">LeafyCart</Logo>
        <NavLinks>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/search">AI Search</NavLink>
          <NavLink to="/ai">LeafyPilot</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/cart">
            <HeaderCart />
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
