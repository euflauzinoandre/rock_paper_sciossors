let computerScore = 0;
let humanScore = 0;

function getComputerChoice() {
	const choice = ["ROCK", "PAPER", "SCISSORS"];
	return choice[Math.floor(Math.random() * choice.length)];
}

function getHumanChoice(){
	const choice = prompt("Write your choice: ").toUpperCase();
	return choice;
}

function playRound(computerChoice, humanChoice){
	if (computerChoice === humanChoice)
		return "Draw";
	else if (computerChoice === "PAPER" && humanChoice === "ROCK"
		|| computerChoice === "ROCK" && humanChoice === "SCISSORS"
		|| computerChoice === "SCISSORS" && humanChoice === "PAPER"
	) {
		computerScore++;
		return "Computer";
	}
	else if (computerChoice === "ROCK" && humanChoice === "PAPER"
		|| computerChoice === "SCISSORS" && humanChoice === "ROCK"
		|| computerChoice === "PAPER" && humanChoice === "SCISSORS"
	) {
		humanScore++;
		return "Human";
	}
}

function playGame() {
	alert("Let's play Rock Paper Scissors!");
	for(let i = 1; i <= 5; i++){
		if (computerScore === 3 || humanScore ===3) {break;}
		alert(`WINNER ROUND ${i}: ${playRound(getComputerChoice(), getHumanChoice())}
			\n\nSCORE:
			\nComputer ${computerScore} x ${humanScore} Human`);
	}
	if (computerScore === humanScore)
		alert("GAME DRAW");
	else if (computerScore > humanScore)
		alert("GAME WINNER: Computer");
	else if (computerScore < humanScore)
		alert("GAME WINNER: Human");
}

playGame();