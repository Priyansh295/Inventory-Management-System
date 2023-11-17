import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import '../styles/Storage.scss'; // Import your SCSS file
import {StoreModal, StoreAddModal} from './StorageModal'; // Import the StoreModal component

const Storage = () => {
  const { admin } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New state for the add modal

  useEffect(() => {
    fetchStores();
  }, []);
  const [err, setError] = useState([])
  const [msg, setMsg] = useState([])
  const fetchStores = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/stores`);
      setStores(res.data);
      console.log(res.data)
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleAdd = () => {
    setMsg(null)
    setIsAddModalOpen(true);
  };

  const handleDelete = async (store) => {
    try {
      const Store_id = store.Store_id;
      console.log(Store_id);
      const res = await axios.delete("http://localhost:8800/stores/"+Store_id)
      console.log(res)
      fetchStores();
      setMsg(res.data)
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const openUpdateModal = (store) => {
    setMsg(null)
    setSelectedStore(store);
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStore(null);
    setIsUpdateModalOpen(false);
    setIsAddModalOpen(false); // Close the add modal
    fetchStores();
  };

  if (admin) {
    return (
      <div className='store_container'>
        <h1>Stores</h1>
        <div className="store-table">
          <button className="add-button" onClick={handleAdd}>
            Add Store
          </button>
          {err && <p> {err}</p>}
          {msg && <p> {msg}</p>}
          <table>
            <thead>
              <tr>
                <th>Store ID</th>
                <th>Part ID</th>
                <th>Quantity</th>
                <th>Rack_no</th>
                <th>Block_no</th>
                <th>Theshold</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr className="store_row" key={store.Store_id}>
                  <td>{store.Store_id}</td>
                  <td>{store.Part_id}</td>
                  <td>{store.Quantity}</td>
                  <td>{store.Rack_no}</td>
                  <td>{store.Block_no}</td>
                  <td>{store.Threshold}</td>
                  <td className='store-buttons'>
                    <button className="update-button" onClick={() => openUpdateModal(store)}>
                      Update
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(store)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Conditionally render the modals */}
          {isUpdateModalOpen && (
            <StoreModal isOpen={isUpdateModalOpen} onClose={closeModal} store={selectedStore} />
          )}
          {isAddModalOpen && (
            <StoreAddModal isOpen={isAddModalOpen} onClose={closeModal} />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Storage;
