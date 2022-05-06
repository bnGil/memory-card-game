import { drawBoard, gameBoard, shuffledArray, cardHandler } from "./app.js";
import { startTimer } from "./timer.js";

function startGame() {
  drawBoard(gameBoard, shuffledArray);
  gameBoard.addEventListener("click", cardHandler);
  startTimer();
}

startGame();
