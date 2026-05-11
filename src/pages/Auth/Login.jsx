import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";

export default function Login() {
  const [isAppered, setIsAppered] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        data,
      );

      // Redux only (localStorage handled in slice)
      dispatch(
        loginSuccess({
          user: response.data,
          token: response.data.accessToken,
        }),
      );
      

      setError("");
      navigate("/");
    } catch (err) {
      setError("Invalid username or password ❌");
    } finally {
      setLoading(false);
      window.location.reload();
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

        <h3 className="text-center mb-4">Login</h3>

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              ref={usernameRef}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <InputGroup>
              <Form.Control
                type={isAppered ? "text" : "password"}
                placeholder="Password"
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
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
