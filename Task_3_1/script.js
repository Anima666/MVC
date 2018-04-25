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


var indexWallCatch = -1;
var isDrawWall = false;
var drawArrow = false;
var isDrawBall = true;

var CoordinatX;
var CoordinatY;
var CoordinatX2;
var CoordinatY2;
var h;


document.addEventListener("keydown", KeyDownHandler);

canvas.addEventListener("mousedown", GetLeftMouse, false);
canvas.addEventListener("mouseup", LeftDeleteMouse, false);
canvas.addEventListener("dblclick",DblClick ,false)

function DblClick() {
    indexElement = GetIndexElement();
    if (indexElement >= 0) {
        drawArrow = true;
        selectedItem = true;
    }
}

function LeftDeleteMouse() {
    canvas.removeEventListener("mousemove", MoveWall, false);
    canvas.removeEventListener("mousemove", MoveWallX, false);
    canvas.removeEventListener("mousemove", MoveWallXY, false);
    if (drawNewBall) {
        drawNewBall = false;
        selectedItem = false;
        drawArrow = false;
    }
    if (isDrawWall) {
        indexWallCatch = -1;
        selectedItem = false;
        if (Math.abs(walls[walls.length - 1].x2 - walls[walls.length - 1].x) <= 25 && Math.abs(walls[walls.length - 1].y2 - walls[walls.length-1].y)<=25) {
            walls.pop();
        }
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
    indexElement = objArray[objArray.length - 1].id;
}

function IMoveMouse() {
    if (paused && drawArrow == false && isDrawWall == false) {
        if (indexElement >= 0) {
            objArray[indexElement].x = cursorPositionX;
            objArray[indexElement].y = cursorPositionY;
        }
        else if (indexElement < 0 && drawNewBall == false && isDrawWall == false && selectedItem == false && isDrawBall) {
            drawNewBall = true;
            DrawNewBall();
        }
    }
}

function GetIndexWall() {
    selectedItem = true;
    var dx = cursorPositionX;
    var dy = cursorPositionY;
    for (var i = 0; i <= walls.length - 1; ++i) {
        var x0 = walls[i].x;
        var y0 = walls[i].y;
        var x = walls[i].x2;
        var y = walls[i].y2;
        if (((dy - y0) / (y - y0)).toFixed(0) == ((dx - x0) / (x - x0)).toFixed(0)) {
            var a = (Math.sqrt((dx - walls[i].x2) ** 2 + (dy - walls[i].y2) ** 2)).toFixed(0);
            var b = (Math.sqrt((dx - walls[i].x) ** 2 + (dy - walls[i].y) ** 2)).toFixed(0);
            var c = (Math.sqrt((walls[i].x - walls[i].x2) ** 2 + (walls[i].y - walls[i].y2) ** 2)).toFixed(0);
            console.log("c = " + c);
            var drobb = (c / 3).toFixed(0);
            if (parseInt(a) + parseInt(b) - 40 <= c && catchBall == false && indexElement <0) {
                indexWallCatch = i;
                CoordinatX = walls[indexWallCatch].x - dx;
                CoordinatY = walls[indexWallCatch].y - dy;
                CoordinatX2 = dx - walls[indexWallCatch].x2;
                CoordinatY2 = dy - walls[indexWallCatch].y2;
                isDrawWall = false;
                var drob = parseInt(drobb);
                var LineX = (Math.sqrt((walls[i].x - dx) ** 2 + (walls[i].y - dy) ** 2)).toFixed(0);
                var LineY = (Math.sqrt((walls[i].x2 - dx) ** 2 + (walls[i].y2 - dy) ** 2)).toFixed(0);
                if (LineX > drob && LineY < drob) {
                    canvas.addEventListener("mousemove", MoveWall, false);
                }else if (LineX < drob && LineY > drob) {
                    canvas.addEventListener("mousemove", MoveWallX, false);
                } else if (parseInt(LineX) > parseInt(drob) && parseInt(LineY) > parseInt(drob)) {

                    canvas.addEventListener("mousemove", MoveWallXY, false);
                }
                else {
                    console.log("Ne opredelenno");
                }
            }
        }
    }
}

function MoveWallXY() {
    var dx = cursorPositionX;
    var dy = cursorPositionY;
    walls[indexWallCatch].x = dx + parseInt(CoordinatX);
    walls[indexWallCatch].y = dy + parseInt(CoordinatY);
    walls[indexWallCatch].x2 = dx - parseInt(CoordinatX2);
    walls[indexWallCatch].y2 = dy - parseInt(CoordinatY2);
    isDrawWall = false;
}

function MoveWallX() {
    walls[indexWallCatch].x = cursorPositionX;
    walls[indexWallCatch].y = cursorPositionY;
    isDrawWall = false;
}

function MoveWall() {
    DrawWall();
    isDrawWall = false;
}

function DrawWall() {
    walls[indexWallCatch].x2 = cursorPositionX ;
    walls[indexWallCatch].y2 = cursorPositionY;
    isDrawWall = true;
}

function isBetween(a, b, c, d) {
    if ((a < c + d && c - d < b) || (b < c - d && c + d < a))
        return true;
    else return false;
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

function Test(ball, wall) {
   var a = Math.sqrt((ball.x - wall.x2) ** 2 + (ball.y - wall.y2) ** 2);
   var b = Math.sqrt((ball.x - wall.x) ** 2 + (ball.y - wall.y) ** 2);
   var c = Math.sqrt((wall.x - wall.x2) ** 2 + (wall.y - wall.y2) ** 2);
   var p = (a + b + c) / 2;
   var s = Math.sqrt(p * (p - a) * (p - b) * (p - c))
   var result = (s * 2 / c).toFixed(0);
   return parseInt(result);
}

function CollisionWalls() {
    for (var obj1 in objArray) {
        for (var obj2 in walls) {
            if (objArray[obj1].radius >= Test(objArray[obj1], walls[obj2])-10) {
                h = Test(objArray[obj1], walls[obj2])-10;
                var a = (Math.sqrt((objArray[obj1].x - walls[obj2].x2) ** 2 + (objArray[obj1].y - walls[obj2].y2) ** 2)).toFixed(0);
                var b = (Math.sqrt((objArray[obj1].x - walls[obj2].x) ** 2 + (objArray[obj1].y - walls[obj2].y) ** 2)).toFixed(0);
                var c = (Math.sqrt((walls[obj2].x - walls[obj2].x2) ** 2 + (walls[obj2].y - walls[obj2].y2) ** 2)).toFixed(0);
                var summAB = parseInt(a) + parseInt(b);
                if (summAB - 50 <= c) {
                    if (h < 3 / 2 * objArray[obj1].radius && isBetween(walls[obj2].y, walls[obj2].y2, objArray[obj1].y, 2 * objArray[obj1].radius)
                        && isBetween(walls[obj2].x, walls[obj2].x2, objArray[obj1].x, 2 * objArray[obj1].radius)) {
                        var k = 2 * (objArray[obj1].dx * (walls[obj2].y - walls[obj2].y2) + objArray[obj1].dy * (walls[obj2].x2 - walls[obj2].x)) / Math.pow(c, 2);
                        objArray[obj1].dx -= k * (walls[obj2].y - walls[obj2].y2);
                        objArray[obj1].dy -= k * (walls[obj2].x2 - walls[obj2].x);
                    }
                    if ((Math.pow(objArray[obj1].x - walls[obj2].x, 2) + Math.pow(objArray[obj1].y - walls[obj2].y, 2) < Math.pow(objArray[obj1].radius, 2)) || (Math.pow(objArray[obj1].x - walls[obj2].x2, 2) + Math.pow(objArray[obj1].y - walls[obj2].y2, 2) < Math.pow(objArray[obj1].radius, 2))) {
                        objArray[obj1].dx *= -1;
                        objArray[obj1].dy *= -1;
                    }
                }
            }
        }
    }
}

function CheckCatchItem() {
    if (catchBall == true) {
        objArray[indexNewItem].x = cursorPositionX-differentWindows;
        objArray[indexNewItem].y = cursorPositionY + differentWindows;
     }
}

function GetLeftMouse(event) {
    indexElement = GetIndexElement();
    if (indexElement >= 0) {
        console.log("Ball = " + idBall + " indeEl  " + indexElement + " id-> " + objArray[indexElement].id);
        isDrawWall = false;
        indexWallCatch = -1;
    }
    if(paused)
        GetIndexWall();
    if (selectedItem) {
        drawArrow = false;
        selectedItem = false;
    }
    if (isDrawWall && indexElement < 0 && selectedItem == false) {
        selectedItem = true
        var tmp = new Wall(cursorPositionX, cursorPositionY, cursorPositionX, cursorPositionY)
        walls[walls.length] = tmp;
        indexWallCatch = walls.length - 1;
        canvas.addEventListener("mousemove", DrawWall, false);
    }
    if (catchVerticWall || catchBall) {
        catchBall = false;
    }
    else {
        canvas.addEventListener("mousemove", IMoveMouse, false);
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
var objArrayCopy = [];
var wallsCopy = [];
document.onmousemove = function (e) {
    cursorPositionX = e.pageX - differentWindows;
    cursorPositionY = e.pageY + differentWindows;
}

function Save() {
    ClearSaveWall();
    ClearSaveBall();
    objArrayCopy = objArray;
    wallsCopy = walls;
    for (var i in objArrayCopy) {
        PostDataStart(i);
    }
    for (var i in wallsCopy) {
        PostWalls(i);
    }
    objArrayCopy = [];
    wallsCopy = [];
}


function draw() {
    if (save == false) {
        setInterval(Save, 5000);
        save = true;
    }
    if (recoveryData == true) {
        recoveryData = false;
        GetDataStart();
        GetDataWalls();
    }
    ClearCanvas();
    CanvasBackground();
    CheckCatchItem();
    if (!paused) {
        MoveObjects();
        CollisionWalls();
    }
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

var temp = new Ball(800, 400, randomRadius());
temp.id = idBall;
++idBall;
objArray[objArray.length] = temp;
draw();