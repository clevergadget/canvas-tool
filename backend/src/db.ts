import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'canvasser',
  password: process.env.DB_PASSWORD || 'canvasserpass',
  database: process.env.DB_NAME || 'canvassing',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})
