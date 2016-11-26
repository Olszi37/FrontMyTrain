/**
 * Created by Siny on 2016-10-29.
 */
function setSearchData(){
    getStations();
    setDatalist();
    var date = $("#departureDate").get(0);
    date.value = new Date().toLocaleDateString("eu-PL");
}

function getStations(){
    var url = "http://localhost:8080/MyTrain/station/get/all";

    $.ajax({
        url: url,
        type: "GET",
        contentType: false,
        dataType: "json",
        success: function (response, status, jqXHR) {
            localStorage.setItem("stations", JSON.stringify(response));
        }
    })
}

function setDatalist(){
    var dataList = $("#stationNames")[0];

    var stations = JSON.parse(localStorage.getItem("stations"));

    $.each(stations, function(key, val){
        var option = document.createElement("option");
        option.value = stations[key].name;
        dataList.appendChild(option);
    })
}

function redirect(){
    localStorage.setItem("initialStop", getStationObject($("#initialStop").val()));
    localStorage.setItem("finalStop", getStationObject($("#finalStop").val()));
    localStorage.setItem("departureDate", $("#departureDate").val());

    window.location.href = "buyTicket.html";
}

function getStationObject(name){
    var stations = JSON.parse(localStorage.getItem("stations"));
    var find;

    $.each(stations, function (key, val) {
        if(name === stations[key].name){
            find = stations[key];
        }
    });

    return JSON.stringify(find);
}