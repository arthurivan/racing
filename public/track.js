//track wall
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 3;
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
				cx.drawImage(trackPicWall, j*TRACK_W,i*TRACK_H, TRACK_W - TRACK_GAP,TRACK_H - TRACK_GAP)
			} else {
				cx.drawImage(trackPicRoad, j*TRACK_W,i*TRACK_H, TRACK_W,TRACK_H)

			}
		}
	}
}