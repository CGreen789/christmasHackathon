// Variables
const container = document.querySelector(".container");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector('.reset-button')
const cursor = document.querySelector(".cursor");

// Scoring
let score = 0;

// Tracking game state
let gameStarted = false

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
setInterval(() => {
  const randTop = Math.random() * (containerHeight - 100);
  const randLeft = Math.random() * (containerWidth - 100);

  burglar.style.position = "absolute";
  burglar.style.top = `${randTop}px`;
  burglar.style.left = `${randLeft}px`;
}, 1000);


// Clicking the burglar scores a point
burglar.addEventListener('click', (event) => {
  if (event.target === burglar) score++;
  startButton.innerText = `SCORE: ${score}`;
  if (resetButton.style.display === 'none') startButton.innerText = 'Start Game'
})

// Clicking button starts game
startButton.addEventListener("click", () => {
  if (!gameStarted) {
  container.appendChild(burglar);
  startButton.innerText = `SCORE: ${score}`;
  resetButton.style.display = 'block'
  bauble.style.display = 'block'
  gameStarted = true
}
});

// Clicking the reset button
resetButton.addEventListener('click', () => {
  score = 0
  startButton.innerText = 'Start Game'
  resetButton.style.display = 'none'
  container.removeChild(burglar)
  bauble.style.display = 'none'
  bauble.style.bottom = 0
  gameStarted = false;
})

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