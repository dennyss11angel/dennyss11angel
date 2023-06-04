// Variables
let currentPlayer = "X";
const boxes = document.querySelectorAll("span");

// Función para cambiar de jugador
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Función para realizar una jugada
function play(box) {
  if (box.dataset.player === "none") {
    box.dataset.player = currentPlayer;
    box.textContent = currentPlayer;
    checkWinner();
    changePlayer();
  }
}

// Función para verificar el ganador
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    const boxA = boxes[a];
    const boxB = boxes[b];
    const boxC = boxes[c];

    if (
      boxA.dataset.player !== "none" &&
      boxA.dataset.player === boxB.dataset.player &&
      boxA.dataset.player === boxC.dataset.player
    ) {
      announceWinner(boxA.dataset.player);
      return;
    }
  }

  if (Array.from(boxes).every(box => box.dataset.player !== "none")) {
    announceDraw();
  }
}

// Función para anunciar al ganador
function announceWinner(player) {
  alert("¡Jugador " + player + " ha ganado!");
  resetGame();
}

// Función para anunciar un empate
function announceDraw() {
  alert("¡Empate! No hay ganadores.");
  resetGame();
}

// Función para reiniciar el juego
function resetGame() {
  boxes.forEach(box => {
    box.dataset.player = "none";
    box.textContent = "";
  });
  currentPlayer = "X";
}

// Event listeners
boxes.forEach(box => box.addEventListener("click", function() {
  play(this);
}));
