import { Request, Response } from 'express';
import db from './db';
import path from 'path';
import fileUpload, { UploadedFile } from 'express-fileupload';

interface ProductBody {
    Product_ID: number;
    Product_Name: string;
    Product_Description: string;
    Category: string;
    Price: number;
    parts_str: string;
}

interface ProductRequest extends Request {
    body: ProductBody;
    files?: fileUpload.FileArray;
    params: {
        id: string;
    };
}

export const add_product = (req: ProductRequest, res: Response): void => {
    try {
        const { Product_ID, Product_Name, Product_Description, Category, Price, parts_str } = req.body;
        const image = req.files?.Image as UploadedFile;
        const parts = JSON.parse(parts_str);

        if (!Product_ID || !Product_Name || !Product_Description || !Category || !Price || !image) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        db.query('SELECT * FROM Product WHERE Product_ID = ?', [Product_ID], (err, results) => {
            if (err) return res.status(500).json(err);
            if (results.length) return res.status(409).json("Product already exists");

            db.beginTransaction(err => {
                if (err) return res.status(500).json({ error: 'Internal server error starting transaction' });

                const sqlProduct = `INSERT INTO Product (Product_ID, Product_Name, Product_Description, Category, Price, Image) VALUES (?, ?, ?, ?, ?, ?)`;
                const valuesProduct = [Product_ID, Product_Name, Product_Description, Category, Price, image.name];

                db.query(sqlProduct, valuesProduct, (err, result) => {
                    if (err) return db.rollback(() => res.status(500).json({ error: 'Internal server error adding product' }));

                    const uploadPath = path.resolve("../frontend/public/images", image.name);
                    image.mv(uploadPath, err => {
                        if (err) return db.rollback(() => res.status(500).json({ error: 'Error saving image' }));

                        const sqlPart = `INSERT INTO assembled_by (Product_ID, Part_id, Number_of_Parts) VALUES (?, ?, ?)`;
                        parts.forEach(part => {
                            db.query(sqlPart, [Product_ID, part.id, part.quantity], err => {
                                if (err) return db.rollback(() => res.status(500).json({ error: 'Error adding part to the database' }));
                            });
                        });

                        db.commit(err => {
                            if (err) return res.status(500).json({ error: 'Error committing transaction' });
                            res.json("Product Added Successfully");
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const delete_product = (req: ProductRequest, res: Response): void => {
    const del_product = 'DELETE FROM Product WHERE Product_ID = ?';
    const product_id = parseInt(req.params.id);

    db.query(del_product, [product_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.json("Product Deleted Successfully.");
    });
}

export const get_product_parts = (req: ProductRequest, res: Response): void => {
    const prod_id = parseInt(req.params.id);
    const query = `SELECT Part.Part_id, Part_name, Weight, Number_of_Parts FROM Part JOIN assembled_by ON Part.Part_id = assembled_by.Part_id WHERE assembled_by.Product_ID = ?;`

    db.query(query, [prod_id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json('Invalid Product ID');
        }
        console.log(results);
        return res.json(results);
    })
}
