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


function JsonClearSave() {
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
    var x = (objArray[i].x).toFixed(1);
    var y = (objArray[i].y).toFixed(1);
    var str = objArray[i].id + " " +
        objArray[i].radius + " " +
        x + " " +
        y + " " +
        objArray[i].dx + " " +
        objArray[i].dy;
    //console.log(objArray[i].id);
    $.post('/Home/AddIngrid', {parameters: str});
}

function ParseJsonStrt(str) {
    for (var i = 0; i < str.length; ++i)
    {
        //console.log("Hello");
        var a = str[i].split(' ');
        var x = parseInt(a[2]);
        var y = parseInt(a[3]);
        var radius = parseInt(a[1]);
        var tmp = new Ball(x, y, radius);
        tmp.id = a[0];
        tmp.dx = a[4];
        tmp.dy = a[5];
        tmp.color = "red";
        idBall = tmp.id;
        objArray[objArray.length] = tmp;

    }
}