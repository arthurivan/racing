var canvas, cx;
//setup
var p1 = new carClass(carPic);
var p2 = new carClass(carPic2);

function moveEverything() {
	p1.carMove();
	p2.carMove();
}

function drawEverything() {
	//Tracks
	drawTracks();
	//car
	p1.carDraw();
	p2.carDraw();

}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	cx = canvas.getContext('2d');

	initInput();
	p1.initCar();
	p2.initCar();
	loadImages();

}