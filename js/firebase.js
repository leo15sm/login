import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.3.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
export function conectar() {
  if (Object.values(firebaseConfig).some(value => !value || value === 'PREENCHER')) {
    throw new Error('Preencha js/firebase-config.js com a configuração Web do Firebase.');
  }
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'pt-BR';
  return { auth, db: getFirestore(app) };
}
