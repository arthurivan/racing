var carPic = document.createElement('img');
var trackPicRoad = document.createElement('img');
var trackPicWall = document.createElement('img');
var picsToLoad = 3;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
		loadingDoneSoStartGame();
	}
}

function loadImages() {
	carPic.onload = countLoadedImageAndLaunchIfReady;
	carPic.src="images/white-car.png";

	trackPicRoad.onload = countLoadedImageAndLaunchIfReady;
	trackPicRoad.src="images/road.png";

	trackPicWall.onload = countLoadedImageAndLaunchIfReady;
	trackPicWall.src="images/grass.png";
}

function loadingDoneSoStartGame() {
	if (imagesToLoad == 0) {
		var framesPerSec = 30;
		setInterval( function() {
			moveEverything();
			drawEverything();
		}, 1000/framesPerSec);
	}
}