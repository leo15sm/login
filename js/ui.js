export function mensagem(texto, erro = false) {
  const elemento = document.querySelector('#mensagem');
  elemento.textContent = texto;
  elemento.classList.toggle('erro', erro);
}
export function explicar(erro) {
  const erros = {
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/invalid-email': 'Confira o formato do e-mail.',
    'auth/email-already-in-use': 'Não foi possível cadastrar. Tente entrar ou recuperar a senha.',
    'auth/weak-password': 'A senha não atende à política do projeto.',
    'auth/password-does-not-meet-requirements': 'A senha não atende à política do projeto.',
    'auth/operation-not-allowed': 'Ative E-mail/senha no Authentication do Firebase.',
    'auth/unauthorized-domain': 'Adicione este domínio aos domínios autorizados do Authentication.',
    'auth/network-request-failed': 'Confira sua conexão com a internet.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde antes de tentar novamente.',
    'permission-denied': 'Confira se as regras do Firestore foram publicadas.',
    'unavailable': 'O banco está indisponível. Confira a conexão e a criação do Firestore.'
  };
  return erros[erro.code] || (erro.code ? 'Não foi possível concluir. Código: ' + erro.code : erro.message);
}
export function formulario(acao) {
  document.querySelector('form').addEventListener('submit', async evento => {
    evento.preventDefault();
    const botao = evento.currentTarget.querySelector('button');
    botao.disabled = true;
    mensagem('Aguarde…');
    try { await acao(new FormData(evento.currentTarget)); }
    catch (erro) { mensagem(explicar(erro), true); }
    finally { botao.disabled = false; }
  });
}
