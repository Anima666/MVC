var smallSizeBall = 30;
var middleSizeBall = 40;
var bigSizeBall = 50;
var indexNewItem;
var catchBall = false;
var catchVerticWall = false;
var countDeleteobj = 0;

function randomColor() {
    red = Math.floor(Math.random() * 3) * 127;
    green = Math.floor(Math.random() * 3) * 127;
    blue = Math.floor(Math.random() * 3) * 127;
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
}

function ReturnBlack() {
    red = 200;
    green = 10;
    blue = 50;
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
}

function SetColorRed() {
    if (indexElement != null && paused) {
        objArray[indexElement].color = "red";
    }
    else if (indexWallCatch >= 0) {
        walls[indexWallCatch].lineSize = "10";
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

function DefaultState() {
    isDrawBall = false;
    isDrawWall = false;
    indexElement = -1;
    paused = false;
    selectedItem = false;
}

function Start() {
    var _start = document.getElementById("Start");
    var _RedButton = document.getElementById("RedButton");
    var _Pause_buttom = document.getElementById("Pause_buttom");
    var _BlueButton = document.getElementById("BlueButton");
    var _GreenButton = document.getElementById("GreenButton");
    console.log("count "+ objArray.length);
    if (_start.value == " ") {
        _start.className ="Pause_buttom";
        DefaultState();
        _GreenButton.disabled = true;

        _BlueButton.disabled = true;
        _RedButton.disabled = true;
        _start.value = "  ";
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

function NewBall() {
    isDrawWall = false;
    isDrawBall = true;
}

function NewWallHorizont() {
    isDrawBall = false;

    if (paused && !catchBall && !catchVerticWall) {
        isDrawWall = true;
    }
}

function LargeSizeBall() {
    if (indexElement >= 0 && paused) {
        objArray[indexElement].radius = bigSizeBall;
    }
    else if (indexWallCatch >= 0) {
        walls[indexWallCatch].lineSize = "10";
    }
}

function MiddleSizeBall() {
    if (indexElement >= 0 && paused) {
        objArray[indexElement].radius = middleSizeBall;
    }
    else if (indexWallCatch >= 0) {
        walls[indexWallCatch].lineSize = "7";
    }
}

function SmallSizeBall() {
    if (indexElement >= 0 && paused) {
        objArray[indexElement].radius = smallSizeBall;
    }
    else if (indexWallCatch >= 0) {
        walls[indexWallCatch].lineSize = "5";
    }
}

function DeleteBall() {
    if (indexElement >= 0 && paused) {
        objArray[indexElement].x = null;
        objArray[indexElement].y = null;
        objArray[indexElement].radius = null;
        objArray[indexElement].dx = null;
        objArray[indexElement].dy = null;
        selectedItem = null;
    }
    else if (indexWallCatch>=0) {
        walls[indexWallCatch].x = null;
        walls[indexWallCatch].y = null;
        walls[indexWallCatch].x2 = null;
        walls[indexWallCatch].y2 = null;
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