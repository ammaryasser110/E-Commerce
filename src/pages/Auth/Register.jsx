import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [isAppered, setIsAppered] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };

    try {
      // Dummy API (simulation)
      const response = await axios.post(
        "https://dummyjson.com/users/add",
        data,
      );

      setError("");
      navigate("/"); // بعد التسجيل يروح login
    } catch (err) {
      setError("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="bg-white p-4 rounded-4 shadow-lg"
        style={{ width: "400px" }}
      >
        {error && (
          <Alert variant="danger" className="text-center mb-4 p-2">
            {error}
          </Alert>
        )}

        <h3 className="text-center mb-4">Register</h3>

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" ref={usernameRef} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <InputGroup>
              <Form.Control
                type={isAppered ? "text" : "password"}
                ref={passwordRef}
                required
              />

              <InputGroup.Text
                style={{ cursor: "pointer" }}
                onClick={() => setIsAppered((prev) => !prev)}
              >
                {isAppered ? <IoMdEye /> : <IoMdEyeOff />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
