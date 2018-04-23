function DataConnection() {

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

function successFunc(data, status) {
    alert(data);
}

function errorFunc(errorData) {
    alert('Ошибка' + errorData.responseText);
}

function GetDataConnection() {
    $.ajax({
        type: "POST",
        url: "@(Url.Action('Index', 'Controller'))",
        data: { indexElement: indexElement },
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: true,
        success: function (result) {
            alert("succes");
        },
        error: function () {
            alert("False");
        }
    });
}