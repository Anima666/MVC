
function randomColor() {
    red = Math.floor(Math.random() * 3) * 127;
    green = Math.floor(Math.random() * 3) * 127;
    blue = Math.floor(Math.random() * 3) * 127;
    rc = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rc;
}

function SetRedColorRed() {
    var _RedButton = document.getElementById("RedButton");
    if (indexElement != null) {
        objArray[indexElement].color = "red";
        
    }
}

function SetRedColorBlue() {
    var _RedButton = document.getElementById("BlueButton");
    if (indexElement != null) {
        objArray[indexElement].color = "blue";

    }
}
function SetRedColorGreen() {
    var _RedButton = document.getElementById("GreenButton");
    if (indexElement != null) {
        objArray[indexElement].color = "green";

    }
}

function Start() {
    var _start = document.getElementById("Start");
    var _RedButton = document.getElementById("RedButton");
    var _BlueButton = document.getElementById("BlueButton");
    var _GreenButton = document.getElementById("GreenButton");

    if (_start.value == "Start") {
        _BlueButton.disabled = true;
        _RedButton.disabled = true;
        _GreenButton.disabled = true;
        _start.value = "Stop";
        paused = false;
    }

    else {
        _BlueButton.disabled = false;
        _RedButton.disabled = false;
        _GreenButton.disabled = false;
        _start.value = "Start";
        paused = true;

    }
   
 

}

function randomX() {
    //x = Math.floor(Math.random() * canvas.width);//Если нужен рандом 
    //if (x < 30) {
    //    x = 30;
    //} else if (x + 30 > canvas.width) {
    //    x = canvas.width - 30;
    //}
   
    return 250;
}//Задает x

function randomY() { 
    //y = Math.floor(Math.random() * canvas.height);    //Если нужен рандом 
    //if (y < 30) {
    //    y = 30;
    //} else if (y + 30 > canvas.height) {
    //    y = canvas.height - 30;
    //}
    return 400;
}//Задает y

function randomRadius() {
    //if (bigBalls) {
    //    r = 30;// Math.ceil(Math.random() * 10 + 13);
    //    return r;
    //} else {
    //    //r = Math.ceil(Math.random() * 2 + 1);
    //    r = 2;
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