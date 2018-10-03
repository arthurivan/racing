const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function carClass() {
	this.carX = 400;
	this.carY = 300;
	this.carW = 30;
	this.carH = 25;
	this.carSpeed = 0;
	this.carAng = 0;

	this.carMove = function() {
		if (keyLeftArrow) {
			if (this.carSpeed > MIN_TURN_SPEED ||
					this.carSpeed < -MIN_TURN_SPEED) {
				this.carAng -= TURN_RATE*Math.PI;
			}
		}
		if (keyUpArrow) {
				this.carSpeed += DRIVE_POWER;
			if (this.carSpeed < 3) {
				
			}
		}
		if (keyRightArrow) {
			if (this.carSpeed > MIN_TURN_SPEED ||
				  this.carSpeed < -MIN_TURN_SPEED) {
				this.carAng += TURN_RATE*Math.PI;
			}
		}
		if (keyDownArrow) {
			this.carSpeed -= REVERSE_POWER;
		}
		var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
		var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;
		if (checkForTrackAtPixelCoord(nextX, nextY)) {
			this.carX = nextX;
			this.carY = nextY;
		} else {
			this.carSpeed *= -0.5;
		}
		this.carSpeed *= GROUNDSPEED_DECAY_MULT;
	}

	this.initCar = function() {
		//search for location in grid
		for (var eachRow = 0; eachRow < TRACK_ROWS;eachRow++) {
			for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
				var arrayIndex = trackTileToIndex(eachCol, eachRow);
				if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
					trackGrid[arrayIndex] = 0;
					this.carX = eachCol * TRACK_W + TRACK_W/2;
					this.carY = eachRow * TRACK_H + TRACK_H/2;
				}
			}
		}
	}

	this.carDraw = function() {

		drawBitmapCenteredWithRotation(carPic, this.carX,this.carY, this.carW,this.carH, this.carAng);
	}
	
}