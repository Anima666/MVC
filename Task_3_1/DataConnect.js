function GetDataStart() {
    $.ajax({
        type: "POST",
        url: "/Home/BallData",
        data: param = "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
}

function ClearSaveWall() {
    $.ajax({
        type: "POST",
        url: "/Home/ClearWallList",
        data: param = "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successClear,
        error: errorFunc
    });
}

function ClearSaveBall() {
    $.ajax({
        type: "POST",
        url: "/Home/ClearListParameters",
        data: param = "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successClear,
        error: errorFunc
    });
}

function successClear(data, status) {
    //alert("List was done clear");
}

function successFunc(data, status) {
    objArray = [];
    ParseJsonStrt(data);
}

function errorFunc(errorData) {
    alert('Ошибка' + errorData.responseText);
}

function PostDataStart(i) {
    var x = parseInt(objArray[i].x).toFixed(1);
    var y = parseInt(objArray[i].y).toFixed(1);
    var str = objArray[i].id + " " +
        objArray[i].radius + " " +
        x + " " +
        y + " " +
        objArray[i].dx + " " +
        objArray[i].dy;
    $.post('/Home/AddIngrid', {parameters: str});
}

function PostWalls(i) {
    var x = parseInt(walls[i].x).toFixed(1);
    var y = parseInt(walls[i].y).toFixed(1);
    var x2 = parseInt(walls[i].x2).toFixed(1);
    var x3 = parseInt(walls[i].y2).toFixed(1);
    var str = walls[i].x + " " +
        walls[i].y + " " +
        walls[i].x2 + " " +
        walls[i].y2;
    $.post('/Home/PostParametersWalls', { parameters: str });
}

function ParseJsonStrt(str) {
    for (var i = 0 in str)
    {
        var a = str[i].split(' ');
        var x = parseInt(a[2]);
        var y = parseInt(a[3]);
        var radius = parseInt(a[1]);
        var tmp = new Ball(x, y, radius);
        tmp.id = a[0];
        tmp.dx = a[4];
        tmp.dy = a[5];
        tmp.color = "black";
        objArray[objArray.length] = tmp;
        ++idBall;
    }
}

function GetDataWalls() {
    $.ajax({
        type: "POST",
        url: "/Home/WallData",
        data: param = "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: successF,
        error: errorFunc
    });
}

function ParseWalls(str) {
    for (var i in str) {
        var a = str[i].split(' ');
        var x = parseInt(a[0]);
        var y = parseInt(a[1]);
        var x2 = parseInt(a[2]);
        var y2 = parseInt(a[3]);
        var tmp = new Wall(x, y, x2, y2);
        walls[walls.length] = tmp;
    }
}

function successF(data, status) {
    walls = [];
    ParseWalls(data);
}