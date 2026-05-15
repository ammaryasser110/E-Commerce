import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import ProductCard from "../../components/UI/ProductCard";
import Footer from "../../components/UI/Footer";
import { GrNext, GrPrevious } from "react-icons/gr";
import ProductSkeleton from "../../components/UI/ProductSkeleton";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const limit = 12;

  // CATEGORY FROM URL (SOURCE OF TRUTH)
  const category = searchParams.get("category") || "all";

  // RESET PAGE WHEN URL CHANGES
  useEffect(() => {
    setPage(1);
  }, [category]);

  // GET CATEGORIES
  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories").then((res) => {
      setCategories(["all", ...res.data.map((c) => c.slug)]);
    });
  }, []);

  // GET PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const skip = (page - 1) * limit;

        let url = "";

        if (sort) {
          if (search) {
            url = `https://dummyjson.com/products/search?q=${search}`;
          } else if (category !== "all") {
            url = `https://dummyjson.com/products/category/${category}`;
          } else {
            url = `https://dummyjson.com/products?limit=100`;
          }
        } else {
          if (search) {
            url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
          } else if (category !== "all") {
            url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
          } else {
            url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
          }
        }

        const res = await axios.get(url);

        let data = [...res.data.products];

        // SORT
        if (sort === "low") {
          data.sort((a, b) => a.price - b.price);
        } else if (sort === "high") {
          data.sort((a, b) => b.price - a.price);
        } else if (sort === "title") {
          data.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === "rating") {
          data.sort((a, b) => b.rating - a.rating);
        }

        if (sort) {
          const start = (page - 1) * limit;
          const end = start + limit;

          setProducts(data.slice(start, end));
          setTotalPages(Math.ceil(data.length / limit));
        } else {
          setProducts(data);
          setTotalPages(Math.ceil(res.data.total / limit));
        }
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [search, category, sort, page]);

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Container className="py-5">
        {/* HEADER */}
        <div className="text-center mb-4">
          <h1 className="fw-bold">Explore Products</h1>
          <p className="text-muted">
            Search, filter and discover amazing deals
          </p>
        </div>

        {/* FILTERS */}
        <Card className="p-3 mb-4 shadow-sm border-0 rounded-4">
          <Row className="g-3">
            {/* SEARCH */}
            <Col md={4}>
              <Form.Control
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </Col>

            {/* CATEGORY (FROM URL) */}
            <Col md={3}>
              <Form.Select
                value={category}
                onChange={(e) => {
                  setSearchParams({
                    category: e.target.value,
                  });
                }}
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* SORT */}
            <Col md={3}>
              <Form.Select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Sort By</option>
                <option value="low">Price Low → High</option>
                <option value="high">Price High → Low</option>
                <option value="title">Title A-Z</option>
                <option value="rating">Rating</option>
              </Form.Select>
            </Col>

            {/* RESET */}
            <Col md={2}>
              <Button
                className="w-100"
                variant="dark"
                onClick={() => {
                  setSearch("");
                  setSort("");
                  setPage(1);
                  setSearchParams({});
                }}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Card>

        {/* LOADING */}
        {loading && (
          <Row className="g-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Col xs={6} sm={6} md={4} lg={3} key={i}>
                <ProductSkeleton />
              </Col>
            ))}
          </Row>
        )}

        {/* ERROR */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* PRODUCTS */}
        {!loading && !error && (
          <Row className="g-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Col xs={6} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No products found</p>
            )}
          </Row>
        )}

        {/* PAGINATION */}
        {!loading && !error && totalPages > 1 && (
          <div className="d-flex justify-content-center gap-2 mt-5 flex-wrap">
            <Button
              variant="dark"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <GrPrevious />
            </Button>

            {Array.from({ length: totalPages })
              .map((_, i) => i + 1)
              .filter(
                (num) =>
                  num === 1 ||
                  num === totalPages ||
                  (num >= page - 2 && num <= page + 2),
              )
              .map((num, i, arr) => (
                <React.Fragment key={num}>
                  {i > 0 && num - arr[i - 1] > 1 && (
                    <span className="align-self-center px-1">...</span>
                  )}

                  <Button
                    variant={page === num ? "primary" : "outline-dark"}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </Button>
                </React.Fragment>
              ))}

            <Button
              variant="dark"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <GrNext />
            </Button>
          </div>
        )}
      </Container>

      <Footer />
    </div>
  );
}
