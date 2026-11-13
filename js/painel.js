import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js';
import { conectar } from './firebase.js';
import { mensagem, explicar } from './ui.js';
try {
  const { auth, db } = conectar();
  onAuthStateChanged(auth, async user => {
    if (!user) { location.replace('index.html'); return; }
    document.querySelector('#conteudo').hidden = false;
    document.querySelector('#email').textContent = user.email;
    document.querySelector('#saudacao').textContent = 'Olá, ' + (user.displayName || 'usuário') + '!';
    try {
      const referencia = doc(db, 'usuarios', user.uid);
      let perfil = await getDoc(referencia);
      // Uma falha na criação do perfil não exige cadastrar a conta novamente.
      if (!perfil.exists()) {
        await setDoc(referencia, {
          nome: user.displayName || 'Usuário',
          criadoEm: serverTimestamp(), atualizadoEm: serverTimestamp()
        });
        perfil = await getDoc(referencia);
      }
      if (auth.currentUser?.uid !== user.uid) return;
      document.querySelector('#saudacao').textContent = 'Olá, ' + perfil.data().nome + '!';
      mensagem('Sessão ativa. Perfil carregado.');
    } catch (erro) { mensagem('Login concluído, mas o perfil não carregou. ' + explicar(erro) + ' Corrija e recarregue esta página.', true); }
  }, erro => mensagem(explicar(erro), true));
  document.querySelector('#sair').addEventListener('click', async () => {
    try { await signOut(auth); } catch (erro) { mensagem(explicar(erro), true); }
  });
} catch (erro) { mensagem(explicar(erro), true); }
