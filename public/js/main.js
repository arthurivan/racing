var canvas, cx;
//setup
var p1 = new carClass();

function moveEverything() {
	p1.carMove();
}

function drawEverything() {
	//Tracks
	drawTracks();
	//car
	p1.carDraw();

}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	cx = canvas.getContext('2d');

	initInput();
	p1.initCar();
	loadImages();

}