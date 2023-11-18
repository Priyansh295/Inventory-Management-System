import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import '../styles/Cart.scss';

const Cart = () => {
  const [cartContents, setCartContents] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const currentDate = new Date();
  // Add one month to the current date
  const dueDate = new Date(currentDate);
  dueDate.setMonth(currentDate.getMonth() + 1);

  useEffect(() => {
    fetchCartContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCartContents = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/products/cart/${currentUser.Client_ID}`);
      // Initialize quantity to 1 for each product in the cart
      const cartWithQuantity = response.data.map(product => ({ ...product, quantity: 1 }));
      setCartContents(cartWithQuantity);
    } catch (error) {
      console.error('Error fetching cart contents:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:8800/products/cart/${currentUser.Client_ID}/${productId}`);
      // Update the cart contents after removing an item
      fetchCartContents();
    } catch (error) {
      console.error('Error removing item from the cart:', error);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    // Update the quantity for the specific product in the cart
    const updatedCart = cartContents.map(product =>
      product.product_id === productId
        ? { ...product, quantity: Math.max(1, newQuantity) } // Ensure the quantity doesn't go below 1
        : product
    );
    setCartContents(updatedCart);
  };

  const calculateTotalPrice = () => {
    // Use Object.values to get an array of products from the object
    const products = Object.values(cartContents);

    // Use reduce to calculate the total price
    const totalPrice = products.reduce((total, product) => {
      return total + product.Price * product.quantity;
    }, 0);

    return totalPrice;
  };

  const OrderFinal = async () => {
    try {
      // console.log(cartContents)
      const total_price=calculateTotalPrice()
      console.log(total_price)
      const res = await axios.get('http://localhost:8800/timestamp');
      const OrderDate = res.data;
      console.log(OrderDate)

      const formData = new FormData();
      formData.append('Order_id',`${currentUser.Client_ID}_${OrderDate}`)
      formData.append('client_id',currentUser.Client_ID);
      formData.append('Total_payment',total_price)
      formData.append('Status','In Progress')
      await axios.post('http://localhost:8800/products/order',formData);
      // window.location.href = '/products/order';

      //Insert into orderLines

      const orderLineItems = cartContents.map(product => ({
        Product_ID: product.product_id,
        Status: 'In Progress', 
        Quantity: product.quantity,
      }));
      // Insert data into the Order_Line table
      await Promise.all(orderLineItems.map(async (orderLineItem) => {
        console.log(orderLineItem.Product_ID)
        const formData = new FormData();
        formData.append('Order_ID', `${currentUser.Client_ID}_${OrderDate}`);
        formData.append('Product_ID', orderLineItem.Product_ID);
        formData.append('Status', orderLineItem.Status);
        formData.append('Quantity', orderLineItem.Quantity);
        await axios.post('http://localhost:8800/products/order_lines', formData);
        // window.location.href = '/products/order';
      }));
      // axios.post('http://localhost:8800/procedure', data)
      window.location.href = '/products/order';
    } catch (error) {
      console.error('Error adding item to order:', error);
    }
  };

  return (
    <div className='cart-page'>
      <span className='cart-h'>Shopping Cart</span>
      {cartContents.length > 0 ? (
        <div className="carts-container">
          {cartContents.map((product, index) => (
            <div className="product" key={product.product_id}>
              <img
                src={`${process.env.PUBLIC_URL}/images/${product.Image}`}
                alt={`Product ${product.Product_ID}`}
                className="product-image"
              />
              <div className="product-details">
                <h2>{product.Product_Name}</h2>
                <p>{product.Product_Description}</p>
                <p>Category: {product.Category}</p>
                <p className="price">Price: ${product.Price * product.quantity}</p>
                {/* Add any other details you want to display */}
                <p>
                  Quantity:
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => updateQuantity(product.product_id, parseInt(e.target.value, 10))}
                  />
                </p>
                <button className = 'rem-cart' onClick={() => removeFromCart(product.product_id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
      {cartContents.length > 0 && (
      <button className="order-button" onClick={() => OrderFinal()}>Order final</button>
    )}
    </div>
  );
};

export default Cart;