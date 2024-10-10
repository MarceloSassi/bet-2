const betForm = document.querySelector("#bet-form");
const betList = document.querySelector("#bet-list");
const limpar = document.getElementById("limpa");
const totalApostadoEl = document.querySelector("#total-apostado");
const totalGanhoE1 = document.querySelector("#total-ganho");
const lucroTotalEl = document.querySelector("#lucro-total");
const redCountE1 = document.querySelector("#total-red");
const greenCountE1 = document.querySelector("#total-green");
const betCountE1 = document.querySelector("#total-apostas");
const assertividadeE1 = document.querySelector("#assertividade");


// PEGA OS VALORES DO LOCALSTORAGE
let totalApostado = parseFloat(localStorage.getItem("totalApostado")) || 0;
let totalGanho = parseFloat(localStorage.getItem("totalGanho")) || 0;
let lucroTotal = parseFloat(localStorage.getItem("lucroTotal")) || 0;
let redCount = parseInt(localStorage.getItem("redCount")) || 0;
let greenCount = parseInt(localStorage.getItem("greenCount")) || 0;
let betCount = parseInt(localStorage.getItem("betCount")) || 0;
let assert = parseFloat(localStorage.getItem("assert")) || 0;

//PEGA A LISTA DE BETS SALVAS
let bets = JSON.parse(localStorage.getItem("bets")) || [];

// RENDERIZAR A LISTA SALVA
function renderBets() {
  betList.innerHTML = ""; 
  bets.forEach((bet) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Data: ${bet.date} / VA: R$ ${bet.betValue.toFixed(
      2
    )} / R: ${bet.resultado} / VR: R$ ${bet.odd.toFixed(
      2
    )} / Lucro: R$ ${bet.lucro.toFixed(2)}`;
    betList.appendChild(listItem);
  });

  // ATUALIZA OS VALORES 
  totalApostadoEl.textContent = totalApostado.toFixed(2);
  lucroTotalEl.textContent = lucroTotal.toFixed(2);
  redCountE1.textContent = redCount;
  greenCountE1.textContent = greenCount;
  betCountE1.textContent = betCount;
  assertividadeE1.textContent = assert.toFixed(1);
  totalGanhoE1.textContent = totalGanho.toFixed(2)
}

// CHAMA A FUNCAO PARA RENDERIZAR
renderBets();

// ESCUTADOR DE EVENTO PARA ADICIONAR BET NA LISTA E ATT OS VALORES
betForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#date").value;
  const betValue = parseFloat(document.querySelector("#bet-value").value);
  const odd = parseFloat(document.querySelector("#odd").value);

  let lucro = odd - betValue;

  let resultado;
  if (odd > betValue) {
    resultado = "Green";
    greenCount += 1;
  } else {
    resultado = "Red";
    redCount += 1;
  }
  betCount += 1;

  assert = (greenCount * 100) / betCount;

  // OBJETO BET PARA MANDAR PRA LISTA
  const bet = { date, betValue, odd, resultado, lucro };

  // ADICIONA NA LISTA
  bets.push(bet);

  // Atualizar os totais antes de salvar
  totalApostado += betValue;
  lucroTotal += lucro;
  totalGanho += odd

  // SALVA TUDO NO LOCALSTORAGE
  localStorage.setItem("bets", JSON.stringify(bets));
  localStorage.setItem("totalApostado", totalApostado.toFixed(2));
  localStorage.setItem("lucroTotal", lucroTotal.toFixed(2));
  localStorage.setItem("redCount", redCount);
  localStorage.setItem("greenCount", greenCount);
  localStorage.setItem("betCount", betCount);
  localStorage.setItem("assert", assert.toFixed(1));
  localStorage.setItem("totalGanho", totalGanho.toFixed(2))

  // CRIA NOVA APOSTA NA LISTA VISIVEL
  const listItem = document.createElement("li");
  listItem.textContent = `Data: ${date} / VA: R$ ${betValue.toFixed(
    2
  )} / R: ${resultado} / VR: R$ ${odd.toFixed(
    2
  )} / Lucro: R$ ${lucro.toFixed(2)}`;
  betList.appendChild(listItem);

  // ATUALIZA TUDO NA TELA
  totalApostadoEl.textContent = totalApostado.toFixed(2);
  lucroTotalEl.textContent = lucroTotal.toFixed(2);
  redCountE1.textContent = redCount;
  greenCountE1.textContent = greenCount;
  betCountE1.textContent = betCount;
  assertividadeE1.textContent = assert.toFixed(1);
  totalGanhoE1.textContent = totalGanho.toFixed(2);
  // RESETA O FORM QUANDO CLICAR
  betForm.reset();
});

// FUNCAO PARA LIMPAR O LOCAL STORAGE E RESETAR TUDO
limpar.addEventListener("click", function () {
  localStorage.clear();
  bets = [];
  totalApostado = 0;
  lucroTotal = 0;
  redCount = 0;
  greenCount = 0;
  betCount = 0;
  assert = 0;
  totalGanho = 0;

  betList.innerHTML = "";
  totalApostadoEl.textContent = totalApostado.toFixed(2);
  lucroTotalEl.textContent = lucroTotal.toFixed(2);
  redCountE1.textContent = redCount;
  greenCountE1.textContent = greenCount;
  betCountE1.textContent = betCount;
  assertividadeE1.textContent = assert.toFixed(1);
  totalGanhoE1.textContent = totalGanho.toFixed(2);
});


