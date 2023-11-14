import db from "./db.js"

export const fetch_parts = (req, res) => {
    const get_parts = 'SELECT * from part';

    db.query(get_parts, [], (err, data) => {
        if (err)
        return res.json(err);
        res.json(data);
    });
}

export const delete_part = (req, res) => {
    const del_part = 'DELETE FROM Part WHERE Part_id = ?';
    const part_id = req.params.id
    db.query(del_part, [part_id], (err, data) => {
        if (err) {
        console.log(err)
        return res.json(err);
        }
        return res.json("Part Deleted Successfully.")
    });
}

export const add_part = (req, res) => {
    console.log(req.body);
    const part_id = req.body.Part_id
    const query = "SELECT * FROM Part WHERE Part_id = ?";
    db.query(query, [part_id], (err, data) => {
      if(err) return res.json(err)
      if(data.length) {
          console.log(data, data.length)
          return res.status(409).json("Part already exists")
      }
      const q = "INSERT INTO Part VALUES (?)"
      const v = [
          req.body.Part_id,
          req.body.Part_name,
          req.body.Weight,
      ]
      console.log(v)
      db.query(q, [v], (err, data) => {
          if(err) return res.json(err);
          return res.status(200).json("Part has been added.");
      })
    })
}

export const update_part = (req, res) => {
    console.log("here");
    const part_id = req.params.id
    if (!part_id || !req.body.Part_name || !req.body.Weight) {
      return res.status(400).json({ error: 'Invalid input data' });
    }
    const query = `UPDATE Part SET Part_name=?, Weight=? WHERE Part_id=?;`;
    const v = [
      req.body.Part_name,
      req.body.Weight,
      part_id,
    ]
    console.log(part_id, v);
    db.query(query, v, (err, data) => {
        if (err) {
          console.error('Error updating part:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Part Updated successfully.');
        return res.status(200).json('Part Updated successfully.');
      });
  }