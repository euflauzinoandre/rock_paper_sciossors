let computerScore = 0;
let humanScore = 0;

//Introduction Game Message
const welcomeMessage = document.querySelector("#welcomeMessage");
const lable = document.querySelector("label[for=player]");
const input = document.querySelector("#inputPlayerName");
input.focus();

function showMessage() {
	const playerName = input.value;
	input.value = "";

	const showPlayerName = document.createTextNode(`Welcome ${playerName}`);
	welcomeMessage.appendChild(showPlayerName);
}

function createBoardGame() {
	const playerBoard = document.querySelector("#playerBoard");

	const rockIcon = document.createElement("img");
	rockIcon.setAttribute("src", "./images/icons/rock.png");
	rockIcon.setAttribute("width", "200");
	rockIcon.setAttribute("height", "200");
	rockIcon.setAttribute("alt", "RockIcon");
	rockIcon.setAttribute("title", "Rock");
	playerBoard.appendChild(rockIcon);

	const paperIcon = document.createElement("img");
	paperIcon.setAttribute("src", "../images/icons/paper.png");
	paperIcon.setAttribute("width", "200");
	paperIcon.setAttribute("height", "200");
	paperIcon.setAttribute("alt", "PaperIcon");
	paperIcon.setAttribute("title", "Paper");
	playerBoard.appendChild(paperIcon);

	const scissorsIcon = document.createElement("img");
	scissorsIcon.setAttribute("src", "../images/icons/scissors.png");
	scissorsIcon.setAttribute("width", "200");
	scissorsIcon.setAttribute("height", "200");
	scissorsIcon.setAttribute("alt", "ScissorsIcon");
	scissorsIcon.setAttribute("title", "Scissors");
	playerBoard.appendChild(scissorsIcon);
}

input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		showMessage();
		lable.remove();
		input.remove();
		btn.remove();
		createBoardGame();
	}
});

const btn = document.querySelector("#confirm");
btn.addEventListener("click", () => {
	showMessage();
	lable.remove();
	input.remove();
	btn.remove();
	createBoardGame();
});

//Show GameBoard and Start The game

function getComputerChoice() {
	const choice = ["rock", "paper", "scissors"];
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
