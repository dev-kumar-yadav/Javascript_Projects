// Selecting all the required DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Variable to track the current turn (true = O, false = X)
let turnO = true; 

// All possible winning combinations for a 3x3 tic-tac-toe grid
const winPatterns = [
    [0, 1, 2], // Top row
    [0, 3, 6], // Left column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [2, 4, 6], // Diagonal from top-right to bottom-left
    [3, 4, 5], // Middle row
    [6, 7, 8]  // Bottom row
];

// Resets the game to the initial state
const resetGame = () => {
    turnO = true;              // Set turn back to O
    enableBoxes();             // Clear the board
    msgContainer.classList.add("hide");  // Hide the winner/draw message
    count = 0;                 // Reset move count
}

let count = 0; // Count number of moves made, used to detect a draw

// Add click event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Set box text and switch turns
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;  // Prevent re-clicking the same box
        count++;              // Increment move count
        checkWinner();        // Check for a winner or draw
    });
});

// Enables all boxes (used during reset or new game)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";  // Clear text
    }
}

// Disables all boxes (used after game ends)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// Displays winner message and disables the board
const showWinner = (winner) => {
    msgContainer.classList.remove("hide");
    msg.innerText = `Winner is ${winner}`;
    disableBoxes();
}

// Check if there's a winner or a draw
const checkWinner = () => {
    let win = false;
    for (let pattern of winPatterns) {
        // Destructure box values for the current winning pattern
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        // Check if all three boxes are same and not empty
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1); // Display the winner
                win = true;
            }
        }
    }

    // If all boxes are filled and no winner, it's a draw
    if (count === 9 && win === false) {
        msgContainer.classList.remove("hide");
        msg.innerText = "Match Draw";
        disableBoxes();
    }
}

// Add click event listeners for new game and reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
