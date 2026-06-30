const body = document.querySelector("body");

const resetGame = document.querySelector("#resetGame");
resetGame.addEventListener("click", () => {
	if (confirm("Wait! Are you sure you want to leave? "))
		window.location.reload();
});

const aboutGame = document.querySelector("#aboutGame");
aboutGame.addEventListener("click", () => {
	const backgroundAbout = document.createElement("div");
	backgroundAbout.classList.add("backgroundAbout");
	body.appendChild(backgroundAbout);

	const aboutBoard = document.createElement("div");
	aboutBoard.classList.add("aboutBoard");
	backgroundAbout.appendChild(aboutBoard);

	const aboutTitle = document.createElement("div");
	aboutTitle.classList.add("aboutTitle");
	aboutTitle.textContent = "About";
	aboutBoard.appendChild(aboutTitle);

	const aboutMessage = document.createElement("div");
	aboutMessage.classList.add("aboutMessage");
	aboutMessage.textContent =
		"Rock, Paper, Scissors is a simple interactive web application developed using HTML, CSS, and JavaScript. The project demonstrates fundamental front-end development concepts, including DOM manipulation, event-driven programming, dynamic content updates, and responsive user interactions. Built as part of The Odin Project curriculum, it serves as a practical exercise in transforming JavaScript logic into a complete browser-based experience.";
	aboutBoard.appendChild(aboutMessage);

	const aboutButtonMessage = document.createElement("button");
	aboutButtonMessage.classList.add("aboutButtonMessage");
	aboutButtonMessage.textContent = "Let's Play";
	aboutBoard.appendChild(aboutButtonMessage);

	aboutButtonMessage.addEventListener("click", () => {
		backgroundAbout.remove();
	});
});
