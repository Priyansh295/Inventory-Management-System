import React, {useEffect, useState } from 'react';
import axios from 'axios';

export const ViewModal = ({ isOpen, onClose, Order_ID}) => {
    const [Orders, setOrders] = useState([]);
    useEffect(() => {
        fetchOrder_line();
      }, []);
      const fetchOrder_line = async () => {
        try {
          const res = await axios.get("http://localhost:8800/order_line/"+Order_ID);
          console.log('Response:', res.data);
          setOrders(res.data);
        } catch (error) {
          console.error('Error fetching suppliers:', error);
        }
      };
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} id="modalcontainer">
          <div className="modal-content">
            <span className="close-btn" onClick={onClose}>&times;</span>
              <div className='order_line_container'>
                <h1>Order Lines</h1>
                <div className="order_line-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Status</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Orders.map((order) => (
                        <tr className="order_line_row" key={order.Order_id}>
                          <td>{order.Product_ID}</td>
                          <td>{order.Status}</td>
                          <td>{order.Quantity}</td>
                          <td className='order_line-buttons'>
                            <button className="status-button">
                                Accept
                            </button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
};
