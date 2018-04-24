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
        //url: '@Url.Action("AddIngrid", "Home")',
        url: '@Url.Action("AddIngrid", "Home")',
        type: 'POST',

        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        traditional: true,

        data: {
            id: 1
        },
        success: successFunc,
        error: errorFunc
    });

}