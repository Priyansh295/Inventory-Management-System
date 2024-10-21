import { Request, Response } from 'express';
import db from './db';

export const fetch_supplier_orders = (req: Request, res: Response): void => {
    const query = `
        SELECT 
            s.Supplier_ID, 
            s.Part_ID, 
            so.Quantity, 
            Status, 
            so.date_time,
            DATE_ADD(so.date_time, INTERVAL (s.Restock_time * CEIL(so.Quantity / s.Quantity)) DAY) AS res_time 
        FROM 
            Supplier_Orders so 
        JOIN 
            Supplier s ON s.Supplier_ID = so.Supplier_ID;
    `;

    db.query(query, [], (err, data) => {
        if (err) {
            console.error('Error fetching Supplier Orders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(data);
    });
};

export const update_supplier_order_status = (req: Request, res: Response): void => {
    const supplierID = req.params.id;
    const { status, date_time }: { status: string, date_time: string } = req.body;

    // Handle timezone conversion and formatting
    const originalDate = new Date(date_time);
    const localDateTime = originalDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const formattedDate = new Date(localDateTime).toISOString().slice(0, 19).replace('T', ' ');

    const updateQuery = `
        UPDATE Supplier_Orders 
        SET Status = ? 
        WHERE Supplier_ID = ? 
        AND date_time = CONVERT_TZ(?, '+00:00', '+05:30')
    `;

    db.query(updateQuery, [status, supplierID, formattedDate], (err, result) => {
        if (err) {
            console.error('Error updating Supplier Orders:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json('Order Status Updated Successfully.');
    });
};
