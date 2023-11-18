import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import './ClientUpdate.scss'; // Import the CSS file
import { ClientModal,ChangePasswordModal } from './ClientModal';

const NavbarClient = () => {
  const { currentUser } = useContext(AuthContext);
  const [clientDetails, setClientDetails] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/client/${currentUser.Client_ID}`);
        setClientDetails(res.data);
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    };

    if (currentUser) {
      fetchClientDetails();
    }
  }, [currentUser]);

  const openUpdateModal = (client) => {
    setSelectedClient(client);
    setIsUpdateModalOpen(true);
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setIsUpdateModalOpen(false);
    setIsChangePasswordModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="client-container">
      <h2>Client Details</h2>
      {clientDetails ? (
        <div>
          <p><strong>Client ID:</strong> {clientDetails[0].Client_ID}</p>
          <p><strong>Client Name:</strong> {clientDetails[0].Client_Name}</p>
          <p><strong>Email:</strong> {clientDetails[0].Email}</p>
          <p><strong>Phone Number:</strong> {clientDetails[0].phone_no}</p>
          <p><strong>City:</strong> {clientDetails[0].City}</p>
          <p><strong>PIN Code:</strong> {clientDetails[0].PINCODE}</p>
          <p><strong>Building:</strong> {clientDetails[0].Building}</p>
          <p><strong>Floor Number:</strong> {clientDetails[0].Floor_no}</p>
          {/* You may choose to display other details as needed */}
          <button className="update-button" onClick={() => openUpdateModal(clientDetails[0])}>
            Update
          </button>
          <button className="change-password-button" onClick={openChangePasswordModal}>
            Change Password
          </button>
          {isUpdateModalOpen && (
            <ClientModal isOpen={isUpdateModalOpen} onClose={closeModal} client={selectedClient} />
          )}
          {isChangePasswordModalOpen && (
            <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={closeModal} />
          )}
        </div>
      ) : (
        <p>Loading client details...</p>
      )}
    </div>
  );
};

export default NavbarClient;

