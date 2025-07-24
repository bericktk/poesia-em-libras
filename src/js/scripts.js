// Importando a chave da API e o ID da playlist
import { chaveApi, idPlaylist } from "./chave-api.js";

/**
 * Embaralha os elementos de um array usando o algoritmo de Fisher-Yates.
 * @param {Array} array O array a ser embaralhado.
 */
function embaralharArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

// Lista de imagens para o fundo dos vídeos
const backgroundImages = [
  "./src/images/background-projetos/1.png",
  "./src/images/background-projetos/2.png",
  "./src/images/background-projetos/3.png",
  "./src/images/background-projetos/4.png",
  "./src/images/background-projetos/5.png",
];

embaralharArray(backgroundImages);

document.addEventListener("DOMContentLoaded", function () {
  // --- SEÇÃO 1: LÓGICA DO HEADER E NAVEGAÇÃO ---

  // Rolar suavemente até o topo ao clicar no logo
  const logoLink = document.querySelector(".logo");
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Alternar o menu hamburguer
  const menuHamburguer = document.getElementById("menu-hamburguer");
  const menuNavegacao = document.getElementById("menu-navegacao");

  menuHamburguer.addEventListener("click", () => {
    menuHamburguer.classList.toggle("ativo");
    menuNavegacao.classList.toggle("ativo");
  });

  // Fechar o menu ao clicar em um link
  menuNavegacao.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      menuHamburguer.classList.remove("ativo");
      menuNavegacao.classList.remove("ativo");
    }
  });

  // Mudar o fundo do header ao rolar a página
  const cabecalho = document.querySelector(".cabecalho");
  const gatilhoRolagem = 10;
  window.addEventListener("scroll", () => {
    if (window.scrollY > gatilhoRolagem) {
      cabecalho.classList.add("rolagem");
    } else {
      cabecalho.classList.remove("rolagem");
    }
  });

  // LÓGICA PARA CARREGAR VÍDEOS DA PLAYLIST

  const apiKey = chaveApi;
  const playlistId = idPlaylist;
  const maxResults = 5;
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;
  const playlistContainer = document.getElementById("playlist-container");

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.items && data.items.length > 0) {
        data.items.forEach((item, index) => {
          const snippet = item.snippet;
          const videoId = snippet.resourceId.videoId;
          const title = snippet.title;

          if (
            title.toLowerCase().includes("private video") ||
            title.toLowerCase().includes("deleted video")
          ) {
            return;
          }

          const videoContainer = document.createElement("div");
          videoContainer.className = "video-container";

          const imagemDoFundo =
            backgroundImages[index % backgroundImages.length];
          videoContainer.style.backgroundImage = `url('${imagemDoFundo}')`;

          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
          iframe.title = title;
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          );
          iframe.setAttribute("allowfullscreen", "");

          const videoInfo = document.createElement("div");
          videoInfo.className = "video-info";
          const videoTitle = document.createElement("h3");
          videoTitle.textContent = title;
          videoInfo.appendChild(videoTitle);

          videoContainer.appendChild(iframe);
          videoContainer.appendChild(videoInfo);
          playlistContainer.appendChild(videoContainer);
        });
      } else {
        playlistContainer.innerHTML =
          "<p>Não foi possível carregar os vídeos ou a playlist está vazia.</p>";
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar vídeos da playlist:", error);
      playlistContainer.innerHTML =
        "<p>Ocorreu um erro ao carregar os vídeos. Verifique o console para mais detalhes.</p>";
    });
});
