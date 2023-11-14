// PartModal.jsx

import React, { useState } from 'react';
import "./PartModal.scss"
import axios from 'axios';

export const PartModal = ({ isOpen, onClose, part }) => {
  const [updatedPart, setUpdatedPart] = useState({
    Part_id: part.Part_id,
    Part_name: part.Part_name,
    Weight: part.Weight
  });

  const [msg, setMsg] = useState([])
  const [err, setError] = useState([])

  const handleInputChange = (e) => {
    setError(null);

    const { name, value, type } = e.target;
    const convertedValue = type === 'number' ? parseFloat(value) : value;
    setUpdatedPart((prevPart) => ({
      ...prevPart,
      [name]: convertedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log('Updated Part:', updatedPart);
    try {
      const Part_id = part.Part_id;
      console.log(Part_id);
      const res = await axios.put("http://localhost:8800/parts/"+Part_id, updatedPart)
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
        <h2>Edit Part</h2>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="partName">
            <span>Part Name:</span>
            <input required
              type="text"
              id="partName"
              name="Part_name"
              defaultValue={updatedPart.Part_name}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Weight:</span>
            <input required
              type="number"
              id="Weight"
              name="Weight"
              min = "1"
              defaultValue={updatedPart.Weight}
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

export const PartAddModal = ({ isOpen, onClose }) => {
  const [newPart, setNewPart] = useState({
    Part_id: '',
    Part_name: '',
    Weight: 0,
  });
  const [msg, setMsg] = useState([])
  const [err, setError] = useState([])
  const handleInputChange = (e) => {
    setError(null);
    const { name, value, type } = e.target;
    const convertedValue = type === 'number' ? parseFloat(value) : value;
    setNewPart((prevPart) => ({
      ...prevPart,
      [name]: convertedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log(newPart);
    try {
      const res = await axios.post("http://localhost:8800/parts/add",
                               newPart);
      console.log(res)
      console.log('Added Part:', newPart);
      setMsg(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} id="modalcontainer">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Add New Part</h2>
        <form  onSubmit={handleSubmit}>
          <label className="label" htmlFor="partID">
            <span>Part ID:</span>
            <input required
              type="text"
              id="partID"
              name="Part_id"
              defaultValue={newPart.Part_id}
              onChange={handleInputChange}
            />
          </label>
          <label className="label" htmlFor="partName">
            <span>Part Name:</span>
            <input required
              type="text"
              id="partName"
              name="Part_name"
              defaultValue={newPart.Part_name}
              onChange={handleInputChange}
            />
          </label>
          <label className="label">
            <span>Weight:</span>
            <input required
              type="number"
              id="Weight"
              name="Weight"
              min = "1"
              defaultValue={newPart.Weight}
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