import React, { useContext,useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Products.scss';
import { AuthContext } from '../context/authContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser.Client_ID);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8800/products');
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToCart = async (productId) => {
    try {
      console.log(productId)
      // console.log(image)
      const formData = new FormData();
      formData.append('user_id',currentUser.Client_ID);
      formData.append('product_id', productId);
      await axios.post('http://localhost:8800/products/cart/add',formData);
      window.location.href = '/products/cart';
    } catch (error) {
      console.error('Error adding item to cart:', error);
      window.location.href = '/products/cart';
    }
  };
  const filteredProducts = products.filter(
    (prod) =>
      prod.Product_Name.toLowerCase().includes(searchInput.toLowerCase()) &&
      (selectedCategory === '' || selectedCategory === prod.Category)
  );

  const allCategories = ['', ...new Set(products.map((prod) => prod.Category))]; 
  return (
    <div className='products_page_client'>
      <h1 className="title">Products</h1>
      <div className='select-options'>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <div className='select-bar'>
          <label htmlFor="category">Select Category:</label>
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category === '' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>
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
                  <p>{selectedDescription || prod.Product_Description}</p>
                  <p>Category: {prod.Category}</p>
                  <p className="price">Price: ${prod.Price}</p>
                  <button className="cart-button" onClick={() => addToCart(prod.Product_ID)}>
                    Add to Cart
                  </button>
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
                  <p>{selectedDescription || prod.Product_Description}</p>
                  <p>Category: {prod.Category}</p>
                  <p className="price">Price: ${prod.Price}</p>
                  <button className="cart-button" onClick={() => addToCart(prod.Product_ID)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
