import db from "./db";
import { Request, Response } from "express";

export const fetch_orders = (req: Request, res: Response): void => {
    const get_orders = 'SELECT * from Orders';

    db.query(get_orders, [], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(results);
    });
}

export const fetch_order_line = (req: Request, res: Response): void => {
  const get_order_line = 'SELECT * from Order_line where Order_id=?';
  const order_id = req.params.id;  // TypeScript can infer type here; ensure `id` is expected as a string or number.
  console.log("hello order id is", order_id);

  db.query(get_order_line, [order_id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
}

export const addEmployee = (req: Request, res: Response): void => {
    const Employee_ID = req.body[0];  // Assuming body is parsed correctly and contains the ID at index 0.
    const Order_ID = req.params.id;

    if (!Employee_ID || !Order_ID) {
      return res.status(400).json({ error: 'Missing employee or order ID' });
    }

    const query = "UPDATE Orders SET Employee_ID = ? WHERE Order_ID = ?";
    db.query(query, [Employee_ID, Order_ID], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      return res.json("Update Successful");
    })
}
