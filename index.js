// Variables
const container = document.querySelector(".container");
const startButton = document.querySelector(".start-button");
const cursor = document.querySelector(".cursor");
const buttonContainer = document.querySelector('.button-container');
const scoreBox = document.querySelector('.score-box');
const scoreDisplay = document.querySelector('.score-display');

// Scoring
let score = 0;

// Tracking game state
let gameStarted = false;
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
let baubleCounter = 0;

// Positons and measurements
const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// Randomize burglar position
function setRandomPosition(){
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const randTop = Math.random() * (containerHeight - 100);
    const randLeft = Math.random() * (containerWidth - 100);

    burglar.style.position = "absolute";
    burglar.style.top = `${randTop}px`;
    burglar.style.left = `${randLeft}px`;
  }, currentDifficulty.intervalDuration);
}

// Clicking button starts game
startButton.addEventListener("click", () => {
  if (!gameStarted) {
    container.appendChild(burglar);
    clearInterval(intervalId);
    setRandomPosition();
    startButton.innerText = 'Reset Game';
    burglar.style.display = 'block';
    scoreBox.style.display = 'flex';
    gameStarted = true;
    currentDifficulty = difficultyLevels['easy'];
  } else {
    resetGame();
  }
});

// Clicking the burglar scores a point
burglar.addEventListener('click', (event) => {
  if (event.target === burglar) {
    score++;
    scoreDisplay.innerText = `SCORE: ${score}`;
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
  scoreBox.style.display = 'none';
  gameStarted = false;
  currentDifficultyIndex = 0;
  currentDifficulty = difficultyLevels['easy'];
}

// Set difficulty level
function setDifficulty(level) {
  currentDifficultyIndex = difficultyOrder.indexOf(level);
  currentDifficulty = difficultyLevels[level];
  setRandomPosition();
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