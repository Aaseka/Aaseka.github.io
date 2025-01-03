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
