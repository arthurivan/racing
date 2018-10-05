//track wall
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 3;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_TREE1 = 3;
const TRACK_TREE2 = 4;
const TRACK_FINISHLINE = 5;

var trackGrid = [ 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
			            4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
			            1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
			            1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
			            1, 0, 0, 0, 1, 1, 1, 1, 3, 4, 3, 1, 1, 1, 1, 1, 1, 0, 0, 1,
			            1, 0, 0, 1, 1, 0, 0, 1, 1, 3, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
			            1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
			            1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
			            1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
			            1, 0, 5, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
			            1, 0, 5, 0, 0, 0, 1, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
			            1, 1, 1, 1, 1, 1, 1, 4, 3, 3, 4, 3, 3, 4, 1, 1, 1, 1, 1, 1];


function trackTileToIndex(tileCol, tileRow) {
	return tileCol + tileRow*TRACK_COLS;
}

function getTrackAtPixelCoord(carX,carY) {
	var trackTileCol = Math.floor(carX/TRACK_W);
	var trackTileRow = Math.floor(carY/TRACK_H);

	var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
	return trackGrid[trackIndex];
}

function drawTracks() {
	var trackIndex = 0;
	var trackTopEdgeY = 0;

	for (var i = 0; i < TRACK_ROWS; i++) {
		var trackLeftEdgeX = 0;
		for (var j = 0; j < TRACK_COLS; j++) {

			var trackType = trackGrid[trackIndex];

			cx.drawImage(trackPics[trackType], trackLeftEdgeX,trackTopEdgeY, TRACK_W,TRACK_H);	

			trackIndex++;
			trackLeftEdgeX += TRACK_W;
		}
		
		trackTopEdgeY += TRACK_H;
	}
}
