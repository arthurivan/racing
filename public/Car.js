export default function carMove() {
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