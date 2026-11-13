# login
Base didática HTML/CSS/JavaScript + Firebase Authentication + Firestore.

Comece pelo guia docs/configurar-firebase.md. Nenhum projeto remoto foi criado.
Abra esta pasta no VS Code e sirva por HTTP com Live Server ou execute `python -m http.server 5500` nesta pasta. Acesse http://localhost:5500. Não abra por file://.

Páginas: index.html, cadastro.html, recuperar-senha.html e painel.html.
SDK modular via CDN, versão fixa 13.3.0. Precisa de internet. Sem Node/npm para executar localmente.

Authentication guarda a credencial e o e-mail; usuarios/{uid} guarda nome e timestamps. O perfil é criado no primeiro acesso ao painel, com nova tentativa em acessos posteriores se houver falha. Não existe transação entre Authentication e Firestore. O redirecionamento do painel é apenas navegação: as regras são a proteção dos dados.

Esta etapa não exige confirmação do e-mail e não contém administrador, exclusão de conta ou edição de perfil. Nome pode ser atualizado no console durante os estudos. Autenticação real e regras precisam ser validadas no seu projeto antes da publicação.

Publicação posterior: instale a Firebase CLI conforme documentação oficial; execute `firebase login`, `firebase use --add` para selecionar o projeto e `firebase deploy --only hosting,firestore:rules`. Não execute `firebase init` sobrescrevendo estes arquivos. A raiz servida é esta pasta login; firebase.json exclui documentação e regras da hospedagem.
