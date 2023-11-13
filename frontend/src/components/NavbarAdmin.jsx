import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import "./NavbarAdmin.scss"

const NavbarAdmin = () => {
  const { admin, logout_admin} = useContext(AuthContext);
  const navigate = useNavigate()
  function handleClick(e) {
    navigate("/admin")
  }
  return (
    <div className="navbaradmin">
      <h1 onClick={handleClick}>Manage Inventory</h1>
      <div className="container">
        <div className="links">
          <span>{admin.Admin_ID}</span>
          {admin ? (<span className = "logout" onClick={logout_admin}>Logout</span>
            ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <Link className="link" to="/viewproducts">
              Products
          </Link>
          <Link className="link" to="/products/add">
              Add Product
          </Link>
          <Link className="link" to="/products/update">
              Update Product
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin