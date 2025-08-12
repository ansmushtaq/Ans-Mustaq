// api/accounts/[ig_user_id]/diffs.js
import { query } from '../../../lib/db.js';
export default async function handler(req, res) {
 const { ig_user_id } = req.query;
 const limit = parseInt(req.query.limit) || 10;
 try {
   const { rows } = await query(
     'SELECT added, removed, created_at FROM diffs WHERE ig_user_id=$1 ORDER BY created_at DESC LIMIT $2',
     [ig_user_id, limit]
   );
   res.status(200).json(rows);
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
}
