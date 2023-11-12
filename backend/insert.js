import db from "./db.js"
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);
const Admin_ID = "admin"

const q = "INSERT INTO Admin VALUES (?)"
const v = [
    Admin_ID,
    hash
]
console.log(v)
db.query(q, [v], (err, data) => {
    if(err) return console.log(err)
    return console.log("Admin Added.");
})