import { Container, Row, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/UI/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/UI/Footer";
import ProductSkeleton from "../components/UI/ProductSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
            className="hero-btn mt-4 px-4 py-2 border-0"
          >
            Shop Now
          </Button>
        </Container>
      </div>

      {/* CATEGORIES */}
      <h3 className="mt-5 mb-3 text-center fw-bold">Shop by Category</h3>

      <Container className="mb-5">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 1800 }}
          spaceBetween={7}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            576: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 6,
            },
          }}
        >
          {categories.slice(0, 24).map((cat, i) => (
            <SwiperSlide key={i}>
              <Button
                onClick={() =>
                  navigate(`/products?category=${cat.slug || cat.name}`)
                }
                className="rounded-pill w-100"
                variant="outline-dark"
              >
                {cat.name || cat.slug}
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* FEATURED */}
      <Container className="my-5">
        <h3 className="mb-4 fw-bold">Featured Products</h3>

        {loading
          ? [...Array(2)].map((_, i) => (
              <div key={i} className="mb-5 p-3 bg-white rounded-4 shadow-sm">
                <div className="placeholder col-4 mb-4"></div>

                <Row className="g-4">
                  {[...Array(4)].map((_, j) => (
                    <div className="col-lg-3 col-md-4 col-6" key={j}>
                      <ProductSkeleton />
                    </div>
                  ))}
                </Row>
              </div>
            ))
          : featured.map((section, index) => (
              <div
                key={index}
                className="mb-5 p-3 bg-white rounded-4 shadow-sm"
              >
                <h4 className="fw-bold mb-4 text-capitalize">
                  {section.category.name || section.category.slug}
                </h4>

                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{ delay: 1800 }}
                  navigation
                  spaceBetween={20}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    576: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {section.products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))}

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
        .hero-btn {
          position: relative;
          overflow: hidden;
          font-weight: 600;
          letter-spacing: 1px;
          transition: all 0.35s ease;
          background: white !important;
          color: black !important;
          z-index: 1;
        }

        /* glow background */
        .hero-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #000, #444);
          transform: translateY(100%);
          transition: transform 0.35s ease;
          z-index: -1;
        }

        /* shine effect */
        .hero-btn::after {
          content: "";
          position: absolute;
          top: -120%;
          left: -40%;
          width: 30%;
          height: 300%;
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(25deg);
          transition: 0.6s;
        }

        .hero-btn:hover::before {
          transform: translateY(0);
        }

        .hero-btn:hover::after {
          left: 130%;
        }

        .hero-btn:hover {
          color: white !important;
          transform: translateY(-5px) scale(1.03);
          box-shadow:
            0 10px 25px rgba(0,0,0,0.35),
            0 0 20px rgba(255,255,255,0.15);
        }
        .swiper-nav {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .swiper {
          width: 100%;
          height: 100%;
          padding-bottom: 40px !important; /* عشان نقط الـ pagination تظهر وماتتغطاش */
        }

        .swiper-slide {
          height: auto; /* عشان الكروت متبقاش مضغوطة */
        }
        
      `}</style>
    </div>
  );
}
