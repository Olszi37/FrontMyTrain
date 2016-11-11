$(document).ready(function () {

	$(document).ajaxStart( function() {
		$.blockUI({ message: "<div style='background-color: #C6CDF7'>" +
		"<p><b>Praca serwera w toku</b></p><br>" +
		"<img src='resources/gif/ajax-loader.gif'></div>"});
	});

	$(document).ajaxStop(function () {
		$.unblockUI();
	});

	$(document).ajaxError( function () {
		$.unblockUI();
	});
});

function setTrainsets(){
	var url = "http://localhost:8080/MyTrain/trainset/set/file";
	var input = $("#trainsetInput").prop("files");
	var info = $("#trainsetP");
	var fileName = "trainsets.xlsx";

	sendRequest(url, input, fileName, info);
}

function setCarriages(){
	var url = "http://localhost:8080/MyTrain/carriage/set/file";
	var input = $("#carriageInput").prop("files");
	var info = $("#carriageP");
	var fileName = "carriages.xlsx";

	sendRequest(url, input, fileName, info);
}

function setStations(){
	var url = "http://localhost:8080/MyTrain/station/set/file";
	var input = $("#stationInput").prop("files");
	var info = $("#stationP");
	var fileName = "stations.xlsx";

	sendRequest(url, input, fileName, info)}

function setCourses(){
	var url = "http://localhost:8080/MyTrain/course/set/file";
	var input = $("#courseInput").prop("files");
	var info = $("#courseP");
	var fileName = "courses.xlsx";

	sendRequest(url, input, fileName, info)}

function setRoutePoints(){
	var url = "http://localhost:8080/MyTrain/routePoint/set/file";
	var input = $("#routePointInput").prop("files");
	var info = $("#routePointP");
	var fileName = "routePoints.xlsx";

	sendRequest(url, input, fileName, info)}

function sendRequest(url, input, fileName, info){

	if(input.length !== 0){
		var formData = new FormData();
		formData.append(fileName, input[0]);

		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			cache: false,
			crossDomain: true,
			headers: {"Access-Control-Allow-Origin": "*"},
			contentType: false,
			processData: false,
			success: function (response, status, jqXHR) {
				info.text("Dodano " + response + " rekordów.");
			},
			error: function () {
				info.addClass("error").text("Wystąpił błąd");
			}
		});
	} else {
		info.text("Wybierz plik");
	}
}