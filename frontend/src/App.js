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

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const PrivateRoute = ({ path, roles, element }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    // Redirect to unauthorized page if the user doesn't have the required role
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected route if the user is logged in and has the required role
  return <Route path={path} element={element} />;
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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  // Add routes for unauthorized access or any other pages
  {
    path: "/unauthorized",
    element: <div>Unauthorized Access</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
