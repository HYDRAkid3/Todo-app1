// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";

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
const db = getFirestore(app);

// DOM Elements
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const logoutButton = document.getElementById('logout');

// Add a new to-do
addTodoButton.addEventListener('click', async () => {
    const task = todoInput.value.trim();
    if (task) {
        try {
            await addDoc(collection(db, 'todos'), {
                task,
                userId: auth.currentUser.uid,
                createdAt: new Date(),
            });
            todoInput.value = '';
        } catch (error) {
            console.error("Error adding task: ", error);
        }
    }
});

// Render to-do list
const renderTodos = () => {
    const q = query(
        collection(db, 'todos'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt')
    );

    onSnapshot(q, (snapshot) => {
        todoList.innerHTML = '';
        snapshot.forEach((todoDoc) => {
            const todoItem = document.createElement('li');
            todoItem.textContent = todoDoc.data().task;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                try {
                    await deleteDoc(doc(db, 'todos', todoDoc.id));
                } catch (error) {
                    console.error("Error deleting task: ", error);
                }
            });

            todoItem.appendChild(deleteButton);
            todoList.appendChild(todoItem);
        });
    });
};

// Logout
logoutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        console.error("Error signing out: ", error);
    }
});

// Authentication state listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        renderTodos();
    } else {
        window.location.href = 'login.html';
    }
});
