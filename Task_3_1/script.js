
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var indexElement;
var smallSizeBall = 30;
var middleSizeBall = 40;
var bigSizeBall = 50;

var objArray = [];
var walls = [];
var arrows = [];

var paused = true;

var setting = false;

var CursorPositionX;
var CursorPositionY;


document.addEventListener("keydown", keyDownHandler);
canvas.addEventListener("mousedown", GetLeftMouse, false);
canvas.addEventListener("mouseup", leftDeleteMouse, false);
canvas.addEventListener("dblclick",DblClick ,false)


function DrawLine() {
    ctx.beginPath();
    ctx.lineWidth = "12";
    ctx.strokeStyle = "black";
    alert("X = " + objArray[indexElement].x + " y = " + objArray[indexElement].y );

    ctx.moveTo(objArray[indexElement].x +40, objArray[indexElement].y+60)
    ctx.lineTo(100, 100);
    ctx.stroke();
}

function DblClick() {
    DrawLine();
}
function leftDeleteMouse() {
    canvas.removeEventListener("mousemove", IMoveMouse, false);
}
function IMoveMouse() {
    if (paused) {
        if (indexElement >= 0) {
            objArray[indexElement].x = CursorPositionX-10;
            objArray[indexElement].y = CursorPositionY + 16;
        }
    }
}

function GetIndexElement() {
    for (var i = 0; i <= objArray.length - 1; ++i) {
        var a = CursorPositionX - 10;
        var b = CursorPositionY + 10;
        if ((  CursorPositionX - 10 < objArray[i].x + smallSizeBall
            && CursorPositionX - 10 > objArray[i].x - smallSizeBall)
            &&(CursorPositionY + 10 < objArray[i].y + smallSizeBall
            && CursorPositionY + 10 > objArray[i].y - smallSizeBall)) {
            return i;
        }
    }
    return -1;
}

function GetLeftMouse(event) {
    canvas.addEventListener("mousemove", IMoveMouse, false);
    indexElement = GetIndexElement();
}
var bigBalls = false;


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function keyDownHandler(event) {
    if (event.keyCode == 67) { // c
        objArray[objArray.length] = new Ball(randomX(), randomY(), randomRadius());
    } else if (event.keyCode == 32) {//Space
    }
    else if (event.keyCode == 80) { // p
        paused = !paused;
    }else if (event.keyCode == 82) { //r
        objArray = [];
    }else if (event.keyCode == 79){// o
        setting = true;
    } else if (event.keyCode == 88) { // x
        
    }
}


function canvasBackground() {
    canvas.style.backgroundColor = "rgb(215, 235, 240)";
}

function wallCollision(ball) {
   // for(var key in )
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
}

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
}

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
}

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

function DrawWalls() {
    for (var key in walls) {
        walls[key].draw();
    }
}


function DrawArrows() {
    for (var key in arrows) {
        arrows[key].draw();
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
        DrawLine();
    }
    
    if (!paused) {
        moveObjects();
    }
    for (var a in walls) {
        walls[a].draw();
    }
    drawObjects();
    DrawWalls();
    DrawArrows();
    staticCollision();
    ballCollision();
    requestAnimationFrame(draw);
}

draw();

var tmp = new Arrow(100, 100, 180, 220);
arrows[arrows.length] = tmp;

var a =new Wall();
walls[walls.length] = a;

var a = new Wall(200, 300,400,20);
walls[walls.length] = a;


    var temp = new Ball(800, 400, randomRadius());
    temp.dx =1;
    temp.dy =0;
    objArray[objArray.length] = temp;
    draw();
    var temp = new Ball(700, 400, randomRadius());
    temp.dx = 0;
    temp.dy = 1;
    objArray[objArray.length] = temp;
    draw();
    var temp = new Ball(600, 400, randomRadius());
    temp.dx = 1;
    temp.dy = 2;
    objArray[objArray.length] = temp;
    draw();




