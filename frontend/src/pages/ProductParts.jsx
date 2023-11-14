import React, { useState } from 'react';
import SelectParts from './SelectParts';
import './ProductParts.scss';

const ProductParts = () => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [product, setProduct] = useState({
    Product_ID: '',
    Product_name: '',
    Product_description: '',
    Price: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product:', product);
    console.log('Selected Parts:', selectedParts);
  };

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectedPartsChange = (newSelectedOption) => {
    setSelectedParts((prev) => [...prev, newSelectedOption]);
  };

  return (
    <div className="product-parts-container">
      <h2>Add a Product</h2>
      <form className="product-parts-form" onSubmit={handleSubmit}>
        <label className="product-label">
          <span>Product ID:</span>
          <input type="text" name="Product_ID" onChange={handleChange} />
        </label>
        <label className="product-label">
            <span>Product Name:</span>
            <input type="text" name="Product_name" onChange={handleChange} />
        </label>
        <label className="product-label">
          <span>Product Description:</span>
          <input type="text" name="Product_description" onChange={handleChange} />
        </label>
        <label className="product-label">
          <span>Price:</span>
          <input type="number" name="Price" onChange={handleChange} />
        </label>
        <div className='select_div'>
            <SelectParts className = "select_parts" onSelectedPartsChange={handleSelectedPartsChange} />
        </div>
        <ul className="selected-parts-list">
            {selectedParts.map((selectedOption, index) => (
            <li key={index} className="selected-part-item">
                {selectedOption.label} - Quantity: {selectedOption.quantity}
            </li>
            ))}
        </ul>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductParts;
