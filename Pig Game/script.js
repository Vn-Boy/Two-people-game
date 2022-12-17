const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const currentall = document.querySelectorAll(".current-score");
const scoreall = document.querySelectorAll(".score");
// Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
const scores = [0, 0];
diceEL.classList.add("hidden");
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const scorefunction = function () {
  for (let i = 0; i < scoreall.length; i++) {
    scoreall[i].textContent = 0;
  }
};
const curfunction = function () {
  for (let i = 0; i < currentall.length; i++) {
    currentall[i].textContent = 0;
  }
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
btnhold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEL.classList.add("hidden");
    } else switchPlayer();
  }
});
btnNew.addEventListener("click", function () {
  document.querySelector(".player--1").classList.remove("player--active");
  player0El.classList.add("player--active");
  curfunction();
  scorefunction();
  activePlayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  playing = true;
  diceEL.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
});
