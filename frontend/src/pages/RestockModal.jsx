// SupplierModal.jsx

import React, { useEffect,useState } from 'react';
import "./RestockModal.scss"
import axios from 'axios';

export const RestockModal = ({ isOpen, onClose, restock }) => {
  const [updatedRestock, setUpdatedRestock] = useState({
    Store_id: restock.Store_Id,
    Supplier_id: restock.Supplier_Id,
    Restock_time: restock.Restock_time,
    Price: restock.Price
  });

  const [msg, setMsg] = useState([])
  const [err, setError] = useState([])

  const handleInputChange = (e) => {
    setError(null);

    const { name, value, type } = e.target;
    const convertedValue = type === 'number' ? parseFloat(value) : value;
    setUpdatedRestock((prevSupplier) => ({
      ...prevSupplier,
      [name]: convertedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Updated Restock', updatedRestock);
    try {
      const Store_id = restock.Store_Id;
      const Supplier_id=restock.Supplier_Id;
      console.log(Store_id);
      const res = await axios.put("http://localhost:8800/restock/"+Store_id+"/"+Supplier_id, updatedRestock)
      console.log(res)
      setMsg(res.data)
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} id="modalcontainer">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Edit Restock</h2>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="Restocktime">
            <span>Restocktime:</span>
            <input required
              type="number"
              id="Restocktime"
              name="Restock_time"
              defaultValue={updatedRestock.Restock_time}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Price:</span>
            <input required
              type="number"
              id="Price"
              name="Price"
              min = "1"
              defaultValue={updatedRestock.Price}
              onChange={handleInputChange}
            />
          </label>
          {msg && <p> {msg}</p>}
          {err && <p> {err}</p>}
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};


export const RestockAddModal = ({ isOpen, onClose}) => {
  const [newRestock, setNewRestock] = useState({
    Store_Id: '',
    Supplier_Id: '',
    Restock_time: '',
    Price: ''
  });

  const [stores, setStores] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [msg, setMsg] = useState([]);
  const [err, setError] = useState([]);

  useEffect(() => {
    fetchStores();
    fetchSuppliers();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:8800/storage");
      setStores(res.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/suppliers");
      setSuppliers(res.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleInputChange = (e) => {
    setError(null);

    const { name, value, type } = e.target;
    const convertedValue = type === 'number' ? parseFloat(value) : value;
    setNewRestock((prevRestock) => ({
      ...prevRestock,
      [name]: convertedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('New Restock', newRestock);

    try {
      const res = await axios.post("http://localhost:8800/restock", newRestock);
      console.log(res);
      setMsg(res.data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} id="modalcontainer">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Add Restock</h2>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="Store_Id">
            <span>Store ID:</span>
            <select
              id="Store_Id"
              name="Store_Id"
              value={newRestock.Store_Id}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Store</option>
              {stores.map(store => (
                <option key={store.Store_id} value={store.Store_id}>
                  {store.Store_id}
                </option>
              ))}
            </select>
          </label>
          <label className="label" htmlFor="Supplier_Id">
            <span>Supplier ID:</span>
            <select
              id="Supplier_Id"
              name="Supplier_Id"
              value={newRestock.Supplier_Id}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.Supplier_id} value={supplier.Supplier_id}>
                  {supplier.Supplier_id}
                </option>
              ))}
            </select>
          </label>
          <label className="label" htmlFor="Restock_time">
            <span>Restock Time:</span>
            <input
              type="number"
              id="Restock_time"
              name="Restock_time"
              value={newRestock.Restock_time}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="label" htmlFor="Price">
            <span>Price:</span>
            <input
              type="number"
              id="Price"
              name="Price"
              min="1"
              value={newRestock.Price}
              onChange={handleInputChange}
              required
            />
          </label>
          {msg && <p> {msg}</p>}
          {err && <p> {err}</p>}
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
