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

	const showPlayerName = document.createTextNode(`Welcome <${playerName}>`);
	welcomeMessage.appendChild(showPlayerName);
	return playerName;
}

//Create the BoardGame
function createBoardGame() {
	createPlayerBoardGame();
	createHostBoardGame();
	createResultBoard();
	createScoreBoard(playerName);
}

//Create the Player Boardgame
function createPlayerBoardGame() {
	const playerBoard = document.querySelector("#playerBoard");

	const rockIcon = document.createElement("img");
	rockIcon.setAttribute("src", "./images/icons/rock.png");
	rockIcon.setAttribute("alt", "RockIcon");
	rockIcon.setAttribute("title", "Rock");
	rockIcon.classList.add("sizeOfIcon");
	rockIcon.addEventListener("mouseenter", () => {
		rockIcon.style.transform = "scale(1.05)";
	});
	rockIcon.addEventListener("mouseleave", () => {
		rockIcon.style.transform = "scale(1)";
	});
	playerBoard.appendChild(rockIcon);

	const paperIcon = document.createElement("img");
	paperIcon.setAttribute("src", "../images/icons/paper.png");
	paperIcon.setAttribute("alt", "PaperIcon");
	paperIcon.setAttribute("title", "Paper");
	paperIcon.classList.add("sizeOfIcon");
	paperIcon.addEventListener("mouseenter", () => {
		paperIcon.style.transform = "scale(1.05)";
	});
	paperIcon.addEventListener("mouseleave", () => {
		paperIcon.style.transform = "scale(1)";
	});
	playerBoard.appendChild(paperIcon);

	const scissorsIcon = document.createElement("img");
	scissorsIcon.setAttribute("src", "../images/icons/scissors.png");
	scissorsIcon.setAttribute("alt", "ScissorsIcon");
	scissorsIcon.setAttribute("title", "Scissors");
	scissorsIcon.classList.add("sizeOfIcon");
	scissorsIcon.addEventListener("mouseenter", () => {
		scissorsIcon.style.transform = "scale(1.05)";
	});
	scissorsIcon.addEventListener("mouseleave", () => {
		scissorsIcon.style.transform = "scale(1)";
	});
	playerBoard.appendChild(scissorsIcon);
}

//Create the Host Boardgame
function createHostBoardGame() {
	const hostBoard = document.querySelector("#hostBoard");

	const hostIcon = document.createElement("img");
	hostIcon.setAttribute("src", "../images/icons/host.png");
	hostBoard.appendChild(hostIcon);
}

//Create de Result of the round
function createResultBoard() {
	const resultBoard = document.querySelector("#resultBoard");

	const roundResultTitle = document.createElement("h2");
	roundResultTitle.textContent = "Round Result";
	resultBoard.appendChild(roundResultTitle);

	const roundWinner = document.createElement("h3");
	roundWinner.textContent = "You Win";
	resultBoard.appendChild(roundWinner);
}

//Create the ScoreBoard
function createScoreBoard(playerName) {
	//Player
	const playerScore = document.querySelector("#playerScore");

	const backgroundScorePlayer = document.createElement("div");
	backgroundScorePlayer.classList.add("customScoreBox");
	backgroundScorePlayer.style.backgroundColor = "white";

	const valueScorePlayer = document.createElement("div");
	valueScorePlayer.classList.add("valueScoreBox");
	valueScorePlayer.textContent = "0";
	backgroundScorePlayer.appendChild(valueScorePlayer);

	const nameScorePlayer = document.createElement("p");
	nameScorePlayer.textContent = playerName;
	playerScore.appendChild(nameScorePlayer);

	playerScore.appendChild(backgroundScorePlayer);

	//Host
	const hostScore = document.querySelector("#hostScore");

	const backgroundScoreHost = document.createElement("div");
	backgroundScoreHost.classList.add("customScoreBox");
	backgroundScoreHost.style.backgroundColor = "white";

	const valueScoreHost = document.createElement("div");
	valueScoreHost.classList.add("valueScoreBox");
	valueScoreHost.textContent = "0";
	backgroundScoreHost.appendChild(valueScoreHost);

	const nameScoreHost = document.createElement("p");
	nameScoreHost.textContent = "Host";
	hostScore.appendChild(nameScoreHost);

	hostScore.appendChild(backgroundScoreHost);
}

input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		playerName = showMessage();
		lable.remove();
		input.remove();
		btn.remove();
		createBoardGame(playerName);
	}
});

const btn = document.querySelector("#confirm");
btn.addEventListener("click", () => {
	playerName = showMessage();
	lable.remove();
	input.remove();
	btn.remove();
	createBoardGame(playerName);
});

function choosePlayerOption() {}

function getComputerChoice() {
	const choice = ["rock", "paper", "scissors"];
	return choice[Math.floor(Math.random() * choice.length)];
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
