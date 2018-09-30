var carPic = document.createElement('img');
var trackPicRoad = document.createElement('img');
var trackPicWall = document.createElement('img');
var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
		loadingDoneSoStartGame();
	}
}

function beginLoadingImages(imgVar, fileName) {
  imgVar.onload = countLoadedImageAndLaunchIfReady;
  imgVar.src = fileName;
}

function loadImages() {
	var imageList = [
		{varName: carPic, theFile: "images/white-car.png"},
		{varName: trackPicRoad, theFile: "images/road.png"},
		{varName: trackPicWall, theFile: "images/grass.png"},
	];
	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		beginLoadingImages(imageList[i].varName, imageList[i].theFile);
	}
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