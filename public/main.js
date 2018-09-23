var canvas, cx;

//setup
function moveEverything() {
	carMove();
}

function drawEverything() {
	//background
	colorRect(0,0, canvas.width,canvas.height, 'black');
	//Tracks
	drawTracks();
	//car
	carDraw();

}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	cx = canvas.getContext('2d');

	var framesPerSec = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSec);

	initInput();
	carInit();
}