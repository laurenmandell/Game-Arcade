const cards = document.querySelectorAll('.card');
let currentPlayer = '1';
let numPlayers = "one"; // Default to 1 player
let gameActive = true;
let flippedCards = [];
let matchedCards = [];
let player1Score = 0;
let player2Score = 0;
const totalPairs = cards.length / 2;

// Array to hold the values for each pair of cards
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];


function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Shuffle the card values array 
let shuffledValues = shuffleCards([...cardValues, ...cardValues]);

// Assign shuffled values to each card
cards.forEach(card => {
    card.innerHTML = '?';
    card.className = 'card';
});

// Event listeners to handle game start and cell interaction
document.addEventListener('DOMContentLoaded', () => {
    cards.forEach(card => card.addEventListener('click', handleCardClick));
    document.getElementById('restartButton').addEventListener('click', restartGame);
});

// get the number of players from the radio button
//
function getNumPlayers() {
    let radios = document.getElementsByName('numPlayers');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

numPlayers = getNumPlayers();

// whenever the user clicks the restart game button
// we initialize the game state
function restartGame() {
    gameActive = true;
    flippedCards = [];
    matchedCards = [];
    player1Score = 0;
    player2Score = 0;

    // Shuffle the card values array 
    shuffledValues = shuffleCards([...cardValues, ...cardValues]);

    // Assign shuffled values to each card
    cards.forEach(card => {
        card.innerHTML = "?";
        card.className = 'card';
    });

    numPlayers = getNumPlayers();
    if (numPlayers === "two") {
        document.getElementById('resultDisplay').innerText = "Player 1's turn";
        document.getElementById('scoreDisplay').innerText = "Player 1's Score: " + player1Score + "\nPlayer 2's Score: " + player2Score;
    } else {
        document.getElementById('resultDisplay').innerText = "";
        document.getElementById('scoreDisplay').innerText = "Score: " + player1Score;
    }
}

// Interact with the user by responding to clicks on the cards
// and changing the card state.
//
function handleCardPlayed(clickedCard, clickedCardIndex) {
    clickedCard.innerHTML = shuffledValues[clickedCardIndex]; // reveal card value
    flippedCards.push(clickedCard);
    clickedCard.classList.add('flip');
}

function handleCardClick(clickedCardEvent) {
    const clickedCard = clickedCardEvent.target;
    const clickedCardIndex = parseInt(clickedCard.getAttribute('data-card-index'));

    // Not a valid card to click
    if (clickedCard.innerHTML != "?" || !gameActive) {
        return;
    }

    handleCardPlayed(clickedCard, clickedCardIndex);
    updateGameStatus();
}

function updateGameStatus() {
    // Check if two cards are flipped
    if (flippedCards.length % 2 === 0) {
        // Update score
        if (numPlayers === "one") {
            player1Score++;
            document.getElementById('scoreDisplay').innerText = "Score: " + player1Score;
        }
        const firstCardIndex = flippedCards[flippedCards.length - 2].getAttribute("data-card-index");
        const secondCardIndex = flippedCards[flippedCards.length - 1].getAttribute("data-card-index");
        const firstCardValue = shuffledValues[firstCardIndex];
        const secondCardValue = shuffledValues[secondCardIndex];

        if (firstCardValue === secondCardValue) {
            // Matched
            matchedCards.push(cards[firstCardIndex]);
            if (numPlayers === "two") {
                if (currentPlayer === '1') {
                    player1Score++;
                } else {
                    player2Score++;
                }
                document.getElementById('scoreDisplay').innerText = "Player 1's Score: " + player1Score + "\nPlayer 2's Score: " + player2Score;
            }
            if (matchedCards.length === totalPairs) {
                // All pairs matched
                gameActive = false;
                if (numPlayers === "one") {
                    document.getElementById('resultDisplay').innerText = 'You win!';
                } else {
                    if (player1Score === player2Score) {
                        document.getElementById('resultDisplay').innerText = 'Tie game!';
                    } else if (player1Score > player2Score) {
                        document.getElementById('resultDisplay').innerText = 'Player 1 wins!';
                    } else {
                        document.getElementById('resultDisplay').innerText = 'Player 2 wins!';
                    }
                }
                return;
            }
        } else {
            // Not matched
            setTimeout(() => {
                cards[firstCardIndex].innerHTML = "?";
                cards[secondCardIndex].innerHTML = "?";
                flippedCards[flippedCards.length - 2].classList.remove("flip");
                flippedCards[flippedCards.length - 1].classList.remove("flip");
                flippedCards.pop();
                flippedCards.pop();
            }, 750);
            if (numPlayers === "two") {
                togglePlayer();
            }
        }
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === '1' ? '2' : '1';
    document.getElementById('resultDisplay').innerText = "Player " + currentPlayer + "'s turn";
}

