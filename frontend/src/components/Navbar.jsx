import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate()
  function handleClick(e) {
    navigate("/")
  }
  return (
    <div className="navbar">
      <h3 onClick = {handleClick}>INVENTORY MANAGEMENT SYSTEM</h3>
      {/* <div className="container"> */}
        <div className="links">
          <Link className="home-button" to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/register">
            New Client
          </Link>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Navbar;
