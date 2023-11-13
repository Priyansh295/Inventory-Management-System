import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';
import "./NavbarClient.scss"

const NavbarClient = () => {
  const { currentUser, logout} = useContext(AuthContext);
  console.log(currentUser)
  if(currentUser) {
  return (
    <div className="navbarclient">
      <h1> Welcome </h1>
      <div className="container">
        <div className="links">
          <span>{currentUser?.Client_ID}</span>
          <span className = "logout" onClick={logout}>Logout</span>
          <Link className="link" to="/products">
            <h6>Products</h6>
          </Link>
          <Link className="link" to="/products/cart">
            <h6>Cart</h6>
          </Link>
        </div>
      </div>
    </div>
  )
  } else {
    return (  <div className="navbarclient">
                <h1> Welcome </h1>
                <div className="container">
                  <div className="links">
                      <Link className="link" to="/login">
                        Login
                      </Link>
                  </div>
                </div>
              </div>
    )
  }
}



export default NavbarClient