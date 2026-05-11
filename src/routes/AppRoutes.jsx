import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Products from "../pages/Shop/Products";
import ProductDetails from "../pages/Shop/ProductDetails";
import Cart from "../pages/Shop/Cart";

import Contact from "../components/UI/Contact";

import ProtectedRoute from "./ProtectedRoute";

// DASHBOARD
import Dashboard from "../pages/dashboard/Dashboard";
import ProductsTable from "../pages/dashboard/products/ProductsTable";
import AddProductForm from "../pages/dashboard/products/AddProductForm";
import UsersTable from "../pages/dashboard/users/UsersTable";
import UserDetails from "../pages/dashboard/users/UserDetails";
import CartsTable from "../pages/dashboard/cartd/CartsTable";
import CartDetails from "../pages/dashboard/cartd/CartDetails";

// dashboard product details
import DashboardProductDetails from "../pages/dashboard/products/ProductDetails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route path="/contact" element={<Contact />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* DASHBOARD ROUTES */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* DEFAULT */}
        <Route index element={<Navigate to="products" replace />} />

        <Route path="products" element={<ProductsTable />} />

        <Route path="add-product" element={<AddProductForm />} />

        <Route path="users" element={<UsersTable />} />

        <Route path="users/:id" element={<UserDetails />} />

        <Route path="carts" element={<CartsTable />} />

        <Route path="cartdetails/:id" element={<CartDetails />} />

        <Route
          path="productdetails/:id"
          element={<DashboardProductDetails />}
        />
      </Route>
    </Routes>
  );
}
