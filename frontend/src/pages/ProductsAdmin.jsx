import React, {useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductsAdmin.scss';
import {ProductPartsModal, ProductPartsUpdateModal, ProductPartsViewModal} from './ProductParts';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // New state for the add modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // New state for the add modal
  const [err, setError] = useState([])
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [msg, setMsg] = useState([])
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8800/products');
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddButton = () => {
    setMsg(null)
    setIsAddModalOpen(true);
    fetchAllProducts();
  }
  const openUpdateModal = (product) => {
    setMsg(null)
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };
  const openViewModal = (product) => {
    setMsg(null)
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setIsUpdateModalOpen(false);
    setIsAddModalOpen(false);
    setIsViewModalOpen(false);
    fetchAllProducts();
  };
  const filteredProducts = products.filter(
    (prod) =>
      prod.Product_Name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (selectedCategory === '' || selectedCategory === prod.Category)
  );
  const handleDelete = async (prod) => {
    try {
      console.log(prod)
      const Product_ID = prod.Product_ID;
      console.log(Product_ID);
      const res = await axios.delete("http://localhost:8800/products/"+Product_ID)
      console.log(res)
      fetchAllProducts();
      setMsg(res.data)
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };
  const allCategories = ['', ...new Set(products.map((prod) => prod.Category))]; 
  return (
    <div className='products_page'>
      <h1 className="title">Products</h1>
      <div className='select-options'>
        <input
            type="text"
            placeholder="Search for a product"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        <div className='div1'>
          <button className='add-button' onClick={handleAddButton}>
          Add New Product</button>
          <div className='select-bar'>
            <label htmlFor="category">Select Category </label>
            <select id="category" value={selectedCategory} 
              onChange={handleCategoryChange}>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category === '' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {err && <p> {err}</p>}
      {msg && <p> {msg}</p>}
      <div className="product-container">
        <div className="products-container">
          {searchInput === '' ? (
            // Display all products when search input is empty
            filteredProducts.map((prod) => (
              <div key={prod.Product_ID} className="product">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${prod.Image}`}
                  alt={`Product ${prod.Product_ID}`}
                  className="product-image"
                />
                <div className="product-details">
                  <h2>{prod.Product_Name}</h2>
                  <p className = "description">{prod.Product_Description}</p>
                  <p>Category: {prod.Category}</p>
                  <p className="price">Price: ${prod.Price}</p>
                </div>
                <div className='action-buttons'>
                  <button onClick={() => openViewModal(prod)} >View Parts</button>
                  <button onClick={() => openUpdateModal(prod)} >Update</button>
                  <button onClick={() => handleDelete(prod)} >Delete</button>
                </div>
              </div>
            ))
          ) : (
            // Display filtered products when search input is not empty
            filteredProducts.map((prod) => (
              <div key={prod.Product_ID} className="product">
                <img
                  src={`${process.env.PUBLIC_URL}/images/${prod.Image}`}
                  alt={`Product ${prod.Product_ID}`}
                  className="product-image"
                />
                <div className="product-details">
                  <h2>{prod.Product_Name}</h2>
                  <p>{prod.Product_Description}</p>
                  <p>Category: {prod.Category}</p>
                  <p className="price">Price: ${prod.Price}</p>
                </div>
                <div className='action-buttons'>
                  <button onClick={() => openViewModal(prod)} >View Parts</button>
                  <button onClick={() => openUpdateModal(prod)} >Update</button>
                  <button onClick={() => handleDelete(prod)} >Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
        {isAddModalOpen && (
            <ProductPartsModal isOpen={isAddModalOpen} onClose={closeModal} />
        )}
          {isUpdateModalOpen && (
              <ProductPartsUpdateModal isOpen={isUpdateModalOpen} onClose={closeModal} selectedProduct={selectedProduct} />
            )}
          {isViewModalOpen && (
            <ProductPartsViewModal  isOpen={isViewModalOpen} onClose={closeModal} selectedProduct={selectedProduct} />
          )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
