import { Container, Row, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/UI/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/UI/Footer";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const catRes = await axios.get(
          "https://dummyjson.com/products/categories",
        );

        const cats = catRes.data.slice(0, 2);
        setCategories(catRes.data);

        const requests = cats.map((cat) =>
          axios.get(
            `https://dummyjson.com/products/category/${
              cat.slug || cat.name
            }?limit=4`,
          ),
        );

        const results = await Promise.all(requests);

        const formatted = results.map((res, i) => ({
          category: cats[i],
          products: res.data.products,
        }));

        setFeatured(formatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div style={{ background: "#f8f9fa" }}>
      {/* HERO */}
      <div className="hero">
        <div className="hero-overlay" />

        <Container className="hero-content text-center text-white">
          <h1 className="fw-bold display-4">Discover Amazing Products</h1>

          <p className="mt-3 fs-5 text-light">
            Best deals • Fast delivery • Top quality products
          </p>

          <Button
            as={Link}
            to="/products"
            variant="light"
            className="mt-4 px-4 py-2"
          >
            Shop Now
          </Button>
        </Container>
      </div>

      {/* CATEGORIES */}
      <h3 className="mt-5 mb-3 text-center fw-bold">Shop by Category</h3>

      <div className="d-flex flex-wrap gap-2 justify-content-center mb-5 px-3">
        {categories.slice(0, 24).map((cat, i) => (
          <Button
            key={i}
            onClick={() =>
              navigate(`/products?category=${cat.slug || cat.name}`)
            }
            className="rounded-pill px-3"
            variant="outline-dark"
          >
            {cat.name || cat.slug}
          </Button>
        ))}
      </div>

      {/* FEATURED */}
      <Container className="my-5">
        <h3 className="mb-4 fw-bold">Featured Products</h3>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : (
          featured.map((section, index) => (
            <div key={index} className="mb-5 p-3 bg-white rounded-4 shadow-sm">
              <h4 className="fw-bold mb-4 text-capitalize">
                {section.category.name || section.category.slug}
              </h4>

              <Row className="g-4">
                {section.products.map((product) => (
                  <div className="col-lg-3 col-md-4 col-6" key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </Row>
            </div>
          ))
        )}

        <div className="cta mt-5 text-center p-5 bg-white rounded-4 shadow-sm">
          <h4 className="fw-bold">Get Personalized Recommendations</h4>

          <p className="text-muted">Login to unlock exclusive deals for you</p>

          <Button
            as={Link}
            to="/login"
            className="rounded-0 px-4"
            variant="dark"
          >
            Login
          </Button>

          <p className="mt-3">
            New customer? <Link to="/Register">Create account</Link>
          </p>
        </div>
      </Container>

      <Footer />

      {/* CSS */}
      <style>{`
        .hero {
          position: relative;
          height: 70vh;
          background: url("https://www.streetwearts.com/cdn/shop/files/web_desk_copy.jpg?v=1776692520&width=2000")center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
