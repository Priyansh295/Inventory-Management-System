import db from "./db.js"

export const fetch_storage = (req, res) => {
    console.log("Here")
    const query = 'SELECT * FROM Storage';
  
    db.query(query, (err, data) => {
      if (err) {
        console.error('Error fetching stores:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      res.json(data);
    });
  };