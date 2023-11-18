import React, { useContext, useEffect, useState } from 'react';
import '../styles/LoginPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const LoginPage = () => {
  const [client, setClient] = useState({
    Client_ID: "",
    password: ""
  });
  const [admin, setAdmin] = useState({
    Admin_ID: "",
    password: ""
  });
  const [isClient, setIsClient] = useState(true);
  const [clientPanelWidth, setClientPanelWidth] = useState('80%');
  const [adminPanelWidth, setAdminPanelWidth] = useState('20%');

  const [err, setError] = useState(null);
  const navigate = useNavigate()


  const {login, login_admin} = useContext(AuthContext);
  const {logout_admin, logout} = useContext(AuthContext);
  useEffect(() => {
    logout_admin()
    logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // console.log(login)
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);
  const handleChangeClient = (e) => {
    setClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeAdmin = (e) => {
    setAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmitClient = async (e) => {
    console.log(client)
    e.preventDefault();
    try {
      // await axios.post("http://localhost:8800/login_client", client);
      await login(client);
      navigate("/client");
    } catch (err) {
      setError(err.response.data);
    }
  };
  const handleSubmitAdmin = async (e) => {
    console.log(admin)
    e.preventDefault();
    try {
      await login_admin(admin);
      navigate("/admin");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleClickClient = () => {
    setIsClient(true);
    setClientPanelWidth('80%');
    setAdminPanelWidth('20%');
  };

  const handleClickAdmin = () => {
    setIsClient(false);
    setClientPanelWidth('20%');
    setAdminPanelWidth('80%');
  };

  return (
    <div>
      <div className="container_login">
        <div className="panel" onClick={handleClickClient} style={{ width: clientPanelWidth }}>
          <h2>Login as Client</h2>
          <div className={isClient ? 'form' : 'admin-form'}>
            <form onSubmit={handleSubmitClient}>
              <label>
                Client ID:
                <input required type="text" name = "Client_ID" placeholder = "Client ID" onChange={handleChangeClient} />
              </label>
              <br />
              <label>
                Password:
                <input required type="password" name = "password" onChange={handleChangeClient} />
              </label>
              <br/>
              {err && <p> {err}</p>}
              <button type="submit">Login</button>
              <p className='register'>Don't have an account? <Link to = "/register" className='reg-button'>Register Now.</Link></p>
            </form>
          </div>
        </div>
        <div className="panel" onClick={handleClickAdmin} style={{ width: adminPanelWidth }}>
          <h2>Login as Admin</h2>
          <div className={!isClient ? 'form' : 'admin-form'}>
            <form onSubmit={handleSubmitAdmin}>
              <label>
                Admin ID:
                <input required type="text" name = "Admin_ID" onChange={handleChangeAdmin} />
              </label>
              <br />
              <label>
                Password:
                <input required type="password" name = "password" onChange={handleChangeAdmin} />
              </label>
              <br />
              {err && <p> {err}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
