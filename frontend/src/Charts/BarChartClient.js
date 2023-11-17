import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the first bar chart
        const response1 = await axios.get('http://localhost:8800/products/clients');
        const clients_product = response1.data;
        console.log(clients_product)
        const chartData1 = {
          labels: clients_product.map((client_prod) => client_prod.client_id),
          datasets: [
            {
              label: 'Products Sold',
              data: clients_product.map((client_prod) => client_prod?.total_products || 0),
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

        // Fetch data for the second bar chart
        const response2 = await axios.get('http://localhost:8800/orders/clients');
        const clients = response2.data;
        const chartData2 = {
          labels: clients.map((client) => client.client_id),
          datasets: [
            {
              label: 'Total Orders',
              data: clients.map((client) => client?.total_orders || 0),
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

        setData({ chartData1, chartData2 });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    // Data is still loading
    return <div>Loading...</div>;
  }

  const chartOptions2 = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Client ID', // Set the label for the X-axis
          fontSize: 16,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Orders', // Set the label for the Y-axis
          fontSize: 16,
        },
      },
    },
    legend: {
      labels: {
        fontSize: 16,
      },
    },
  };

  const chartOptions1 = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Client ID', // Set the label for the X-axis
          fontSize: 16,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Products Ordered', // Set the label for the Y-axis
          fontSize: 16,
        },
      },
    },
    legend: {
      labels: {
        fontSize: 16,
      },
    },
  };

  return (
    <div>
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1, marginRight: '170px' }}>
      <Bar data={data.chartData2} options={chartOptions2} height={500} width={500} />
    </div>
    <div style={{ flex: 1 }}>
      <Bar data={data.chartData1} options={chartOptions1} height={500} width={500} />
    </div>
  </div>
</div>

  );
};

export default BarChart;
