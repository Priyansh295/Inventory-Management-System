import express from "express";
import db from "./db.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Backend Server");
});

router.get("/products", (req, res) => {
    const query = "SELECT * FROM Product";
    db.query(query, (err, data) => {
        if (err)
            return res.send(err);
        res.send(data);
    });
});

router.get("/orders", (req, res) => {
    const query = "SELECT * FROM Orders";
    db.query(query, (err, data) => {
        if (err)
            return res.send(err);
        res.send(data);
    });
});

router.get("/parts", (req, res) => {
    const query = "SELECT * FROM parts";
    db.query(query, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});

router.post("/products", (req, res) => {
    const query = "INSERT INTO product VALUES (?)";
    const values = [
        req.body.Product_ID,
        req.body.Product_Name,
        req.body.Product_Description,
        req.body.Category,
        req.body.Price,
        req.body.Image
    ];

    db.query(query, [values], (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});

export default router;
