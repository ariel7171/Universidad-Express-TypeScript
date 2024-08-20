// src/database/conexion.ts
import mysql from 'mysql2/promise';

export const conexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'universidad',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
