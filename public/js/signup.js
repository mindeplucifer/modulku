import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);

async function signup() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const name = document.getElementById("nameInput").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user.email);

    // Simpan data guru di Firestore dengan status "pending"
    const userDocRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      status: "pending",  // Status masih pending
    });

    alert("Pendaftaran berhasil, tunggu persetujuan dari SuperAdmin.");
    window.location.href = "login.html";  // Redirect ke halaman login
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert("Pendaftaran gagal, periksa email dan password Anda.");
  }
}

// Bind tombol signup ke fungsi
document.getElementById("signupButton").addEventListener("click", signup);
