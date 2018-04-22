var smallSizeBall = 30;
var middleSizeBall = 40;
var bigSizeBall = 50;

function randomColor() {
    red = Math.floor(Math.random() * 3) * 127;
    green = Math.floor(Math.random() * 3) * 127;
    blue = Math.floor(Math.random() * 3) * 127;
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
}

function SetColorRed() {
    if (indexElement != null && paused) {
        objArray[indexElement].color = "red";
    }
}

function SetColorBlue() {
    if (indexElement != null && paused ) {
        objArray[indexElement].color = "blue";

    }
}
function SetColorGreen() {
    if (indexElement != null && paused) {
        objArray[indexElement].color = "green";
    }
}

function Start() {

    var _start = document.getElementById("Start");
    var _RedButton = document.getElementById("RedButton");
    var _Pause_buttom = document.getElementById("Pause_buttom");
    var _BlueButton = document.getElementById("BlueButton");
    var _GreenButton = document.getElementById("GreenButton");
    if (_start.value == " ") {
        _start.className ="Pause_buttom";
        DefaultState();
        _BlueButton.disabled = true;
        _RedButton.disabled = true;
        _GreenButton.disabled = true;
        _start.value = "  ";
        paused = false;
    }

    else {
        _start.className="startButton";
        _BlueButton.disabled = false;
        _RedButton.disabled = false;
        _GreenButton.disabled = false;
        _start.value = " ";
        paused = true;
    }
}

var currentNewBall;
var catchBall = false;
function NewBall() {
    
    catchBall = true;
    var temp = new Ball(cursorPositionX, cursorPositionY, randomRadius());
    temp.dx = 0;
    temp.dy = 0;
    objArray[objArray.length] = temp;
    currentNewBall = objArray.length - 1;
    
}

function NewWallHorizont() {
    alert("WallHorizont");
}

function NewWallVerticale() {
    alert("WallVert");
}

function LargeSizeBall() {
    if (indexElement >= 0 && paused) {
        objArray[indexElement].radius = bigSizeBall;
    }
}

function MiddleSizeBall() {
    if (indexElement >= 0 && paused) {
        objArray[indexElement].radius = middleSizeBall;
    }
}

function SmallSizeBall() {
    if (indexElement >= 0 && paused) {
        objArray[indexElement].radius = smallSizeBall;
    }
}

function DeleteBall() {
    if (indexElement >= 0 && paused) {
        objArray.splice(objArray.indexOf(objArray[indexElement]), 1);
    }
}

function randomX() {
    return 250;
}

function randomY() { 
    return 400;
}

function randomRadius() {
        return smallSizeBall;
 }

function randomDx() {
    r = Math.floor(Math.random() * 10 - 5);
    return 0;
}

function randomDy() {
    r = Math.floor(Math.random() * 10 - 5);
    return 0;
}

function distanceNextFrame(a, b) {
    return Math.sqrt((a.x + a.dx - b.x - b.dx)**2 + (a.y + a.dy - b.y - b.dy)**2) - a.radius - b.radius;
}

function distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}
