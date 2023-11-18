import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
// import { Link } from 'react-router-dom';
import "../styles/Admin.scss"
import Restock from './Restock';
import Suppliers from './Suppliers';
import Employees from './Employees';
import Storage from './Storage';
import Parts from './Parts';
import ProductsAdmin from './ProductsAdmin';

const Admin = () => {
    const {admin} = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState([])
    function handleClick(e) {
      const buttonName = e.target.name;
      setSelectedOption(buttonName);
    }
    useEffect( () => {setSelectedOption('Products');}, [])

    const renderSelectedComponent = () => {
      switch (selectedOption) {
        case 'Products':
          return <ProductsAdmin/>;
        case 'Suppliers':
          return <Suppliers/>;
        case 'Employees':
          return <Employees/>;
        case 'Storage':
          return <Storage/>;
        case 'Parts':
          return <Parts/>;
        case 'Restock':
            return <Restock/>;
        // Add other cases for different components
        default:
          return null;
      }
    }
    if (admin) {
    return (
      <div className='admin_container'>
          <div className='options'>
            <div className='buttons'>
              <button name = "Products" onClick={handleClick}>Products</button>
              <button name = "Parts" onClick={handleClick}>Parts</button>
              <button name = "Storage" onClick={handleClick}>Storage</button>
              <button name = "Suppliers" onClick={handleClick}>Suppliers</button>
              <button name = "Employees" onClick={handleClick}>Employees</button>
              <button name = "Restock" onClick={handleClick}>Restock</button>
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