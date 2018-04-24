
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

var save = false;
var recoveryData = false;
var paused = true;

var cursorPositionX;
var cursorPositionY;
var drawNewBall = false;
var startWallX = 0;
var startWallY = 0;

var selectedIndex = -100;
var indexWallCatch = -100;
var isDrawWall = false;
var drawArrow = false;
document.addEventListener("keydown", KeyDownHandler);

canvas.addEventListener("mousedown", GetLeftMouse, false);
canvas.addEventListener("mouseup", LeftDeleteMouse, false);
canvas.addEventListener("dblclick",DblClick ,false)

function Test(ball, wall) {

    var a = Math.sqrt((ball.x - wall.x2) ** 2 + (ball.y - wall.y2) ** 2);
    var b = Math.sqrt((ball.x - wall.x) ** 2 + (ball.y - wall.y) ** 2);
    var c = Math.sqrt((wall.x - wall.x2) ** 2 + (wall.y - wall.y2) ** 2);

    var p = (a + b + c) / 2;
    var s = Math.sqrt(p * (p - a) * (p - b) * (p - c))
    return s * 2 / c;

}

function CollisionWalls() {
    for (var obj1 in objArray) {
        for (var obj2 in walls) {

            if (objArray[obj1].radius >= Test(objArray[obj1], walls[obj2])) {


                var a = Math.sqrt((objArray[obj1].x - walls[obj2].x2) ** 2 + (objArray[obj1].y - walls[obj2].y2) ** 2);
                var b = Math.sqrt((objArray[obj1].x - walls[obj2].x) ** 2 + (objArray[obj1].y - walls[obj2].y) ** 2);
                var c = Math.sqrt((walls[obj2].x - walls[obj2].x2) ** 2 + (walls[obj2].y - walls[obj2].y2) ** 2);
                //alert("c = " + c.toFixed(1));
                 
                //alert(a.toFixed(1) + b.toFixed(1));
                //if (a.toFixed(1) + b.toFixed(1) == c)
                //{
                //    alert(1);
                //}
                //else if (a.toFixed(1) + c.toFixed(1) == b)
                //{
                //    alert(2);
                //}
                //else if (b.toFixed(1) + c.toFixed(1) == a)
                //{
                //    alert(3);
                //}
                //var p = (a + b + c) / 2;
                //var s = Math.sqrt(p * (p - a) * (p - b) * (p - c))
                ////console.log(a, b, c, p, s + " s" + (s * 2 / c));
                //console.log(s * 2 / c);

                //objArray[obj1].dx = -objArray[obj1].dx
            }
        }
    }
}

function DblClick() {
    if (indexElement >= 0) {
        drawArrow = true;
        selectedItem = true;
        selectedIndex = objArray[indexElement].id;
    }
}

function LeftDeleteMouse() {
    if (drawNewBall == true) {
        drawNewBall = false;
        selectedItem = false;
        drawArrow = false;
    }

    if (isDrawWall) {
        isDrawWall = false;
        indexElement = -100;
        canvas.removeEventListener("mousemove", DrawWall, false);
        canvas.removeEventListener("mousemove", IMoveMouse, false);
    }
    else {

        canvas.removeEventListener("mousemove", IMoveMouse, false);
    }
}

function DrawNewBall() {
    var tmp = new Ball(cursorPositionX, cursorPositionY, randomRadius());
    tmp.id = idBall;
    objArray[objArray.length] = tmp;
    ++idBall
    drawArrow = true;
    selectedItem = true;
    selectedIndex = objArray[objArray.length - 1].id;
    indexElement = objArray[objArray.length - 1].id;
}

function IMoveMouse() {
    if (paused && drawArrow == false) {
        if (indexElement >= 0) {
            objArray[indexElement].x = cursorPositionX;
            objArray[indexElement].y = cursorPositionY;
        }
        if (indexElement < 0 && drawNewBall == false && isDrawWall == false && selectedItem == false) {
            drawNewBall = true;
            DrawNewBall();

        }
        if (indexWallCatch >= 0 && selectedItem == false ) {
           //Id Wall
            
        }
    }
}

function GetIndexElement() {
    var a = cursorPositionX - differentWindows;
    var b = cursorPositionY + differentWindows;
    for (var i = 0; i <= objArray.length - 1; ++i) {
        if ((cursorPositionX - differentWindows < objArray[i].x + objArray[i].radius
            && cursorPositionX - differentWindows > objArray[i].x - objArray[i].radius)
            && (cursorPositionY + differentWindows < objArray[i].y + objArray[i].radius
                && cursorPositionY + differentWindows > objArray[i].y - objArray[i].radius)) {
            return i;
        }
    }
    return -1;
}

function GetIndexWall() {
        var dx = cursorPositionX;
        var dy = cursorPositionY;
    for (var i = 0; i <= walls.length - 1; ++i) {
        var x0 = walls[i].x;
        var y0 = walls[i].y;
        var x = walls[i].x2;
        var y = walls[i].y2;
        if (((dy - y0) / (y - y0)).toFixed(1) == ((dx - x0) / (x - x0)).toFixed(1)) {
            return i;
        }
    }
    return -1;
}


function CheckCatchItem() {
 
    if (catchVerticWall == true)
    {
        console.log(1);
        walls[indexWallCatch].x = cursorPositionX;
        walls[indexWallCatch].y = cursorPositionY
    }
    else 
    if (catchBall == true) {
        objArray[indexNewItem].x = cursorPositionX-differentWindows;
        objArray[indexNewItem].y = cursorPositionY + differentWindows;
     }
}

function DrawWall() {
    walls[walls.length - 1].x2 = cursorPositionX - differentWindows-5;
    walls[walls.length - 1].y2 = cursorPositionY + differentWindows;
}

function GetLeftMouse(event) {
    GetIndexWall();
    GetIndexElement();
    if (selectedItem) {
        drawArrow = false;
        selectedItem = false;
    }
    if (isDrawWall) {
        selectedItem = true;
        startWallX = cursorPositionX;
        startWallY = cursorPositionY;
        var tmp = new Wall(startWallX, startWallY, cursorPositionX, cursorPositionY)
        walls[walls.length] = tmp;
        canvas.addEventListener("mousemove", DrawWall, false);
    }
    if (catchVerticWall || catchBall) {
        catchHorizontWall = false;
        catchVerticWall = false;
        catchBall = false;
    }
    else {
        canvas.addEventListener("mousemove", IMoveMouse, false);
        indexElement = GetIndexElement();
        indexWallCatch = GetIndexWall();

    }
}

function ClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function KeyDownHandler(event) {
    if (event.keyCode == 67) { // c
        
        connectionData = false;
       
    } else if (event.keyCode == 68) { // D
        recoveryData = true;
    } else if (event.keyCode == 83) { // S
        save = true;
    }
    else if (event.keyCode == 32) {//Space

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
    cursorPositionX = e.pageX - differentWindows;
    cursorPositionY = e.pageY + differentWindows;
}



function draw() {
    if (save == true) {
        save = false;
        DataConnection();
    }
    if (recoveryData == true) {
        recoveryData = false;
        GetDataConnection();
    }
    ClearCanvas();
    CanvasBackground();
    CheckCatchItem();
    if (!paused) 
        MoveObjects();
    DrawAll();
    CheckAllCollision();
    CollisionWalls();
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
var temp = new Ball(600, 500, randomRadius());
temp.id = idBall;
++idBall;
objArray[objArray.length] = temp;
var temp = new Ball(700, 500, randomRadius());
temp.id = idBall;
++idBall;
objArray[objArray.length] = temp;
var temp = new Ball(800, 500, randomRadius());
temp.id = idBall;
++idBall;
objArray[objArray.length] = temp;
draw();