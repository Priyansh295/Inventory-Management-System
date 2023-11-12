import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/authContext"; // Import your authentication context

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Add from "./pages/Add";
import Update from "./pages/Update";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Client from "./pages/Client";
import Order from "./pages/OrderConfirmation"
import Admin from "./pages/Admin";
import NavbarAdmin from "./components/NavbarAdmin";
import NavbarClient from "./components/NavbarClient";
import "./App.scss"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/client",
        element: <Client />,
      },
      {
        path: "/products/add",
        element:<Add/>
      },
      {
        path: "/products/update",
        element:<Update/>
      },
      {
        path: "/products/cart",
        element:<Cart/>
      },
      {
        path: "products/order",
        element:<Order/>
      }
    ],
  },
  {
    path: "/client",
    element: <>
              <NavbarClient/>
              <Client/>
              <Footer/>
            </>
  },
  {
    path: "/admin",
    element: <>
              <NavbarAdmin/>
              <Admin/>
              <Footer/>
            </>
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path:"/login",
    element:<LoginPage/>
  }
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
