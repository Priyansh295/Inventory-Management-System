import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import '../styles/AdminOrders.scss';
import {ViewModal} from './AdminOrdersModal';

const AdminOrders = () => {
  const { admin } = useContext(AuthContext);
  const [Orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrders] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // New state for the add modal

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/orders`);
      console.log('Response from backend:', res.data);
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };
  const openViewModal = (Order_ID) => {
    setSelectedOrders(Order_ID);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrders(null);
    setIsViewModalOpen(false);
  };

  if (admin) {
    return (
      <div className='client_orders_container'>
        <h1>Client Orders</h1>
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client ID</th>
                <th>Total Payment</th>
                <th>Order Placement Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Orders.map((order) => (
                <tr className="order_row" key={order.Order_id}>
                  <td>{order.Order_ID}</td>
                  <td>{order.Client_ID}</td>
                  <td>{order.Total_Payment}</td>
                  <td>{order.Order_Placement_Date}</td>
                  <td>{order.Status}</td>
                  <td className='order-buttons'>
                    {/* {<button className="update-button" onClick={() => openUpdateModal(supplier)}>
                      Update
                    </button> */}
                    <button
                      className="status-button"
                      disabled={order.Status !== 'Complete'}
                      onClick={() => console.log('Accept Clicked')}
                    >
                      Accept
                    </button>
                    <button className="view-button" onClick={() => openViewModal(order.Order_ID)}>
                      View Order Lines
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Conditionally render the modals */}
          {isViewModalOpen && (
            <ViewModal isOpen={isViewModalOpen} onClose={closeModal} Order_ID={selectedOrder} />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default AdminOrders;
