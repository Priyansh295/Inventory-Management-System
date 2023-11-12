import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState('');

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

  const handleImageClick = (index) => {
    setSelectedDescription(products[index].Product_Description);
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <div className="product-container">
        <div className="products-container">
          {products.map((prod) => (
            <div key={prod.Product_ID} className="product">
              <img
                src={`${process.env.PUBLIC_URL}/images/${prod.Image}`}
                alt={`Product ${prod.Product_ID}`}
                className="product-image"
                onClick={() => handleImageClick(products.indexOf(prod))}
              />
              <div className="product-details">
                <h2>{prod.Product_Name}</h2>
                <p>{selectedDescription || prod.Product_Description}</p>
                <p>Category: {prod.Category}</p>
                <p className="price">Price: ${prod.Price}</p>
                <button className="cart-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
