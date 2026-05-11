import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-wrapper">
      {/* TOP BAR */}
      <div className="topbar d-md-none bg-dark text-white p-2">
        <Button variant="dark" onClick={() => setOpen(true)}>
          <FiMenu />
        </Button>
      </div>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* SIDEBAR */}
      <div className={`sidebar bg-dark text-white p-3 ${open ? "active" : ""}`}>
        <h4 className="mb-4">Dashboard</h4>

        <ul className="list-unstyled d-flex flex-column gap-3">
          <li>
            <NavLink
              to="/dashboard/products"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? "text-secondary" : "text-white"
                }`
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/add-product"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? "text-secondary" : "text-white"
                }`
              }
            >
              Add Product
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/users"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? "text-secondary" : "text-white"
                }`
              }
            >
              Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/carts"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-decoration-none ${
                  isActive ? "text-secondary" : "text-white"
                }`
              }
            >
              Carts
            </NavLink>
          </li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="content p-4">
        <Outlet />
      </div>

      {/* CSS */}
      <style>{`
        .dashboard-wrapper {
          display: flex;
        }

        /* SIDEBAR DESKTOP */
        .sidebar {
          width: 250px;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .content {
          width: 100%;
        }

        /* MOBILE */
        @media (max-width: 768px) {

          .sidebar {
            position: fixed;
            top: 0;
            left: -250px;
            height: 100vh;
            z-index: 1000;
            transition: 0.3s;
          }

          .sidebar.active {
            left: 0;
          }

          .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 999;
          }
        }
      `}</style>
    </div>
  );
}
