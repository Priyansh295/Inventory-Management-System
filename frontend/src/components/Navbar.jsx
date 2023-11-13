import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate()
  function handleClick(e) {
    navigate("/")
  }
  return (
    <div className="navbar">
      <h3 onClick = {handleClick}>INVENTORY MANAGEMENT SYSTEM</h3>
      <div className="container">
        <div className="links">
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/register">
            New Client
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
