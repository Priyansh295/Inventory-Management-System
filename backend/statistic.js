import db from "./db.js"

export const fetch_stats_category = (req, res) => {
    const query = `
    SELECT
      p.Category,
      SUM(ol.Quantity) AS ProductsSold
    FROM
      Order_Line ol
    JOIN
      Product p ON ol.Product_ID = p.Product_ID
    GROUP BY
      p.Category;
  `;

  db.query(query, (err, data) => {
    if (err) {
      console.error('Error fetching product categories:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(data);
  });
}

export const fetch_stats_client_order = (req, res) => {
    const query = `
    SELECT client_id, COUNT(order_id) AS total_orders
    FROM orders
    GROUP BY client_id
    ORDER BY total_orders;
  `;

  db.query(query, (err, data) => {
    if (err) {
      console.error('Error fetching orders clients:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(data);
  });
}

export const fetch_stats_client_product = (req, res) => {
    const query = `
    select client_id,count(product_id) AS total_products
    from orders 
    natural join order_line 
    group by client_id 
    order by count(product_id);
  `;

  db.query(query, (err, data) => {
    if (err) {
      console.error('Error fetching orders clients:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(data);
  });
}

export const fetch_stats_products_date = (req, res) => {
    const query = `
    SELECT DATE(SUBSTRING_INDEX(Order_ID, '_', -1)) AS OrderDate, 
       SUM(Quantity) AS TotalQuantity
    FROM order_line
    GROUP BY OrderDate
    ORDER BY OrderDate;
  `;

  db.query(query, (err, data) => {
    if (err) {
      console.error('Error fetching orders clients:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(data);
  });
}