// script.js

import { auth, provider, db, storage } from "./firebase-config.js";
import { signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

// Login Google
window.loginGoogle = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Login berhasil! Selamat datang " + result.user.displayName);
      window.location.href = "/modul.html";
    })
    .catch((error) => {
      alert("Login gagal: " + error.message);
    });
};

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    alert("Berhasil logout!");
    window.location.href = "/login.html";
  });
};

// Cek user login
window.checkLogin = function () {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "/login.html";
    }
  });
};

// Upload modul
window.uploadFile = function () {
  const file = document.getElementById('fileInput').files[0];
  if (!file) {
    alert("Pilih file dulu!");
    return;
  }
  const storageRef = ref(storage, 'modulku/' + file.name);
  uploadBytes(storageRef, file).then(() => {
    alert("Upload berhasil!");
    loadModuls();
  }).catch((error) => {
    alert("Upload gagal: " + error.message);
  });
};

// Load semua modul
window.loadModuls = function () {
  const listRef = ref(storage, 'modulku/');
  listAll(listRef).then((res) => {
    const listDiv = document.getElementById('modulList');
    listDiv.innerHTML = "";
    res.items.forEach((itemRef) => {
      getDownloadURL(itemRef).then((url) => {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = itemRef.name;
        link.target = "_blank";
        link.className = "modul-link";
        listDiv.appendChild(link);
        listDiv.appendChild(document.createElement('br'));
      });
    });
  });
};
