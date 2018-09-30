var canvas, cx;
var imagesToLoad =0;
//setup
function moveEverything() {
	carMove();
}

function drawEverything() {
	//Tracks
	drawTracks();
	//car
	carDraw();

}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	cx = canvas.getContext('2d');

	initInput();
	initCar();
	loadImages();

}