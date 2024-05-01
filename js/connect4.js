const cells = document.querySelectorAll('.cell');
let currentPlayer = '1';
let gameActive = true;
const numRows = 6;
const numCols = 7;
let gameState = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => ""));

// Event listeners to handle game start and cell interaction
document.addEventListener('DOMContentLoaded', () => {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('restartButton').addEventListener('click', restartGame);
});

// whenever the user clicks the restart game button,
// we reinitialize the game state
//
function restartGame() {
    gameActive = true;
    currentPlayer = '1';
    if (getNumPlayers() === "one") {
        document.getElementById('resultDisplay').innerText = "Your turn";
    } else {
        document.getElementById('resultDisplay').innerText = "Player 1's turn";
    }
    cells.forEach(cell => {
        cell.className = 'cell'; // Reset classes
    });
    gameState = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => ""));
}

// get the game settings from the radio button
//
function getNumPlayers() {
    let radios = document.getElementsByName('numPlayers');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

// Interact with the user by responding to clicks on the cells
// and changing the cell state. 
//
function handleCellPlayed(clickedCell, clickedCol, availRow) {
    let targetCellIndex = (availRow * numCols) + clickedCol;
    let targetCell = cells[targetCellIndex];
    gameState[availRow][clickedCol] = currentPlayer;
    targetCell.classList.add(currentPlayer === '1' ? 'red' : 'black');
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    let clickedCol = clickedCellIndex % 7;
    let availRow = -1;
    for (let i = 5; i >= 0; i--) {
        if (gameState[i][clickedCol] === "") {
            availRow = i;
            break;
        }
    };

    if (availRow === -1 || !gameActive) {
        return;
    }

    // we respond to a click by handling the cell that has been played
    // and then updating the overall game status
    //
    handleCellPlayed(clickedCell, clickedCol, availRow);
    updateGameStatus();
}

function updateGameStatus() {
    const result = checkWinner();
    if (result) {
        gameActive = false;
        if (result === 'tie') {
            document.getElementById('resultDisplay').innerText = "Game Draw!";
        } else if (getNumPlayers() === "two") {
            document.getElementById('resultDisplay').innerText = `Player ${result} Wins!`;
        } else if (result === "1") {
            document.getElementById('resultDisplay').innerText = `You Win!`;
        } else {
            document.getElementById('resultDisplay').innerText = `You lose!`;
        }
    } else {
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === '1' ? '2' : '1';
    if (currentPlayer === '2' && gameActive) {
        let numPlayers = getNumPlayers();
        if (numPlayers === "one") {
            document.getElementById('resultDisplay').innerText = "Bot's turn";
            computerMove();
        } else {
            document.getElementById('resultDisplay').innerText = "Player " + currentPlayer + "'s turn";
        }
    }
}

function checkWinner() {
    if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
        return currentPlayer;
    } else if (boardIsFull()) {
        return 'tie';
    }
    return null; // No winner yet
}

function boardIsFull() {
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (gameState[r][c] === "") {
                return false; // there is an empty cell
            }
        }
    }
    return true; // all cells are filled
}

function checkHorizontalWin() {
    for (let r = 0; r < numRows; r++) {
        let count = 0;
        for (let c = 0; c < numCols; c++) {
            if (gameState[r][c] === currentPlayer) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0; // reset the count since the cells are not consecutive
            }
        }
    }
    return false;
}

function checkVerticalWin() {
    for (let c = 0; c < numCols; c++) {
        let count = 0;
        for (let r = 0; r < numRows; r++) {
            if (gameState[r][c] === currentPlayer) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0; // reset count since cells are not consecutive
            }
        }
    }
    return false;
}

function checkDiagonalWin() {
    let count = 0;

    // Check top-left to bottom-right diagonals
    for (let r = 0; r < numRows - 3; r++) {
        for (let c = 0; c < numCols - 3; c++) {
            count = 0;
            for (let i = 0; i < 4; i++) {
                if (gameState[r + i][c + i] === currentPlayer) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0; // reset
                }
            }
        }
    }

    // Check bottom-left to top-right diagonals
    for (let r = 3; r < numRows; r++) {
        for (let c = 0; c < numCols - 3; c++) {
            count = 0;
            for (let i = 0; i < 4; i++) {
                if (gameState[r - i][c + i] === currentPlayer) {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                }
                else {
                    count = 0; // reset
                }
            }
        }
    }

    return false;
}
