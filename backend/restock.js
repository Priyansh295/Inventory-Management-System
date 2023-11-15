import db from "./db.js"

export const fetch_restock = (req, res) => {
    const get_orders = 'SELECT * from Restock_Details'; 
    db.query(get_orders, [], (err, data) => {
      if (err)
        return res.json(err);
      res.json(data);
    });
}

export const update_restock = (req, res) => {
    const store_id = req.params.id
    const supplier_id=req.params.s_id
    // console.log(res)
    if (!supplier_id || !store_id || !req.body.Restock_time || !req.body.Price) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    const query = `
    UPDATE Restock_Details
    SET Restock_time=?, Price=?
    WHERE Supplier_id=? AND Store_id=?;
    `;
    const v = [
      req.body.Restock_time,
      req.body.Price,
      supplier_id,
      store_id
    ]
    db.query(query, v, (err, data) => {
        if (err) {
          console.error('Error updating supplier:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Supplier Updated successfully.');
        return res.status(200).json('Supplier Updated successfully.');
      });
}

export const delete_restock = (req, res) => {
    const del_supplier = 'DELETE FROM Restock_details WHERE Store_id = ? AND Supplier_id=?';
    const supplier_id = req.params.s_id
    const store_id=req.params.id
    db.query(del_supplier, [store_id,supplier_id], (err, data) => {
      if (err) {
        console.log(err)
        return res.json(err);
      }
      return res.json("Supplier Deleted Successfully.")
    });
}

export const add_restock = (req, res) => {
    const { Store_Id, Supplier_Id, Restock_time, Price } = req.body;
  
    if (!Store_Id || !Supplier_Id || !Restock_time || !Price) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
  
    const query = `
      INSERT INTO Restock_Details (Store_Id, Supplier_Id, Restock_time, Price)
      VALUES (?, ?, ?, ?);
    `;
  
    const values = [Store_Id, Supplier_Id, Restock_time, Price];
  
    db.query(query, values, (err, data) => {
      if (err) {
        console.error('Error adding restock details:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      console.log('Restock Details added successfully.');
      return res.status(200).json('Restock Details added successfully.');
    });
  };
  
  
  