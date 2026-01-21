import mysql from "mysql2"
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USERNAME}`,
    database: `${process.env.DB_DATABASE}`,
    password: ``,
})
 const promise = pool.promise();
export default promise;