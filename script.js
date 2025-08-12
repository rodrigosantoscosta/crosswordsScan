
const grade = [
  ['#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', '#', ' ', '#'],
  ['#', ' ', '#', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', ' ', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', '#', '#', '#']
];

let entradas = [];


function criarCelulaBloqueada() {
  const celula = document.createElement('div');
  celula.classList.add('celula', 'bloqueada');
  return celula;
}

function criarCelulaEditavel(linha, coluna, valorInicial) {
  const celula = document.createElement('div');
  celula.classList.add('celula');

  const entrada = document.createElement('input');
  entrada.maxLength = 1;
  entrada.dataset.linha = linha;
  entrada.dataset.coluna = coluna;
  entrada.value = valorInicial !== ' ' ? valorInicial : '';

  // Atualiza a grade quando o usuário digita
  entrada.addEventListener('input', (e) => {
    grade[linha][coluna] = e.target.value.toUpperCase();
  });

  // Movimentação com as setas do teclado
  entrada.addEventListener('keydown', (e) => {
    moverComSetas(e, linha, coluna);
  });

  entradas.push(entrada);
  celula.appendChild(entrada);
  return celula;
}

function desenharGrade(gradeDados) {
  const gradeElemento = document.getElementById('grade');
  const linhas = gradeDados.length;
  const colunas = gradeDados[0].length;

  gradeElemento.style.gridTemplateColumns = `repeat(${colunas}, 40px)`;

  for (let l = 0; l < linhas; l++) {
    for (let c = 0; c < colunas; c++) {
      const valor = gradeDados[l][c];
      const elementoCelula = valor === '#'
        ? criarCelulaBloqueada()
        : criarCelulaEditavel(l, c, valor);

      gradeElemento.appendChild(elementoCelula);
    }
  }
}

function moverComSetas(evento, linha, coluna) {
  const linhas = grade.length;
  const colunas = grade[0].length;

  let novaLinha = linha;
  let novaColuna = coluna;

  if (evento.key === 'ArrowUp') novaLinha--;
  if (evento.key === 'ArrowDown') novaLinha++;
  if (evento.key === 'ArrowLeft') novaColuna--;
  if (evento.key === 'ArrowRight') novaColuna++;

  // Pular células bloqueadas
  while (
    novaLinha >= 0 &&
    novaLinha < linhas &&
    novaColuna >= 0 &&
    novaColuna < colunas &&
    grade[novaLinha][novaColuna] === '#'
  ) {
    if (evento.key === 'ArrowUp') novaLinha--;
    if (evento.key === 'ArrowDown') novaLinha++;
    if (evento.key === 'ArrowLeft') novaColuna--;
    if (evento.key === 'ArrowRight') novaColuna++;
  }

  // Se a nova célula for válida e não bloqueada, move o foco
  if (
    novaLinha >= 0 &&
    novaLinha < linhas &&
    novaColuna >= 0 &&
    novaColuna < colunas &&
    grade[novaLinha][novaColuna] !== '#'
  ) {
    const proximaEntrada = entradas.find(
      inp =>
        parseInt(inp.dataset.linha) === novaLinha &&
        parseInt(inp.dataset.coluna) === novaColuna
    );
    if (proximaEntrada) {
      proximaEntrada.focus();
      evento.preventDefault(); // impede rolagem da página
    }
  }
}

desenharGrade(grade);
