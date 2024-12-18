import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

// A configuração do Firebase no seu projeto
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

export { auth };
