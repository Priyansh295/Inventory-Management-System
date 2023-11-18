// import React, { useEffect, useState } from 'react';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';

// ChartJS.register(CategoryScale, LinearScale, BarElement);

// const BarChart = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8800/products/categories');
//         const categories = response.data;

//         const chartData = {
//           labels: categories.map((category) => category.Category),
//           datasets: [
//             {
//               label: 'Products Sold',
//               data: categories.map((category) => category?.ProductsSold || 0),
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.6)',
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(255, 206, 86, 0.6)',
//                 'rgba(75, 192, 192, 0.6)',
//                 'rgba(153, 102, 255, 0.6)',
//                 'rgba(255, 159, 64, 0.6)',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         };

       
//         const chartOptions = {
//             maintainAspectRatio: false,
//             scales: {
//             x: {
//                 title: {
//                 display: true,
//                 text: 'Categories', // Set the label for the X-axis
//                 fontSize: 16,
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//                 title: {
//                 display: true,
//                 text: 'Quantity Sold', // Set the label for the Y-axis
//                 fontSize: 16,
//                 },
//             },
//             },
//             legend: {
//             labels: {
//                 fontSize: 26,
//             },
//             },
//         };

//         setData({ chartData, chartOptions });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Run the effect only once when the component mounts

//   if (!data) {
//     // Data is still loading
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div>
//         <Bar data={data.chartData} options={data.chartOptions} height={500} width={1000}/>
//       </div>
//       <button className="add-button">
//             Show Details
//       </button>
//     </div>
//   );
// };

// export default BarChart;

import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import '../styles/BarChartCategory.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart = () => {
  const [data, setData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const[category,setCategory]=useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/products/categories');
        const categories = response.data;
        setCategory(categories);
        const chartData = {
          labels: categories.map((category) => category.Category),
          datasets: [
            {
              label: 'Products Sold',
              data: categories.map((category) => category?.ProductsSold || 0),
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderWidth: 1,
            },
          ],
        };

        const chartOptions = {
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Categories',
                fontSize: 16,
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Quantity Sold',
                fontSize: 16,
              },
            },
          },
          legend: {
            labels: {
              fontSize: 26,
            },
          },
        };

        setData({ chartData, chartOptions });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  if (!data) {
    // Data is still loading
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Bar data={data.chartData} options={data.chartOptions} height={500} width={1000} />
      </div>
      <button className="add-button" onClick={handleShowDetails}>
        Show Details
      </button>
  
      {showDetails && (
          <div className="modal-content">
            <h2>Details</h2>
            {/* Render table with details here */}
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Products Sold</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {category.map((category, index) => (
                  <tr key={index}>
                    <td>{category.Category}</td>
                    <td>{category.ProductsSold}</td>
                    {/* Add more cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}
    </div>
  );
}
export default BarChart;

