const cards = document.querySelectorAll('.card');
let gameActive = true;
let flippedCards = [];
let matchedCards = [];
let numTurns = 0; // score
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

// whenever the user clicks the restart game button
// we initialize the game state
function restartGame() {
    gameActive = true;
    flippedCards = [];
    matchedCards = [];
    // document.getElementById('resultDisplay').innerText = "Player 1's turn";

    // Shuffle the card values array 
    shuffledValues = shuffleCards([...cardValues, ...cardValues]);

    // Assign shuffled values to each card
    cards.forEach(card => {
        card.innerHTML = "?";
        card.className = 'card';
    });
}

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
        numTurns++
        // Update score
        document.getElementById('scoreDisplay').innerText = "Score: " + numTurns;
        const firstCardIndex = flippedCards[flippedCards.length - 2].getAttribute("data-card-index");
        const secondCardIndex = flippedCards[flippedCards.length - 1].getAttribute("data-card-index");
        const firstCardValue = shuffledValues[firstCardIndex];
        const secondCardValue = shuffledValues[secondCardIndex];

        if (firstCardValue === secondCardValue) {
            // Matched
            matchedCards.push(cards[firstCardIndex]);

            if (matchedCards.length === totalPairs) {
                // All pairs matched
                gameActive = false;
                document.getElementById('resultDisplay').innerText = 'You win!';
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
            }, 1000);
        }

    }
}

