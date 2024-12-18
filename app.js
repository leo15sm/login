import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBeYrRq60dDQJC3mK7BfvNJXKjfujkIrXw",
  authDomain: "login-leosm15.firebaseapp.com",
  projectId: "login-leosm15",
  storageBucket: "login-leosm15.firebasestorage.app",
  messagingSenderId: "812206259769",
  appId: "1:812206259769:web:68e319a4abb557f12257e8",
  measurementId: "G-1Z4DP8SKBQ"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorDisplay = document.getElementById('error');

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login realizado com sucesso!");
  } catch (error) {
    errorDisplay.textContent = "Erro: " + error.message;
  }
});
