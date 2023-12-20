// Variables
const container = document.querySelector(".container");
const startButton = document.querySelector(".start-button");
const cursor = document.querySelector(".cursor");
const buttonContainer = document.querySelector('.button-container');
const scoreBox = document.querySelector('.score-box');
const scoreDisplay = document.querySelector('.score-display');
const timerDisplay = document.getElementById('timer');

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

// Burglar
const burglar = document.createElement("img");
burglar.setAttribute("class", "burglar");
burglar.setAttribute("src", "./assets/burglar.png");

// Bauble
let baubleCounter = 0;

// Positons and measurements
const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// Burglar intervals
function setBurglarInterval() {
  clearInterval(intervalId);
  intervalId = setInterval(moveBurglar, burglarSpeed);
}

// Move the burglar to random positions on the screen
function moveBurglar() {
  const containerRect = container.getBoundingClientRect();

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
    container.appendChild(burglar);
    clearInterval(intervalId);
    setRandomPosition();
    startButton.innerText = 'Reset Game';
    burglar.style.display = 'block';
    scoreDisplay.style.display = 'flex';
    gameStarted = true;
    timerInterval = setInterval(updateTimer, 1000);
  } else {
    resetGame();
  }
});

// Clicking the burglar scores a point
burglar.addEventListener('click', (event) => {
  if (event.target === burglar) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    burglarSpeed -= 60
    moveBurglar();
    setBurglarInterval(); 
  }
});

// Function to reset the game
function resetGame() {
  score = 0;
  startButton.innerText = 'Start Game';
  container.removeChild(burglar);
  bauble.style.display = 'none';
  bauble.style.bottom = 0;
  scoreDisplay.style.display = 'none'; 
  timerDisplay.innerText = 30;
  gameStarted = false;
  burglarSpeed = 1500;
  clearInterval(timerInterval)
}

// Moving the bauble on click
function mouseClicked (event) {
  if (gameStarted) {
    const previousBauble = document.getElementById("bauble" + baubleCounter);
    if (previousBauble) {
      previousBauble.remove();
    }

    let baubleEl = document.createElement("img");
    baubleEl.src = "./assets/bauble.png";
    baubleEl.alt = "red bauble";
    baubleEl.id = "bauble" + baubleCounter;
    baubleEl.classList.add("bauble");
    baubleEl.style.display = 'block';
    baubleEl.style.top = windowHeight;
    baubleEl.style.right = windowWidth/2;
    document.getElementById("bauble-launcher").appendChild(baubleEl);
    const xposition = (event.clientX - windowWidth/2 - baubleEl.offsetWidth/2);
    const yposition = (event.clientY - windowHeight - baubleEl.offsetHeight/2);
    baubleEl.style.transform = `translate(${xposition}px, ${yposition}px) rotate(3turn)`;
    setTimeout(() => {
      document.getElementById("bauble" + baubleCounter).remove();
      baubleCounter += 1;
    }, 100);
  }
}

window.addEventListener('mousemove', () => {
  if (gameStarted && container.contains(burglar)) {
    container.addEventListener('click', mouseClicked);
  } 
})