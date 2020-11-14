const gameInstructions = document.getElementById('game-instructions'); // Query to get childEl
const comPallete = document.getElementById('com-pallete');
const playerPallete = document.getElementById('player-pallete');
const playBtn = document.getElementById('play-btn');
const messageBox = document.querySelector('#message');

const choices = [];
let playerSelected = [];

let min = 1,
  max = 20,
  maxChoices = 5,
  rand;

// Generate Number from 1 to max
function getRange() {
  for (let i = min; i <= max; i++) {
    choices.push(`${i}`);
  }
}

// Create choices btn
function createBtn(pallete, second = 'choice') {
  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.classList.add('btn', second);
    choice * 1 < 10
      ? (btn.textContent = `0${choice}`)
      : (btn.textContent = choice);
    const breakPoint = choice % 5;
    if (!breakPoint) {
      pallete.append(btn, document.createElement('br'));
    } else {
      pallete.appendChild(btn);
    }
  });
}
// Disable
function choiceCount() {
  const freeChoices = Array.from(playerPallete.children);
  freeChoices.forEach((node) => {
    node.className === 'btn player-choices'
      ? node.setAttribute('disabled', 'disabled')
      : '';
  });
}

// Activate keys
function activateCount() {
  const freeChoices = Array.from(playerPallete.children);
  console.log(freeChoices);
  freeChoices.forEach((node) => {
    node.className == 'btn player-choices'
      ? node.removeAttribute('disabled')
      : '';
  });
}

// Select Player's Choice and Validate
function selectAndValidate(el) {
  const found = playerSelected.find((element) => element == el.textContent);
  if (!found) {
    el.classList.add('selected');
    const getValue = el.textContent;
    playerSelected.push(getValue);
  } else {
    el.classList.remove('selected');
    const index = playerSelected.indexOf(found);
    playerSelected.splice(index, 1);
    activateCount();
  }

  playerSelected.length === maxChoices ? choiceCount() : false;
}

// Get Player's Selected Choices
function getSelectedChoices(e) {
  const el = e.target;
  if (el.classList.contains('player-choices')) {
    selectAndValidate(el);
  }
}

// Update Dom
function updateDOM() {
  gameInstructions.querySelector('#max').textContent = max;
  gameInstructions.querySelector('#guess-count').textContent = maxChoices;
}
updateDOM();

// ////////////////////////////////////////////////////
// COMPUTER

playerPallete.addEventListener('click', getSelectedChoices);
playBtn.addEventListener('click', playGame);

getRange();
// Player Chioces
createBtn(playerPallete, 'player-choices');

// Create Computer choices
createBtn(comPallete);

// TODO: Save to Choices from localStorage

function comChoice() {
  rand = Math.ceil(Math.random() * Math.ceil(max));
  const comChoices = Array.from(comPallete.children);
  comChoices[rand + 1].classList.add('selected');
}

// Function Play game
function playGame() {
  if (playerSelected.length === maxChoices) {
    comChoice();
  } else {
    errorMessage('error', 'Please Make all your Choices');
  }
  setTimeout(() => {
    winOrLoss();
  }, 2000);
}

// Create Error Messge
function errorMessage(state, message) {
  const err = document.createElement('div');
  err.classList.add('message', state);
  err.textContent = message;
  messageBox.appendChild(err);
  setTimeout(() => {
    messageBox.remove(messageBox.children);
  }, 5000);
}

// Wind or Loose
function winOrLoss() {
  const x = playerSelected.find((el) => el == rand);
  console.log(`x- ${playerSelected} : y- ${rand}`);
  if (x) {
    errorMessage('success', 'Congratulations!! You Won');
  } else {
    errorMessage('error', 'Sorry! Try again');
  }
}
