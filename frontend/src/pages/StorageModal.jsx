// StorageModal.jsx

import React, { useEffect, useState } from 'react';
import "../styles/SupplierModal.scss"
import axios from 'axios';

export const StoreModal = ({ isOpen, onClose, store }) => {
  const [updatedStore, setUpdatedStore] = useState({
    Store_id: store.Store_id,
    Quantity: store.Quantity,
    Rack_no: store.Rack_no,
    Block_no: store.Block_no,
    Threshold: store.Threshold,
  });

  const [msg, setMsg] = useState([])
  const [err, setError] = useState([])

  const handleInputChange = (e) => {
    setError(null);

    const { name, value, type } = e.target;
    const convertedValue = type === 'number' ? parseFloat(value) : value;
    setUpdatedStore((prevStore) => ({
      ...prevStore,
      [name]: convertedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Updated Store:', updatedStore);
    try {
      const Store_id = store.Store_id;
      console.log(Store_id);
      const res = await axios.put("http://localhost:8800/stores/"+Store_id, updatedStore)
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
        <h2>Edit Store</h2>
        <form onSubmit={handleSubmit}>
          <strong>Store_id  - {store.Store_id}</strong>
          <label className="label" htmlFor="storeName">
            <span>Part_id:</span>
            <input required disabled
              type="text"
              id="Part_id"
              name="Part_id"
              value={store.Part_id}
            />
          </label>
          <label className="label">
            <span>Quantity:</span>
            <input required
              type="number"
              id="Quantity"
              name="Quantity"
              min = "1"
              defaultValue={updatedStore.Quantity}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Rack Number:</span>
            <input required
              type= "text"
              id="Rack_no"
              name="Rack_no"
              defaultValue={updatedStore.Rack_no}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Block Number:</span>
            <input required
              type="text"
              id="Block_no"
              name="Block_no"
              defaultValue={updatedStore.Block_no}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Theshold</span>
            <input required
              type="number"
              id="Threshold"
              name="Threshold"
              defaultValue={updatedStore.Threshold}
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

export const StoreAddModal = ({ isOpen, onClose }) => {
  const [newStore, setNewStore] = useState({
    Store_id: '',
    Part_id: '',
    Quantity: '',
    Rack_no: '',
    Block_no: '',
    Threshold: 0,
  });
  const [parts, setParts] = useState([]);
  const [msg, setMsg] = useState([]);
  const [err, setError] = useState([]);

  const handleInputChange = (e) => {
    setError(null);
    const { name, value, type } = e.target;
    const convertedValue = type === 'number' ? parseFloat(value) : value;
    setNewStore((prevStore) => ({
      ...prevStore,
      [name]: convertedValue,
    }));
  };

  const fetchParts = async () => {
    try {
      const res = await axios.get('http://localhost:8800/parts');
      console.log(res.data);
      setParts(res.data);
    } catch (err) {
      console.log(err);
      // setError(err.response.data);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const handlePartSelectChange = (e) => {
    setNewStore((prevStore) => ({
      ...prevStore,
      Part_id: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('http://localhost:8800/stores/add', newStore);
      console.log(res?.data || "Success");
      setMsg(res?.data)
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} id="modalcontainer">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Store</h2>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="storeID">
            <span>Store ID:</span>
            <input
              required
              type="text"
              id="storeID"
              name="Store_id"
              defaultValue={newStore.Store_id}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Part ID:</span>
            <select
              required
              id="partID"
              name="Part_id"
              value={newStore.Part_id}
              onChange={handlePartSelectChange}
            >
              <option value="" disabled>
                Select Part ID
              </option>
              {parts.map((part) => (
                <option key={part.Part_id} value={part.Part_id}>
                  {part.Part_id}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            <span>Quantity:</span>
            <input
              required
              type="text"
              id="Quantity"
              name="Quantity"
              defaultValue={newStore.Quantity}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Rack Number:</span>
            <input
              required
              type="text"
              id="Rack_no"
              name="Rack_no"
              defaultValue={newStore.Rack_no}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Block Number:</span>
            <input
              required
              type="text"
              id="Block_no"
              name="Block_no"
              defaultValue={newStore.Block_no}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Threshold:</span>
            <input
              required
              type="number"
              id="Threshold"
              name="Threshold"
              min="0"
              defaultValue={newStore.Threshold}
              onChange={handleInputChange}
            />
          </label>
          {msg && <p>{msg}</p>}
          {err && <p>{err}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
