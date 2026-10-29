/* Gives the page the same db/user objects it used on Claude, backed by Firebase Firestore. */
(()=>{
  let raw=null;
  try{firebase.initializeApp(window.FIREBASE_CONFIG);raw=firebase.firestore()}catch(e){console.error('Firebase init failed',e)}
  // Teacher accounts: the sign-up code rides along on creation (checked by firestore.rules), then is removed.
  const tacct=p=>{const r=raw.doc(p);return{
    get:()=>r.get(),update:d=>r.update(d),delete:()=>r.delete(),
    set:async d=>{await r.set({...d,tc:window.TCODE||''});await r.update({tc:firebase.firestore.FieldValue.delete()})}}};
  const db=raw&&{collection:c=>raw.collection(c),doc:p=>p.startsWith('tacct/')?tacct(p):raw.doc(p)};
  let uid;try{uid=localStorage.getItem('ca_uid')}catch(e){}
  if(!uid){uid=Math.random().toString(36).slice(2)+Date.now().toString(36);try{localStorage.setItem('ca_uid',uid)}catch(e){}}
  const user={id:async()=>uid,canEdit:async()=>true,can:async()=>true,isOwner:()=>true};
  window.claude={use:async n=>n==='db'?db:n==='user'?user:null};
})();
