// Variables
const container = document.querySelector(".container");
const startButton = document.querySelector(".start-button");
const cursor = document.querySelector(".cursor");
const buttonContainer = document.querySelector('.button-container')
const scoreDisplay = document.querySelector('.score-display');

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
let gameStarted = false
let intervalId;

// Difficulty levels
const difficultyLevels = {
  easy: {
    intervalDuration: 1500, 
    pointsToWin: 5,
  },
  medium: {
    intervalDuration: 750,
    pointsToWin: 10,
  },
  hard: {
    intervalDuration: 400,
    pointsToWin: 15,
  },
};

const difficultyOrder = ['easy', 'medium', 'hard']
// Difficulty on load
let currentDifficulty = difficultyLevels['easy'];
let currentDifficultyIndex = 0;

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
const bauble = document.querySelector(".bauble");
bauble.style.bottom = 0

// Positons and measurements
const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;

// Randomize burglar position
function setRandomPosition(){
  clearInterval(intervalId)
intervalId = setInterval(() => {
  const containerRect = container.getBoundingClientRect()

  const randTop = Math.random() * (containerRect.height - 100);
  const randLeft = Math.random() * (containerRect.width - 100);

  burglar.style.position = "absolute";
  burglar.style.top = `${randTop}px`;
  burglar.style.left = `${randLeft}px`;
}, currentDifficulty.intervalDuration);
}

// Clicking button starts game
startButton.addEventListener("click", () => {
  if (!gameStarted) {
    container.appendChild(burglar);
    clearInterval(intervalId)
    setRandomPosition();
    startButton.innerText = 'Reset Game';
    bauble.style.display = 'block';
    burglar.style.display = 'block';
    scoreDisplay.style.display = 'flex';
    gameStarted = true;
    currentDifficulty = difficultyLevels['easy'];
  } else {
    resetGame()
  }
});

// Clicking the burglar scores a point
burglar.addEventListener('click', (event) => {
  if (event.target === burglar) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
  }
  if (score >= currentDifficulty.pointsToWin) {
    alert(`Congratulations! You won the ${difficultyOrder[currentDifficultyIndex]} level!`);
    
    // If there's a next difficulty level, ask the user if they want to play it
    if (currentDifficultyIndex < difficultyOrder.length - 1) {
      const nextLevel = difficultyOrder[currentDifficultyIndex + 1];
      const playNextLevel = confirm(`Do you want to play the next level ${nextLevel}?`);
      
      if (playNextLevel) {
        setDifficulty(nextLevel);
      } else {
        resetGame();
      }
    } else {
      alert('Well done! You reached the highest level!');
      resetGame();
    }
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
  gameStarted = false;
  currentDifficultyIndex = 0
  currentDifficulty = difficultyLevels['easy'];
}

// Set difficulty level
function setDifficulty(level) {
  currentDifficultyIndex = difficultyOrder.indexOf(level);
  currentDifficulty = difficultyLevels[level];
  setRandomPosition();
}

// Moving the bauble on click
function mouseClicked (event){
  if (gameStarted) {
  const xposition = (event.clientX - bauble.offsetLeft - bauble.offsetWidth/2);
  const yposition = (event.clientY - bauble.offsetTop - bauble.offsetHeight/2);
  bauble.style.transform = `translate(${xposition}px, ${yposition}px)`;
  }
}

window.addEventListener('mousemove', () => {
  if (gameStarted && container.contains(burglar)) {
    container.addEventListener('click', mouseClicked)
  } 
})