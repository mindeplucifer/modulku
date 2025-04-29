import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("login-btn").addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            lastLogin: new Date()
        });

        document.getElementById("login-container").style.display = "none";
        document.getElementById("dashboard-container").style.display = "block";

        loadActivityLog();  // Load activity log for the user
    } catch (error) {
        console.error("Error during login", error);
    }
});

document.getElementById("logout-btn").addEventListener("click", async () => {
    try {
        await signOut(auth);
        document.getElementById("login-container").style.display = "block";
        document.getElementById("dashboard-container").style.display = "none";
    } catch (error) {
        console.error("Error during logout", error);
    }
});

async function loadActivityLog() {
    const activityLogRef = collection(db, "activity_logs");
    const querySnapshot = await getDocs(activityLogRef);
    const activityContainer = document.getElementById("activity-log");

    querySnapshot.forEach(doc => {
        const log = doc.data();
        const logElement = document.createElement("div");
        logElement.textContent = `${log.timestamp.toDate()} - ${log.user} - ${log.activity}`;
        activityContainer.appendChild(logElement);
    });
}
