import { Request, Response } from 'express';
import db from './db';

export const update_store = (req: Request, res: Response) => {
  const store_id = req.params.id;

  if (!store_id || !req.body.Rack_no || !req.body.Block_no || !req.body.Threshold || !req.body.Quantity) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const query = `
    UPDATE Storage
    SET Rack_no=?, Block_no=?, Threshold=?, Quantity=?
    WHERE Store_id=?;
  `;

  const values = [
    req.body.Rack_no,
    req.body.Block_no,
    req.body.Threshold,
    req.body.Quantity,
    store_id,
  ];

  db.query(query, values, (err, data) => {
    if (err) {
      console.error('Error updating store:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json('Store Updated successfully.');
  });
};

export const add_store = (req: Request, res: Response) => {
  const store_id = req.body.Store_id;
  const query = "SELECT * FROM Storage WHERE Store_id = ?";

  db.query(query, [store_id], (err, data) => {
    if(err) return res.json(err);
    if(data.length) {
      return res.status(409).json("Store already exists");
    }
    const q = "INSERT INTO Storage VALUES (?)";
    const v = [
      req.body.Store_id,
      req.body.Part_id,
      req.body.Quantity,
      req.body.Rack_no,
      req.body.Block_no,
      req.body.Threshold,
    ];

    db.query(q, [v], (err, data) => {
      if(err) return res.json(err);
      return res.status(200).json("Store has been created.");
    })
  })
}

export const fetch_stores = (req: Request, res: Response) => {
  const get_stores = 'SELECT * from Storage';

  db.query(get_stores, [], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
}

export const delete_store = (req: Request, res: Response) => {
  const store_id = req.params.id;
  const del_store = 'DELETE FROM Storage WHERE Store_id = ?';

  db.query(del_store, [store_id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json("Store Deleted Successfully.");
  });
}

export const fetch_storage = (req: Request, res: Response) => {
  const query = 'SELECT * FROM Storage';

  db.query(query, (err, data) => {
    if (err) {
      console.error('Error fetching stores:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(data);
  });
}
