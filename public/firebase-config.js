// firebase-config.js

// Import library dari CDN Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyCIWiXrgBfRmWFtLTzRacFU61KPY0G3H3o",
  authDomain: "modulku-1596a.firebaseapp.com",
  projectId: "modulku-1596a",
  storageBucket: "modulku-1596a.appspot.com",
  messagingSenderId: "109335930454",
  appId: "1:109335930454:web:1f32eedcc352ea5564bdf7"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// Export supaya bisa dipakai di file lain
export { auth, provider, db, storage };
