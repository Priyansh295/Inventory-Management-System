import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "", // Username
    password: "", // Your Password
    database: "inventory_db",
});

export default db;
