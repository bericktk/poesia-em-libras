document.addEventListener("DOMContentLoaded", function () {
  // --- SEÇÃO 1: LÓGICA DO HEADER E NAVEGAÇÃO ---
  const logoLink = document.querySelector(".logo");
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const menuHamburguer = document.getElementById("menu-hamburguer");
  const menuNavegacao = document.getElementById("menu-navegacao");

  menuHamburguer.addEventListener("click", () => {
    menuHamburguer.classList.toggle("ativo");
    menuNavegacao.classList.toggle("ativo");
  });

  menuNavegacao.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      menuHamburguer.classList.remove("ativo");
      menuNavegacao.classList.remove("ativo");
    }
  });

  const cabecalho = document.querySelector(".cabecalho");
  const gatilhoRolagem = 10;
  window.addEventListener("scroll", () => {
    if (window.scrollY > gatilhoRolagem) {
      cabecalho.classList.add("rolagem");
    } else {
      cabecalho.classList.remove("rolagem");
    }
  });
});
