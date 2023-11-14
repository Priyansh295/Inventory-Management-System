import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import './Parts.scss';
import {PartModal, PartAddModal} from './PartModal';

const Parts = () => {
  const { admin } = useContext(AuthContext);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New state for the add modal

  useEffect(() => {
    fetchParts();
  }, []);
  const [err, setError] = useState([])
  const [msg, setMsg] = useState([])
  const fetchParts = async () => {
    try {
        console.log("here")
        const res = await axios.get(`http://localhost:8800/parts`);
        console.log(res)
        setParts(res.data);
    } catch (error) {
        console.error('Error fetching parts:', error);
    }
  };

  const handleAdd = () => {
    setMsg(null)
    setIsAddModalOpen(true);
  };

  const handleDelete = async (part) => {
    try {
      const Part_id = part.Part_id;
      console.log(Part_id);
      const res = await axios.delete("http://localhost:8800/parts/"+Part_id)
      console.log(res)
      fetchParts();
      setMsg(res.data)
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const openUpdateModal = (part) => {
    setMsg(null)
    setSelectedPart(part);
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPart(null);
    setIsUpdateModalOpen(false);
    setIsAddModalOpen(false); // Close the add modal
    fetchParts();
  };

  if (admin) {
    return (
      <div className='part_container'>
        <h1>Parts</h1>
        <div className="part-table">
          <button className="add-button" onClick={handleAdd}>
            Add Part
          </button>
          {err && <p> {err}</p>}
          {msg && <p> {msg}</p>}
          <table>
            <thead>
              <tr>
                <th>Part ID</th>
                <th>Part Name</th>
                <th>Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => (
                <tr className="part_row" key={part.Part_id}>
                  <td>{part.Part_id}</td>
                  <td>{part.Part_name}</td>
                  <td>{part.Weight}</td>
                  <td className='part-buttons'>
                    <button className="update-button" onClick={() => openUpdateModal(part)}>
                      Update
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(part)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Conditionally render the modals */}
          {isUpdateModalOpen && (
            <PartModal isOpen={isUpdateModalOpen} onClose={closeModal} part={selectedPart} />
          )}
          {isAddModalOpen && (
            <PartAddModal isOpen={isAddModalOpen} onClose={closeModal} />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Parts;