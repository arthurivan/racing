//p1 keys
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
//p2 keys
const KEY_LEFT_A = 65;
const KEY_UP_W = 87;
const KEY_RIGHT_D = 68;
const KEY_DOWN_S = 83;


function initInput() {
	document.addEventListener('keydown',keyPressed);
	document.addEventListener('keyup', keyReleased);
    p1.setupControls(KEY_LEFT_ARROW, KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW);
    p2.setupControls(KEY_LEFT_A, KEY_UP_W, KEY_RIGHT_D, KEY_DOWN_S);
}

function setKeyHoldState(thisKey, thisCar, setTo) {
	switch(thisKey) {
    //left
    case thisCar.controlKeyLeft:
    		thisCar.keyLeft = setTo;
        break;
	//up
    case thisCar.controlKeyUp:
    		thisCar.keyUp = setTo;
        break;
    //right
    case thisCar.controlKeyRight:
    		thisCar.keyRight = setTo;
        break;
    //down
    case thisCar.controlKeyDown:
    		thisCar.keyDown = setTo;
        break;
    default:
        break;
	}
}

function keyPressed(evt) {
	evt.preventDefault;
	setKeyHoldState(evt.keyCode, p1, true);
    setKeyHoldState(evt.keyCode, p2, true);

}

function keyReleased(evt) {
	evt.preventDefault;
	setKeyHoldState(evt.keyCode, p1, false);
    setKeyHoldState(evt.keyCode, p2, false);

}
