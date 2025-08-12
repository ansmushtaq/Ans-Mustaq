// api/snapshot.js
import { query } from '../lib/db.js';
import { fetchFollowers } from '../lib/instagram.js';
import { computeDiff } from '../lib/diff.js';
export default async function handler(req, res) {
 try {
   const { rows: accounts } = await query(
     'SELECT ig_user_id, access_token FROM accounts'
   );
   for (const acc of accounts) {
     const followers = await fetchFollowers(acc.ig_user_id, acc.access_token);
     const { rows: prev } = await query(
       'SELECT followers FROM snapshots WHERE ig_user_id=$1 ORDER BY created_at DESC LIMIT 1',
       [acc.ig_user_id]
     );
     if (prev.length > 0) {
       const diff = computeDiff(prev[0].followers, followers);
       if (diff.added.length || diff.removed.length) {
         await query(
           'INSERT INTO diffs (ig_user_id, added, removed, created_at) VALUES ($1, $2, $3, NOW())',
           [acc.ig_user_id, JSON.stringify(diff.added), JSON.stringify(diff.removed)]
         );
       }
     }
     await query(
       'INSERT INTO snapshots (ig_user_id, followers, created_at) VALUES ($1, $2, NOW())',
       [acc.ig_user_id, JSON.stringify(followers)]
     );
   }
   res.status(200).json({ success: true });
 } catch (err) {
   console.error(err);
   res.status(500).json({ error: err.message });
 }
}
