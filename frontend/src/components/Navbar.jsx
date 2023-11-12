import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <h3>INVENTORY MANAGEMENT SYSTEM</h3>
      <div className="container">
        <div className="links">
        <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/register">
            New Client
          </Link>
          <Link className="link" to="/products">
            <h6>Products</h6>
          </Link>
          <Link className="link" to="/products/cart">
            <h6>Cart</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
