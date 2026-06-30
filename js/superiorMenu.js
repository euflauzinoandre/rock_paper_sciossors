const body = document.querySelector("body");

const resetGame = document.querySelector("#resetGame");
resetGame.addEventListener("click", () => {
	if (confirm("Wait! Are you sure you want to leave? "))
		window.location.reload();
});

const aboutGame = document.querySelector("#aboutGame");
aboutGame.addEventListener("click", () => {
	const backgroundBoard = document.createElement("div");
	backgroundBoard.classList.add("backgroundBoard");
	body.appendChild(backgroundBoard);

	const messageBoard = document.createElement("div");
	messageBoard.classList.add("messageBoard");
	backgroundBoard.appendChild(messageBoard);

	const titleMessageBoard = document.createElement("div");
	titleMessageBoard.classList.add("titleMessageBoard");
	titleMessageBoard.textContent = "About";
	messageBoard.appendChild(titleMessageBoard);

	const aboutMessage = document.createElement("div");
	aboutMessage.classList.add("textMessageBoard");
	aboutMessage.textContent =
		"Rock, Paper, Scissors is a simple interactive web application developed using HTML, CSS, and JavaScript. The project demonstrates fundamental front-end development concepts, including DOM manipulation, event-driven programming, dynamic content updates, and responsive user interactions. Built as part of The Odin Project curriculum, it serves as a practical exercise in transforming JavaScript logic into a complete browser-based experience.";
	messageBoard.appendChild(aboutMessage);

	const aboutButtonMessage = document.createElement("button");
	aboutButtonMessage.classList.add("buttonMessageBoard");
	aboutButtonMessage.textContent = "Let's Play";
	messageBoard.appendChild(aboutButtonMessage);

	aboutButtonMessage.addEventListener("click", () => {
		backgroundBoard.remove();
	});
});
