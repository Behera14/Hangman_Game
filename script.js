const words = [
  { word: "python", hint: "A popular programming language." },
  { word: "hangman", hint: "A game where you guess letters to form a word." },
  { word: "developer", hint: "A person who builds software." },
  { word: "coding", hint: "The process of writing programs." },
  { word: "computer", hint: "A device for processing data." },
  { word: "algorithm", hint: "Step-by-step procedure to solve a problem." }
];

let selected, guessedLetters, attempts;
const partIds = ['head', 'body', 'arm-left', 'arm-right', 'leg-left', 'leg-right'];

function startGame() {
  selected = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  attempts = 6;

  document.getElementById("hint").textContent = "Hint: " + selected.hint;
  document.getElementById("message").textContent = "";
  document.getElementById("letter-input").value = "";
  document.getElementById("attempts-left").textContent = `Attempts left: ${attempts}`;
  document.getElementById("human").classList.remove("dancing");

  partIds.forEach(id => {
    document.getElementById(id).style.display = "none";
  });

  updateWordDisplay();
}

function updateWordDisplay() {
  const display = selected.word.split('').map(letter =>
    guessedLetters.includes(letter) ? letter : "_"
  ).join(" ");
  document.getElementById("word-display").textContent = display;
}

function submitGuess() {
  const input = document.getElementById("letter-input");
  const guess = input.value.toLowerCase();
  input.value = "";

  if (!guess.match(/[a-z]/) || guess.length !== 1) {
    alert("Enter a valid letter.");
    return;
  }

  if (guessedLetters.includes(guess)) {
    alert("Already guessed.");
    return;
  }

  guessedLetters.push(guess);

  if (!selected.word.includes(guess)) {
    attempts--;
    document.getElementById("attempts-left").textContent = `Attempts left: ${attempts}`;
    revealBodyPart();
  }

  updateWordDisplay();

  const wordComplete = selected.word.split('').every(letter => guessedLetters.includes(letter));

  if (wordComplete) {
    document.getElementById("message").textContent = "🎉 You Won!";
    document.getElementById("human").classList.add("dancing");
  } else if (attempts === 0) {
    document.getElementById("message").textContent = `💀 You lost! Word was: ${selected.word}`;
  }
}

function revealBodyPart() {
  const index = 6 - attempts - 1;
  if (index >= 0 && partIds[index]) {
    document.getElementById(partIds[index]).style.display = "block";
  }
}

function restartGame() {
  startGame();
}

startGame();
