import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./firebase-config.js";

const db = getFirestore(app);
const storage = getStorage(app);

const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const judul = document.getElementById('judul').value;
  const file = document.getElementById('pdfFile').files[0];
  const youtubeLink = document.getElementById('youtubeLink').value || null;

  try {
    const storageRef = ref(storage, `moduls/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, "moduls"), {
      judul: judul,
      fileURL: fileURL,
      youtubeLink: youtubeLink,
      createdAt: serverTimestamp(),
      downloads: 0
    });

    alert("Modul berhasil diupload!");
    uploadForm.reset();
  } catch (error) {
    console.error(error.message);
    alert("Gagal upload modul: " + error.message);
  }
});
