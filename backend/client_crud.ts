import db from "./db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface ClientBody {
  Client_ID: number;
  phone_no?: string;
  Email?: string;
  Client_name?: string;
  City?: string;
  Pincode?: string;
  Building?: string;
  Floor_no?: string;
  password?: string;
}

interface AdminBody {
  adminId: number;
  password: string;
}

interface CustomRequest<T> extends Request {
  body: T;
}

export const fetch_client = (req: Request, res: Response) => {
    const get_parts = 'SELECT * from client where client_id=?';
    db.query(get_parts, [req.params.id], (err, data) => {
        if (err)
            return res.json(err);
        res.json(data);
    });
};

export const fetch_admin = (req: Request, res: Response) => {
    const get_parts = 'SELECT * from admin where admin_id=?';
    db.query(get_parts, [req.params.id], (err, data) => {
        if (err)
            return res.json(err);
        res.json(data);
    });
};

export const update_client = (req: CustomRequest<ClientBody>, res: Response) => {
    const client_id = req.params.id;
    const { Client_name, Email, phone_no, City, Pincode, Building, Floor_no } = req.body;

    if (!client_id || !Client_name || !Email || !phone_no || !City || !Pincode || !Building || !Floor_no) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const query = `
      UPDATE Client 
      SET 
        Client_Name=?, 
        Email=?, 
        phone_no=?, 
        City=?, 
        PINCODE=?, 
        Building=?, 
        Floor_no=?
      WHERE 
        Client_ID=?
    `;

    const values = [Client_name, Email, phone_no, City, Pincode, Building, Floor_no, client_id];

    db.query(query, values, (err, data) => {
        if (err) {
            console.error('Error updating client:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Client Updated successfully.');
        return res.status(200).json('Client Updated successfully.');
    });
};

export const update_password = (req: CustomRequest<ClientBody>, res: Response) => {
    const { client_id, password: currentPassword, newPassword } = req.body;

    const getPasswordQuery = 'SELECT Password_client FROM client WHERE Client_ID = ?';
    db.query(getPasswordQuery, [client_id], async (err, result) => {
        if (err) {
            console.error('Error fetching password:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (result.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const hashedPassword = result[0].Password_client;
        const isPasswordMatch = bcrypt.compareSync(currentPassword, hashedPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        const updatePasswordQuery = 'UPDATE client SET Password_client = ? WHERE Client_ID = ?';

        db.query(updatePasswordQuery, [hash, client_id], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'Password updated successfully' });
        });
    });
};

export const update_admin_password = (req: CustomRequest<AdminBody>, res: Response) => {
    const { adminId, password: currentPassword, newPassword } = req.body;

    const getPasswordQuery = 'SELECT Password FROM admin WHERE admin_ID = ?';
    db.query(getPasswordQuery, [adminId], async (err, result) => {
        if (err) {
            console.error('Error fetching password:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (result.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const hashedPassword = result[0].Password;
        const isPasswordMatch = bcrypt.compareSync(currentPassword, hashedPassword);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid current password' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        const updatePasswordQuery = 'UPDATE admin SET Password = ? WHERE admin_ID = ?';

        db.query(updatePasswordQuery, [hash, adminId], (err, result) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'Password updated successfully' });
        });
    });
};

export const add_admin = (req: CustomRequest<AdminBody>, res: Response) => {
    const { adminId, password } = req.body;

    const query = 'SELECT * FROM Admin WHERE Admin_ID = ?';
    db.query(query, [adminId], (err, data) => {
        if (err) return res.json(err);

        if (data.length) {
            return res.status(409).json({ error: 'Admin ID is already in use.' });
        }

        const insertQuery = 'INSERT INTO Admin (Admin_ID, password) VALUES (?, ?)';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const values = [adminId, hash];

        db.query(insertQuery, values, (err, result) => {
            if (err) return res.json(err);
            return res.status(200).json({ message: 'Admin has been added.' });
        });
    });
};
