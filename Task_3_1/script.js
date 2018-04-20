
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var indexElement;
var smallSizeBall = 30;
var objArray = [];

var paused = true;
var totalKineticEnergy = 0;
var bumped = false;
var leftHeld = false;
var upHeld = false;
var rightHeld = false;
var downHeld = false;
var setting = false;
var currentObj;
var CursorPositionX;
var CursorPositionY;
var ArrowIsTrue = false;
var StartArrowX = null;
var StartArrowY = null;
var FinishArrowX = null;
var FinishArrowY = null;
var onBall = false;

var _catchBall = false;
var selectedObj = false;
var isStart = false;


canvas.addEventListener("mousedown", GetLeftMouse, false);

function GetLeftMouse(event)
{
    var i = 0;
    if (currentObj != null) {
        var highLineX = currentObj.x + 30;
        var lowLineX = currentObj.x - 30;
        var highLineY = currentObj.y + 30;
        var lowLineY = currentObj.y - 30;
        if (CursorPositionX < lowLineX || CursorPositionX > highLineX || CursorPositionY < lowLineY || CursorPositionY > highLineY) {
            ArrowIsTrue = true;
            FinishArrowX = CursorPositionX;
            FinishArrowY = CursorPositionY;
            selectedObj = true;
            
            currentObj = null;

        }
        //indexElement = null;
    }
    else {
        if (ArrowIsTrue == true) {
            //alert("Parametri finish ");
            FinishArrowX = CursorPositionX;
            FinishArrowY = CursorPositionY;
            //alert("Sx = " + StartArrowX + " Sy = " + StartArrowY + " X = " + FinishArrowX + " FinishArrowY = " + FinishArrowX);
        }
        else {
            //alert("Parametri Start ");

            FinishArrowX = CursorPositionX;
            FinishArrowY = CursorPositionY;
            ArrowIsTrue = true;
            StartArrowX = CursorPositionX;
            StartArrowY = CursorPositionY;
        }
    }

    currentObj = null;
    if (paused) {

        for (; i <= objArray.length - 1; ++i) {
            var a = CursorPositionX - 10;
            var b = CursorPositionY + 10;
            if ((a < objArray[i].x + smallSizeBall && a > objArray[i].x - smallSizeBall) && (b < objArray[i].y + smallSizeBall && b > objArray[i].y - smallSizeBall)) {
                FinishArrowX = objArray[i].x;
                FinishArrowY = objArray[i].y;
                StartArrowX = objArray[i].x;
                StartArrowY = objArray[i].y;
                currentObj = objArray[i];
                indexElement = i;
                selectedObj = true;
                onBall = true;
                break;
            }
        }
        if (onBall == false) {
            if (isStart == true) {
                //alert("Finish Position");
                FinishArrowX = CursorPositionX;
                FinishArrowY = CursorPositionY;
                selectedObj = false;
                isStart = false;
            }
            else {
                //alert("Start Position)");
                StartArrowX = CursorPositionX;
                StartArrowY = CursorPositionY;
                isStart = true;
            }
        }

    }
    
}
var bigBalls = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}//Чистка поля, чтобы за собой не оставлять след

function keyDownHandler(event) {
    if (event.keyCode == 67) { // c
        objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
    } else if (event.keyCode == 32) {//Space
        if (selectedObj == true) {

            objArray[indexElement].dx = (CursorPositionX - objArray[indexElement].x) / 100;
            objArray[indexElement].dy = (CursorPositionY - objArray[indexElement].y) / 100;
            StartArrowX = 0;
            StartArrowY = 0;
            FinishArrowX = 0;
            FinishArrowY = 0;
            onBall = false;
        }
        else {
            var temp = new Ball(StartArrowX, StartArrowY, randomRadius());
            temp.dx = (FinishArrowX - StartArrowX) / 100;
            temp.dy = (FinishArrowY - StartArrowY) / 100;
            objArray[objArray.length] = temp;
            isStart = false;
            draw();
            StartArrowX = 0;
            StartArrowY = 0;
            FinishArrowX = 0;
            FinishArrowY = 0;
            
        }
    }
    else if (event.keyCode == 80) { // p
        paused = !paused;
        StartArrowX = null;
        StartArrowY = null;
    }else if (event.keyCode == 65) { // A
        leftHeld = true;
    }else if (event.keyCode == 87) { // W
        upHeld = true;
    }else if (event.keyCode == 68) { // D
        rightHeld = true;
    }else if (event.keyCode == 83) { // S
         downHeld = true;
    }else if (event.keyCode == 82) { // r
        objArray = [];
    }else if (event.keyCode == 79){// o
        setting = true;
    } else if (event.keyCode == 88) { // x
        if(onBall==true)
            _catchBall = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 65) { // A
        leftHeld = false;
    } else if (event.keyCode == 87) { // W
        upHeld = false;
    } else if (event.keyCode == 111)
    {
    }
    else if (event.keyCode == 68) { // D
        rightHeld = false;
    } else if (event.keyCode == 83) { // S
        downHeld = false;
    }
}

function arrowControls() {
    if (leftHeld) { // left arrow
        for (var obj in objArray) {
            objArray[obj].dx -= 0.3;
        }
    } if (upHeld) { // up arrow
        for (var obj in objArray) {
            objArray[obj].dy -= 0.3;
        }
    } if (rightHeld) { // right arrow
        for (var obj in objArray) {
            objArray[obj].dx += 0.3;
        }
    } if (downHeld) { // down arrow
        for (var obj in objArray) {
            objArray[obj].dy += 0.3;
        }
    }
}

function canvasBackground() {
    canvas.style.backgroundColor = "rgb(215, 235, 240)";
}//Цвет фона

function wallCollision(ball) {
    if (ball.x - ball.radius + ball.dx < 0 ||
        ball.x + ball.radius + ball.dx > canvas.width) {
        ball.dx *= -1;
    }
    if (ball.y - ball.radius + ball.dy < 0 ||
        ball.y + ball.radius + ball.dy > canvas.height) {
        ball.dy *= -1;
    }
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
    }
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
    }
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
    }
    if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
    }    
}//Удары со стенко

function ballCollision() {
    for (var obj1 in objArray) {
        for (var obj2 in objArray) {
            if (obj1 !== obj2 && distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0) {
                var theta1 = objArray[obj1].angle();
                var theta2 = objArray[obj2].angle();
                var phi = Math.atan2(objArray[obj2].y - objArray[obj1].y, objArray[obj2].x - objArray[obj1].x);
                var m1 = objArray[obj1].mass;
                var m2 = objArray[obj2].mass;
                var v1 = objArray[obj1].speed();
                var v2 = objArray[obj2].speed();

                var dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                var dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                var dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                var dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                objArray[obj1].dx = dx1F;                
                objArray[obj1].dy = dy1F;                
                objArray[obj2].dx = dx2F;                
                objArray[obj2].dy = dy2F;

            }            
        }
        wallCollision(objArray[obj1]);
    }
}//Столкновение шариков

function staticCollision() {
    for (var obj1 in objArray) {
        for (var obj2 in objArray) {
            if (obj1 !== obj2 &&
                distance(objArray[obj1], objArray[obj2]) < objArray[obj1].radius + objArray[obj2].radius)
            {
                var theta = Math.atan2((objArray[obj1].y - objArray[obj2].y), (objArray[obj1].x - objArray[obj2].x));
                var overlap = objArray[obj1].radius + objArray[obj2].radius - distance (objArray[obj1], objArray[obj2]);
                var smallerObject = objArray[obj1].radius < objArray[obj2].radius ? obj1 : obj2
                objArray[smallerObject].x -= overlap * Math.cos(theta);
                objArray[smallerObject].y -= overlap * Math.sin(theta);
            }
        }
    }
}//???

function drawBalls() {
    for (var ball in newObj) {
        newObj[ball].draw();
    }
    
}

function moveObjects() {
    for (var obj in objArray) {
        objArray[obj].x += objArray[obj].dx;
        objArray[obj].y += objArray[obj].dy;
    }    
}

function drawObjects() {
    for (var obj in objArray) {
        objArray[obj].draw();
    }
}

document.onmousemove = function (e) {
    CursorPositionX = e.pageX;
    CursorPositionY = e.pageY;
}


function draw() {
    clearCanvas();
    canvasBackground();
    if (setting == true) {
        setting = !setting;
        for (var i = 0; i <= objArray.length - 1; ++i) {
            var a = CursorPositionX - 10;
            var b = CursorPositionY + 10;
            if ((a < objArray[i].x + 30 && a > objArray[i].x - 30) && (b < objArray[i].y + 35 && b > objArray[i].y - 30)) {
                alert("Menu");
                break;
            }
        }
    }

    if (_catchBall == true) {
        _catchBall = false;
    }

    
    if (!paused) {
        arrowControls();
        moveObjects();
        ArrowIsTrue = false;
    }
    if (ArrowIsTrue == true) {
        var headlen = 10; // length of head in pixels
        var angle = Math.atan2(FinishArrowY - StartArrowY, FinishArrowX - StartArrowX);
        ctx.beginPath();
        ctx.moveTo(StartArrowX, StartArrowY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff0000"; // цвет линии
        ctx.lineTo(FinishArrowX, FinishArrowY);
        ctx.lineTo(FinishArrowX - headlen * Math.cos(angle - Math.PI / 6), FinishArrowY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(FinishArrowX, FinishArrowY);
        ctx.lineTo(FinishArrowX - headlen * Math.cos(angle + Math.PI / 6), FinishArrowY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
        ctx.closePath();

    }
    
    drawObjects();
    staticCollision();
    ballCollision();
    requestAnimationFrame(draw);
}


bigBalls = true;
for (i = 0; i<1; i++) {
    var temp = new Ball(550, 300, randomRadius());
    temp.dx = 0;
    temp.dy = 0;
    objArray[objArray.length] = temp;
    var temp = new Ball(800, 400, randomRadius());
    temp.dx = 0;
    temp.dy = 0;
    objArray[objArray.length] = temp;
    draw();
    var temp = new Ball(700, 400, randomRadius());
    temp.dx = 0;
    temp.dy = 0;
    objArray[objArray.length] = temp;
    draw();
    var temp = new Ball(600, 400, randomRadius());
    temp.dx = 0;
    temp.dy = 0;
    objArray[objArray.length] = temp;
    draw();
}


