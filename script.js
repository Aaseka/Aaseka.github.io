document.addEventListener("DOMContentLoaded", () => {
  const terminalContainer = document.querySelector(".terminal-container");
  const maximizeButton = document.querySelector(".maximize");
  const inputField = document.querySelector(".input-field");
  const terminalContent = document.querySelector(".terminal-content");
  const terminalBody = document.querySelector(".terminal-body");

  let isMaximized = false;

  // Maximize button functionality
  maximizeButton.addEventListener("click", () => {
    if (!isMaximized) {
      terminalContainer.classList.add("maximized");
    } else {
      terminalContainer.classList.remove("maximized");
    }
    isMaximized = !isMaximized;
  });

  // Handle input field behavior
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const userInput = inputField.value.trim();

      // Append user's input as an output
      if (userInput) {
        const userInputLine = document.createElement("p");
        userInputLine.classList.add("output");
        userInputLine.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${userInput}`;
        terminalContent.appendChild(userInputLine);
      }

      // Handle commands
      if (userInput === "help") {
        const helpOutput = document.createElement("p");
        helpOutput.classList.add("output");
        helpOutput.textContent =
          "Available commands: 'help', 'about', 'clear'.";
        terminalContent.appendChild(helpOutput);
      } else if (userInput === "about") {
        const aboutOutput = document.createElement("p");
        aboutOutput.classList.add("output");
        aboutOutput.textContent = "This is a developer portfolio terminal.";
        terminalContent.appendChild(aboutOutput);
      } else if (userInput === "clear") {
        // Clear the terminal but keep the input line
        terminalContent.innerHTML = ""; // Clear the terminal content
        const welcomeMessage1 = document.createElement("p");
        const welcomeMessage2 = document.createElement("p");

        welcomeMessage1.classList.add("output");
        welcomeMessage2.classList.add("output");

        welcomeMessage1.textContent = "Welcome to my developer portfolio!";
        welcomeMessage2.textContent = "Type 'help' to get started.";

        terminalContent.appendChild(welcomeMessage1);
        terminalContent.appendChild(welcomeMessage2);
      } else if (
        userInput &&
        userInput !== "clear" &&
        userInput !== "help" &&
        userInput !== "about"
      ) {
        const errorOutput = document.createElement("p");
        errorOutput.classList.add("output");
        errorOutput.textContent = `Command not found: ${userInput}`;
        terminalContent.appendChild(errorOutput);
      }

      // Clear input field
      inputField.value = "";

      // Scroll to the bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
});
