//track wall
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 3;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
var trackGrid = [ 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
			            4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
			            1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
			            1, 0, 0, 0, 1, 1, 1, 1, 3, 4, 3, 1, 1, 1, 1, 1, 1, 0, 0, 1,
			            1, 0, 0, 1, 1, 0, 0, 1, 1, 3, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
			            1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
			            1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
			            1, 0, 5, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
			            1, 0, 5, 0, 0, 0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
			            1, 1, 1, 1, 1, 1, 1, 4, 3, 3, 4, 3, 3, 4, 1, 1, 1, 1, 1, 1];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2

function trackTileToIndex(tileCol, tileRow) {
	return tileCol + tileRow*TRACK_COLS;
}

function checkForTrackAtPixelCoord(carX,carY) {
	var trackTileCol = Math.floor(carX/TRACK_W);
	var trackTileRow = Math.floor(carY/TRACK_H);

	var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
	return (trackGrid[trackIndex] == TRACK_ROAD);
}

function drawTracks() {
	for (var i = 0; i < TRACK_ROWS; i++) {
		for (var j = 0; j < TRACK_COLS; j++) {
			var arrayIndex = trackTileToIndex(j,i);
			if (trackGrid[arrayIndex] == 1){
				cx.drawImage(block, j*TRACK_W,i*TRACK_H, TRACK_W,TRACK_H);
				//drawbox(j*TRACK_W,i*TRACK_H);
			} else if(trackGrid[arrayIndex] == 3) {
				cx.drawImage(treePic1, j*TRACK_W,i*TRACK_H, TRACK_W,TRACK_H);
			} else if (trackGrid[arrayIndex] == 4) {
				cx.drawImage(treePic2, j*TRACK_W,i*TRACK_H, TRACK_W,TRACK_H);
			} else if (trackGrid[arrayIndex] == 5) {
				cx.drawImage(finishLine, j*TRACK_W,i*TRACK_H, TRACK_W,TRACK_H);
			} else {
				//cx.drawImage(trackPicRoad, j*TRACK_W,i*TRACK_H, TRACK_W,TRACK_H);
				cx.fillStyle = "black";
				cx.fillRect(j*TRACK_W,i*TRACK_H, TRACK_W,TRACK_H);

			}
		}
	}
}


/*function drawbox(x,y){
	function box(){
		function side(){
			var brickColor = "#57412F";
			var grd2 = cx.createLinearGradient(0, 0, 0, 20);
			grd2.addColorStop(0, "#79604C");
			grd2.addColorStop(0.5, "#79604C");
			grd2.addColorStop(1, brickColor);

			cx.beginPath();
			cx.moveTo(0,0);
			cx.lineTo(20,20);
			cx.lineTo(-20,20);
			cx.closePath();
			cx.fillStyle = grd2;
			cx.fill();
		}

		cx.save();
		side();
		cx.rotate(Math.PI/2);
		side();

		cx.rotate(Math.PI);
		side();

		cx.rotate(1.5*Math.PI);
		side();
		cx.restore();
	}
	cx.save();
	cx.translate(x + 20,y + 20);
	box();
	cx.restore();
}*/
