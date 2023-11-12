// import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/authContext';
// import './Cart.css';

// const Cart = () => {
//   const [cartContents, setCartContents] = useState([]);
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     fetchCartContents();
//   }, []);

//   const fetchCartContents = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8800/products/cart/${currentUser.Client_ID}`);
//       setCartContents(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error('Error fetching cart contents:', error);
//     }
//   };

//     const removeFromCart = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:8800/products/cart/${currentUser.Client_ID}/${productId}`);
//       // Update the cart contents after removing an item
//       fetchCartContents();
//     } catch (error) {
//       console.error('Error removing item from the cart:', error);
//     }
//   };
  
//   return (
//     <div>
//       <h1>Shopping Cart</h1>
//       {cartContents.length > 0 ? (
//         <div className="products-container">
//           {cartContents.map((product,index) => (
//             <div className="product" key={product.product_id}>
//               <img
//                 src={`${process.env.PUBLIC_URL}/images/${product.Image}`}
//                 alt={`Product ${product.Product_ID}`}
//                 className="product-image"
//               />
//               <div className="product-details">
//                 <p>ID: {product.product_id}</p>
//                 <p>Name: {product.Product_Name}</p>
//                 <p>Description: {product.Product_Description}</p>
//                 <p>Category: {product.Category}</p>
//                 <p>Price: ${product.Price}</p>
//                 {/* Add any other details you want to display */}
//                 <p> Quantity:
//                   <input type="number" defaultValue={1} onChange={(e) => {if (e.target.value < 1) { e.target.value = 1; } }}/>
//                 </p>
//                 <button onClick={() => removeFromCart(product.product_id)}>Remove from Cart</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="empty-cart-message">Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import './Products.css';

const Cart = () => {
  const [cartContents, setCartContents] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const currentDate = new Date();
  // Add one month to the current date
  const dueDate = new Date(currentDate);
  dueDate.setMonth(currentDate.getMonth() + 1);
  const formattedDueDate = dueDate.toISOString().split('T')[0];

  useEffect(() => {
    fetchCartContents();
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
      product.product_id === productId ? { ...product, quantity: newQuantity } : product
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

  const addToOrder = async (product) => {
    try {
      console.log(product)
      console.log(product.Price*product.quantity)
      console.log(formattedDueDate)
      const Date = currentDate.toISOString().split('T')[0];
      console.log(Date)
      const formData = new FormData();
      formData.append('Order_id',)
      formData.append('client_id',currentUser.Client_ID);
      formData.append('Total_payment',product.Price*product.quantity)
      formData.append('Due_Date',formattedDueDate)
      formData.append('Order_Placement_Date',Date)
      formData.append('Status','In Progress')
      await axios.post('http://localhost:8800/products/order',formData);
      window.location.href = '/products/order';
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const OrderFinal = async () => {
    try {
      console.log(cartContents)
      const total_price=calculateTotalPrice()
      console.log(total_price)
      const Date = currentDate.toISOString().split('T')[0];
      const formData = new FormData();
      formData.append('Order_id',)
      formData.append('client_id',currentUser.Client_ID);
      formData.append('Total_payment',total_price)
      formData.append('Due_Date',formattedDueDate)
      formData.append('Order_Placement_Date',Date)
      formData.append('Status','In Progress')
      await axios.post('http://localhost:8800/products/order',formData);
      window.location.href = '/products/order';
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartContents.length > 0 ? (
        <div className="products-container">
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
                <button onClick={() => removeFromCart(product.product_id)}>Remove from Cart</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
      <button className="order-button" onClick={() => OrderFinal()}>Order final</button>
    </div>
  );
};

export default Cart;


