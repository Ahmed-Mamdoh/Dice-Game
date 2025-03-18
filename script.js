'use strict';

// Select elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHow = document.querySelector('.btn--how-to-play');
const howModal = document.querySelector('.how-to-play');
const blurModal = document.querySelector('.blur');

// functions
const toggleActivePlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Close Modal function

const closeHowToPlayModal = () => {
  howModal.classList.add('hidden');
  blurModal.classList.add('hidden');
};
// starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

// rolling dice functionality
btnRoll.addEventListener('click', () => {
  // Generate random dice number
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display dice number
  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${dice}.png`;

  // Check for 1
  if (dice !== 1) {
    if (player0.classList.contains('player--active'))
      current0EL.textContent = Number(current0EL.textContent) + dice;
    else current1EL.textContent = Number(current1EL.textContent) + dice;
  } else {
    if (player0.classList.contains('player--active'))
      current0EL.textContent = 0;
    else current1EL.textContent = 0;
    // Switch to next player
    toggleActivePlayer();
    diceEL.classList.add('hidden');
  }
});

// Hold button functionality
btnHold.addEventListener('click', () => {
  // Add current score to the active player's score
  if (player0.classList.contains('player--active')) {
    // cant hold on 0
    if (current0EL.textContent == 0) return;
    diceEL.classList.add('hidden');
    score0EL.textContent =
      Number(score0EL.textContent) + Number(current0EL.textContent);
    current0EL.textContent = 0;
  } else {
    if (current1EL.textContent == 0) return;
    diceEL.classList.add('hidden');

    score1EL.textContent =
      Number(score1EL.textContent) + Number(current1EL.textContent);
    current1EL.textContent = 0;
  }

  if (score0EL.textContent >= 50 || score1EL.textContent >= 50) {
    document.querySelector('.player--active').classList.add('player--winner');
    diceEL.classList.add('hidden');
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    toggleActivePlayer();
  }
});

// New game functionality
btnNew.addEventListener('click', () => {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceEL.classList.add('hidden');
  btnRoll.disabled = false;
  btnHold.disabled = false;
  document.querySelector('.player--winner')?.classList.remove('player--winner');
  if (player1.classList.contains('player--active')) toggleActivePlayer();
});

// How to play modal functionality

btnHow.addEventListener('click', () => {
  howModal.classList.remove('hidden');
  blurModal.classList.remove('hidden');
});

// Close modal
blurModal.addEventListener('click', () => {
  closeHowToPlayModal();
});

document.getElementsByTagName('body')[0].addEventListener('keydown', e => {
  if (e.key === 'Escape') closeHowToPlayModal();
});
