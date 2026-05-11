import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Spinner } from "react-bootstrap";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card
      className="p-4 shadow border-0"
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <div className="text-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
      </div>

      <h2 className="text-center mb-2">{product.title}</h2>

      <h4 className="text-success text-center mb-3">${product.price}</h4>

      <p className="text-muted text-center">{product.description}</p>

      <hr />

      <div className="d-flex justify-content-between">
        <strong>ID:</strong>
        <span>{product.id}</span>
      </div>

      <div className="d-flex justify-content-between">
        <strong>Brand:</strong>
        <span>{product.brand}</span>
      </div>

      <div className="d-flex justify-content-between">
        <strong>Category:</strong>
        <span>{product.category}</span>
      </div>

      <div className="d-flex justify-content-between">
        <strong>Rating:</strong>
        <span>{product.rating}</span>
      </div>

      <div className="d-flex justify-content-between">
        <strong>discountPercentage:</strong>
        <span>{product.discountPercentage}%</span>
      </div>

      <div className="d-flex justify-content-between">
        <strong>Stock:</strong>
        <span>{product.stock}</span>
      </div>
    </Card>
  );
}
