//Logic to Computer Choice
function getComputerChoice() {
	const choice = ["ROCK", "PAPER", "SCISSORS"];
	return choice[Math.floor(Math.random() * choice.length)];
}
