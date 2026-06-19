let computerScore = 0;
let humanScore = 0;

const currentPlayer = document.querySelector("#CurrentPlayerName");
const input = document.querySelector("#inputPlayerName");

const btn = document.querySelector("#confirm");
btn.addEventListener("click", () => {
  const playerName = input.value;
  input.value = "";

  currentPlayer.appendChild(document.createTextNode(playerName));
});

function getComputerChoice() {
  const choice = ["ROCK", "PAPER", "SCISSORS"];
  return choice[Math.floor(Math.random() * choice.length)];
}

function getHumanChoice() {
  let choice = prompt(
    "Write your choice: \n\n[ROCK | PAPER | SCISSORS]",
  ).toUpperCase();
  while (choice !== "ROCK" && choice !== "PAPER" && choice !== "SCISSORS")
    choice = prompt(
      "Invalid option! Write your choice: \n\n[ROCK | PAPER | SCISSORS]",
    ).toUpperCase();
  return choice;
}

function playRound(computerChoice, humanChoice) {
  if (computerChoice === humanChoice) return "Draw";
  else if (
    (computerChoice === "PAPER" && humanChoice === "ROCK") ||
    (computerChoice === "ROCK" && humanChoice === "SCISSORS") ||
    (computerChoice === "SCISSORS" && humanChoice === "PAPER")
  ) {
    computerScore++;
    return "Computer";
  } else if (
    (computerChoice === "ROCK" && humanChoice === "PAPER") ||
    (computerChoice === "SCISSORS" && humanChoice === "ROCK") ||
    (computerChoice === "PAPER" && humanChoice === "SCISSORS")
  ) {
    humanScore++;
    return `${humanName}`;
  }
}

function playGame() {
  computerScore = 0;
  humanScore = 0;

  for (let i = 1; i <= 5; i++) {
    if (computerScore === 3 || humanScore === 3) {
      break;
    }
    alert(`WINNER ROUND ${i}: ${playRound(getComputerChoice(), getHumanChoice())}
			\n\nSCORE:
			\nComputer ${computerScore} x ${humanScore} ${humanName}`);
  }
  computerScore === humanScore
    ? alert("MATCH DRAWN")
    : computerScore > humanScore
      ? alert("GAME OVER! Computer Wins")
      : computerScore < humanScore
        ? alert(`YOU WIN!`)
        : null;
  confirm(`Play again?`) == true
    ? playGame()
    : alert("Thanks for play, see you soon!");
}

//playGame();
