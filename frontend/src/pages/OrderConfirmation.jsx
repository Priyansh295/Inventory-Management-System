import React, { useState } from 'react';
import axios from 'axios';

const OrderConfirmation = ({ location }) => {
// const cartContents = location.state.cartContents || []
console.log(location)
//   const [paymentDetails, setPaymentDetails] = useState({
//     creditCardNumber: '',
//     expirationDate: '',
//     cvv: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   const handleCompleteOrder = async () => {
//     try {
//       // Make a request to create the order with payment details
//       await axios.post('http://localhost:8800/orders', {
//         clientID: 'yourClientId', // replace with actual client ID
//         totalPayment: calculateTotalPayment(cartContents),
//         paymentDetails,
//       });

//       // You can add additional logic or UI updates here if needed

//     } catch (error) {
//       console.error('Error completing order:', error);
//     }
//   };

//   const calculateTotalPayment = (cartItems) => {
//     return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
//   };

//   return (
//     <div>
//       <h1>Order Confirmation</h1>
//       {cartContents && cartContents.length > 0 ? (
//         <div className="products-container">
//           {cartContents.map((product) => (
//             <div className="product" key={product.product_id}>
//               <img
//                 src={`${process.env.PUBLIC_URL}/images/${product.Image}`}
//                 alt={`Product ${product.Product_ID}`}
//                 className="product-image"
//               />
//               <div className="product-details">
//                 <h2>{product.Product_Name}</h2>
//                 <p>{product.Product_Description}</p>
//                 <p>Category: {product.Category}</p>
//                 <p className="price">Price: ${product.Price * product.quantity}</p>
//                 <p>Quantity: {product.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No items in the cart.</p>
//       )}

//       <h2>Payment Details</h2>
//       <form>
//         <label>
//           Credit Card Number:
//           <input
//             type="text"
//             name="creditCardNumber"
//             value={paymentDetails.creditCardNumber}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Expiration Date:
//           <input
//             type="text"
//             name="expirationDate"
//             value={paymentDetails.expirationDate}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           CVV:
//           <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handleInputChange} />
//         </label>
//       </form>
//       <button onClick={handleCompleteOrder}>Complete Order</button>
//     </div>
//   );
};

export default OrderConfirmation;
