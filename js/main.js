let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const playerStatus = document.querySelector('.current-player-status'); 
const endGameHeader = document.querySelector('.end-game-status');
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Status messages
const currentPlayerStatus = () => `~~It's ${currentPlayer}'s turn~~`
const winningMessage = () => `${currentPlayer} won!`
const drawMessage = () => 'Draw... Hit the reset button to play again'
playerStatus.innerHTML = 'X goes first!';

// Handle cell played
function handleCellPlayed(cellClicked, clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
}

// Handle cell click
function handleCellClick(clickedCellEvent) {
    
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = +clickedCell.getAttribute('data-cell-index');

    if(gameState[clickedCellIndex] !== '' || !gameActive){
        return;
    }
    
    handleCellPlayed(clickedCell, clickedCellIndex);
    gameOverCheck();
}

// Change current player
function changePlayerStatus() {
    currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X'
    playerStatus.innerHTML = currentPlayerStatus();
    
}

const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Check to see if game is over
function gameOverCheck() {
    let roundWon = false;
    for(let i = 0; i < 7; i++){
        const winCondition = winners[i];
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
    
    if(a === '' || b === '' || c === '') {
        continue;
    }
    if(a === b && b === c) {
        roundWon = true
        break
    } 
  } 
    if(roundWon) {
        endGameHeader.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if(roundDraw){
        endGameHeader.innerHTML = drawMessage();
        gameActive = false;
        return;
  }

  changePlayerStatus();
}
// Reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    playerStatus.innerHTML = 'X goes first!';
    gameState = ['','','','','','','','',''];
    cells.forEach(cell => cell.innerHTML = '');
    endGameHeader.innerHTML = '';
}
document.querySelector('.reset-button').addEventListener('click', resetGame)