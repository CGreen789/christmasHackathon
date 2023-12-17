const container = document.querySelector(".container");
const startButton = document.querySelector(".start-button");
// Scoring
let score = 0;

// Cursor
const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

// Burglar
const burglar = document.createElement("img");
burglar.setAttribute("class", "burglar");
burglar.setAttribute("src", "./assets/burglar.png");

const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;

// Randomize burglar position
setInterval(() => {
  const randTop = Math.random() * (containerHeight - 100);
  const randLeft = Math.random() * (containerWidth - 100);

  burglar.style.position = "absolute";
  burglar.style.top = randTop + "px";
  burglar.style.left = randLeft + "px";
}, 1000);

// Bauble
const bauble = document.createElement("img");
bauble.setAttribute("class", "bauble");
bauble.setAttribute("src", "./assets/bauble.png");

window.addEventListener("click", (e) => {
  bauble.style.top = e.pageY + "px";
  bauble.style.left = e.pageX + "px";

  if (e.target === burglar) {
    score++;
  }
  startButton.innerText = `SCORE: ${score}`;
});

// Clicking button starts game
startButton.addEventListener("click", () => {
  container.appendChild(burglar);
  container.appendChild(bauble);
  startButton.innerText = `SCORE: ${score}`;
});
