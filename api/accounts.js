// api/accounts.js
import { query } from '../lib/db.js';
export default async function handler(req, res) {
 try {
   const { rows } = await query(
     'SELECT ig_user_id, username, created_at FROM accounts ORDER BY created_at DESC'
   );
   res.status(200).json(rows);
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
}
