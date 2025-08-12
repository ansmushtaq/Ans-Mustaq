// api/accounts/[ig_user_id]/not_following_back.js
import { query } from '../../../lib/db.js';
export default async function handler(req, res) {
 const { ig_user_id } = req.query;
 try {
   const { rows } = await query(
     'SELECT followers FROM snapshots WHERE ig_user_id=$1 ORDER BY created_at DESC LIMIT 1',
     [ig_user_id]
   );
   if (!rows.length) {
     return res.status(404).json({ error: 'No snapshot found' });
   }
   // This assumes we can also fetch who the account is following (not in basic API)
   // In practice, you’ll need both lists to compute mutual follows
   const followers = rows[0].followers || [];
   res.status(200).json({
     note: 'Following data not available in Graph API — needs extended permissions',
     followers_count: followers.length,
   });
 } catch (err) {
   res.status(500).json({ error: err.message });
 }
}
