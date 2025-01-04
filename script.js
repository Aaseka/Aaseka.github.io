document.addEventListener("DOMContentLoaded", () => {
  const terminalContainer = document.querySelector(".terminal-container");
  const maximizeButton = document.querySelector(".maximize");

  let isMaximized = false;

  maximizeButton.addEventListener("click", () => {
    if (!isMaximized) {
      terminalContainer.classList.add("fullscreen");
    } else {
      terminalContainer.classList.remove("fullscreen");
    }
    isMaximized = !isMaximized;
  });

  const inputField = document.querySelector(".input-field");
  const terminalContent = document.querySelector(".terminal-content");

  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const userInput = inputField.value.trim();
      const outputLine = document.createElement("p");
      outputLine.classList.add("output");

      if (userInput === "help") {
        outputLine.textContent =
          "Available commands: 'help', 'about', 'clear'.";
      } else if (userInput === "about") {
        outputLine.textContent = "This is a developer portfolio terminal.";
      } else if (userInput === "clear") {
        terminalContent.innerHTML = "";
        inputField.value = "";
        return;
      } else {
        outputLine.textContent = `Command not found: ${userInput}`;
      }

      terminalContent.appendChild(outputLine);
      inputField.value = "";
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }
  });
});
