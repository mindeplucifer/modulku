// firebase-config.js
import { initializeApp } from "firebase/app";

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

// Export default app (SESUAI DENGAN index.js kamu)
export default app;
