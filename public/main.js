import carMove from "./Car.js";
		var canvas, cx;
		//car
		var carX = 400;
		var carY = 300;
		var carW = 30;
		var carH = 25;
		var carSpeed = 0;
		var carRadius = 10;
		var carPic = document.createElement('img');
		var carPicLoaded = false;
		var carAng = 0;

		const GROUNDSPEED_DECAY_MULT = 0.94;
		const DRIVE_POWER = 0.3;
		const REVERSE_POWER = 0.2;
		const TURN_RATE = 0.03;
		const MIN_TURN_SPEED = 0.5;

		//control states
		var keyLeftArrow = false;
		var keyUpArrow = false;
		var keyRightArrow = false;
		var keyDownArrow = false;

		//track wall
		const TRACK_W = 40;
		const TRACK_H = 40;
		const TRACK_GAP = 1;
		const TRACK_COLS = 20;
		const TRACK_ROWS = 15;
		var trackGrid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					            1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
					            1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
					            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
					            1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
					            1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
					            1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
					            1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
					            1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
					            1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
					            1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
					            1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
					            1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
					            1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
					            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

		const TRACK_ROAD = 0;
		const TRACK_WALL = 1;
		const TRACK_PLAYERSTART = 2

		function trackTileToIndex(tileCol, tileRow) {
			return tileCol + tileRow*TRACK_COLS;
		}

/*		function updateMousePos(evt) {
			var rect = canvas.getBoundingClientRect();
			var root = document.documentElement;

			mouseX = evt.clientX - rect.left - root.scrollLeft;
			mouseY = evt.clientY - rect.top - root.scrollTop;
		}*/

		function setKeyHoldState(thisKey, setTo) {
			switch(thisKey) {
        //left
		    case 37:
		    		keyLeftArrow = setTo;
		        break;
				//up
		    case 38:
		    		keyUpArrow = setTo;
		        break;
        //right
        case 39:
		    		keyRightArrow = setTo;
		        break;
        //down
        case 40:
		    		keyDownArrow = setTo;
		        break;
		    default:
		        break;
			}
		}

		function keyPressed(evt) {
			evt.preventDefault;

			setKeyHoldState(evt.keyCode, true);
			
		}

		function keyReleased(evt) {
			evt.preventDefault;
			setKeyHoldState(evt.keyCode, false);
		}

		window.onload = function() {
			
			canvas = document.getElementById('gameCanvas');
			cx = canvas.getContext('2d');

			carReset();

			var framesPerSec = 30;
			setInterval(function() {
				moveEverything();
				drawEverything();
			}, 1000/framesPerSec);

			document.addEventListener('keydown',keyPressed);
			document.addEventListener('keyup', keyReleased);

			carPic.onload = function() {
				carPicLoaded = true;
				drawBitmapCenteredWithRotation(carPic, carX,carY, carAng);
			}
			carPic.src="images/white-car.png";
		}

		function carReset() {

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

		function checkForTrackAtPixelCoord(carX,carY) {
			var trackTileCol = Math.floor(carX/TRACK_W);
			var trackTileRow = Math.floor(carY/TRACK_H);

			var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
			return (trackGrid[trackIndex] == TRACK_ROAD);
		}


		function carDraw() {
			if(carPicLoaded) {
				drawBitmapCenteredWithRotation(carPic, carX,carY, carAng);
			}
		}

		function drawBitmapCenteredWithRotation(graphic, atX, atY, withAngle) {
			cx.save();
			cx.translate(atX, atY);
			cx.rotate(withAngle);
			cx.drawImage(graphic, -(carW/2), -(carH/2), carW, carH);
			cx.restore();
			
		}

		function colorRect(topLeftX,topLeftY, width,height, color) {
			cx.fillStyle = color;
			cx.beginPath();
			cx.fillRect(topLeftX,topLeftY, width,height);
		}

		function drawTracks() {
			for (var i = 0; i < TRACK_ROWS; i++) {
				for (var j = 0; j < TRACK_COLS; j++) {
					var arrayIndex = trackTileToIndex(j,i);
					if (trackGrid[arrayIndex] == 1){
						colorRect(j*TRACK_W,i*TRACK_H, TRACK_W - TRACK_GAP,TRACK_H - TRACK_GAP, 'blue');
					}
				}
			}
		}

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