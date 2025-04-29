auth.onAuthStateChanged(user => {
  if (!user) window.location.href = 'login.html';
});
document.getElementById('upload-btn').addEventListener('click', async () => {
  const file = document.getElementById('file-upload').files[0];
  const title = document.getElementById('judul').value;
  if (!file || !title) { alert('Isi semua field!'); return; }
  const storageRef = storage.ref('modul/' + file.name);
  await storageRef.put(file);
  const url = await storageRef.getDownloadURL();
  await db.collection('moduls').add({ title, url, downloadCount: 0 });
  alert('Upload berhasil!');
  location.reload();
});
db.collection('moduls').onSnapshot(snapshot => {
  const modulGrid = document.getElementById('modul-grid');
  modulGrid.innerHTML = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `<h3>${data.title}</h3><iframe src="${data.url}" width="200" height="200"></iframe><br/><button onclick="downloadModul('${doc.id}')">Download</button><p>Download: ${data.downloadCount} kali</p>`;
    modulGrid.appendChild(div);
  });
});
async function downloadModul(id) {
  const docRef = db.collection('moduls').doc(id);
  const docSnap = await docRef.get();
  const data = docSnap.data();
  const a = document.createElement('a');
  a.href = data.url;
  a.download = data.title;
  a.click();
  await docRef.update({ downloadCount: firebase.firestore.FieldValue.increment(1) });
}