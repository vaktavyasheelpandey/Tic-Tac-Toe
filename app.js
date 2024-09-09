let board;
let currentPlayer;
let gameActive;

const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const boardElement = document.getElementById('board');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize game
function initializeGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  updateStatus();
  renderBoard();
}

// Render the game board
function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.setAttribute('data-index', index);
    cellElement.innerText = cell;
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

// Handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-index');

  if (board[cellIndex] !== '' || !gameActive) {
    return;
  }

  board[cellIndex] = currentPlayer;
  renderBoard();
  checkResult();
  togglePlayer();
}

// Switch player turns
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

// Update the game status display
function updateStatus() {
  statusDisplay.innerText = gameActive ? `Player ${currentPlayer}'s Turn` : `Game Over`;
}

// Check for winner or tie
function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerText = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusDisplay.innerText = 'Game is a Draw!';
    gameActive = false;
  }
}

// Reset game
resetBtn.addEventListener('click', initializeGame);

// Start the game when the page loads
initializeGame();
