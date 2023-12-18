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
  burglar.style.top = `${randTop}px`;
  burglar.style.left = `${randLeft}px`;


}, 5000);

// Bauble
const bauble = document.querySelector(".bauble");
bauble.style.bottom = 0

window.addEventListener("click", (e) => {
  if (e.target === burglar) {
    score++;
  }

  console.log('Bauble', bauble.getBoundingClientRect())
  console.log('Burglar', burglar.getBoundingClientRect())
  startButton.innerText = `SCORE: ${score}`;
});

// Clicking button starts game
startButton.addEventListener("click", () => {
  container.appendChild(burglar);
  startButton.innerText = `SCORE: ${score}`;
});

container.addEventListener('click', mouseClicked)

// Moving the bauble on click
function mouseClicked (event){
  const xposition = (event.clientX - bauble.offsetLeft - bauble.offsetWidth/2);
  const yposition = (event.clientY - bauble.offsetTop - bauble.offsetHeight/2);
  bauble.style.transform = `translate(${xposition}px, ${yposition}px)`;
  console.log(xposition, 'x')
  console.log(yposition, 'y')
}
