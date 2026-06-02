const pecas = {
  1: {
    titulo: "Peça 001",
    
    imagens: [
      "assets/looks1/WhatsApp Image 2026-05-26 at 21.13.16 (1).jpeg",
      "assets/looks1/WhatsApp Image 2026-05-26 at 21.13.16.jpeg",
      "assets/looks1/WhatsApp Image 2026-05-26 at 21.13.23 (1).jpeg",
      "assets/looks1/WhatsApp Image 2026-05-26 at 21.13.23.jpeg"
    ]
  },
  2: {
    titulo: "Peça 002",
    
    imagens: [
      "assets/looks2/WhatsApp Image 2026-05-26 at 21.13.17 (1).jpeg",
      "assets/looks2/WhatsApp Image 2026-05-26 at 21.13.17.jpeg",
      "assets/looks2/WhatsApp Image 2026-05-26 at 21.13.19 (1).jpeg",
      "assets/looks2/WhatsApp Image 2026-05-26 at 21.13.20.jpeg"
    ]
  },
  3: {
    titulo: "Peça 003",
   
    imagens: [
      "assets/looks3/WhatsApp Image 2026-05-26 at 21.13.19 (1).jpeg",
      "assets/looks3/WhatsApp Image 2026-05-26 at 21.13.19.jpeg"
    ]
  },
  4: {
    titulo: "Peça 004",
    
    imagens: [
      "assets/looks4/WhatsApp Image 2026-05-26 at 21.13.23 (1).jpeg",
      "assets/looks4/WhatsApp Image 2026-05-26 at 21.13.23.jpeg",
      "assets/looks4/WhatsApp Image 2026-05-26 at 21.13.24 (1).jpeg",
      "assets/looks4/WhatsApp Image 2026-05-26 at 21.13.24.jpeg"
    ]
  },
  5: {
    titulo: "Peça 005",
   
    imagens: [
      "assets/looks5/WhatsApp Image 2026-05-26 at 21.13.24 (1).jpeg",
      "assets/looks5/WhatsApp Image 2026-05-26 at 21.13.24.jpeg",
      "assets/looks5/WhatsApp Image 2026-05-26 at 21.13.26 (1).jpeg",
      "assets/looks5/WhatsApp Image 2026-05-26 at 21.13.26.jpeg"
    ]
  },
  6: {
    titulo: "Peça 006",
    
    imagens: [
      "assets/looks6/WhatsApp Image 2026-05-26 at 21.13.26.jpeg",
      "assets/looks6/WhatsApp Image 2026-05-26 at 21.13.27 (1).jpeg",
      "assets/looks6/WhatsApp Image 2026-05-26 at 21.13.27.jpeg",
      "assets/looks6/WhatsApp Image 2026-05-26 at 21.13.29.jpeg"
    ]
  },
  7: {
    titulo: "Peça 007",
    
    imagens: [
      "assets/looks7/WhatsApp Image 2026-05-26 at 21.13.32 (1).jpeg",
      "assets/looks7/WhatsApp Image 2026-05-26 at 21.13.32.jpeg",
      "assets/looks7/WhatsApp Image 2026-05-26 at 21.13.29 (1).jpeg",
      "assets/looks7/WhatsApp Image 2026-05-26 at 21.13.29.jpeg"
    ]
  },
  8: {
    titulo: "Peça 008",
    
    imagens: [
      "assets/looks8/WhatsApp Image 2026-05-26 at 21.13.31 (1).jpeg",
      "assets/looks8/WhatsApp Image 2026-05-26 at 21.13.31.jpeg",
      "assets/looks8/WhatsApp Image 2026-05-26 at 21.13.32 (1).jpeg",
      "assets/looks8/WhatsApp Image 2026-05-26 at 21.13.32.jpeg"
    ]
  },
  9: {
    titulo: "Peça 009",
    
    imagens: [
      "assets/looks9/WhatsApp Image 2026-05-26 at 21.13.31 (1).jpeg",
      "assets/looks9/WhatsApp Image 2026-05-26 at 21.13.31.jpeg",
      "assets/looks9/WhatsApp Image 2026-05-26 at 21.13.30.jpeg",
      "assets/looks9/WhatsApp Image 2026-05-26 at 21.13.30 (1).jpeg"
    ]
  },
  10: {
    titulo: "Peça 010",
    
    imagens: [
      "assets/looks10/WhatsApp Image 2026-05-26 at 21.13.33 (1).jpeg",
      "assets/looks10/WhatsApp Image 2026-05-26 at 21.13.33.jpeg"
    ]
  },
 
};

const params = new URLSearchParams(window.location.search);
const look = params.get("look") || "1";
const lookSelecionado = pecas[look] ? look : "1";
const peca = pecas[lookSelecionado];

const titulo = document.querySelector("#peca-titulo");
const descricao = document.querySelector("#peca-descricao");
const slides = document.querySelector(".peca-slides");
const miniaturas = document.querySelector(".peca-miniaturas");

function montarCarrossel() {
  slides.innerHTML = "";
  miniaturas.innerHTML = "";

  peca.imagens.forEach((src, indice) => {
    const slide = document.createElement("div");
    const imagem = document.createElement("img");
    const miniatura = document.createElement("div");
    const thumb = document.createElement("img");

    imagem.src = src;
    imagem.alt = `${peca.titulo} - imagem ${indice + 1}`;
    slide.appendChild(imagem);
    slides.appendChild(slide);

    thumb.src = src;
    thumb.alt = `${peca.titulo} - miniatura ${indice + 1}`;
    miniatura.appendChild(thumb);
    miniaturas.appendChild(miniatura);
  });
}

function iniciarSlick() {
  $(".peca-slides").slick({
    arrows: true,
    asNavFor: ".peca-miniaturas",
    dots: false,
    fade: true,
    infinite: true,
    prevArrow: '<button class="carrossel-seta carrossel-anterior" type="button" aria-label="Imagem anterior">‹</button>',
    nextArrow: '<button class="carrossel-seta carrossel-proxima" type="button" aria-label="Próxima imagem">›</button>'
  });

  $(".peca-miniaturas").slick({
    arrows: false,
    asNavFor: ".peca-slides",
    dots: false,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: Math.min(4, peca.imagens.length),
    slidesToScroll: 1
  });
}

titulo.textContent = peca.titulo;
descricao.textContent = peca.descricao;
document.title = `${peca.titulo} | Coleção 001`;
document.querySelectorAll("[data-wishlist-button]").forEach((botao) => {
  botao.dataset.look = lookSelecionado;
});
montarCarrossel();
iniciarSlick();
