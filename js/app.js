import { timerInterval } from "./timer.js";
import { elementsObject, elementColorsObject } from "./elementsObj.js";

const uniqueCards = {
  easy: 6,
  medium: 9,
  hard: 12,
};

let difficulty = sessionStorage.getItem("difficulty");
let theme = sessionStorage.getItem("theme");

if (difficulty === null) {
  difficulty = "easy";
}

if (theme === null) {
  theme = "cards-theme";
}

let themeObject;
switch (theme) {
  case "cards-theme":
    themeObject = elementsObject;
    break;
  case "colors-theme":
    themeObject = elementColorsObject;
    break;
}
let sumRansom;
switch (theme) {
  case "cards-theme":
    sumRansom = 52;
    break;
  case "colors-theme":
    sumRansom = 12;
    break;
}

const modalContainer = document.getElementById("modal-container");
let userCorrectCouples = 0;
let incorrectGuessCounter = document.querySelector("#incorrect-counter");
const MAX_COUPLES = uniqueCards[difficulty];

export const gameBoard = document.querySelector(".grid");
export let shuffledArray = shuffle(chooseRandomCards(MAX_COUPLES));

gameBoard.classList.add(difficulty);

function chooseRandomCards(numOfCouples) {
  let array1 = [];

  while (array1.length < numOfCouples) {
    let randomNum = Math.floor(Math.random() * sumRansom) + 1;
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
    front.classList.add(themeObject[arr[i]]);
    front.classList.add("flip-card-front");
    cardContainer.appendChild(front);
    const back = document.createElement("div");
    back.classList.add("flip-card-back");
    cardContainer.appendChild(back);
  }
}

export function cardHandler(e) {
  if (
    e.target.dataset.active === "untouchable" ||
    e.target.dataset.pause === "true"
  ) {
    return;
  }
  if (e.target === e.currentTarget) return;
  e.target.dataset.active = "true";
  e.target.firstElementChild.classList.add("show");
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
  if (card1.dataset.card === card2.dataset.card) {
    correctGuess(card1, card2);
    return true;
  } else {
    incorrectGuess(card1, card2);
    incorrectGuessCounter.innerHTML++;
    return false;
  }
}

function incorrectGuess(card1, card2) {
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
  if (userCorrectCouples === MAX_COUPLES) {
    clearInterval(timerInterval);
    modalContainer.classList.add("show-message");
  }
}
