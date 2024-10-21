import db from "./db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface ClientRequest extends Request {
  body: {
    Client_ID: number;
    phone_no: string;
    Email: string;
    password: string;
    Client_Name?: string;
    City?: string;
    Pincode?: string;
    Building?: string;
    Floor_no?: string;
  }
}

interface AdminRequest extends Request {
  body: {
    Admin_ID: number;
    password: string;
  }
}

export const register = (req: ClientRequest, res: Response) => {
    const query = "SELECT * FROM Client WHERE Client_ID = ? OR phone_no = ? OR Email = ?";
    console.log(req.body);

    db.query(query, [req.body.Client_ID, req.body.phone_no, req.body.Email], (err, data) => {
        if(err) return res.json(err);
        if(data.length) {
            return res.status(409).json("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const q = "INSERT INTO Client VALUES (?)";
        const v = [
            req.body.Client_ID,
            req.body.Client_Name,
            req.body.Email,
            req.body.phone_no,
            req.body.City,
            req.body.Pincode,
            req.body.Building,
            req.body.Floor_no,
            hash
        ];

        db.query(q, [v], (err, data) => {
            if(err) return res.json(err);
            return res.status(200).json("User has been created.");
        });
    });
}

export const login_client = (req: ClientRequest, res: Response) => {
    const query = "SELECT * FROM Client WHERE Client_ID = ?";
    db.query(query, [req.body.Client_ID], (err, data) => {
        if (err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].Password_client);
        if(!isPasswordCorrect) return res.status(400).json("Wrong ID or Password");

        const token = jwt.sign({ id: data[0].Client_ID }, process.env.JWT_SECRET || "defaultSecret");
        const { Password_client, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);
    });
}

export const logout_client = (req: Request, res: Response) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
}

export const login_admin = (req: AdminRequest, res: Response) => {
    const query = "SELECT * FROM Admin WHERE Admin_ID = ?";
    db.query(query, [req.body.Admin_ID], (err, data) => {
        if (err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong ID or Password");

        const token = jwt.sign({ id: data[0].Admin_ID }, process.env.JWT_SECRET || "defaultSecret");
        const { password, ...other } = data[0];

        res.cookie("access_token_admin", token, {
            httpOnly: true
        }).status(200).json(other);
    });
}

export const logout_admin = (req: Request, res: Response) => {
    res.clearCookie("access_token_admin", {
        sameSite: "none",
        secure: true
    }).status(200).json("Admin has been logged out.");
}
