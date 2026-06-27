const resetGame = document.querySelector("#resetGame");
resetGame.addEventListener("click", () => {
	if (confirm("Wait! Are you sure you want to leave? "))
		window.location.reload();
});
