var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var selectedItem = false;
var indexElement;
var smallSizeBall = 30;
var middleSizeBall = 40;
var bigSizeBall = 50;
var differentWindows = 10;
var objArray = [];
var walls = [];
var idBall = 0;

var paused = true;

var cursorPositionX;
var cursorPositionY;

document.addEventListener("keydown", KeyDownHandler);

canvas.addEventListener("mousedown", GetLeftMouse, false);
canvas.addEventListener("mouseup", LeftDeleteMouse, false);
canvas.addEventListener("dblclick",DblClick ,false)



function DblClick() {
    if (indexElement >= 0) {
        selectedItem = true;
        idBall = objArray[indexElement].id;
    }
}

function LeftDeleteMouse() {
    canvas.removeEventListener("mousemove", IMoveMouse, false);
}

function IMoveMouse() {
    if (paused) {
        if (indexElement >= 0) {
            objArray[indexElement].x = cursorPositionX - differentWindows;
            objArray[indexElement].y = cursorPositionY + differentWindows;
        }
       
    }
}

function GetIndexElement() {
    for (var i = 0; i <= objArray.length - 1; ++i) {
        var a = cursorPositionX - differentWindows;
        var b = cursorPositionY + differentWindows;
        if ((cursorPositionX - differentWindows < objArray[i].x + objArray[i].radius
            && cursorPositionX - differentWindows > objArray[i].x - objArray[i].radius)
            && (cursorPositionY + differentWindows < objArray[i].y + objArray[i].radius
                && cursorPositionY + differentWindows > objArray[i].y - objArray[i].radius)) {
            return i;
        }
    }
    return -1;
}

function CheckCatchItem() {
    if (catchHorizontWall == true) {
        walls[indexNewItem].x = cursorPositionX;
        walls[indexNewItem].y = cursorPositionY
    }
    else if (catchVerticWall == true)
    {
        walls[indexNewItem].x = cursorPositionX;
        walls[indexNewItem].y = cursorPositionY
    }
    else if (catchBall == true) {
            objArray[indexNewItem].x = cursorPositionX;
            objArray[indexNewItem].y = cursorPositionY;
     }
}

function GetLeftMouse(event) {
    if (selectedItem) {
        idBall = -1;
        selectedItem = false;
    }
    if (catchHorizontWall || catchVerticWall || catchBall) {
        catchHorizontWall = false;
        catchVerticWall = false;
        catchBall = false;
    }

    else {
        canvas.addEventListener("mousemove", IMoveMouse, false);
        indexElement = GetIndexElement();
    }
}

function ClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function KeyDownHandler(event) {
    if (event.keyCode == 67) { // c
        var temp = new Ball(800, 400, randomRadius());
        temp.id = idBall++;
        objArray[objArray.length] = temp;
       
    } else if (event.keyCode == 32) {//Space
    }
    else if (event.keyCode == 80) { // p
        paused = !paused;
    }else if (event.keyCode == 82) { //r
        objArray = [];
    }else if (event.keyCode == 88) { // x
        
    }
}

function CanvasBackground() {
    canvas.style.backgroundColor = "rgb(215, 235, 240)";
}

function WallCollision(ball) {
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

function BallCollision() {
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
        WallCollision(objArray[obj1]);
    }
}

function StaticCollision() {
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

function MoveObjects() {
    for (var obj in objArray) {
        objArray[obj].x += objArray[obj].dx;
        objArray[obj].y += objArray[obj].dy;
    }    
}

function DrawObjects() {
    for (var obj in objArray) {
        objArray[obj].draw();
    }
}

function DrawWalls() {
    for (var key in walls) {
        walls[key].draw();
    }
}

document.onmousemove = function (e) {
    cursorPositionX = e.pageX;
    cursorPositionY = e.pageY;
}

function draw() {
    ClearCanvas();
    CanvasBackground();
    CheckCatchItem();
    //isHave(438,200);

   
    if (!paused) 
        MoveObjects();
    DrawAll();
    CheckAllCollision();
    requestAnimationFrame(draw);
}


function DrawAll() {
    DrawObjects();
    DrawWalls();
}

function CheckAllCollision() {
    StaticCollision();
    BallCollision();
}

draw();



var temp = new Ball(800, 400, randomRadius());
temp.id = idBall;
++idBall;
objArray[objArray.length] = temp;
var temp = new Ball(700, 400, randomRadius());
temp.id = idBall;
++idBall;
objArray[objArray.length] = temp;
var temp = new Ball(600, 400, randomRadius());
temp.id = idBall;
++idBall;
objArray[objArray.length] = temp;
draw();