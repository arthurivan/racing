var carX = 400;
var carY = 300;
var carW = 30;
var carH = 25;
var carSpeed = 0;
var carRadius = 10;

var carAng = 0;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;


function carMove() {
	if (keyLeftArrow) {
		if (carSpeed > MIN_TURN_SPEED ||
				carSpeed < -MIN_TURN_SPEED) {
			carAng -= TURN_RATE*Math.PI;
		}
	}
	if (keyUpArrow) {
			carSpeed += DRIVE_POWER;
		if (carSpeed < 3) {
			
		}
	}
	if (keyRightArrow) {
		if (carSpeed > MIN_TURN_SPEED ||
			  carSpeed < -MIN_TURN_SPEED) {
			carAng += TURN_RATE*Math.PI;
		}
	}
	if (keyDownArrow) {
		carSpeed -= REVERSE_POWER;
	}
	var nextX = carX + Math.cos(carAng) * carSpeed;
	var nextY = carY + Math.sin(carAng) * carSpeed;
	if (checkForTrackAtPixelCoord(nextX, nextY)) {
		carX = nextX;
		carY = nextY;
	} else {
		carSpeed *= -0.5;
	}
	carSpeed *= GROUNDSPEED_DECAY_MULT;
}

function initCar() {
	//search for location in grid
	for (var eachRow = 0; eachRow < TRACK_ROWS;eachRow++) {
		for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
			var arrayIndex = trackTileToIndex(eachCol, eachRow);
			if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
				trackGrid[arrayIndex] = TRACK_ROAD;
				carX = eachCol * TRACK_W + TRACK_W/2;
				carY = eachRow * TRACK_H + TRACK_H/2;
			}
		}
	}
}

function carDraw() {

	drawBitmapCenteredWithRotation(carPic, carX,carY, carW,carH, carAng);
}
