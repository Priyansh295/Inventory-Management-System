// Navbar.jsx

import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Perform logout logic if needed
    logout();

    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <div className="navbar">
      <div className="container">
        <h1>Inventory Management System</h1>
        <div className="links">
          <Link className="link" to="/products">
            <h6>Products</h6>
          </Link>
          <Link className="link" to="/products/cart">
            <h6>Cart</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={handleLogout} className="link">
              Logout
            </span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
