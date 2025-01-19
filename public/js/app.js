import { auth } from './firebase.js';
import { 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';

// Referências para elementos das telas
const mainScreen = document.getElementById("mainScreen");
const loginScreen = document.getElementById("loginScreen");
const registerScreen = document.getElementById("registerScreen");
const recoverScreen = document.getElementById("recoverScreen");
const changeScreen = document.getElementById("changeScreen");

// Botões e links para navegação
const goToRegister = document.getElementById("goToRegister");
const goToRecover = document.getElementById("goToRecover");
const backToLoginFromRegister = document.getElementById("backToLoginFromRegister");
const backToLoginFromRecover = document.getElementById("backToLoginFromRecover");

// Função para alternar telas
function showScreen(screenToShow) {
  // Esconde todas as telas
  loginScreen.classList.add("hidden");
  registerScreen.classList.add("hidden");
  recoverScreen.classList.add("hidden");
  changeScreen.classList.add("hidden");
  mainScreen.classList.add("hidden");

  // Mostra a tela solicitada
  screenToShow.classList.remove("hidden");
}

// Eventos para alternância de telas
goToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  showScreen(registerScreen);
});

goToRecover.addEventListener("click", (e) => {
  e.preventDefault();
  showScreen(recoverScreen);
});

backToLoginFromRegister.addEventListener("click", (e) => {
  e.preventDefault();
  showScreen(loginScreen);
});

backToLoginFromRecover.addEventListener("click", (e) => {
  e.preventDefault();
  showScreen(loginScreen);
});


/// Função de login
function loginUser(email, password, manterConectado) {
   // Verifica a persistência desejada
   const persistencia = manterConectado ? browserLocalPersistence : browserSessionPersistence;

   // Define a persistência da autenticação
   setPersistence(auth, persistencia)
     .then(() => {
       return   signInWithEmailAndPassword(auth, email, password)
     })
    .then((userCredential) => {
      // Usuário logado com sucesso
      const user = userCredential.user;
      console.log("Login bem-sucedido: ", user);

      // Aqui você pode redirecionar o usuário ou mostrar a tela principal
      showScreen(mainScreen); // ou outra tela conforme seu fluxo
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("loginError").textContent = "Erro: " + errorMessage;
    });
}

// Submeter o formulário de login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;
  loginUser(email, password);
});

// Função de cadastro
function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuário criado com sucesso
      const user = userCredential.user;
      console.log("Cadastro bem-sucedido: ", user);
      
      // Exibe a mensagem de sucesso
      const successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'block'; // Exibe a mensagem
      // Aguarda 3 segundos antes de redirecionar para o login
      setTimeout(() => {
        // Oculta a mensagem de sucesso
        successMessage.style.display = 'none';

        // Redireciona para a tela de login (ou qualquer outra função de navegação)
        showScreen(loginScreen); 
      }, 3000); // 3 segundos de delay para o usuário ver a mensagem
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("registerError").textContent = "Erro: " + errorMessage;
    });
}

// Submeter o formulário de cadastro
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;

  // Verificar se a senha tem pelo menos 6 caracteres
  if (password.length < 6) {
    document.getElementById("registerError").textContent = "A senha precisa ter pelo menos 6 caracteres";
    return;
  }

  registerUser(email, password);
});

// Função de recuperação de senha
function recoverPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Link de recuperação de senha enviado");
      // Informar o usuário ou redirecionar para outra tela
      document.getElementById("recoverError").textContent = "Verifique seu email!";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("recoverError").textContent = "Erro: " + errorMessage;
    });
}

// Submeter o formulário de recuperação de senha
document.getElementById("recoverForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailRecover").value;
  recoverPassword(email);
});

// Função de Alteração de Senha
// Função para reautenticar o usuário
function reauthenticateUser(email, password) {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(email, password);

  return reauthenticateWithCredential(user, credential);
}

// Função para alterar a senha
function changePassword(email, newPassword, currentPassword) {
  reauthenticateUser(email, currentPassword)
    .then(() => {
      const user = auth.currentUser;
      updatePassword(user, newPassword)
        .then(() => {
          console.log("Senha alterada com sucesso");
          // Redirecionar para o login ou mostrar mensagem de sucesso
          showScreen(loginScreen);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          document.getElementById("changePasswordError").textContent = "Erro ao alterar senha: " + errorMessage;
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("changePasswordError").textContent = "Erro ao reautenticar: " + errorMessage;
    });
}

// Submeter o formulário de alteração de senha
document.getElementById("changePasswordForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailChange").value;
  const currentPassword = document.getElementById("currentPassword").value; // Campo para senha atual
  const newPassword = document.getElementById("newPassword").value;

  // Verificar se a nova senha tem pelo menos 6 caracteres
  if (newPassword.length < 6) {
    document.getElementById("changePasswordError").textContent = "A nova senha precisa ter pelo menos 6 caracteres";
    return;
  }

  changePassword(email, newPassword, currentPassword);
});

// Verificar se o usuário já está autenticado ao carregar a página
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário autenticado:", user);
    // Redirecionar para a tela principal ou outra página
    showScreen(mainScreen); // Ou a tela desejada
  } else {
    console.log("Usuário não autenticado");
    showScreen(loginScreen); // Exibe a tela de login caso não esteja autenticado
  }
});

// Função para logout
function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("Usuário deslogado com sucesso");
      // Redireciona para a tela de login após o logout
      showScreen(loginScreen);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Erro ao deslogar: ", errorMessage);
    });
}

// Adicionar evento de clique no botão de logout
document.getElementById("logoutButton").addEventListener("click", (e) => {
  e.preventDefault();
  logoutUser();
});