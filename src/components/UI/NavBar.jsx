import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useState } from "react";
import CartDrawer from "../../pages/Shop/Cart";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const [openCart, setOpenCart] = useState(false);

  const cartCount = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch(logout());

    dispatch({ type: "cart/clearCart" });

    setOpenCart(false);

    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Navbar expand="lg" className="bg-white py-2 sticky-top">
        <Container className="d-flex align-items-center">
          {/* BRAND */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold d-flex align-items-center gap-2"
          >
            <CiShop size={28} />
            E-Commerce
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <div className="d-flex w-100 align-items-center">
              <div style={{ flex: 1 }} />

              {/* CENTER LINKS */}
              <Nav className="gap-4 nav-center">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={isActive("/") ? "active-link" : ""}
                >
                  Home
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/products"
                  className={isActive("/products") ? "active-link" : ""}
                >
                  Products
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/contact"
                  className={isActive("/contact") ? "active-link" : ""}
                >
                  Contact
                </Nav.Link>
              </Nav>

              {/* RIGHT */}
              <div
                className="d-flex align-items-center gap-3"
                style={{ flex: 1, justifyContent: "flex-end" }}
              >
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="border-0 bg-transparent icon-btn"
                  >
                    <FiLogOut size={20} />
                  </button>
                ) : (
                  <Link to="/login" className="icon-btn">
                    <IoPerson size={20} />
                  </Link>
                )}

                <button
                  className="border-0 bg-transparent position-relative icon-btn"
                  onClick={() => setOpenCart(true)}
                >
                  <BsCart size={20} />

                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </button>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}
