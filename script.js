const input = document.getElementById("input");
const output = document.getElementById("output");
const terminal = document.querySelector(".terminal");

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  const rect = terminal.getBoundingClientRect();
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  // Check if the cursor is close to any edge of the terminal
  const proximityThreshold = 50; // Distance in pixels to trigger the highlight
  const nearLeftEdge = cursorX - rect.left < proximityThreshold;
  const nearRightEdge = rect.right - cursorX < proximityThreshold;
  const nearTopEdge = cursorY - rect.top < proximityThreshold;
  const nearBottomEdge = rect.bottom - cursorY < proximityThreshold;

  if (nearLeftEdge || nearRightEdge || nearTopEdge || nearBottomEdge) {
    terminal.classList.add("highlight"); // Show highlight
  } else {
    terminal.classList.remove("highlight"); // Hide highlight
  }
});

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
    addOutput("I am a passionate developer!");
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
