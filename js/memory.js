const cards = document.querySelectorAll('.card');
let currentPlayer = '1'; // Player 1 always goes first
let numPlayers = "one"; // Default to 1 player
let gameActive = false; // User clicks start button to start a game
let flippedCards = [];
let matchedCards = [];
let player1Score = 0;
let player2Score = 0;
const totalPairs = cards.length / 2;

// Array to hold the values for each pair of cards
const cardValues = ['🌸', '💕', '👑', '🎀', '🦄', '🦋', '🌈', '🌟'];

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

// Get the number of players from the radio button
function getNumPlayers() {
    let radios = document.getElementsByName('numPlayers');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

numPlayers = getNumPlayers();

// Whenever the user clicks the restart game button
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

    // Display different results depending on number of players
    numPlayers = getNumPlayers();
    if (numPlayers === "two") {
        document.getElementById('resultDisplay').innerText = "Player 1's turn";
        document.getElementById('scoreDisplay').innerText = "Player 1's Matches: " + player1Score + "\nPlayer 2's Matches: " + player2Score;
    } else {
        document.getElementById('resultDisplay').innerText = "";
        document.getElementById('scoreDisplay').innerText = "Turns Taken: " + player1Score;
    }
}

// Interact with the user by responding to clicks on the cards
// and changing the card state.
function handleCardPlayed(clickedCard, clickedCardIndex) {
    clickedCard.innerHTML = shuffledValues[clickedCardIndex]; // Reveal card value
    flippedCards.push(clickedCard);
    // Display a different colored flip for each player
    if (currentPlayer === '1') {
        clickedCard.classList.add('flip');
    } else {
        clickedCard.classList.add('flip2');
    }
}

function handleCardClick(clickedCardEvent) {
    const clickedCard = clickedCardEvent.target;
    const clickedCardIndex = parseInt(clickedCard.getAttribute('data-card-index'));

    // Not a valid card to click
    if (clickedCard.innerHTML != "?" || !gameActive) {
        return;
    }

    // we respond to a click by handling the cell that has been played
    // and then updating the overall game status
    handleCardPlayed(clickedCard, clickedCardIndex);
    updateGameStatus();
}

function updateGameStatus() {
    // Check if two cards are flipped
    if (flippedCards.length % 2 === 0) {
        // Update score
        if (numPlayers === "one") {
            player1Score++;
            document.getElementById('scoreDisplay').innerText = "Turns Taken: " + player1Score;
        }
        const firstCardIndex = flippedCards[flippedCards.length - 2].getAttribute("data-card-index");
        const secondCardIndex = flippedCards[flippedCards.length - 1].getAttribute("data-card-index");
        const firstCardValue = shuffledValues[firstCardIndex];
        const secondCardValue = shuffledValues[secondCardIndex];

        if (firstCardValue === secondCardValue) {
            // There is a match
            matchedCards.push(cards[firstCardIndex]);
            if (numPlayers === "two") {
                if (currentPlayer === '1') {
                    player1Score++;
                } else {
                    player2Score++;
                }
                document.getElementById('scoreDisplay').innerText = "Player 1's Matches: " + player1Score + "\nPlayer 2's Matches: " + player2Score;
            }
            if (matchedCards.length === totalPairs) {
                // All pairs have been matched
                gameActive = false; // Game over
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
            // There is not a match
            setTimeout(() => {
                cards[firstCardIndex].innerHTML = "?";
                cards[secondCardIndex].innerHTML = "?";
                flippedCards[flippedCards.length - 2].classList.remove("flip");
                flippedCards[flippedCards.length - 1].classList.remove("flip");
                flippedCards[flippedCards.length - 2].classList.remove("flip2");
                flippedCards[flippedCards.length - 1].classList.remove("flip2");
                flippedCards.pop();
                flippedCards.pop();
            }, 750);
            if (numPlayers === "two") {
                togglePlayer();
            }
        }
    }
}

// Switch current player
function togglePlayer() {
    currentPlayer = currentPlayer === '1' ? '2' : '1';
    document.getElementById('resultDisplay').innerText = "Player " + currentPlayer + "'s turn";
}

