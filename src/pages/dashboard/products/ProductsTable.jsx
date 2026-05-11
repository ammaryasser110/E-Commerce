import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: null,
    title: "",
    price: "",
  });

  const navigate = useNavigate();

  const getProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=100");
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`https://dummyjson.com/products/${id}`);

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setShow(true);
  };

  const handleUpdate = async () => {
    await axios.put(`https://dummyjson.com/products/${editProduct.id}`, {
      title: editProduct.title,
      price: editProduct.price,
    });

    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? { ...p, ...editProduct } : p)),
    );

    setShow(false);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid px-2 px-md-4">
      <h3 className="mb-3">Products</h3>

      {/* SEARCH + ADD */}
      <div className="d-flex flex-column flex-md-row gap-2 mb-3">
        <Form.Control
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="success"
          onClick={() => navigate("/dashboard/add-product")}
        >
          Add Product
        </Button>
      </div>

      {/* RESPONSIVE TABLE WRAPPER */}
      <div className="table-responsive">
        <Table striped bordered hover className="align-middle text-center">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr
                key={p.id}
                onClick={() => navigate(`/dashboard/productdetails/${p.id}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{p.title}</td>
                <td>${p.price}</td>

                <td>
                  {/* EDIT */}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-1 mb-1 mb-md-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(p);
                    }}
                  >
                    <FaRegEdit />
                  </Button>

                  {/* DELETE */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mb-1 mb-md-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(p.id);
                    }}
                  >
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* EDIT MODAL */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={editProduct.title}
              onChange={(e) =>
                setEditProduct((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>

          <Button variant="dark" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
