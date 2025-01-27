import mysql from 'mysql2/promise';
import 'dotenv/config';

// Connect to MySQL database
 export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});