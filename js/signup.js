import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

// Handle Sign-Up Form Submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign Up Successful! Redirecting to login page...");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error during sign-up:", error);
        alert(error.message);
    }
});
