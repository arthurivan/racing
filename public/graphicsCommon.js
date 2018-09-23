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