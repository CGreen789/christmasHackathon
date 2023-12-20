// Variables
const container = document.querySelector(".container");
const startButton = document.querySelector(".start-button");
const cursor = document.querySelector(".cursor");
const buttonContainer = document.querySelector('.button-container');
const scoreBox = document.querySelector('.score-box');
const timerDisplay = document.getElementById('timer');
const scoreCard = document.querySelector('.scoreboard-score')
const star1 = document.querySelector('.star1')
const star2 = document.querySelector('.star2')
const star3 = document.querySelector('.star3')
// Function to handle space bar press on Intro screen
function handleKeyPress(event) {
  if (event.code === "Space") {
    showGame();
  }
}

// Function to show the game screen and start the game
function showGame() {
  const introductionDiv = document.querySelector(".introduction");
  const gameDiv = document.querySelector(".game");

  // Hide introduction, show game
  introductionDiv.style.display = "none";
  gameDiv.style.display = "block";
}

// Event listener for space bar press
document.addEventListener("keydown", handleKeyPress);

// Scoring
let score = 0;

// Tracking game state
let gameStarted = false;
let intervalId;

// Timer
let timer = 30;
let timerInterval;
let burglarSpeed = 1500;

// Cursor movement
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

// Sounds
const baubleSound       = new Audio('./assets/woosh-bauble-throw (1).mp3')
const baubleSound2      = new Audio('assets/woosh-bauble-throw-2.mp3')
const gameStartSound    = new Audio('./assets/gamestart.mp3')
const altBurglarSound    = new Audio('./assets/keith_lemon_potato.mp3');
const ouchSound1        = new Audio('./assets/ouch1.mp3')
const ouchSound2        = new Audio('./assets/ouch2.mp3')
const missedSound       = new Audio('./assets/missed1.mp3')
const missedSound2      = new Audio('./assets/missed2.mp3')
let randomSound

// Burglar
const burglar = document.createElement("img");
burglar.setAttribute("class", "burglar");
burglar.setAttribute("src", "./assets/burglar.png");

// Bauble
let baubleCounter = 0;
const bauble = document.querySelector(".bauble");
bauble.style.display = 'none'

// Positons and measurements
const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// Start Game
function startGame(){
  gameStarted = true;
  container.appendChild(burglar);
  burglar.style.animationName = 'bounceIn';
  clearInterval(intervalId);
  setRandomPosition();
  startButton.innerText = 'Reset Game';
  burglar.style.display = 'block';
  gameStartSound.play()
  timerInterval = setInterval(updateTimer, 1000);

}

// move the bauble cannon with the mouse
const present = document.querySelector('.present'); 
window.addEventListener('mousemove', (event) => {
  const presentRect = present.getBoundingClientRect();
  const presentCenterX = presentRect.left + presentRect.width / 2;
  const distanceFromCenter = event.clientX - presentCenterX;
  const rotationAngle = distanceFromCenter / 10; 
  present.style.transform = `rotate(${rotationAngle}deg)`;
});

// Reset the game
function resetGame() {
  clearInterval(timerInterval)
  gameStarted = false;
  timer = 30;
  score = 0;
  startButton.innerText = 'Start Game';
  scoreCard.innerText = `${score}`;
  container.removeChild(burglar);
  timerDisplay.innerText = 30;
  burglarSpeed = 1500;
  bauble.style.display = 'none';
  bauble.style.bottom = 0;
  star1.classList.remove('bounce-in');
  star2.classList.remove('bounce-in');
  star3.classList.remove('bounce-in');
}

// Burglar intervals
function setBurglarInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(moveBurglar, burglarSpeed);
}

function setBurglarAppearance() {
  if (Math.random() < 0.2) { // 
    burglar.setAttribute("src", "./assets/burglar-paddy.png");
    burglar.dataset.isAlternative = "true";
  } else {
    burglar.setAttribute("src", "./assets/burglar.png");
    burglar.dataset.isAlternative = "false";
  }
}

// Move the burglar to random positions on the screen
function moveBurglar() {
  setBurglarAppearance();
  const containerRect = container.getBoundingClientRect()
  const randTop = Math.random() * (containerRect.height - 100);
  const randLeft = Math.random() * (containerRect.width - 100);

  burglar.style.position = "absolute";
  burglar.style.top = `${randTop}px`;
  burglar.style.left = `${randLeft}px`;
}

// Randomize burglar position
function setRandomPosition() {
  setBurglarInterval();
}

// Updating timer
function updateTimer() {
  timer--;
  timerDisplay.innerText = timer;

  if (timer === 0) {
    clearInterval(timerInterval)
    alert(`Time's up! Your final score is ${score}`)
    resetGame();
  }
}

// Clicking button starts game
startButton.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
  } else {
    resetGame();
  }
});

// Clicking the burglar scores a point
burglar.addEventListener('click', (event) => {
  if (event.target === burglar) {
    score++;
    scoreCard.innerText = `${score}`;

    if (score >= 5) star1.classList.add('bounce-in');
    if (score >= 10) star2.classList.add('bounce-in');
    if (score >= 20) star3.classList.add('bounce-in');

    burglarSpeed -= 60
    if (burglar.dataset.isAlternative === "true") {
      altBurglarSound.play();
    } else {
      hitSound = Math.random() < 0.5 ? ouchSound1 : ouchSound2;
      hitSound.play();
    }
    moveBurglar();
    setBurglarInterval(); 
  }
});

// reset bauble 
function resetBaublePosition() {
  bauble.style.display = 'block';
  bauble.style.bottom = '0';
  bauble.style.left = '50%';
  bauble.style.transform = 'translateX(-50%)';
}

// Moving the bauble on click
function mouseClicked(event) {
  if (gameStarted) {
    resetBaublePosition();
    bauble.style.display = 'block'
    const xposition = (event.clientX - bauble.offsetLeft - bauble.offsetWidth / 2);
    const yposition = (event.clientY - bauble.offsetTop - bauble.offsetHeight / 2);
    randomSound = Math.random() < 0.5 ? baubleSound : baubleSound2;
    randomSound.play();
    if (bauble.style.bottom === '') bauble.style.bottom = '0';
    
    // Add CSS transition for smooth movement
    bauble.style.transition = 'transform 0.4s ease-out'; 
    bauble.style.transform = `translate(${xposition}px, ${yposition}px)`;
  }
}

// hide bauble at the end of its throw
bauble.addEventListener('transitionend', () => {
  bauble.style.display = 'none'; 
});

window.addEventListener('mousemove', () => {
    if (gameStarted && container.contains(burglar)) {
    container.addEventListener('click', mouseClicked);
  }
})
