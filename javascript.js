function getComputerChoice() {
	const choice = ["ROCK", "PAPER", "SCISSORS"];
	return choice[Math.floor(Math.random() * choice.length)];
}

function getHumanChoice(){
	const choice = prompt("Write your choice: ").toUpperCase();
	return choice;
}
