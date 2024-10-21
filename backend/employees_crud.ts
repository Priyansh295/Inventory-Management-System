import { Request, Response } from 'express';
import db from './db';

interface EmployeeBody {
    Employee_id: number;
    Employee_name: string;
    Email: string;
    Phone_no: string;
    Address: string;
}

interface CustomRequest<T> extends Request {
    body: T;
    params: {
        id: string;
    };
}

export const update_employee = (req: CustomRequest<EmployeeBody>, res: Response) => {
    console.log("here");
    const employee_id = parseInt(req.params.id);
    const { Employee_name, Email, Phone_no, Address } = req.body;

    if (!employee_id || !Employee_name || !Email || !Phone_no || !Address) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const query = `
    UPDATE Employee
    SET Employee_name=?, Email=?, Phone_no=?, Address=? WHERE Employee_id=?;`;
    const values = [Employee_name, Email, Phone_no, Address, employee_id];
    console.log(employee_id, values);

    db.query(query, values, (err, data) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Employee Updated successfully.');
        return res.status(200).json('Employee Updated successfully.');
    });
};

export const add_employee = (req: CustomRequest<EmployeeBody>, res: Response) => {
    console.log(req.body);
    const { Employee_id, Employee_name, Email, Phone_no, Address } = req.body;
    const query = "SELECT * FROM Employee WHERE Employee_id = ?";

    db.query(query, [Employee_id], (err, data) => {
        if (err) return res.json(err);
        if (data.length) {
            console.log(data, data.length);
            return res.status(409).json("Employee already exists");
        }
        const insertQuery = "INSERT INTO Employee VALUES (?, ?, ?, ?, ?)";
        const values = [Employee_id, Employee_name, Phone_no, Email, Address];
        console.log(values);

        db.query(insertQuery, values, (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Employee has been created.");
        });
    });
};

export const fetch_employees = (req: Request, res: Response) => {
    const get_employees = 'SELECT * from Employee';
    db.query(get_employees, [], (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

export const delete_employee = (req: CustomRequest<{}>, res: Response) => {
    const del_employee = 'DELETE FROM Employee WHERE Employee_id = ?';
    const employee_id = parseInt(req.params.id);
    db.query(del_employee, [employee_id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json("Employee Deleted Successfully.");
    });
};
