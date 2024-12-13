import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBz3JYnfIJs71FTWmm7vPa1AbEwY2AAuHE",
    authDomain: "fir-todo1-aa831.firebaseapp.com",
    projectId: "fir-todo1-aa831",
    storageBucket: "fir-todo1-aa831.firebasestorage.app",
    messagingSenderId: "1017249767982",
    appId: "1:1017249767982:web:1f8c3f7b4546997b5d75bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle Login Form Submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful! Redirecting to your To-Do list...");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error during login:", error);
        alert(error.message);
    }
});
