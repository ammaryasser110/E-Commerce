import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 mt-5">
      <Container>
        <div className="text-center mb-4">
          <h4 className="fw-bold">🛒 E-Commerce Store</h4>
          <p className="text-muted">
            Best products with best prices. Fast delivery and trusted quality.
          </p>
        </div>

        <Row className="text-center">
          {/* Quick Links */}
          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="footer-link text-light text-decoration-none"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="footer-link text-light text-decoration-none"
                >
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/cart"
                  className="footer-link text-light text-decoration-none"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">Contact</h5>
            <p className="mb-1">📍 Cairo, Egypt</p>
            <p className="mb-1">📞 +20 123 456</p>
            <p className="mb-1">📧 support@store.com</p>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="fw-bold mb-3">About Us</h5>
            <p className="  ">
              We provide high-quality products with fast shipping and best
              customer service.
            </p>
          </Col>
        </Row>

        <hr className="border-secondary mt-4" />

        {/* Bottom */}
        <div className="text-center py-3">
          <small>© 2026 E-Commerce Store. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  );
}
