const showHistoryButton = document.querySelector("#result :nth-child(2)");
const homeButton = document.querySelector("#home-button");
const prevButton = document.querySelector("#prev-button");
const autoPlayButton = document.querySelector("#autoplay-button");
const nextButton = document.querySelector("#next-button");
const endButton = document.querySelector("#end-button");
const historyBoard = document.querySelector("#boardHistory");
const historyBlocks = document.querySelectorAll(".blockH");
const moveText = document.querySelector("#history :first-child");
const refreshButton = document.querySelector("#history > button");

showHistoryButton.addEventListener("click", showHistory);
prevButton.addEventListener("click", showPrev);
nextButton.addEventListener("click", showNext);
homeButton.addEventListener("click", showStart);
endButton.addEventListener("click", showEnd);
autoPlayButton.addEventListener("click", autoPlay);
refreshButton.addEventListener("click", refreshGame);

let historyState;

function showHistory() {
  result.classList.add(HIDDEN_KEY);
  history.classList.remove(HIDDEN_KEY);
  game.classList.add(HIDDEN_KEY);
  historyState = matchHistory.length - 1;
  printHistory();
}

function printHistory() {
  boardState = JSON.parse(matchHistory[historyState]);
  let flatBoard = boardState.flat();
  printBoard(flatBoard);
  printMoveNumber();
}

function printBoard(flatBoard) {
  for (let i = 0; i <= 8; i++) {
    let B = flatBoard;
    if (B[i] === "x") {
      historyBlocks[i].innerHTML = `<img src=${X_PATH}>`;
    } else if (B[i] === "o") {
      historyBlocks[i].innerHTML = `<img src=${O_PATH}>`;
    } else {
      historyBlocks[i].innerHTML = ``;
    }
  }
}

function printMoveNumber() {
  if (historyState == 0) {
    moveText.innerHTML = "start";
  } else if (historyState < matchHistory.length - 1) {
    moveText.innerHTML = `move ${historyState}`;
  } else {
    moveText.innerHTML = endGameResult.innerHTML;
  }
}

function printBlank() {
  historyBlocks.forEach((block) => {
    block.innerHTML = "";
  });
  printMoveNumber();
}

function showPrev() {
  if (historyState <= 0){
    historyState = 0
  } else {
    historyState--;
  }
  if (historyState > 0) {
    printHistory();
  } else {
    printBlank();
    historyState = 0;
  }
}

function showNext() {
  historyState++;
  if (historyState < matchHistory.length) {
    printHistory();
  } else {
    historyState--;
  }
}

function showStart() {
  historyState = 0;
  printBlank();
}

function showEnd() {
  historyState = matchHistory.length - 1;
  printHistory();
}

function autoPlay() {
  historyState = -1;
  playLoop();
}

function playLoop() {
  historyState++;
  if (historyState < matchHistory.length) {
    if (historyState == 0) {
      printBlank();
    } else {
      printHistory();
    }
    setTimeout(playLoop, 1000);
  } else {
    historyState = matchHistory.length - 1;
  }
}

function refreshGame() {
  window.location.reload();
}
