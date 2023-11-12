import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
// import { Link } from 'react-router-dom';

const Admin = () => {
    const {admin} = useContext(AuthContext);
    if (admin) {
    return (
      <div> <h1>Admin</h1>

      </div>

    )
    } else {
      return (
        <div></div>
      )
    }
}

export default Admin