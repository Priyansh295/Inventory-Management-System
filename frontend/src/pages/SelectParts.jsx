import React, { useState, useEffect } from 'react';
import '../styles/SelectParts.scss';

const SelectParts = ({ onSelectedPartsChange }) => {
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState({
    selectedOption: '',
    quantity: '',
    selectedId: '',
  });

  useEffect(() => {
    fetch('http://localhost:8800/parts')
      .then((response) => response.json())
      .then((partsData) => {
        setParts(
          partsData.map((part) => ({
            value: part.Part_name,
            label: part.Part_name,
            id: part.Part_id,
          }))
        );
      })
      .catch((error) => console.error('Error fetching parts:', error));
  }, []);

  const handleSelectChange = (e) => {
    const selectedPart = parts.find((part) => part.value === e.target.value);

    setSelectedParts({
      ...selectedParts,
      selectedOption: e.target.value,
      selectedId: selectedPart ? selectedPart.id : '',
    });
  };

  const handleQuantityChange = (e) => {
    setSelectedParts({ ...selectedParts, quantity: e.target.value });
  };

  const handleAddPart = () => {
    if (selectedParts.selectedOption && selectedParts.quantity !== '') {
      const newSelectedOption = {
        label: selectedParts.selectedOption,
        value: selectedParts.selectedOption,
        quantity: parseInt(selectedParts.quantity, 10),
        id: selectedParts.selectedId,
      };

      onSelectedPartsChange(newSelectedOption);

      setSelectedParts({ selectedOption: '', quantity: '', selectedId: '' });
    }
  };

  return (
    <div>
      <div className="select-parts-form" id="select-parts-form">
        <h2>Product Composition</h2>
        <label>
          <span>Select a part</span>
          <select required
            value={selectedParts.selectedOption}
            onChange={handleSelectChange}
            className="select-option"
            id={selectedParts.selectedId}
          >
            <option value="" disabled></option>
            {parts.map((part) => (
              <option key={part.value} value={part.value}>
                {part.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          <span>Quantity:</span>
          <input required
            type="number"
            value={selectedParts.quantity}
            onChange={handleQuantityChange}
            min="1"
            className="quantity-input"
            id="quantity-input"
          />
        </label>
        <br />
        <button
          type="button"
          onClick={handleAddPart}
          className="add-part-button"
          id="add-part-button"
        >
          Add Part
        </button>
      </div>
    </div>
  );
};

export default SelectParts;
