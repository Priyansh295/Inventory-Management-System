// Suppliers.jsx

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import './Restock.scss'; // Import your SCSS file
import {RestockModal, RestockAddModal} from './RestockModal'; // Import the SupplierModal component

const Restock = () => {
  const { admin } = useContext(AuthContext);
  const [Restock, setRestock] = useState([]);
  const [selectedRestock, setSelectedRestock] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New state for the add modal

  useEffect(() => {
    fetchRestock();
  }, []);
  const [err, setError] = useState([])
  const [msg, setMsg] = useState([])
  const fetchRestock = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/restock`);
      setRestock(res.data);
      console.log(Restock)
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleAdd = () => {
    setMsg(null)
    setIsAddModalOpen(true);
  };

  const handleDelete = async (restock) => {
    try {
      const Store_id = restock.Store_Id;
      console.log(Store_id);
      const Supplier_id=restock.Supplier_Id;
      const res = await axios.delete("http://localhost:8800/restock/"+Store_id+"/"+Supplier_id)
      console.log(res)
      fetchRestock();
      setMsg(res.data)
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const openUpdateModal = (supplier) => {
    setMsg(null)
    setSelectedRestock(supplier);
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRestock(null);
    setIsUpdateModalOpen(false);
    setIsAddModalOpen(false); // Close the add modal
    fetchRestock();
  };

  if (admin) {
    return (
      <div className='restock_container'>
        <h1>Restock Details</h1>
        <div className="restock-table">
          <button className="add-button" onClick={handleAdd}>
            Add Restock
          </button>
          {err && <p> {err}</p>}
          {msg && <p> {msg}</p>}
          <table>
            <thead>
              <tr>
                <th>Store ID</th>
                <th>Supplier ID</th>
                <th>Restock Time</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {Restock.map((restock) => (
                <tr className="restock_row" key={restock.Store_id}>
                  <td>{restock.Store_Id}</td>
                  <td>{restock.Supplier_Id}</td>
                  <td>{restock.Restock_time}</td>
                  <td>{restock.Price}</td>
                  <td className='restock-buttons'>
                    <button className="update-button" onClick={() => openUpdateModal(restock)}>
                      Update
                    </button>
                    <button className="delete-button"onClick={() => handleDelete(restock)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Conditionally render the modals */}
          {isUpdateModalOpen && (
            <RestockModal isOpen={isUpdateModalOpen} onClose={closeModal} restock={selectedRestock} />
          )}
          {isAddModalOpen && (
            <RestockAddModal isOpen={isAddModalOpen} onClose={closeModal} />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Restock;
