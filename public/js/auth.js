// js/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "./firebase-config.js";

// Inisialisasi Auth dan Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ==================
// FUNGSI REGISTRASI
// ==================
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      // Membuat akun baru di Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Menyimpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: "guru",        // default role "guru"
        status: "pending"    // harus di-ACC superadmin dulu untuk bisa upload
      });

      alert("Pendaftaran berhasil! Anda bisa login sekarang.");
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error saat mendaftar:", error.message);
      alert("Gagal mendaftar: " + error.message);
    }
  });
}

// ==================
// FUNGSI LOGIN
// ==================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      // Login ke Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ambil data user dari Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("Data akun tidak ditemukan!");
      }

      const userData = userDoc.data();

      // Cek role user
      if (userData.role === "superadmin") {
        alert("Login sebagai SuperAdmin berhasil!");
        window.location.href = "dashboard.html";
      } else if (userData.role === "guru") {
        alert("Login sebagai Guru berhasil!");
        window.location.href = "upload.html";
      } else {
        throw new Error("Role pengguna tidak dikenal!");
      }
    } catch (error) {
      console.error("Error saat login:", error.message);
      alert("Gagal login: " + error.message);
    }
  });
}
