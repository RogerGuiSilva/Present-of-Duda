
const CORES_CONFETE = ['#F472B6','#C4B5FD','#FCD34D','#6EE7B7','#FCA5A5','#A5B4FC'];

function lancarConfete(quantidade = 80) {
  const container = document.getElementById('confete-container');
  if (!container) return;

  for (let i = 0; i < quantidade; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confete-piece');
    piece.style.left            = Math.random() * 100 + 'vw';
    piece.style.backgroundColor = CORES_CONFETE[Math.floor(Math.random() * CORES_CONFETE.length)];
    piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    piece.style.animationDelay   = (Math.random() * 2) + 's';
    const size = (Math.random() * 8 + 5) + 'px';
    piece.style.width  = size;
    piece.style.height = size;
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }

  setTimeout(() => { container.innerHTML = ''; }, 5000);
}


const CARTA_LINHAS = [
  { texto: 'Oi Duda, tudo bem?\n\n' },
  { texto: 'Bom, esse é seu presente de aniversário. É algo simples e meio idiota, mas foi a única coisa que consegui pensar.\n\n' },
  { texto: 'Eu tava sem dinheiro e queria te presentear com alguma coisa legal, sabe? Aí resolvi criar isso.\n\n' },
  { texto: 'Não sei se você vai gostar porque é meio besta. Na verdade, eu nem sei se você vai abrir isso kkkkk.\n\n' },
  { texto: 'Tô criando isso às 4 da manhã, então provavelmente esse site vai ter alguns erros.\n\n' },
  { texto: 'Só queria me explicar mesmo.\n\n' },
  { texto: 'Bom, feliz aniversário. Você é uma pessoa incrível e eu gosto muito da sua amizade.\n\n' },
  { texto: 'Espero que seu dia seja muito bom. Feliz aniversário ❤️' },
];

let textoAcumulado = [];
const elCarta = document.getElementById('carta-texto');
const elCursor = document.getElementById('cursor');
const elAssinatura = document.getElementById('assinatura');
const elBtnDivas = document.getElementById('btn-divas');

function renderCarta() {
  let html = '';
  for (const parte of textoAcumulado) {
    if (parte.destaque) {
      html += `<em class="destaque-artista">${parte.texto}</em>`;
    } else {
      html += parte.texto.replace(/\n/g, '<br>');
    }
  }
  elCarta.innerHTML = html;
  if (elCursor) elCarta.appendChild(elCursor);
}

function escreverCarta(linhaIdx, charIdx) {
  if (linhaIdx >= CARTA_LINHAS.length) {
    if (elCursor) elCursor.style.display = 'none';
    if (elAssinatura) elAssinatura.style.opacity = '1';
    if (elBtnDivas) elBtnDivas.style.opacity = '1';
    return;
  }

  const linha = CARTA_LINHAS[linhaIdx];
  const txt   = linha.texto;

  if (charIdx < txt.length) {
   
    if (!textoAcumulado[linhaIdx]) {
      textoAcumulado[linhaIdx] = { texto: '', destaque: linha.destaque || false };
    }
    textoAcumulado[linhaIdx].texto += txt[charIdx];
    renderCarta();

    const ch  = txt[charIdx];
    const vel = ch === '\n' ? 50 : ch === ',' || ch === '.' ? 120 : (Math.random() * 22 + 16);
    setTimeout(() => escreverCarta(linhaIdx, charIdx + 1), vel);
  } else {
    escreverCarta(linhaIdx + 1, 0);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  lancarConfete();

 
  const cartaSection = document.getElementById('carta');
  if (cartaSection) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        setTimeout(() => escreverCarta(0, 0), 400);
      }
    }, { threshold: 0.2 });
    obs.observe(cartaSection);
  }
});