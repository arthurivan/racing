//control states
var keyLeftArrow = false;
var keyUpArrow = false;
var keyRightArrow = false;
var keyDownArrow = false;

function initInput() {
	document.addEventListener('keydown',keyPressed);
	document.addEventListener('keyup', keyReleased);
}

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
	console.log('h');
}

function keyReleased(evt) {
	evt.preventDefault;
	setKeyHoldState(evt.keyCode, false);
}
