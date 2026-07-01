//Global Variables
let playerName;
let showWelcomeMessage;
let playerMatchChoice;
let roundNumber;
let roundWinner;
let gameWinner;

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

async function start() {
	playerName = showMessage();
	playerMatchChoice = await chooseOptionGame();
	createBoardGame(playerName);
	roundNumber = document.createElement("h2");
	container.insertBefore(roundNumber, container.firstChild);
	playGame();
}

async function playGame() {
	welcomeMessageBoard.style.backgroundColor = "";
	for (let i = 1; i <= playerMatchChoice; i++) {
		roundNumber.textContent = "Round " + i;
		const playerOption = await getPlayerOption();
		const hostOption = await getHostOption();
		await sleep(1000);
		roundWinner = playRound(hostOption, playerOption);
		roundResultMessage(roundWinner);
		updateScore();
		await sleep(2000);
		let scoreToWin = Math.floor(playerMatchChoice / 2 + 1);
		if (i === playerMatchChoice) {
			playAgain = await confirmToPlayAgain();
			if (playAgain === "confirm") resetTheGame();
			else if (playAgain === "cancel") window.location.reload();
			else if (playAgain === "continue") playerMatchChoice += 2;
		}
		restoreGameBoard();
	}
}

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function showMessage() {
	showWelcomeMessage = document.createElement("div");
	showWelcomeMessage.style.border = "2px solid orange";
	showWelcomeMessage.style.borderRadius = "10px";
	showWelcomeMessage.style.padding = "10px";
	welcomeMessageBoard.appendChild(showWelcomeMessage);
	lable.remove();
	input.remove();
	btn.remove();
	playerName = input.value;
	input.value = "";

	welcomeMessageBoard.style.backgroundColor = "#42414d85";
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
			paperIcon.remove();
			scissorsIcon.remove();
			rockIcon.classList.add("sizeOfIconOnChooseGame");
			hostIcon.classList.add("sizeOfIconOnChooseGame");
			resolve("rock");
		});
		paperIcon.addEventListener("click", () => {
			rockIcon.remove();
			scissorsIcon.remove();
			paperIcon.classList.add("sizeOfIconOnChooseGame");
			hostIcon.classList.add("sizeOfIconOnChooseGame");
			resolve("paper");
		});
		scissorsIcon.addEventListener("click", () => {
			paperIcon.remove();
			rockIcon.remove();
			scissorsIcon.classList.add("sizeOfIconOnChooseGame");
			hostIcon.classList.add("sizeOfIconOnChooseGame");
			resolve("scissors");
		});
	});
}

async function getHostOption() {
	const hostOption = ["rock", "paper", "scissors"];
	const finalHostOption =
		hostOption[Math.floor(Math.random() * hostOption.length)];

	let delay = 50;

	for (let i = 0; i < 15; i++) {
		const randomOption =
			hostOption[Math.floor(Math.random() * hostOption.length)];
		showHostIconRandom(randomOption);
		await sleep(delay);
		delay += 15;
	}
	showHostIconRandom(finalHostOption);
	return finalHostOption;
}

function showHostIconRandom(option) {
	hostIcon.src = `images/icons/${option}.png`;
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

async function roundResultMessage(roundWinner) {
	const winnerIcon = document.createElement("img");
	winnerIcon.setAttribute("src", "../images/icons/roundWinner.png");
	winnerIcon.classList.add("resultIcon");

	const tieHostIcon = document.createElement("img");
	tieHostIcon.setAttribute("src", "../images/icons/tieHost.png");
	tieHostIcon.classList.add("resultIcon");

	const tiePlayerIcon = document.createElement("img");
	tiePlayerIcon.setAttribute("src", "../images/icons/tiePlayer.png");
	tiePlayerIcon.classList.add("resultIcon");

	if (roundWinner === "Host")
		document.querySelector("#hostBoard").appendChild(winnerIcon);
	else if (roundWinner === playerName)
		document.querySelector("#playerBoard").appendChild(winnerIcon);
	else if (roundWinner === "Tie") {
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

	createPlayerBoardGame();
	createHostBoardGame();
}

function resetTheGame() {
	playerScore = 0;
	hostScore = 0;
	updateScore();
	restoreGameBoard();
	playGame();
}

function confirmToPlayAgain() {
	const playAgainBackground = document.createElement("div");
	playAgainBackground.classList.add("backgroundBoard");
	body.appendChild(playAgainBackground);

	const playAgainMessageBoard = document.createElement("div");
	playAgainMessageBoard.classList.add("messageBoard");
	playAgainBackground.appendChild(playAgainMessageBoard);

	if (hostScore < playerScore) gameWinner = playerName;
	else if (hostScore > playerScore) gameWinner = "Host";
	else if (hostScore === playerScore) gameWinner = "Tie";

	const playAgainTitle = document.createElement("div");
	playAgainTitle.classList.add("titleMessageBoard");
	if (gameWinner === playerName)
		playAgainTitle.textContent = "Congratulations. You Win!";
	if (gameWinner === "Host")
		playAgainTitle.textContent = "Sorry... Host Win!";
	if (gameWinner === "Tie") playAgainTitle.textContent = "It was a draw...";
	playAgainMessageBoard.appendChild(playAgainTitle);

	const playAgainMessage = document.createElement("div");
	playAgainMessage.classList.add("textMessageBoard");
	playAgainMessage.textContent = "Do you want to play again?";
	playAgainMessage.style.textAlign = "center";
	playAgainMessageBoard.appendChild(playAgainMessage);

	const playAgainButtons = document.createElement("div");
	playAgainButtons.classList.add("defaultButtons");
	playAgainMessageBoard.appendChild(playAgainButtons);

	const playAgainButtonConfirm = document.createElement("button");
	playAgainButtonConfirm.classList.add("buttonMessageBoard");
	playAgainButtonConfirm.textContent = "Play Again";
	playAgainButtons.appendChild(playAgainButtonConfirm);

	const playAgainButtonCancel = document.createElement("button");
	playAgainButtonCancel.classList.add("buttonMessageBoard");
	playAgainButtonCancel.textContent = "Get Out";
	playAgainButtons.appendChild(playAgainButtonCancel);
	return new Promise((resolve) => {
		playAgainButtonConfirm.addEventListener("click", () => {
			playAgainBackground.remove();
			resolve("confirm");
		});
		if (playerMatchChoice < 5) {
			const playAgainButtonContinue = document.createElement("button");
			playAgainButtonContinue.classList.add("buttonMessageBoard");
			playAgainButtonContinue.textContent = "Continue";
			playAgainButtons.appendChild(playAgainButtonContinue);
			playAgainButtonContinue.addEventListener("click", () => {
				playAgainBackground.remove();
				resolve("continue");
			});
		}
		playAgainButtonCancel.addEventListener("click", () => {
			window.location.reload();
		});
	});
}
