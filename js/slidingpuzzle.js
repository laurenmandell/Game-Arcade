let size = 4;
let numberOfTiles = size ** 2;
let blankedTileIndex = numberOfTiles;
let shuffled = false;

let buttonContainer = document.getElementById("tiles");

// Keyboard controls
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const UP_ARROW = 40;
const DOWN_ARROW = 38;
window.onkeydown = function (event) {
    console.log(event.keyCode);
    if (event.keyCode === RIGHT_ARROW) {
        swap(blankedTileIndex + 1);
    } else if (event.keyCode === LEFT_ARROW) {
        swap(blankedTileIndex - 1);
    } else if (event.keyCode === UP_ARROW) {
        swap(blankedTileIndex + size);
    } else if (event.keyCode === DOWN_ARROW) {
        swap(blankedTileIndex - size);
    }
};

newGame(true);

function newGame(isFirstGame) {
    if (!isFirstGame) {
        buttonContainer.innerHTML = "";
        const winTextDiv = document.getElementById("win-text");
        winTextDiv.innerHTML = "";
        blankedTileIndex = numberOfTiles;
    }

    loadTiles();

    shuffled = false;
    setTimeout(() => {
        shuffle();
    }, 100);
}

// Create buttons
function loadTiles() {
    for (let b = 1; b <= numberOfTiles; b++) {
        // Create a new tile element
        var newTile = document.createElement("button");

        // Assign the id
        newTile.id = `btn${b}`;

        // Give the tile an attribute called `index` and set it to `b`
        newTile.setAttribute("index", b);

        // Set the text (innerHTML) to b so we see the tile's number on screen
        newTile.innerHTML = b;

        // Give it the class `btn`
        newTile.classList.add("btn");

        // Add a listener for a mouse click and when heard call the `swap(...)` function
        // passing in this button's index number from above
        newTile.addEventListener("click", function () {
            swap(parseInt(this.getAttribute("index")));
        });

        // Insert the button into the container element
        buttonContainer.append(newTile);
    }

    blankedTileId = "btn" + blankedTileIndex;
    firstBlankedTile = document.getElementById(blankedTileId);
    firstBlankedTile.classList.add("blanked");
}

function shuffle() {
    let minShuffles = 100;
    let totalShuffles =
        minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 4);
            let direction = 0;
            if (x == 0) {
                direction = blankedTileIndex + 1;
            } else if (x == 1) {
                direction = blankedTileIndex - 1;
            } else if (x == 2) {
                direction = blankedTileIndex + size;
            } else if (x == 3) {
                direction = blankedTileIndex - size;
            }
            swap(direction);
            checkHasWon();
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
}

// Swap tiles
function swap(clicked) {
    // Double-check we've clicked a legit tile
    if (clicked < 1 || clicked > numberOfTiles) {
        return;
    }

    // Check if we are trying to swap right
    if (clicked == blankedTileIndex + 1) {
        if (clicked % size != 1) {
            setBlanked(clicked);
        }
        // Check if we are trying to swap left
    } else if (clicked == blankedTileIndex - 1) {
        if (clicked % size != 0) {
            setBlanked(clicked);
        }
        // Check if we are trying to swap up
    } else if (clicked == blankedTileIndex + size) {
        setBlanked(clicked);
        // Check if we are trying to swap down
    } else if (clicked == blankedTileIndex - size) {
        setBlanked(clicked);
    }

    if (shuffled) {
        if (checkHasWon()) {
            const winTextDiv = document.getElementById("win-text");
            winTextDiv.innerHTML = "You won!";
            const tiles = document.querySelectorAll(".btn");
            for (const tile of tiles) {
                tile.style.pointerEvents = "none"; // disable clicking each tile
            }
        }
    }
}

function checkHasWon() {
    var hasWon = true; // assume we've won

    for (let b = 1; b <= numberOfTiles; b++) {
        // scan from top left to bottom right

        // Get the b-th tile
        currentTile = document.getElementById(`btn${b}`);

        // Get it's index
        currentTileIndex = currentTile.getAttribute("index");

        // Get it's text
        currentTileValue = currentTile.innerHTML;

        if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
            hasWon = false;
        }
    }
    return hasWon;
}

// Moves the tile that's been selected by the user, making this selected tile the blank one onscreen
// Effectively, we're swapping the clicked tile's text and css with the blank one
function setBlanked(index) {
    // Get the currently empty square
    currentBlankTile = document.getElementById(`btn${blankedTileIndex}`);

    // Get the currently empty square's text
    currentBlankTileText = currentBlankTile.innerHTML;

    // Unmark it as `selected`
    currentBlankTile.classList.remove("blanked");

    // Get the `index`-th tile (during the game it's the one that's clicked on or moved by the user)
    tileToMove = document.getElementById(`btn${index}`);

    // Pass the text of the moving tile to the blank one
    currentBlankTile.innerHTML = tileToMove.innerHTML;

    // Pass in the blank tile to the one that's moving
    tileToMove.innerHTML = currentBlankTileText;

    // Set the class of the tile to be moved so that's it's now `selected` and therefore blank onscreen
    tileToMove.classList.removeAll;
    tileToMove.classList.add("blanked");

    // Set the global iVar to indicate which is the blank square now
    blankedTileIndex = index;
}
