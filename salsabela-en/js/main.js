
// main.js - small helpers
function fetchJSON(path){ return fetch(path).then(r=>{ if(!r.ok) throw new Error('Not found'); return r.json(); }).catch(()=>null); }
