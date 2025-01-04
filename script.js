document.addEventListener('DOMContentLoaded', () => {
  const asciiArtElement = document.getElementById('ascii-art');
  const input = document.getElementById('input');
  const output = document.getElementById('output');

  // Load ASCII art
  fetch('ascii.txt')
    .then(response => response.text())
    .then(data => asciiArtElement.textContent = data);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim();
      processCommand(command);
      input.value = '';
    }
  });

  function processCommand(command) {
    if (command === 'clear') {
      asciiArtElement.textContent = '';
      output.innerHTML = '';
    } else if (command === 'help') {
      const helpText = `
Available commands:
- about-me: Display information about me
- clear: Clear the terminal
- help: Display this help text
- my-projects: List personal projects
`;
      appendOutput(helpText);
    } else {
      appendOutput(`Command not found: ${command}`);
    }
  }

  function appendOutput(text) {
    const pre = document.createElement('pre');
    pre.textContent = text;
    output.appendChild(pre);
    output.scrollTop = output.scrollHeight;
  }
});
