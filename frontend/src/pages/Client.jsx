import React, { useContext } from 'react'
import "./Client.css"
import { AuthContext } from '../context/authContext';
const Client = () => {
  const {currentUser} = useContext(AuthContext);
    if (currentUser) {
    return (
      <div> <h1>Client</h1>
      </div>

    )
    } else {
      return (
        <div><h1>You Are Not Logged In !!</h1></div>
      )
    }
}

export default Client