// api/accounts/[ig_user_id]/status.js
import { query } from '../../../lib/db.js';
export default async function handler(req, res) {
 const { ig_user_id } = req.query;
 try {
   const lastSnap = await query(
     'SELECT created_at FROM snapshots WHERE ig_user_id=$1 ORDER BY created_at DESC LIMIT 1',
     [ig_user_id]
   );
   const lastDiff = await query(
     'SELECT created_at FROM diffs WHERE ig_user_id=$1 ORDER BY created_at DESC LIMIT 1',
     [ig_user_id]
   );
   res.status(200).json({
     last_snapshot: lastSnap.rows[0]?.created_at || null,
     last_diff: lastDiff.rows[0]?.created_at || null,
   });
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
}
