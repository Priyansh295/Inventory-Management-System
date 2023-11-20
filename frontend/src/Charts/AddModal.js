// ShowModal.jsx

import React from 'react';
import '../styles/BarModal.scss';
export const ShowModal = ({ isOpen, onClose, categoryDetails }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} id="modalcontainer">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Show Details</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Products Sold</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {categoryDetails.map((category, index) => (
              <tr key={index}>
                <td>{category.Category}</td>
                <td>{category.ProductsSold}</td>
                {/* Add more cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
