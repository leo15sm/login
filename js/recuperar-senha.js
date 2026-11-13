import { sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js';
import { conectar } from './firebase.js';
import { formulario, mensagem } from './ui.js';
formulario(async dados => {
  const { auth } = conectar();
  try { await sendPasswordResetEmail(auth, dados.get('email').trim()); }
  catch (erro) { if (erro.code !== 'auth/user-not-found') throw erro; }
  mensagem('Se houver uma conta com esse e-mail, você receberá as instruções. Confira também o spam.');
});
