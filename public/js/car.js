const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function carClass(carPic) {
	//car size
	this.carW = 30;
	this.carH = 25;
	//pic
	this.carPic = carPic;
	//control states
	this.keyLeft = false;
	this.keyUp = false;
	this.keyRight = false;
	this.keyDown = false;
	//checks every turn to see key states
	this.carMove = function() {
		if (this.keyLeft) {
			if (this.carSpeed > MIN_TURN_SPEED ||
					this.carSpeed < -MIN_TURN_SPEED) {
				this.carAng -= TURN_RATE*Math.PI;
			}
		}
		if (this.keyUp) {
				this.carSpeed += DRIVE_POWER;
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
		//checks possible future position for road or finishline
		var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
		var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;
		
		var drivingIntoTileType = getTrackAtPixelCoord(nextX,nextY);

		if (drivingIntoTileType == TRACK_ROAD) {
			this.carX = nextX;
			this.carY = nextY;
		} else if (drivingIntoTileType == TRACK_FINISHLINE) {
			document.getElementById('debugText').innerHTML =
			  /([a-z,A-Z-]*)\.[a-z]*$/.exec(this.carPic.src)[1] +
				" hit the goal line";
			p1.initCar();
			p2.initCar();
		} else {
			this.carSpeed *= -0.5;
		}
		this.carSpeed *= GROUNDSPEED_DECAY_MULT;
		console.log(this.carSpeed);
	}

	this.setupControls = function(leftKey, upKey, rightKey, downKey) {
		this.controlKeyLeft = leftKey;
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
	}

	this.initCar = function() {
		//search for location in grid
		if (this.homeX == undefined) {
			for (var i = 0; i < trackGrid.length; i++) {
				if (trackGrid[i] == TRACK_PLAYERSTART) {
						trackGrid[i] = 0;
						this.homeX = (i % TRACK_COLS) * TRACK_W + TRACK_W/2;
						this.homeY = Math.floor(i / TRACK_COLS) * TRACK_H + TRACK_H/2;
						break;
					}
			}
		}
						this.carX = this.homeX;
						this.carY = this.homeY;
						this.carSpeed = 0;
						this.carAng = -0.5 * Math.PI;
	}

	this.carDraw = function() {

		drawBitmapCenteredWithRotation(this.carPic, this.carX,this.carY, this.carW,this.carH, this.carAng);
	}

}