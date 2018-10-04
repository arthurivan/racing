const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function carClass(carPic) {
	//track car position
	this.carX = 400;
	this.carY = 300;
	this.carW = 30;
	this.carH = 25;
	this.carSpeed = 0;
	this.carAng = -Math.PI/2;
	//pic
	this.carPic = carPic;

	//control states
	this.keyLeft = false;
	this.keyUp = false;
	this.keyRight = false;
	this.keyDown = false;

	this.carMove = function() {
		if (this.keyLeft) {
			if (this.carSpeed > MIN_TURN_SPEED ||
					this.carSpeed < -MIN_TURN_SPEED) {
				this.carAng -= TURN_RATE*Math.PI;
			}
		}
		if (this.keyUp) {
				this.carSpeed += DRIVE_POWER;
			if (this.carSpeed < 3) {
				
			}
		}
		if (this.keyRight) {
			if (this.carSpeed > MIN_TURN_SPEED ||
				  this.carSpeed < -MIN_TURN_SPEED) {
				this.carAng += TURN_RATE*Math.PI;
			}
		}
		if (this.keyDown) {
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

	this.setupControls = function(leftKey, upKey, rightKey, downKey) {
		this.controlKeyLeft = leftKey;
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
	}

	this.initCar = function() {
		//search for location in grid
		for (var i = 0; i < trackGrid.length; i++) {
			if (trackGrid[i] == TRACK_PLAYERSTART) {
					trackGrid[i] = 0;
					this.carX = (i % TRACK_COLS) * TRACK_W + TRACK_W/2;
					this.carY = Math.floor(i / TRACK_COLS) * TRACK_H + TRACK_H/2;
					break;
				}
		}
	}


	this.carDraw = function() {

		drawBitmapCenteredWithRotation(this.carPic, this.carX,this.carY, this.carW,this.carH, this.carAng);
	}

}