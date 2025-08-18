import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../hooks/useCart";

const HeaderContainer = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .item-count {
    position: absolute;
    top: -8px;
    right: -12px;
    background: #2c5282;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

const Header = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">LeafyCart</Logo>
        <NavLinks>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/cart">
            <CartIcon>
              <FontAwesomeIcon icon={faShoppingCart} />
              {itemCount > 0 && <span className="item-count">{itemCount}</span>}
            </CartIcon>
          </NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
