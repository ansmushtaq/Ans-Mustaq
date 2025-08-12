// lib/diff.js
export function computeDiff(oldList, newList) {
 const oldSet = new Set(oldList.map(u => u.id));
 const newSet = new Set(newList.map(u => u.id));
 const added = newList.filter(u => !oldSet.has(u.id));
 const removed = oldList.filter(u => !newSet.has(u.id));
 return { added, removed };
}
