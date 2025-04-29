import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase-config.js"; // Ini pakai default export

const db = getFirestore(app);
const auth = getAuth(app);

async function writeData() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Mindep Lucy",
      email: "mindep@lucyhell.com"
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function readData() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

async function loginUser() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "mindep@lucyhell.com", "666666");
    console.log("User logged in:", userCredential.user.email);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}

async function main() {
  await writeData();
  await readData();
  await loginUser();
}

main();
