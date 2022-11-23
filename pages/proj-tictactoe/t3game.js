const start = document.getElementById("start-game");
const game = document.getElementById("game");
const board = document.getElementById("board");

const block = document.querySelectorAll(".block");
const result = document.getElementById("result");
const oneInput = document.getElementById("player-01");
const twoInput = document.getElementById("player-02");
const nameSubmitButton = document.getElementById("start-button");
const nameDisplay = document.querySelector("#game :nth-child(2)");
const turnDisplay = document.querySelector("#game :first-child");
const history = document.getElementById("history");
const boardElements = document.querySelectorAll(".board");
const endGameResult = document.querySelector("#result :first-child");
const blocks = document.getElementsByClassName("block");

const HIDDEN_KEY = "hidden";
const MATCHHISTORY_KEY = "match-history";
const PLAYER1_KEY = "player1";
const PLAYER2_KEY = "player2";
const X_PATH = "icons/x-mark.svg";
const O_PATH = "icons/o-mark.svg";
const X_TURN = "x";
const O_TURN = "o";
const X_HOVER_KEY = "hover-x";
const O_HOVER_KEY = "hover-o";

const matchHistory = [];
let boardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let playerXName = "";
let playerOName = "";

//start game

game.classList.add(HIDDEN_KEY);
result.classList.add(HIDDEN_KEY);
history.classList.add(HIDDEN_KEY);

//start button clicked
nameSubmitButton.addEventListener("click", onNameSubmit);

function onNameSubmit() {
  saveNames();
  pushMatch();
  saveMatchHistory();
  displayGame();
}

function saveNames() {
  playerXName = oneInput.value;
  if (playerXName === "") {
    playerXName = "X";
  }
  playerOName = twoInput.value;
  if (playerOName === "") {
    playerOName = "O";
  }
}

function pushMatch() {
  let gameDate = Date.now();
  let gameMatchObj = {
    id: gameDate,
    playerOne: playerXName,
    playerTwo: playerOName,
  };
  matchHistory.push(gameMatchObj);
}

function saveMatchHistory() {
  localStorage.setItem(MATCHHISTORY_KEY, JSON.stringify(matchHistory));
}

//start game

let gameTurn = true;

function displayGame() {
  start.classList.add(HIDDEN_KEY);
  game.classList.remove(HIDDEN_KEY);
  displayName();
  addHoverClass();
}

function displayName() {
  if (gameTurn === true) {
    nameDisplay.innerHTML = `it's your turn ${playerXName}`;
    turnDisplay.innerHTML = `<img src=${X_PATH}>`;
  } else {
    nameDisplay.innerHTML = `place your mark ${playerOName}`;
    turnDisplay.innerHTML = `<img src=${O_PATH}>`;
  }
}

block.forEach((unit) => {
  unit.addEventListener("click", uponClickingBlock, { once: true });
});

function uponClickingBlock(e) {
  let unitBlock = e.target;
  let boardCode = Array.from(blocks).indexOf(unitBlock);
  let playerTurn = gameTurn ? X_TURN : O_TURN;

  printBlock(unitBlock, playerTurn);
  saveGameTurn(boardCode, playerTurn);
  checkForWin(playerTurn);
  endOrSwap(playerTurn);
}

function addHoverClass() {
  for (let i = 0; i < 9; i++) {
    if (blocks[i].innerHTML == "") {
      if (gameTurn === true) {
        blocks[i].classList.add(X_HOVER_KEY);
      } else {
        blocks[i].classList.add(O_HOVER_KEY);
      }
    }
  }
}

function removeHoverClass() {
  for (let i = 0; i < 9; i++) {
    if (gameTurn === true) {
      blocks[i].classList.remove(O_HOVER_KEY);
    } else {
      blocks[i].classList.remove(X_HOVER_KEY);
    }
  }
}

function printBlock(unitBlock, playerTurn) {
  if (playerTurn == O_TURN) {
    imgPath = O_PATH;
  } else imgPath = X_PATH;
  unitBlock.innerHTML = `<img src=${imgPath}>`;
}

//state of the board
/*index for 2d array 

      0 1 2
   0 [0,1,2],
   1 [3,4,5],
   2 [6,7,8],

*/

function saveGameTurn(boardCode, playerTurn) {
  newBoardState(boardCode, playerTurn);
  let boardObj = JSON.stringify(boardState);
  matchHistory.splice(matchHistory.length, 0, boardObj);
}

function newBoardState(boardCode, playerTurn) {
  for (let i = 0; i < 9; i++) {
    if (boardCode == i) {
      if (i < 3) {
        boardState[0][i] = playerTurn;
      } else if (i < 6) {
        boardState[1][i - 3] = playerTurn;
      } else {
        boardState[2][i - 6] = playerTurn;
      }
    }
  }
}

function checkForWin(playerTurn) {
  if (checkWinHorizontal() === true) {
    return true;
  } else if (checkWinVertical() === true) {
    return true;
  } else if (checkWinDiagonal() === true) {
    return true;
  } else return false;
}

function checkWinHorizontal() {
  let B = boardState;
  for (let i = 0; i <= 2; i++) {
    if (B[i][0] !== "" && B[i][0] === B[i][1] && B[i][1] === B[i][2]) {
      return true;
    }
  }
}

function checkWinVertical() {
  let B = boardState;
  for (let i = 0; i <= 2; i++) {
    if (B[0][i] !== "" && B[0][i] === B[1][i] && B[1][i] === B[2][i]) {
      return true;
    }
  }
}

function checkWinDiagonal() {
  let B = boardState;
  for (let i = 0, j = 2; i <= 2; i = i + 2, j = j - 2) {
    if (B[1][1] !== "" && B[1][1] === B[i][0] && B[i][0] === B[j][2]) {
      return true;
    }
  }
}

function checkForDraw() {
  let B = boardState;
  let emptyCellArr = [];
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      if (B[i][j] === "") {
        emptyCellArr.push(B[i][j]);
      }
    }
  }
  if (emptyCellArr.length === 0) {
    return true;
  }
}

function endOrSwap(playerTurn) {
  if (
    checkForWin(playerTurn) === true 
  ) {
    let gameResult = "win";
    endGame(playerTurn, gameResult);
  } else if (checkForDraw() === true) {
    let gameResult = "draw";
    endGame(playerTurn, gameResult);
  } else swapPlayer();
}


function swapPlayer() {
  gameTurn = !gameTurn;
  removeHoverClass();
  addHoverClass();
  displayName();
}

function endGame(playerTurn, gameResult) {
  localStorage.setItem(MATCHHISTORY_KEY, JSON.stringify(matchHistory));
  printResult(playerTurn, gameResult);
  nameDisplay.classList.add(HIDDEN_KEY);
  turnDisplay.classList.add(HIDDEN_KEY);
  result.classList.remove(HIDDEN_KEY);
}

function printResult(playerTurn, gameResult) {
  if (gameResult === "win") {
    if (playerTurn === X_TURN) {
      endGameResult.innerHTML = `${playerXName} wins!`;
    } else {
      endGameResult.innerHTML = `${playerOName} wins!`;
    }
  } else {
    endGameResult.innerHTML = "it's a draw!";
  }
}
