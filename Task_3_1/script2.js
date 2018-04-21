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
    var _RedButton = document.getElementById("RedButton");
    if (indexElement != null) {
        objArray[indexElement].color = "red";
    }
}

function SetColorBlue() {
    var _RedButton = document.getElementById("BlueButton");
    if (indexElement != null) {
        objArray[indexElement].color = "blue";

    }
}
function SetColorGreen() {
    var _RedButton = document.getElementById("GreenButton");
    if (indexElement != null) {
        objArray[indexElement].color = "green";
    }
}

function Start() {
    var _start = document.getElementById("Start");
    var _startN = document.getElementById("StartN");
    var _RedButton = document.getElementById("RedButton");
    var _BlueButton = document.getElementById("BlueButton");
    var _GreenButton = document.getElementById("GreenButton");

    if (_start.value == "Start") {
        _BlueButton.disabled = true;
        _RedButton.disabled = true;
        _GreenButton.disabled = true;
        _start.value = "Stop";
        _startN = "Stop";
        paused = false;
    }

    else {
        _BlueButton.disabled = false;
        _RedButton.disabled = false;
        _GreenButton.disabled = false;
        _startN = "Start";
        _start.value = "Start";
        paused = true;
    }
}

function LargeSizeBall() {
    if (indexElement >= 0) {
        objArray[indexElement].radius = bigSizeBall;
    }
}

function MiddleSizeBall() {
    if (indexElement >= 0) {
        objArray[indexElement].radius = middleSizeBall;
    }
}

function SmallSizeBall() {
    if (indexElement >= 0) {
        objArray[indexElement].radius = smallSizeBall;
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