import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductDetails from "../products/ProductDetails";

export default function CartDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cart, setCart] = useState(null);

  const getCart = async () => {
    const res = await axios.get(`https://dummyjson.com/carts/${id}`);
    setCart(res.data);
  };

  useEffect(() => {
    getCart();
  }, [id]);

  if (!cart) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Cart #{cart.id}</h2>

      {cart.products.map((product) => (
        <Card key={product.id} className="mb-3 p-3 shadow-sm">
          <Row
            className="align-items-center"
            onClick={() => navigate(`/dashboard/productdetails/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <Col md={3}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  maxHeight: "120px",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            </Col>

            <Col md={9}>
              <h5>{product.title}</h5>

              <p className="mb-1">
                <strong>Price:</strong> ${product.price}
              </p>

              <p className="mb-1">
                <strong>Quantity:</strong> {product.quantity}
              </p>

              <p className="mb-0">
                <strong>Total:</strong> ${product.total}
              </p>
            </Col>
          </Row>
        </Card>
      ))}

      <h4 className="mt-4 text-start">Cart Total: ${cart.total}</h4>
    </div>
  );
}
