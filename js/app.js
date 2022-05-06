export const gameBoard = document.querySelector(".grid");
export let shuffledArray = shuffle(chooseRandomCards());

import { timerInterval } from "./timer.js";

const modalContainer = document.getElementById("modal-container");

let userCorrectCouples = 0;
const MAX_CORRECT_GUESSES = 6;

const elementsObject = {
  1: "club-1",
  2: "club-2",
  3: "club-3",
  4: "club-4",
  5: "club-5",
  6: "club-6",
  7: "club-7",
  8: "club-8",
  9: "club-9",
  10: "club-10",
  11: "club-11",
  12: "club-12",
  13: "club-13",
  14: "heart-1",
  15: "heart-2",
  16: "heart-3",
  17: "heart-4",
  18: "heart-5",
  19: "heart-6",
  20: "heart-7",
  21: "heart-8",
  22: "heart-9",
  23: "heart-10",
  24: "heart-11",
  25: "heart-12",
  26: "heart-13",
  27: "diamond-1",
  28: "diamond-2",
  29: "diamond-3",
  30: "diamond-4",
  31: "diamond-5",
  32: "diamond-6",
  33: "diamond-7",
  34: "diamond-8",
  35: "diamond-9",
  36: "diamond-10",
  37: "diamond-11",
  38: "diamond-12",
  39: "diamond-13",
  40: "spade-1",
  41: "spade-2",
  42: "spade-3",
  43: "spade-4",
  44: "spade-5",
  45: "spade-6",
  46: "spade-7",
  47: "spade-8",
  48: "spade-9",
  49: "spade-10",
  50: "spade-11",
  51: "spade-12",
  52: "spade-13",
};

function chooseRandomCards() {
  let array1 = [];

  while (array1.length < 6) {
    let randomNum = Math.floor(Math.random() * 52) + 1;
    if (!array1.includes(randomNum)) {
      array1.push(randomNum);
    }
  }
  let array2 = [...array1];
  let myArray = array1.concat(array2);
  return myArray;
}

function shuffle(array) {
  let randomIndex;
  let shuffledArray = [];
  while (array.length != 0) {
    randomIndex = Math.floor(Math.random() * array.length);
    shuffledArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return shuffledArray;
}

export function drawBoard(gameBoard, arr) {
  for (let i = 0; i < arr.length; i++) {
    const card = document.createElement("div");
    card.dataset.active = "false";
    card.dataset.card = arr[i];
    card.classList.add("card");
    gameBoard.appendChild(card);
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    card.appendChild(cardContainer);
    const front = document.createElement("div");
    front.classList.add(elementsObject[arr[i]]);
    front.classList.add("flip-card-front");
    cardContainer.appendChild(front);
    const back = document.createElement("div");
    back.classList.add("flip-card-back");
    cardContainer.appendChild(back);
  }
}

// gameBoard.addEventListener("click", cardHandler);

export function cardHandler(e) {
  if (
    e.target.dataset.active === "untouchable" ||
    e.target.dataset.pause === "true"
  ) {
    return;
  }
  if (e.target === e.currentTarget) return;
  e.target.dataset.active = "true";
  e.target.firstElementChild.classList.toggle("show");
  const arrOfFlipCards = document.querySelectorAll(".card"); //arr of 12 divs with class "card"
  let twoCards = getTwoShownCards(arrOfFlipCards);
  if (twoCards.length < 2) {
    return;
  } else {
    arrOfFlipCards.forEach((card) => (card.dataset.pause = "true"));
    unpause(arrOfFlipCards);
    compareTwoCards(twoCards[0], twoCards[1]);
  }
}

function unpause(arrOfCards) {
  setTimeout(
    () => arrOfCards.forEach((card) => (card.dataset.pause = "false")),
    1000
  );
}

function getTwoShownCards(arrOfCards) {
  const shownCards = [];
  arrOfCards.forEach((card) => {
    if (card.dataset.active === "true") {
      shownCards.push(card);
    }
  });
  return shownCards;
}

function compareTwoCards(card1, card2) {
  console.log(card1.dataset.card);
  console.log(card2.dataset.card);
  if (card1.dataset.card === card2.dataset.card) {
    correctGuess(card1, card2);
    return true;
  } else {
    incorrectGuess(card1, card2);
    return false;
  }
}

function incorrectGuess(card1, card2) {
  console.log("bye");
  setTimeout(() => flipBack(card1), 1000);
  setTimeout(() => flipBack(card2), 1000);
  card1.dataset.active = "false";
  card2.dataset.active = "false";
}

function flipBack(card) {
  card.firstElementChild.classList.remove("show");
}

function correctGuess(card1, card2) {
  card1.dataset.active = "untouchable";
  card2.dataset.active = "untouchable";
  userCorrectCouples++;
  console.log(userCorrectCouples);
  if (userCorrectCouples === MAX_CORRECT_GUESSES) {
    clearInterval(timerInterval);
    modalContainer.classList.add("show-message");
  }
}
