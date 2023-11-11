import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "inventory_db",
});

export default db;
