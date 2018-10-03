function drawBitmapCenteredWithRotation(graphic, atX, atY, width,height, withAngle) {
	cx.save();
	cx.translate(atX, atY);
	cx.rotate(withAngle);
	cx.drawImage(graphic, -(width/2), -(height/2), width,height);
	cx.restore();
	
}
