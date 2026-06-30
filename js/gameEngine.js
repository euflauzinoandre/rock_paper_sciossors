//Global Variables
let playerName;
let showWelcomeMessage;
let difficultLevel;
let roundNumber;

let rockIcon;
let paperIcon;
let scissorsIcon;
let hostIcon;

let hostScore = 0;
let playerScore = 0;

//Query initial values to start the game
const container = document.querySelector("#container");
const welcomeMessageBoard = document.querySelector("#welcomeMessageBoard");
const lable = document.querySelector("label[for=player]");
const input = document.querySelector("#inputPlayerName");
const btn = document.querySelector("#confirm");
input.focus();

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	start();
});

//Main function
async function start() {
	playerName = showMessage();
	difficultLevel = await chooseOptionGame();
	createBoardGame(playerName);
	roundNumber = document.createElement("h2");
	container.insertBefore(roundNumber, container.firstChild);
	playGame();
}

async function playGame() {
	for (let i = 1; i <= difficultLevel; i++) {
		roundNumber.textContent = "Round " + i;
		const playerOption = await getPlayerOption();
		const hostOption = getHostOption();
		await sleep(1000);
		const winner = playRound(hostOption, playerOption);
		roundResultMessage(winner);
		updateScore();
		await sleep(2000);
		playAgain = confirmToPlayAgain();
		//updateLevel = confirmToUpdateLevel();
		if (playAgain) {
			i = 1;
			console.log(
				`Player option: ${playerOption} | Host option: ${hostOption} | Winner: ${winner}`,
			);
			resetTheGame();
		}
	}
}

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function showMessage() {
	showWelcomeMessage = document.createElement("div");
	welcomeMessageBoard.appendChild(showWelcomeMessage);
	lable.remove();
	input.remove();
	btn.remove();
	playerName = input.value;
	input.value = "";

	const showPlayerName = document.createTextNode(`Welcome <${playerName}>`);
	showWelcomeMessage.appendChild(showPlayerName);

	return playerName;
}

function chooseOptionGame() {
	return new Promise((resolve) => {
		const selectBoard = document.createElement("div");
		selectBoard.classList.add("selectBoard");
		showWelcomeMessage.appendChild(selectBoard);

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
	showWelcomeMessage.remove();
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
			//paperIcon.style.opacity = "0.5";
			//scissorsIcon.style.opacity = "0.5";
			paperIcon.remove();
			scissorsIcon.remove();
			rockIcon.classList.add("sizeOfIconOnChooseGame");
			hostIcon.classList.add("sizeOfIconOnChooseGame");
			resolve("rock");
		});
		paperIcon.addEventListener("click", () => {
			rockIcon.style.opacity = "0.5";
			scissorsIcon.style.opacity = "0.5";
			rockIcon.remove();
			scissorsIcon.remove();
			paperIcon.classList.add("sizeOfIconOnChooseGame");
			hostIcon.classList.add("sizeOfIconOnChooseGame");
			resolve("paper");
		});
		scissorsIcon.addEventListener("click", () => {
			rockIcon.style.opacity = "0.5";
			paperIcon.style.opacity = "0.5";
			paperIcon.remove();
			rockIcon.remove();
			paperIcon.classList.add("sizeOfIconOnChooseGame");
			hostIcon.classList.add("sizeOfIconOnChooseGame");
			resolve("scissors");
		});
	});
}

function getHostOption() {
	const hostOption = ["rock", "paper", "scissors"];
	return hostOption[Math.floor(Math.random() * hostOption.length)];
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
	if (hostOption === playerOption) return "Tie";
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

async function roundResultMessage(winner) {
	const winnerIcon = document.createElement("img");
	winnerIcon.setAttribute("src", "../images/icons/roundWinner.png");
	winnerIcon.classList.add("resultIcon");

	const tieHostIcon = document.createElement("img");
	tieHostIcon.setAttribute("src", "../images/icons/tieHost.png");
	tieHostIcon.classList.add("resultIcon");

	const tiePlayerIcon = document.createElement("img");
	tiePlayerIcon.setAttribute("src", "../images/icons/tiePlayer.png");
	tiePlayerIcon.classList.add("resultIcon");

	if (winner === "Host")
		document.querySelector("#hostBoard").appendChild(winnerIcon);
	else if (winner === playerName)
		document.querySelector("#playerBoard").appendChild(winnerIcon);
	else if (winner === "Tie") {
		document.querySelector("#hostBoard").appendChild(tieHostIcon);
		document.querySelector("#playerBoard").appendChild(tiePlayerIcon);
	}
	await sleep(2000);
	winnerIcon.remove();
	tieHostIcon.remove();
	tiePlayerIcon.remove();
}

function updateScore() {
	document.querySelector("#hostScoreBoard .valueScoreBox").textContent =
		hostScore;
	document.querySelector("#playerScoreBoard .valueScoreBox").textContent =
		playerScore;
}

function restoreGameBoard() {
	rockIcon.remove();
	paperIcon.remove();
	scissorsIcon.remove();
	hostIcon.remove();

	rockIcon.classList.remove("sizeOfIconOnChooseGame");
	paperIcon.classList.remove("sizeOfIconOnChooseGame");
	scissorsIcon.classList.remove("sizeOfIconOnChooseGame");
	hostIcon.classList.remove("sizeOfIconOnChooseGame");

	playerBoard.appendChild(rockIcon);
	playerBoard.appendChild(paperIcon);
	playerBoard.appendChild(scissorsIcon);
	hostBoard.appendChild(hostIcon);
}

function resetTheGame() {
	playerScore = 0;
	hostScore = 0;
	updateScore();
	restoreGameBoard();
	playGame();
}

function confirmToPlayAgain() {
	return confirm("Play again?");
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
