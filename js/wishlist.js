(function () {
  const CHAVE_WISHLIST_NO_NAVEGADOR = "beca-wishlist";
  const catalogoDePecas = {
    "1": {
      titulo: "Peça 001",
      imagem: "assets/looks1/WhatsApp Image 2026-05-26 at 21.13.23 (1).jpeg",
      link: "peca.html?look=1"
    },
    "2": {
      titulo: "Peça 002",
      imagem: "assets/looks2/WhatsApp Image 2026-05-26 at 21.13.20.jpeg",
      link: "peca.html?look=2"
    },
    "3": {
      titulo: "Peça 003",
      imagem: "assets/looks3/WhatsApp Image 2026-05-26 at 21.13.19 (1).jpeg",
      link: "peca.html?look=3"
    },
    "4": {
      titulo: "Peça 004",
      imagem: "assets/looks4/WhatsApp Image 2026-05-26 at 21.13.23 (1).jpeg",
      link: "peca.html?look=4"
    },
    "5": {
      titulo: "Peça 005",
      imagem: "assets/looks5/WhatsApp Image 2026-05-26 at 21.13.26 (1).jpeg",
      link: "peca.html?look=5"
    },
    "6": {
      titulo: "Peça 006",
      imagem: "assets/looks6/WhatsApp Image 2026-05-26 at 21.13.27.jpeg",
      link: "peca.html?look=6"
    },
    "7": {
      titulo: "Peça 007",
      imagem: "assets/looks7/WhatsApp Image 2026-05-26 at 21.13.32 (1).jpeg",
      link: "peca.html?look=7"
    },
    "8": {
      titulo: "Peça 008",
      imagem: "assets/looks8/WhatsApp Image 2026-05-26 at 21.13.31 (1).jpeg",
      link: "peca.html?look=8"
    },
    "9": {
      titulo: "Peça 009",
      imagem: "assets/looks9/WhatsApp Image 2026-05-26 at 21.13.31 (1).jpeg",
      link: "peca.html?look=9"
    },
    "10": {
      titulo: "Peça 010",
      imagem: "assets/looks10/WhatsApp Image 2026-05-26 at 21.13.33 (1).jpeg",
      link: "peca.html?look=10"
    }
  };

  function lerWishlist() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_WISHLIST_NO_NAVEGADOR)) || [];
    } catch (error) {
      return [];
    }
  }

  function salvarWishlist(listaDePecasSalvas) {
    localStorage.setItem(CHAVE_WISHLIST_NO_NAVEGADOR, JSON.stringify(listaDePecasSalvas));
  }
  

  function alternarPecaNaWishlist(codigoDaPeca) {
    const listaDePecasSalvas = lerWishlist();
    const pecaJaEstaSalva = listaDePecasSalvas.includes(codigoDaPeca);
    const listaAtualizada = pecaJaEstaSalva
      ? listaDePecasSalvas.filter((codigoSalvo) => codigoSalvo !== codigoDaPeca)
      : [...listaDePecasSalvas, codigoDaPeca];

    salvarWishlist(listaAtualizada);
    atualizarInterface();
  }

  

  function atualizarBotoesWishlist(listaDePecasSalvas) {
    document.querySelectorAll("[data-wishlist-button]").forEach((botaoWishlist) => {
      const codigoDaPeca = botaoWishlist.dataset.look || new URLSearchParams(window.location.search).get("look");

      if (!codigoDaPeca || !catalogoDePecas[codigoDaPeca]) return;

      const pecaEstaSalva = listaDePecasSalvas.includes(codigoDaPeca);
      botaoWishlist.dataset.look = codigoDaPeca;
      botaoWishlist.classList.toggle("is-saved", pecaEstaSalva);
      botaoWishlist.textContent = pecaEstaSalva ? "Salvo" : "Wishlist";
      botaoWishlist.setAttribute("aria-pressed", pecaEstaSalva ? "true" : "false");
      botaoWishlist.setAttribute(
        "aria-label",
        pecaEstaSalva
          ? `Remover ${catalogoDePecas[codigoDaPeca].titulo} da wishlist`
          : `Salvar ${catalogoDePecas[codigoDaPeca].titulo} na wishlist`
      );
    });
  }

  function atualizarContadoresWishlist(listaDePecasSalvas) {
    document.querySelectorAll("[data-wishlist-count]").forEach((contadorWishlist) => {
      contadorWishlist.textContent = listaDePecasSalvas.length;
    });
  }

  function criarCardDaWishlist(codigoDaPeca) {
    const dadosDaPeca = catalogoDePecas[codigoDaPeca];
    const cardDaWishlist = document.createElement("article");
    const linkDaPeca = document.createElement("a");
    const imagemDaPeca = document.createElement("img");
    const tituloDaPeca = document.createElement("h2");
    const botaoRemover = document.createElement("button");

    cardDaWishlist.className = "wishlist-card";
    linkDaPeca.className = "peca-link";
    linkDaPeca.href = dadosDaPeca.link;
    linkDaPeca.setAttribute("aria-label", `Ver detalhes de ${dadosDaPeca.titulo}`);
    imagemDaPeca.src = dadosDaPeca.imagem;
    imagemDaPeca.alt = dadosDaPeca.titulo;
    tituloDaPeca.textContent = dadosDaPeca.titulo;
    botaoRemover.className = "wishlist-btn";
    botaoRemover.type = "button";
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", () => alternarPecaNaWishlist(codigoDaPeca));

    linkDaPeca.appendChild(imagemDaPeca);
    cardDaWishlist.appendChild(linkDaPeca);
    cardDaWishlist.appendChild(tituloDaPeca);
    cardDaWishlist.appendChild(botaoRemover);

    return cardDaWishlist;
  }

  if (window.location.pathname === "/wishlist.html" !== 0) {
    
  }

  function renderizarPaginaDaWishlist(listaDePecasSalvas) {
    const areaDaLista = document.querySelector("[data-wishlist-list]");
    const mensagemWishlistVazia = document.querySelector("[data-wishlist-empty]");

    if (!areaDaLista || !mensagemWishlistVazia) return;

    areaDaLista.innerHTML = "";
    mensagemWishlistVazia.hidden = listaDePecasSalvas.length > 0;

    listaDePecasSalvas.forEach((codigoDaPeca) => {
      if (catalogoDePecas[codigoDaPeca]) {
        areaDaLista.appendChild(criarCardDaWishlist(codigoDaPeca));
      }
    });
  }

  function atualizarInterface() {
    const listaDePecasSalvas = lerWishlist().filter((codigoDaPeca) => catalogoDePecas[codigoDaPeca]);

    salvarWishlist(listaDePecasSalvas);
    atualizarBotoesWishlist(listaDePecasSalvas);
    atualizarContadoresWishlist(listaDePecasSalvas);
    renderizarPaginaDaWishlist(listaDePecasSalvas);
  }

  document.querySelectorAll("[data-wishlist-button]").forEach((botaoWishlist) => {
    botaoWishlist.addEventListener("click", () => {
      const codigoDaPeca = botaoWishlist.dataset.look || new URLSearchParams(window.location.search).get("look");
      if (codigoDaPeca && catalogoDePecas[codigoDaPeca]) {
        alternarPecaNaWishlist(codigoDaPeca);
      }
    });
  });

  atualizarInterface();
})();
