// lib/db.js
import pkg from 'pg';
const { Pool } = pkg;
if (!process.env.PG_CONNECTION_STRING) {
 throw new Error('Missing PG_CONNECTION_STRING env var');
}
export const pool = new Pool({
 connectionString: process.env.PG_CONNECTION_STRING,
 ssl: { rejectUnauthorized: false },
});
export async function query(text, params) {
 const res = await pool.query(text, params);
 return res;
}
