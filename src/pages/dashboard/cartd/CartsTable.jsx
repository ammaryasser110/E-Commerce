import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CartsTable() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCarts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("https://dummyjson.com/carts");

      setCarts(res.data.carts);
    } catch (err) {
      setError("Failed to load carts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <div className="container-fluid">
      <h3 className="mb-3">Carts</h3>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {/* ERROR */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* DESKTOP TABLE */}
      {!loading && !error && (
        <>
          <div className="d-none d-md-block">
            <Table striped bordered hover className="text-center align-middle">
              <thead>
                <tr>
                  <th>Cart ID</th>
                  <th>User ID</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Details</th>
                </tr>
              </thead>

              <tbody>
                {carts.map((cart) => (
                  <tr key={cart.id}>
                    <td>{cart.id}</td>
                    <td>{cart.userId}</td>
                    <td>{cart.products.length}</td>
                    <td>${cart.total}</td>
                    <td>
                      <Button
                        variant="dark"
                        size="sm"
                        as={Link}
                        to={`/dashboard/cartdetails/${cart.id}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* MOBILE CARDS */}
          <div className="d-md-none d-flex flex-column gap-3">
            {carts.map((cart) => (
              <Card key={cart.id} className="shadow-sm p-3">
                <h6>Cart #{cart.id}</h6>

                <p className="mb-1">User ID: {cart.userId}</p>

                <p className="mb-1">Products: {cart.products.length}</p>

                <p className="mb-3">Total: ${cart.total}</p>

                <Button
                  variant="dark"
                  as={Link}
                  to={`/dashboard/cartdetails/${cart.id}`}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
