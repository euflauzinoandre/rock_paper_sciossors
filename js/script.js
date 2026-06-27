//Global Variables
let rockIcon;
let paperIcon;
let scissorsIcon;
let hostIcon;

const container = document.querySelector("#container");

//Starting game
const lable = document.querySelector("label[for=player]");
const input = document.querySelector("#inputPlayerName");
const btn = document.querySelector("#confirm");
input.focus();

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	startGame();
});

async function startGame() {
	const playerName = showMessage();
	const difficultLevel = await chooseOptionGame();
	createBoardGame(playerName);
	const roundNumber = document.createElement("h2");
	container.insertBefore(roundNumber, container.firstChild);
	for (let i = 1; i <= difficultLevel; i++) {
		roundNumber.textContent = "Round " + i;
		const playerOption = await getPlayerOption();
		const computerOption = getComputerChoice();
	}
}

function showMessage() {
	const welcomeMessage = document.querySelector("#welcomeMessage");
	lable.remove();
	input.remove();
	btn.remove();
	playerName = input.value;
	input.value = "";

	const showPlayerName = document.createTextNode(`Welcome <${playerName}>`);
	welcomeMessage.appendChild(showPlayerName);

	return playerName;
}

function chooseOptionGame() {
	return new Promise((resolve) => {
		const selectBoard = document.createElement("div");
		selectBoard.classList.add("selectBoard");
		welcomeMessage.appendChild(selectBoard);

		const chooseOptionMessage = document.createElement("h6");
		chooseOptionMessage.textContent = "Level Options";
		selectBoard.appendChild(chooseOptionMessage);

		const onlyOneMatch = document.createElement("button");
		onlyOneMatch.classList.add("levelSelectButton");
		onlyOneMatch.textContent = "Only One Match";
		selectBoard.appendChild(onlyOneMatch);
		onlyOneMatch.addEventListener("click", () => {
			resolve(1);
		});

		const bestOfThree = document.createElement("button");
		bestOfThree.classList.add("levelSelectButton");
		bestOfThree.textContent = "Best of 3";
		selectBoard.appendChild(bestOfThree);
		bestOfThree.addEventListener("click", () => {
			resolve(3);
		});

		const bestOfFive = document.createElement("button");
		bestOfFive.textContent = "Best of 5";
		bestOfFive.classList.add("levelSelectButton");
		selectBoard.appendChild(bestOfFive);
		bestOfFive.addEventListener("click", () => {
			resolve(5);
		});
	});
}

function createBoardGame(playerName) {
	welcomeMessage.remove();
	createPlayerBoardGame();
	createHostBoardGame();
	//createResultBoard();
	createScoreBoard(playerName);
}

function createPlayerBoardGame() {
	const playerBoard = document.querySelector("#playerBoard");
	playerBoard.style.minHeight = "auto";

	rockIcon = document.createElement("img");
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

	paperIcon = document.createElement("img");
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

	scissorsIcon = document.createElement("img");
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

function createHostBoardGame() {
	const hostBoard = document.querySelector("#hostBoard");

	hostIcon = document.createElement("img");
	hostIcon.setAttribute("src", "../images/icons/host.png");
	hostBoard.appendChild(hostIcon);
}

function createResultBoard() {
	const resultBoard = document.querySelector("#resultBoard");
	resultBoard.style.minHeight = "100px";

	const roundResultTitle = document.createElement("h2");
	roundResultTitle.textContent = "Round Result";
	resultBoard.appendChild(roundResultTitle);

	const roundWinner = document.createElement("h3");
	roundWinner.textContent = "You Win";
	resultBoard.appendChild(roundWinner);
}

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

function getPlayerOption() {
	return new Promise((resolve) => {
		rockIcon.addEventListener("click", () => {
			resolve("rock");
		});
		paperIcon.addEventListener("click", () => {
			resolve("paper");
		});
		scissorsIcon.addEventListener("click", () => {
			resolve("scissors");
		});
	});
}

function getComputerChoice() {
	const computerOption = ["rock", "paper", "scissors"];
	return computerOption[Math.floor(Math.random() * computerOption.length)];
}

//function playRound(computerChoice, humanChoice) {
//	if (computerChoice === humanChoice) return "Draw";
//	else if (
//		(computerChoice === "PAPER" && humanChoice === "ROCK") ||
//		(computerChoice === "ROCK" && humanChoice === "SCISSORS") ||
//		(computerChoice === "SCISSORS" && humanChoice === "PAPER")
//	) {
//		computerScore++;
//		return "Computer";
//	} else if (
//		(computerChoice === "ROCK" && humanChoice === "PAPER") ||
//		(computerChoice === "SCISSORS" && humanChoice === "ROCK") ||
//		(computerChoice === "PAPER" && humanChoice === "SCISSORS")
//	) {
//		humanScore++;
//		return `${humanName}`;
//	}
//}

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
