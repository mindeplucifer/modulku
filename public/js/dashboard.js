auth.onAuthStateChanged(async user => {
  if (!user) window.location.href = 'login.html';
  const userDoc = await db.collection('users').doc(user.uid).get();
  if (!userDoc.exists || userDoc.data().role !== 'superadmin') {
    alert('Akses hanya untuk SuperAdmin!');
    window.location.href = 'index.html';
  }
});
const visitorCount = document.getElementById('visitor-count');
db.collection('stats').doc('visitors').onSnapshot(doc => {
  visitorCount.innerText = doc.data().today + ' pengunjung hari ini';
});
db.collection('users').onSnapshot(snapshot => {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `${data.name} (${data.email}) - Status: ${data.status} <button onclick="accUser('${doc.id}')">ACC</button> <button onclick="revokeUser('${doc.id}')">Revoke</button>`;
    userList.appendChild(div);
  });
});
function accUser(id) { db.collection('users').doc(id).update({ status: 'active' }); }
function revokeUser(id) { db.collection('users').doc(id).update({ status: 'revoked' }); }