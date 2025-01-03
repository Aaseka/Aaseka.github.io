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
    const helpText = document.createElement("p");
    helpText.textContent = "Available commands: about, projects, contact";
    output.appendChild(helpText);
  } else if (command === "about") {
    const aboutText = document.createElement("p");
    aboutText.textContent =
      "I am a developer passionate about building innovative projects!";
    output.appendChild(aboutText);
  } else {
    const errorText = document.createElement("p");
    errorText.textContent = "Command not found.";
    output.appendChild(errorText);
  }

  output.scrollTop = output.scrollHeight;
}
