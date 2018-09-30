var carPic = document.createElement('img');
var treePic1 = document.createElement('img');
var treePic2 = document.createElement('img');
var finishLine = document.createElement('img');
var block = document.createElement('img');
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
		{varName: treePic1, theFile: "images/tree1.png"},
		{varName: treePic2, theFile: "images/tree2.png"},
		{varName: finishLine, theFile: "images/finishLine.png"},
		{varName: block, theFile: "images/block.png"}
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