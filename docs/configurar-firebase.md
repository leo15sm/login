# Configuração do Firebase — passo a passo

## 1. Criar o projeto
Acesse https://console.firebase.google.com/ e clique em criar projeto. Nome: login. O ID será único e pode receber um sufixo. Google Analytics é opcional e pode ficar desativado. Mantenha o plano Spark; não é necessário ativar faturamento para esta base.

## 2. Registrar aplicativo Web
Na visão geral, selecione o ícone Web (</>) ou Adicionar aplicativo > Web. Apelido: login-web. Registre o aplicativo. Não precisa configurar Hosting agora.
Copie apenas o objeto firebaseConfig exibido pelo console para js/firebase-config.js, substituindo todos os valores PREENCHER. Preserve o `export const firebaseConfig =` existente. Não duplique os imports initializeApp: estão em js/firebase.js. measurementId é dispensável aqui.
A configuração Web identifica o projeto e pode aparecer no navegador. Não use chave privada, conta de serviço ou Firebase Admin SDK neste código.

## 3. Ativar login
Abra Authentication > Começar/Get started > Método de login/Sign-in method. Ative E-mail/senha e salve. Link de e-mail sem senha não é necessário.
Em Configurações > Política de senha, configure pelo menos 8 caracteres. O formulário também exige 8; requisitos extras definidos no console serão aplicados pelo Firebase.
Em Configurações > Domínios autorizados, confira localhost e adicione se faltar (projetos recentes podem não incluí-lo). Use http://localhost:5500 nos testes. Se usar 127.0.0.1, autorize também esse host, sem porta ou protocolo. Depois confira o domínio publicado.

## 4. Criar o banco
Abra Firestore Database > Criar banco de dados. Use a edição Standard, o banco (default) e uma localização próxima dos usuários; confira a disponibilidade e a escolha antes de confirmar. A localização não é alterável depois. Escolha modo produção para não começar com acesso público.
Na aba Regras, substitua o conteúdo pelo arquivo firestore.rules e clique em Publicar. Não precisa criar usuarios manualmente: o painel cria o documento com o UID da conta autenticada.

## 5. Executar no VS Code
Extraia o ZIP: a pasta raiz deve se chamar login. Abra-a no VS Code. Use Live Server e abra index.html (confira localhost na URL), ou `python -m http.server 5500` no terminal da pasta e acesse http://localhost:5500.
Cadastre uma conta de teste. No Authentication > Usuários, confira a conta. No Firestore > Dados, confira usuarios/{uid} com nome, criadoEm e atualizadoEm. Nunca haverá senha nesse documento.

## 6. Validar
- Cadastrar e chegar ao painel.
- Sair e tentar abrir painel.html: deve voltar ao login.
- Entrar com a conta criada; testar senha errada.
- Testar confirmação de senha diferente e cadastro repetido.
- Recuperar senha com um e-mail que você controla; verificar spam e concluir a troca no link do Firebase.
- Conferir no simulador de regras que um usuário não lê o perfil de outro e que acesso sem autenticação é negado. A listagem da coleção também é negada.
- Com falha de perfil, corrigir regras/conexão e recarregar o painel; não cadastrar novamente a mesma conta.

## Diagnóstico
PREENCHER: configuração local incompleta.
auth/operation-not-allowed: habilite E-mail/senha.
auth/invalid-api-key: confira o objeto copiado e o projeto.
auth/unauthorized-domain: confira domínios autorizados.
permission-denied: publique firestore.rules no mesmo projeto da configuração.
Login funciona e perfil falha: confira Firestore (default), regras e conexão.

## Referências oficiais
https://firebase.google.com/docs/web/setup
https://firebase.google.com/docs/auth/web/password-auth
https://firebase.google.com/docs/auth/web/manage-users
https://firebase.google.com/docs/firestore/security/get-started
https://firebase.google.com/docs/hosting/quickstart
