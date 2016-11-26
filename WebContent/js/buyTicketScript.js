/**
 * Created by Siny on 2016-10-29.
 */

$(document).ready( function () {
    var initialStop = JSON.parse(localStorage.getItem("initialStop"));
    var finalStop = JSON.parse(localStorage.getItem("finalStop"));
    var departureDate = localStorage.getItem("departureDate");

    var data = {initialStop: initialStop.id, finalStop: finalStop.id};

    //sendSearchRequest(data);
});

function sendSearchRequest(data){
    var url = "http://localhost:8080/MyTrain/search";
    
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        cache: false,
        crossDomain: true,
        headers: {"Access-Control-Allow-Origin": "*"},
        contentType: false,
        processData: false,
        success: function (response, status, jqXHR) {
            alert(response);
            //fillTable(JSON.parse(response));
        },
        error: function (jqXHR, status, errorThrown) {
            alert("Błąd: " + jqXHR.status + ": " + errorThrown);
        }
    });
}

function fillTable(response){
    var table = $("#optionTable");
    var i = 0;

    $.each(table, function (key, value) {
        table.append("<tr id='result" + i++ + "'><td>" +  + "</td></tr>")
    });
}
