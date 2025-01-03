const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value.trim();
    processCommand(command);
    input.value = "";
  }
});

function processCommand(command) {
  const response = document.createElement("p");
  response.textContent = `$ ${command}`;
  output.appendChild(response);

  if (command === "help") {
    const helpText = `
      Available commands:
      - about-me: Display information about me
      - my-projects: Displays my personal projects
      - contact: Displays contact details
      - clear: Clears the terminal`;
    addOutput(helpText);
  } else if (command === "clear") {
    output.innerHTML = "";
  } else if (command === "about-me") {
    addOutput("I am a passionate developer working on innovative projects!");
  } else {
    addOutput("Command not found.");
  }

  output.scrollTop = output.scrollHeight;
}

function addOutput(text) {
  const lines = text.split("\n");
  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    output.appendChild(p);
  });
}

// Create a canvas element for the falling stars background
const canvas = document.createElement("canvas");
canvas.id = "background-canvas";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const starChars = ["*", ".", "o"]; // Characters used for stars

// Generate a random integer between min and max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Star class for individual falling stars
class Star {
  constructor() {
    this.x = randomInt(0, canvas.width);
    this.y = randomInt(-canvas.height, 0);
    this.char = starChars[randomInt(0, starChars.length - 1)];
    this.speed = randomInt(1, 3);
    this.fontSize = randomInt(12, 18);
    this.opacity = Math.random();
  }

  draw() {
    ctx.font = `${this.fontSize}px 'Courier New'`;
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fillText(this.char, this.x, this.y);
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = randomInt(-50, 0);
      this.x = randomInt(0, canvas.width);
    }
  }
}

// Initialize stars array with multiple star objects
for (let i = 0; i < 100; i++) {
  stars.push(new Star());
}

// Animation loop for falling stars
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

animate();

// Resize the canvas when the window size changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Terminal highlight effect logic
const terminal = document.querySelector(".terminal");

// Track mouse movement for highlight effect
document.addEventListener("mousemove", (e) => {
  const rect = terminal.getBoundingClientRect();
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  // Check proximity to terminal edges
  const proximityThreshold = 100; // Distance in pixels to trigger the glow
  const nearEdge =
    cursorX > rect.left - proximityThreshold &&
    cursorX < rect.right + proximityThreshold &&
    cursorY > rect.top - proximityThreshold &&
    cursorY < rect.bottom + proximityThreshold;

  if (nearEdge) {
    terminal.classList.add("highlight");

    // Update gradient position
    const x = cursorX - rect.left;
    const y = cursorY - rect.top;
    terminal.style.setProperty("--gradient-x", `${x}px`);
    terminal.style.setProperty("--gradient-y", `${y}px`);
  } else {
    terminal.classList.remove("highlight");
  }
});
