import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebase-config.js";

// Inisialisasi Firestore
const db = getFirestore(app);

// Ambil data modul dari Firestore dan tampilkan di halaman
async function fetchModuls() {
  const modulList = document.getElementById("modul-list");

  try {
    const querySnapshot = await getDocs(collection(db, "modul"));
    querySnapshot.forEach((doc) => {
      const modulData = doc.data();
      const modulElement = document.createElement("div");
      modulElement.classList.add("modul");

      modulElement.innerHTML = `
        <h3>${modulData.title}</h3>
        <p>${modulData.description}</p>
        <a href="${modulData.pdfUrl}" target="_blank">Download PDF</a>
        <p>Jumlah Download: ${modulData.downloadCount || 0}</p>
      `;
      modulList.appendChild(modulElement);
    });
  } catch (error) {
    console.error("Error fetching modules:
