import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gay@2003SQL",
    database: "inventory_db",
});

export default db;
