// lib/instagram.js
import fetch from 'node-fetch';
const GRAPH_BASE = 'https://graph.facebook.com/v21.0';
export async function fetchFollowers(igUserId, accessToken) {
 const url = `${GRAPH_BASE}/${igUserId}/followers?fields=id,username&access_token=${accessToken}`;
 const resp = await fetch(url);
 if (!resp.ok) {
   throw new Error(`Instagram API error: ${resp.status} ${await resp.text()}`);
 }
 const data = await resp.json();
 return data.data || [];
}
