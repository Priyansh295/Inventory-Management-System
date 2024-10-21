import { Request, Response } from 'express';
import db from './db';

interface Part {
    Part_id: number;
    Part_name: string;
    Weight: number;
}

interface RequestWithPart extends Request {
    body: Part;
    params: {
        id: string;
    };
}

export const fetch_parts = (req: Request, res: Response): void => {
    const get_parts = 'SELECT * from Part';

    db.query(get_parts, [], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
};

export const delete_part = (req: RequestWithPart, res: Response): void => {
    const del_part = 'DELETE FROM Part WHERE Part_id = ?';
    const part_id = parseInt(req.params.id);
    db.query(del_part, [part_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.json("Part Deleted Successfully.");
    });
};

export const add_part = (req: RequestWithPart, res: Response): void => {
    console.log(req.body);
    const { Part_id, Part_name, Weight } = req.body;
    const query = "SELECT * FROM Part WHERE Part_id = ?";

    db.query(query, [Part_id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length) {
            console.log(results, results.length);
            return res.status(409).json("Part already exists");
        }
        const insertQuery = "INSERT INTO Part (Part_id, Part_name, Weight) VALUES (?, ?, ?)";
        const values = [Part_id, Part_name, Weight];

        db.query(insertQuery, values, (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Part has been added.");
        });
    });
};

export const update_part = (req: RequestWithPart, res: Response): void => {
    console.log("here");
    const part_id = parseInt(req.params.id);
    const { Part_name, Weight } = req.body;

    if (!part_id || !Part_name || !Weight) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const query = `UPDATE Part SET Part_name=?, Weight=? WHERE Part_id=?;`;
    const values = [Part_name, Weight, part_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating part:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Part Updated successfully.');
        return res.status(200).json('Part Updated successfully.');
    });
};
