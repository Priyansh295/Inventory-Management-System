import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/NavbarClient.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


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
          <span className="link" id = 'home-button' onClick = {()=> navigate("/client")}>
            <FontAwesomeIcon icon={faHome} />
          </span>
          <span className="link" onClick = {()=> navigate("/products")}>
            <>Products</>
          </span>
          <span className="link" onClick = {()=> navigate("/products/cart")}>
            <>Cart</>
          </span>
          <span className="link"  onClick = {()=> navigate("/products/order")}>
            <>Orders</>
          </span>
          <span onClick = {()=> navigate("/client-details")}>
            <h6>Client</h6>
          </span>
        </div>
        <div className='session_details'>
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