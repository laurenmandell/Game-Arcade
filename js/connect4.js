/*
This Connect 4 Implementation was based heavily on Professor Posnett's Tic Tac Toe code.
*/
const cells = document.querySelectorAll('.cell');
let currentPlayer = '1'; // Player 1 always goes first
let numPlayers = "one"; // Default to 1 player
let gameActive = false; // User clicks start button to start a game
const numRows = 6;
const numCols = 7;
// Array to keep track of game state
let gameState = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => ""));

// Event listeners to handle game start and cell interaction
document.addEventListener('DOMContentLoaded', () => {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    document.getElementById('restartButton').addEventListener('click', restartGame);
});

// whenever the user clicks the restart game button,
// we reinitialize the game state
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
function handleCellPlayed(clickedCol, availRow) {
    let targetCellIndex = (availRow * numCols) + clickedCol;
    let targetCell = cells[targetCellIndex];
    gameState[availRow][clickedCol] = currentPlayer;
    targetCell.classList.add(currentPlayer === '1' ? 'red' : 'black');
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    let clickedCol = clickedCellIndex % 7;

    let availRow = getAvailRow(clickedCol)
    if (availRow === -1 || !gameActive) {
        return;
    }

    // we respond to a click by handling the cell that has been played
    // and then updating the overall game status
    handleCellPlayed(clickedCol, availRow);
    updateGameStatus();
}

function updateGameStatus() {
    const result = checkWinner();
    if (result) {
        // Game Over
        gameActive = false;
        // Different displays depending on outcome of game
        if (result === 'tie') {
            document.getElementById('resultDisplay').innerText = "Game Draw!";
        } else if (getNumPlayers() === "two") {
            document.getElementById('resultDisplay').innerText = `Player ${result} Wins!`;
        } else if (result === '1') {
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
    if (gameActive && getNumPlayers() === "one" && currentPlayer === '2') {
        document.getElementById('resultDisplay').innerText = "Bot's turn";
        staticEvaluatorComputerMove();
    } else {
        document.getElementById('resultDisplay').innerText = "Player " + currentPlayer + "'s turn";
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

// Check if the board is full (there are no empty cells)
function boardIsFull() {
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (gameState[r][c] === "") {
                return false; // There is an empty cell
            }
        }
    }
    return true; // All cells are filled
}

// Check if a player won with 4 in a row horizontally
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
                count = 0; // Reset the count since the cells are not consecutive
            }
        }
    }
    return false;
}

// Check if a player won with 4 in a row vertically
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
                count = 0; // Reset count since the cells are not consecutive
            }
        }
    }
    return false;
}

// Check if a player won with 4 in a row horizontally
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
                    count = 0; // Reset the count since the cells are not consecutive
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

function staticEvaluatorComputerMove() {
    // Medium difficulty bot -- static evaluator
    // Check for possible wins
    for (let c = 0; c < numCols; c++) {
        let r = getAvailRow(c);
        if (r !== -1) {
            // Test for a winning move for bot
            gameState[r][c] = '2';
            if (checkWinner() === '2') {
                handleCellPlayed(c, r)
                updateGameStatus();
                return;
            }
            gameState[r][c] = ''; // Reset the cell
        }
    }

    // Check for possible blocks
    for (let c = 0; c < numCols; c++) {
        let r = getAvailRow(c);
        if (r !== -1) {
            // Test for blocking user from winning
            currentPlayer = '1'; // Temporarily change current player to call checkWinner accurately
            gameState[r][c] = '1'; 
            if (checkWinner() === '1') {
                currentPlayer = '2'; // Reset value
                handleCellPlayed(c, r);
                updateGameStatus();
                return;
            }
            currentPlayer = '2'; // Reset value
            gameState[r][c] = ''; // Reset the cell
        }
    }

    // Do a random move if there are no possible winning or blocking moves
    randomComputerMove();
}

// Select a random available column for the bot to choose
function randomComputerMove() {
    let availCols = []; // Store the available columns
    for (let c = 0; c < numCols; c++) {
        if (getAvailRow(c) !== -1) {
            availCols.push(c);
        }
    }
    if (availCols.length > 0) { // There is an available spot
        const randCol = availCols[Math.floor(Math.random() * availCols.length)];
        const randRow = getAvailRow(randCol);
        gameState[randRow][randCol] = '2';
        handleCellPlayed(randCol, randRow);
        updateGameStatus();
    }
}

// Return lowest row on the selected column to mimic the piece dropping to the
// bottom of the board
function getAvailRow(column) {
    for (let i = 5; i >= 0; i--) {
        if (gameState[i][column] === "") {
            return i;
        }
    };
    return -1;
}
