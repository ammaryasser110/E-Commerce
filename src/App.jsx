import "./App.css";
import NavBar from "./components/UI/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />

      {!location.pathname.toLowerCase().startsWith("/dashboard") && <NavBar />}

      <AppRoutes />
    </div>
  );
}
