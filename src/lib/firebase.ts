import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjddZcjZInsDnCNcNbRb5_RQGZXxy8Mb8",
  authDomain: "unilink-1741c.firebaseapp.com",
  projectId: "unilink-1741c",
  storageBucket: "unilink-1741c.firebasestorage.app",
  messagingSenderId: "485141498802",
  appId: "1:485141498802:web:40878c8b1a92550686f2ab",
  measurementId: "G-8PVV8HMQHZ"
};

// Initialize Firebase for SSR and client-side
// This prevents re-initialization during hot-reloads in development
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);

export { db };
