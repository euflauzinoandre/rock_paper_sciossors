//Logic to Computer Choice
function getComputerChoice() {
	const choice = ["ROCK", "PAPER", "SCISSORS"];
	const randomChoice = choice[Math.floor(Math.random() * choice.length)];

	return randomChoice;
}
