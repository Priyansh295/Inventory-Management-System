import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import "./NavbarClient.scss"

const NavbarClient = () => {
  const { currentUser, logout} = useContext(AuthContext);
  console.log(currentUser)
  const navigate = useNavigate()
  function handleClick(e) {
    navigate("/client")
  }
  if(currentUser) {
  return (
    <div className="navbarclient">
      <h1 onClick={handleClick}> AutoMart </h1>
      <div className="container">
        <div className="links">
          <span className="link" onClick = {()=> navigate("/client")}>
            <h6>Home</h6>
          </span>
          <span className="link" onClick = {()=> navigate("/products")}>
            <h6>Products</h6>
          </span>
          <span className="link" onClick = {()=> navigate("/products/cart")}>
            <h6>Cart</h6>
          </span>
          <span className="link"  onClick = {()=> navigate("/products/order")}>
            <h6>Orders</h6>
          </span>
        </div>
        <div className='session_details'>
          <span>{currentUser?.Client_ID}</span>
          <span className = "logout" onClick={logout}>Logout</span>
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