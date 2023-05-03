// Select all game cells
const cells = document.querySelectorAll(".game-cell");

// Set initial game state
let currentPlayer = "x";
let gameIsLive = true;

// Helper function to check for a winner
function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (cells[a].classList.contains(currentPlayer) &&
        cells[b].classList.contains(currentPlayer) &&
        cells[c].classList.contains(currentPlayer)) {
      return true;
    }
  }
  return false;
}

// Helper function to check for a tie
function checkTie() {
  let tie = true;
  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].classList.contains("x") && !cells[i].classList.contains("circle")) {
      tie = false;
      break;
    }
  }
  return tie;
}

// Set up event listeners for each cell
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    // Check if game is live and cell is empty
    if (gameIsLive && !cell.classList.contains("x") && !cell.classList.contains("circle")) {
      // Update cell with current player's mark
      cell.classList.add(currentPlayer);
      // Check for win or tie
      if (checkWin()) {
        document.querySelector(".status").textContent = `${currentPlayer.toUpperCase()} wins!`;
        gameIsLive = false;
      } else if (checkTie()) {
        document.querySelector(".status").textContent = "It's a tie!";
        gameIsLive = false;
      } else {
        // Switch to next player
        currentPlayer = currentPlayer === "x" ? "circle" : "x";
        document.querySelector(".status").textContent = `${currentPlayer.toUpperCase()}'s turn`;
      }
    }
  });
});

// Reset game state when reset button is clicked
document.querySelector("#reset-button").addEventListener("click", () => {
  // Remove marks from all cells
  cells.forEach(cell => {
    cell.classList.remove("x", "circle");
  });
  // Reset game state
  currentPlayer = "x";
  gameIsLive = true;
  document.querySelector(".status").textContent = "X's turn";
});
