import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "./firebase-config.js";

const db = getFirestore(app);
const auth = getAuth(app);

async function displayModules() {
  const modulesRef = collection(db, "modules");
  const querySnapshot = await getDocs(modulesRef);

  const moduleList = document.getElementById("moduleList");
  moduleList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const module = doc.data();
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module-item");

    let downloadLink = module.url;

    if (module.type === "pdf") {
      downloadLink = `<a href="${module.url}" target="_blank">Lihat Modul (PDF)</a>`;
    } else if (module.type === "youtube") {
      downloadLink = `<a href="${module.url}" target="_blank">Tonton Video</a>`;
    }

    moduleDiv.innerHTML = `
      <h3>${module.name}</h3>
      ${downloadLink}
      <p>Di-upload oleh: ${module.uploadedBy}</p>
      <p>Jumlah download: ${module.downloadCount}</p>
    `;
    
    // Cek jika pengguna sudah login untuk menampilkan tombol download
    if (auth.currentUser) {
      const downloadButton = document.createElement("button");
      downloadButton.textContent = "Download";
      downloadButton.addEventListener("click", () => downloadModule(doc.id));
      moduleDiv.appendChild(downloadButton);
    }

    moduleList.appendChild(moduleDiv);
  });
}

// Fungsi untuk mendownload modul
async function downloadModule(moduleId) {
  const moduleRef = collection(db, "modules").doc(moduleId);
  const moduleSnapshot = await moduleRef.get();
  
  const module = moduleSnapshot.data();
  moduleRef.update({
    downloadCount: module.downloadCount + 1,  // Increment jumlah download
  });

  alert("Modul sedang didownload...");
}

// Jalankan untuk menampilkan modul-modul
displayModules();
