import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
// import { Link } from 'react-router-dom';
import "./Admin.scss"
import Orders from './Orders';
import Products from './Products';
import Suppliers from './Suppliers';
import Employees from './Employees';
import Storage from './Storage';
import Parts from './Parts';

const Admin = () => {
    const {admin} = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState([])
    function handleClick(e) {
      const buttonName = e.target.name;
      setSelectedOption(buttonName);
    }
    const renderSelectedComponent = () => {
      switch (selectedOption) {
        case 'Orders':
          return <Orders/>;
        case 'Products':
          return <Products/>;
        case 'Suppliers':
          return <Suppliers/>;
        case 'Employees':
          return <Employees/>;
        case 'Storage':
          return <Storage/>;
        case 'Parts':
          return <Parts/>;
        // Add other cases for different components
        default:
          return null;
      }
    }
    if (admin) {
    return (
      <div className='admin_container'>
          <h1>Admin</h1>
          <div className='options'>
            <div className='buttons'>
              <button name = "Orders" onClick={handleClick}>Orders</button>
              <button name = "Products" onClick={handleClick}>Products</button>
              <button name = "Parts" onClick={handleClick}>Parts</button>
              <button name = "Storage" onClick={handleClick}>Storage</button>
              <button name = "Suppliers" onClick={handleClick}>Suppliers</button>
              <button name = "Employees" onClick={handleClick}>Employees</button>
            </div>
            <div className='populate'>
            {renderSelectedComponent()}
            </div>
          </div>
      </div>

    )
    } else {
      return (
        <div></div>
      )
    }
}

export default Admin