import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/UI/Footer";
import { toast, ToastContainer } from "react-toastify";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  return (
    <div>
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Contact Us</h1>

          <p className="text-muted">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <Row className="justify-content-center">
          <Col md={8}>
            <Form className="shadow p-4 rounded-4 bg-white">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>

                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Message</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your message..."
                />
              </Form.Group>

              <Button variant="dark" className="w-100 rounded-3 py-2" onClick={handleSubmit}>
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
