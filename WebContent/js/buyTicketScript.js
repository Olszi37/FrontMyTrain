/**
 * Created by Siny on 2016-10-29.
 */

$(document).ready( function () {
    var initialStop = JSON.parse(localStorage.getItem("initialStop"));
    var finalStop = JSON.parse(localStorage.getItem("finalStop"));
    var departureDate = localStorage.getItem("departureDate");

    var data = {initialID: initialStop.id, finalID: finalStop.id, departure: departureDate};

    sendSearchRequest(data);
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
            
            fillTable();
        },
        error: function (jqXHR, status, errorThrown) {
            alert("Błąd: " + jqXHR.status + ": " + errorThrown);
        }
    });
}

function fillTable(){

}
