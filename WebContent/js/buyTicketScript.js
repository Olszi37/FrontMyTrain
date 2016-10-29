/**
 * Created by Siny on 2016-10-29.
 */

function getSearchResults(){
    var initialStop = JSON.parse(localStorage.getItem("initialStop"));
    var finalStop = JSON.parse(localStorage.getItem("finalStop"));
    var departureDate = localStorage.getItem("departureDate");


}

function sendRequest(){
    var url = "http://localhost:8080/MyTrain/search"

    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.setRequestHeader("Content-Type","application/json");

    // request.send();
}

function fillTable(){

}
