import React, { useEffect, useState } from "react";
import { Alert, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getIconColor } from "../../utils/iconColors";
import ProductCard from "../../components/UI/ProductCard";
import Footer from "../../components/UI/Footer";
import { addToCart } from "../../store/slices/CartSlice";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`https://dummyjson.com/products/${id}`);

        const productData = res.data;
        setProduct(productData);

        const relatedRes = await axios.get(
          `https://dummyjson.com/products/category/${productData.category}`,
        );

        const filtered = relatedRes.data.products.filter(
          (p) => p.id !== productData.id,
        );

        setRelated(filtered);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  const discount = product.discountPercentage || 0;
  const originalPrice = product.price || 0;

  const finalPrice = (originalPrice - (discount * originalPrice) / 100).toFixed(
    2,
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: discount > 0 ? Number(finalPrice) : originalPrice,
        thumbnail: product.thumbnail,
      }),
    );

    toast.success(
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }} >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "45px",
            height: "45px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <div>
          <div style={{ fontWeight: "bold" }}>{product.title}</div>
          <small>Added to cart 🛒</small>
        </div>
      </div>,
    );
  };

  return (
    <div>
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid w-75"
              style={{ borderRadius: "12px" }}
            />
          </Col>

          <Col md={6} className="d-flex flex-column gap-2">
            <h2 className="fw-bold">{product.title}</h2>

            <p className="text-muted">{product.description}</p>

            <div className="d-flex align-items-center gap-2">
              <FaStar color={getIconColor(product.rating)} />
              <span>{product.rating}</span>
            </div>

            <div className="mt-2">
              <span className="text-muted me-1">EGP</span>

              {discount > 0 ? (
                <>
                  <span className="fw-bold fs-3">{finalPrice}</span>

                  <span className="text-decoration-line-through text-muted ms-2">
                    {originalPrice}
                  </span>

                  <span className="text-success ms-2">{discount}% OFF</span>
                </>
              ) : (
                <span className="fw-bold fs-3">{originalPrice}</span>
              )}
            </div>

            <p className="fw-bold mt-2">Brand: {product.brand}</p>

            <p>Stock: {product.stock}</p>

            <Button
              variant="dark"
              className="w-100 mt-3 rounded-0"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
            </Button>
          </Col>
        </Row>

        {related.length > 0 && (
          <>
            <h4 className="mt-5 mb-3 fw-bold">Related Products</h4>

            <Row className="g-4">
              {related.slice(0, 4).map((item) => (
                <Col md={3} sm={6} xs={6} key={item.id}>
                  <ProductCard product={item} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      <Footer />
    </div>
  );
}
