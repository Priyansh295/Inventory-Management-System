import express from 'express';
import db from './db.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import { login_admin, login_client, logout_admin, logout_client, register } from "./auth_controller.js";

const router = express.Router();

router.use(fileUpload());

router.get('/', (req, res) => {
  res.send('Backend Server');
});

router.get('/products', (req, res) => {
  const query = 'SELECT * FROM Product';
  db.query(query, (err, data) => {
    if (err) return res.send(err);
    res.send(data);
  });
});

router.get('/orders', (req, res) => {
  const query = 'SELECT * FROM Orders';
  db.query(query, (err, data) => {
    if (err) return res.send(err);
    res.send(data);
  });
});

router.get('/parts', (req, res) => {
  const query = 'SELECT * FROM parts';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post('/products', (req, res) => {
  const query = 'INSERT INTO product VALUES (?)';
  const values = [
    req.body.Product_ID,
    req.body.Product_Name,
    req.body.Product_Description,
    req.body.Category,
    req.body.Price,
    req.body.Image,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Add a product
router.post('/products/add', (req, res) => {
  const {Product_ID,Product_Name,Product_Description,Category,Price,} = req.body;

  const image = req.files && req.files.Image;

  if (!Product_ID || !Product_Name || !Product_Description || !Category || !Price || !image) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const sql = `
    INSERT INTO Product (Product_ID, Product_Name, Product_Description, Category, Price, Image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [Product_ID, Product_Name, Product_Description, Category, Price, image.name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding product to the database:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = path.dirname(__filename);
    const frontendPublicPath = path.join(__dirname, '..', 'frontend', 'public');
    const uploadPath = path.join(frontendPublicPath, 'images', image.name);
    image.mv(uploadPath, (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Product added successfully with image');
      res.status(200).json({ success: true });
    });
  });
});

// Update a product
router.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { Product_Name, Product_Description, Category, Price} = req.body;
    const image = req.files && req.files.Image;
    if (!Product_ID || !Product_Name || !Product_Description || !Category || !Price || !image) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
    const query = `
      UPDATE Product
      SET Product_Name=?, Product_Description=?, Category=?, Price=?, Image=?
      WHERE Product_ID=?
    `;
    const values = [Product_Name, Product_Description, Category, Price, image.name, productId];
  
    db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error adding product to the database:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        const __filename = new URL(import.meta.url).pathname;
        const __dirname = path.dirname(__filename);
        const frontendPublicPath = path.join(__dirname, '..', 'frontend', 'public');
        const uploadPath = path.join(frontendPublicPath, 'images', image.name);
        image.mv(uploadPath, (err) => {
          if (err) {
            console.error('Error saving image:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          console.log('Product Updated successfully with image');
          res.status(200).json({ success: true });
        });
      });
  });
  
  // Delete a product
  router.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM Product WHERE Product_ID=?';
    const values = [productId];
    db.query(query, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.json({ message: 'Product deleted successfully' });
    });
});

// Add a product to the cart
router.post('/products/cart/add', (req, res) => {
  const { user_id, product_id} = req.body;
  if (!user_id || !product_id) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const add_to_cart_query = 'INSERT INTO Cart (User_ID, Product_ID) VALUES (?, ?)';
  const add_to_cart_values = [user_id, product_id];

  db.query(add_to_cart_query, add_to_cart_values, (err, result) => {
    if (err) {
      console.error('Error adding product to the cart:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Product added to the cart successfully');
    res.status(200).json({ success: true });
  });
});

// Get cart contents
router.get('/products/cart/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  // console.log(req.body)
  const get_cart_contents_query = 'select * from cart natural join product where user_id=?';

  db.query(get_cart_contents_query, [user_id], (err, data) => {
    if (err) 
      return res.send(err);
    res.send(data);
  });
});

// Remove item from the cart
router.delete('/products/cart/:user_id/:product_id', (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.params.product_id;

  const remove_from_cart_query = 'DELETE FROM Cart WHERE User_ID = ? AND Product_ID = ?';

  db.query(remove_from_cart_query, [user_id, product_id], (err, result) => {
    if (err) {
      console.error('Error removing item from the cart:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Item removed from the cart successfully');
    res.json({ success: true });
  });
});

router.post("/register", register)
router.post("/login_client", login_client)
router.post("/login_admin", login_admin)
router.post("/logout_client", logout_client)
router.post("/logout_admin", logout_admin)

export default router;
