// defining variables
// This is defining the cell locations by finding them with the cell class in the DOM(document)
let cells = document.querySelectorAll('.cell');

// this is defining the text used for the status of the current player, winner or draw and getting the 
// the location from the DOM with a selector that uses an id
let statusText = document.querySelector('#statusText');

// defining the button used for restarting the game that is found in the DOM with the id called restartBtn
let restartBtn = document.querySelector('#restartBtn');

// defining all of the available winning combinations
let win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

// defining the starting data in the cells which are empty strings that will later be updated with X or O
let options = ['', '', '', '', '', '','', '', ''];

// defining the current player so that can be changed later in the game
let currentPlayer = 'X';

// defining if the game is running or not, will need to know this for checking for functions
let running = false;

// This is where the startGame() function is called
startGame();

// This is how the game starts, using the start game function
// this says that the game is running, that it is X's turn, the restart button is available to click
// and the puts an event listener so when the cell is clicked it gets the cell index from
// the cellClicked function
function startGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

// This is the function for what to do when a cell is clicked and if the cell is not empty or the game
// is not running if the game is running then we get the index of the cell
// then the cell is updated with the updateCell() function and then the check is done to see if a winner
// can be determined yet with the checkWinner() function
function cellClicked(){
    let cellIndex = this.getAttribute('cellIndex');

    if(options[cellIndex] != '' || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

// This is the function to update the cell content, first the cell is determined by the cell index
// then the current player is determined so the cell text can be updated to the current player indicator
// of either X or O
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// This is the funciton to change the play for each round of game play
// It looks at the current player determines who the player is and then changes the player to 
//  the next player and then alerts which player is currently playing
function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

// Checks to see if the round has been won. This is done through a function that starts out as 
// variable with boolean saying the round has not been won then moves into a for loop
// The for loop moves through each of the winning combinations checking the three spots of each
// of the cells in a row and then compares that data between the three cells if the cells are empty
// and if the cells have data if that data is the same or equal to each other then the round has been won
// Then if the round has been won the alert status declares winner and the game is over, if all the spaces are full
// and there is NOT a winner then the alert will declare draw and if neither case are true the changePlayer function
// will be called and ran
function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < win.length; i++){
        const condition = win[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} WINS`;
        running = false;
    }
    else if (!options.includes('')){
        statusText.textContent = `draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
}

// This is the function to restart the game after it has been played and a winner or draw has been determined.
// This compares the cells data/text if it is empty or has input then changes all the cell input/data to 
// empty strings in each cell, sets the current player as X and the game is running
function restartGame(){
    currentPlayer = 'X';
    options = ['', '', '', '', '', '','', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}
