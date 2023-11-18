import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
// import { Link } from 'react-router-dom';
import "../styles/Statistics.scss"
import BarChart from '../Charts/BarChartCategory';
import BarChartClient from '../Charts/BarChartClient';
import LineChartProduct from '../Charts/LineChartProduct';

const Statistics = () => {
    const {admin} = useContext(AuthContext);
    const [selectedOption, setSelectedOption] = useState([])
    function handleClick(e) {
      const buttonName = e.target.name;
      setSelectedOption(buttonName);
    }
    const renderSelectedComponent = () => {
      switch (selectedOption) {
        case 'Category':
          return <BarChart/>;
        case 'Client':
          return <BarChartClient/>
        case 'Product':
          return <LineChartProduct/>
        // Add other cases for different components
        default:
          return null;
      }
    }
    if (admin) {
    return (
      <div className='statistic_container'>
          <h1>Statistics</h1>
          <div className='options'>
            <div className='buttons'>
              <button name = "Category" onClick={handleClick}>Category</button>
              <button name = "Client" onClick={handleClick}>Client</button>
              <button name = "Product" onClick={handleClick}>Product</button>
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

export default Statistics