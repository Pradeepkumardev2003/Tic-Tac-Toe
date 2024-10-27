// Select all the boxes in the game grid
let boxes = document.querySelectorAll(".box");

// Initialize the game state
let turn = "X"; // Current player, either "X" or "O"
let isGameOver = false; // Flag to check if the game is over

// Add event listeners to each box for the click event
boxes.forEach(e => {
    e.innerHTML = ""; // Clear the content of the box
    e.addEventListener("click", () => {
        // Only proceed if the game is not over and the box is empty
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn; // Set the content of the box to the current player's turn
            checkWin(); // Check if the current move results in a win
            checkDraw(); // Check if the game is a draw
            changeTurn(); // Switch to the next player's turn
        }
    });
});

// Function to change the turn between "X" and "O"
function changeTurn() {
    if (turn === "X") {
        turn = "O"; // Change turn to "O"
        document.querySelector(".bg").style.left = "85px"; // Move the background indicator
    } else {
        turn = "X"; // Change turn to "X"
        document.querySelector(".bg").style.left = "0"; // Move the background indicator
    }
}

// Function to check for a winning condition
function checkWin() {
    // Winning conditions as arrays of box indices
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    // Iterate through each winning condition
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // Check if all three boxes in the condition have the same value and are not empty
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true; // Set the game state to over
            document.querySelector("#results").innerHTML = turn + " wins"; // Display the winning message
            document.querySelector("#play-again").style.display = "inline"; // Show the "Play Again" button

            // Highlight the winning boxes
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08d9d6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

// Function to check if the game is a draw
function checkDraw() {
    if (!isGameOver) {
        let isDraw = true; // Assume it's a draw unless proven otherwise
        // Check each box to see if any are still empty
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });
        // If all boxes are filled and no winner, it's a draw
        if (isDraw) {
            isGameOver = true; // Set the game state to over
            document.querySelector("#results").innerHTML = "Draw"; // Display the draw message
            document.querySelector("#play-again").style.display = "inline"; // Show the "Play Again" button
        }
    }
}

// Add event listener to the "Play Again" button
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false; // Reset the game state
    turn = "X"; // Reset the turn to "X"
    document.querySelector(".bg").style.left = "0"; // Move the background indicator to "X"
    document.querySelector("#results").innerHTML = ""; // Clear the results message
    document.querySelector("#play-again").style.display = "none"; // Hide the "Play Again" button

    // Clear the content and styles of each box
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});
