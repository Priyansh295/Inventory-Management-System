import express, { Request, Response } from 'express';
import db from './db';
import fileUpload from 'express-fileupload';
import { login_admin, login_client, logout_admin, logout_client, register } from "./auth_controller";
import { add_part, delete_part, fetch_parts, update_part } from './parts_crud';
import { add_supplier, delete_supplier, fetch_suppliers, update_supplier } from './supplier_crud';
import { add_employee, delete_employee, fetch_employees, update_employee } from './employees_crud';
import { add_product, delete_product, get_product_parts } from './products_crud';
import { add_store, delete_store, fetch_stores, update_store } from './storage_crud';
import { fetch_orders, fetch_order_line, addEmployee } from './orders';
import { fetch_client, update_client, update_password, fetch_admin, update_admin_password, add_admin } from './client_crud';

const router = express.Router();

// Enable files upload
router.use(fileUpload());

// Route to test if the backend server is running
router.get('/', (req: Request, res: Response) => {
  res.send('Backend Server is running');
});

// Authentication routes
router.post("/register", register);
router.post("/login_client", login_client);
router.post("/login_admin", login_admin);
router.post("/logout_client", logout_client);
router.post("/logout_admin", logout_admin);

// Client and admin routes
router.get('/client/:id', fetch_client);
router.put('/client/update/:id', update_client);
router.post('/client/change-password', update_password);
router.get('/admin/:id', fetch_admin);
router.post('/admin/change-password', update_admin_password);
router.post('/admin/add', add_admin);

// Parts CRUD routes
router.get('/parts', fetch_parts);
router.post('/parts/add', add_part);
router.put('/parts/:id', update_part);
router.delete('/parts/:id', delete_part);

// Products CRUD routes
router.post('/products/add', add_product);
router.delete('/products/:id', delete_product);
router.get('/products/parts/:id', get_product_parts);

// Employee CRUD routes
router.get('/employees', fetch_employees);
router.post('/employees/add', add_employee);
router.put('/employees/:id', update_employee);
router.delete('/employees/:id', delete_employee);

// Supplier CRUD routes
router.get('/suppliers', fetch_suppliers);
router.post('/suppliers/add', add_supplier);
router.put('/suppliers/:id', update_supplier);
router.delete('/suppliers/:id', delete_supplier);

// Store CRUD routes
router.get('/stores', fetch_stores);
router.post('/stores/add', add_store);
router.put('/stores/:id', update_store);
router.delete('/stores/:id', delete_store);

// Order routes
router.get('/orders', fetch_orders);
router.get('/order_line/:id', fetch_order_line);
router.post('/orders/employee/:id', addEmployee);

export default router;
