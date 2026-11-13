import { createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js';
import { conectar } from './firebase.js';
import { formulario, mensagem } from './ui.js';
formulario(async dados => {
  const nome = dados.get('nome').trim();
  if (nome.length < 2) throw new Error('Informe um nome com pelo menos 2 caracteres.');
  if (dados.get('senha') !== dados.get('confirmacao')) throw new Error('As senhas não coincidem.');
  const { auth } = conectar();
  const { user } = await createUserWithEmailAndPassword(auth, dados.get('email').trim(), dados.get('senha'));
  try { await updateProfile(user, { displayName: nome }); }
  catch { mensagem('Conta criada. Você poderá completar o nome no painel.'); }
  location.replace('painel.html');
});
