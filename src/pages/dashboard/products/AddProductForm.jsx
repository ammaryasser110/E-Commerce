import { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

export default function AddProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post("https://dummyjson.com/products/add", {
        title,
        price,
      });

      toast.success("Product Added");

      setTitle("");
      setPrice("");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        className="p-4 shadow border-0"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <h3>Add Product</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              required
            />
          </Form.Group>

          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Loading...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </Form>
      </Card>

      <ToastContainer position="top-right" autoClose={1500} />
    </>
  );
}
