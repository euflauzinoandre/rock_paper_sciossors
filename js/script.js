//Global Variables
let playerName;

let rockIcon;
let paperIcon;
let scissorsIcon;
let hostIcon;

let hostScore = 0;
let playerScore = 0;

//Query initial values to start the game
const container = document.querySelector("#container");
const lable = document.querySelector("label[for=player]");
const input = document.querySelector("#inputPlayerName");
const btn = document.querySelector("#confirm");
input.focus();

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	playGame();
});

//Main function
async function playGame() {
	playerName = showMessage();
	const difficultLevel = await chooseOptionGame();
	createBoardGame(playerName);
	const roundNumber = document.createElement("h2");
	container.insertBefore(roundNumber, container.firstChild);
	for (let i = 1; i <= difficultLevel; i++) {
		roundNumber.textContent = "Round " + i;
		const hostOption = getHostOption();
		const playerOption = await getPlayerOption();
		const winner = playRound(hostOption, playerOption);
		roundResultMessage(winner);
		updateScore();
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

function createBoardGame() {
	welcomeMessage.remove();
	createPlayerBoardGame();
	createHostBoardGame();
	createScoreBoard();
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
	hostIcon.setAttribute("alt", "HostIcon");
	hostIcon.setAttribute("title", "Host");
	hostBoard.appendChild(hostIcon);
}

function getPlayerOption() {
	return new Promise((resolve) => {
		rockIcon.addEventListener("click", () => {
			paperIcon.style.opacity = "0.5";
			scissorsIcon.style.opacity = "0.5";
			resolve("rock");
		});
		paperIcon.addEventListener("click", () => {
			rockIcon.style.opacity = "0.5";
			scissorsIcon.style.opacity = "0.5";
			resolve("paper");
		});
		scissorsIcon.addEventListener("click", () => {
			rockIcon.style.opacity = "0.5";
			paperIcon.style.opacity = "0.5";
			resolve("scissors");
		});
	});
}

function getHostOption() {
	const hostOption = ["rock", "paper", "scissors"];
	return hostOption[Math.floor(Math.random() * hostOption.length)];
}

function roundResultMessage(winner) {
	const resultBoard = document.querySelector("#roundResultBoard");
	resultBoard.style.minHeight = "100px";
	resultBoard.style.padding = "40px";
	resultBoard.style.marginTop = "15px";
	resultBoard.style.marginBotton = "15px";

	const roundResultTitle = document.createElement("h2");
	roundResultTitle.textContent = "Round Winner";
	resultBoard.appendChild(roundResultTitle);

	const roundWinner = document.createElement("h3");
	roundWinner.textContent = winner;
	resultBoard.appendChild(roundWinner);
}

function createScoreBoard() {
	//Player
	const playerScoreBoard = document.querySelector("#playerScoreBoard");

	const backgroundScorePlayer = document.createElement("div");
	backgroundScorePlayer.classList.add("customScoreBox");
	backgroundScorePlayer.style.backgroundColor = "white";

	const valuePlayerScore = document.createElement("div");
	valuePlayerScore.classList.add("valueScoreBox");
	valuePlayerScore.textContent = playerScore;
	backgroundScorePlayer.appendChild(valuePlayerScore);

	const nameScorePlayer = document.createElement("p");
	nameScorePlayer.textContent = playerName;
	playerScoreBoard.appendChild(nameScorePlayer);

	playerScoreBoard.appendChild(backgroundScorePlayer);

	//Host
	const hostScoreBoard = document.querySelector("#hostScoreBoard");

	const backgroundScoreHost = document.createElement("div");
	backgroundScoreHost.classList.add("customScoreBox");
	backgroundScoreHost.style.backgroundColor = "white";

	const valueHostScore = document.createElement("div");
	valueHostScore.classList.add("valueScoreBox");
	valueHostScore.textContent = hostScore;
	backgroundScoreHost.appendChild(valueHostScore);

	const nameScoreHost = document.createElement("p");
	nameScoreHost.textContent = "Host";
	hostScoreBoard.appendChild(nameScoreHost);

	hostScoreBoard.appendChild(backgroundScoreHost);
}

function playRound(hostOption, playerOption) {
	if (hostOption === playerOption) return "Draw";
	else if (
		(hostOption === "paper" && playerOption === "rock") ||
		(hostOption === "rock" && playerOption === "scissors") ||
		(hostOption === "scissors" && playerOption === "paper")
	) {
		hostScore++;
		return "Host";
	} else if (
		(hostOption === "rock" && playerOption === "paper") ||
		(hostOption === "scissors" && playerOption === "rock") ||
		(hostOption === "paper" && playerOption === "scissors")
	) {
		playerScore++;
		return playerName;
	}
}

function updateScore() {
	document.querySelector("#hostScoreBoard .valueScoreBox").textContent =
		hostScore;
	document.querySelector("#playerScoreBoard .valueScoreBox").textContent =
		playerScore;
}

//function playGame() {
//	computerScore = 0;
//	humanScore = 0;

//	for (let i = 1; i <= 5; i++) {
//		if (computerScore === 3 || humanScore === 3) {
//			break;
//		}
//		alert(`WINNER ROUND ${i}: ${playRound(getComputerChoice(), getHumanChoice())}
//			\n\nSCORE:
//			\nComputer ${computerScore} x ${humanScore} ${humanName}`);
//	}
//	computerScore === humanScore
//		? alert("MATCH DRAWN")
//		: computerScore > humanScore
//			? alert("GAME OVER! Computer Wins")
//			: computerScore < humanScore
//				? alert(`YOU WIN!`)
//				: null;
//	confirm(`Play again?`) == true
//		? playGame()
//		: alert("Thanks for play, see you soon!");
//}
