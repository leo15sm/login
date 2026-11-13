// Controla os botões sem depender do Firebase.
document.querySelectorAll(".alternar-senha").forEach((botao) => {
  const campoId = botao.getAttribute("aria-controls");
  const campo = document.getElementById(campoId);

  if (!campo) {
    return;
  }

  const descricao =
    campoId === "confirmacao"
      ? "confirmação de senha"
      : "senha";

  function atualizarBotao() {
    const visivel = campo.type === "text";
    const texto = `${visivel ? "Ocultar" : "Mostrar"} ${descricao}`;

    botao.setAttribute("aria-pressed", String(visivel));
    botao.setAttribute("aria-label", texto);
    botao.title = texto;
  }

  botao.hidden = false;
  atualizarBotao();

  botao.addEventListener("click", () => {
    campo.type = campo.type === "password" ? "text" : "password";
    atualizarBotao();
  });
});