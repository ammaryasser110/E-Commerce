import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import { getIconColor } from "../../utils/iconColors";
import { addToCart } from "../../store/slices/CartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const rating = product.rating;
  const originalPrice = product.price;
  const discountPercentage = product.discountPercentage;

  const isDiscounted = discountPercentage > 0;

  const finalPrice = (
    originalPrice -
    (discountPercentage * originalPrice) / 100
  ).toFixed(2);

  function handleAddToCart() {
    dispatch(
      addToCart({
        ...product,
        price: isDiscounted ? Number(finalPrice) : originalPrice,
      }),
    );

    toast.success(
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
  }

  return (
    <Card
      className="h-100 border-0 shadow-sm product-card"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        transition: "0.3s ease",
      }}
    >
      <Card.Text
        className="fw-bold bg-warning p-2 rounded-5 m-2"
        style={{ width: "fit-content" }}
      >
        <i>{product.brand}</i>
      </Card.Text>

      <Link to={`/product/${product.id}`} style={{ overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={product.thumbnail}
          style={{
            height: "100%",
            objectFit: "cover",
            transition: "0.3s ease",
          }}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Card.Title
          style={{ fontSize: "1rem", fontWeight: "600" }}
          className="mb-2"
        >
          {product.title}
        </Card.Title>

        <Card.Subtitle
          className="d-flex align-items-center gap-1 p-2 rounded mb-2"
          style={{ backgroundColor: "#e8edfb", width: "fit-content" }}
        >
          <FaStar color={getIconColor(rating)} />
          <span>{rating}</span>
        </Card.Subtitle>

        <Card.Text>
          <span className="text-small me-1">EGP</span>

          {!isDiscounted ? (
            <span className="fw-bold fs-4">{originalPrice}</span>
          ) : (
            <>
              <span className="fw-bold fs-4">{finalPrice}</span>

              <span className="ms-2 text-muted text-decoration-line-through">
                {originalPrice}
              </span>

              <span className="text-success ms-1 fw-medium">
                {discountPercentage}%
              </span>
            </>
          )}
        </Card.Text>

        <Button
          variant="dark"
          className="w-100 rounded-0"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
