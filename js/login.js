import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js';
import { conectar } from './firebase.js';
import { formulario } from './ui.js';
formulario(async dados => {
  const { auth } = conectar();
  await signInWithEmailAndPassword(auth, dados.get('email').trim(), dados.get('senha'));
  location.replace('painel.html');
});
