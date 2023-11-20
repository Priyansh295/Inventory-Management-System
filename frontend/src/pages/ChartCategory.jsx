import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext';
// import { Link } from 'react-router-dom';
import BarChart from '../Charts/BarChartCategory';
import Chart2 from '../Charts/Category_1';

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
        case 'Most_category':
            return <Chart2/>
        // Add other cases for different components
        default:
          return null;
      }
    }
    if (admin) {
    return (
      <div className='statistic_container'>
          <div className='options'>
            <div className='buttons'>
              <button name = "Category" onClick={handleClick}>Quantity Sold</button>
              <button name = "Most_category" onClick={handleClick}>Clients</button>
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