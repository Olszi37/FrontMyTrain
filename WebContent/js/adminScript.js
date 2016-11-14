$(document).ready(function () {

	//getTablesStatus();

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

function getTablesStatus(){
	getTrainsetStatus();
	getCarriageStatus();
	getStationStatus();
	getCourseStatus();
	getRoutePointStatus();
}

function getTrainsetStatus(){
	var url = "http://localhost:8080/MyTrain/trainset/get/size";
	var info = $("#trainsetP");
	var statusField = $("#trainsetStatus");

	sendRowCountRequest(url, info, statusField);
}

function getCarriageStatus(){
	var url = "http://localhost:8080/MyTrain/carriage/get/size";
	var info = $("#carriageP");
	var statusField = $("#carriageStatus");

	sendRowCountRequest(url, info, statusField);
}

function getStationStatus() {
	var url = "http://localhost:8080/MyTrain/station/get/size";
	var info = $("#stationP");
	var statusField = $("#stationStatus");

	sendRowCountRequest(url, info, statusField);
}

function getCourseStatus() {
	var url = "http://localhost:8080/MyTrain/course/get/size";
	var info = $("#courseP");
	var statusField = $("#courseStatus");

	sendRowCountRequest(url, info, statusField);
}

function getRoutePointStatus(){
	var url = "http://localhost:8080/MyTrain/routePoint/get/size";
	var info = $("#routePointP");
	var statusField = $("#routePointStatus");

	sendRowCountRequest(url, info, statusField);
}

function sendRowCountRequest(url, info, statusField) {
	$.ajax({
		url: url,
		type: "GET",
		cache: false,
		crossDomain: true,
		headers: {"Access-Control-Allow-Origin": "*"},
		contentType: false,
		processData: false,
		success: function (response, status, jqXHR) {
			statusField.text(response + " rekordów");
		},
		error: function () {
			info.addClass("error").text("Wystapil blad");
		}
	});
}

function setTrainsets(){
	var url = "http://localhost:8080/MyTrain/trainset/set/file";
	var input = $("#trainsetInput").prop("files");
	var info = $("#trainsetP");
	var fileName = "trainsets.xlsx";

	sendFileRequest(url, input, fileName, info);

	getTrainsetStatus();
}

function setCarriages(){
	var url = "http://localhost:8080/MyTrain/carriage/set/file";
	var input = $("#carriageInput").prop("files");
	var info = $("#carriageP");
	var fileName = "carriages.xlsx";

	sendFileRequest(url, input, fileName, info);

	getCarriageStatus();
}

function setStations(){
	var url = "http://localhost:8080/MyTrain/station/set/file";
	var input = $("#stationInput").prop("files");
	var info = $("#stationP");
	var fileName = "stations.xlsx";

	sendFileRequest(url, input, fileName, info);

	getStationStatus();
}

function setCourses(){
	var url = "http://localhost:8080/MyTrain/course/set/file";
	var input = $("#courseInput").prop("files");
	var info = $("#courseP");
	var fileName = "courses.xlsx";

	sendFileRequest(url, input, fileName, info);

	getCourseStatus();
}

function setRoutePoints(){
	var url = "http://localhost:8080/MyTrain/routePoint/set/file";
	var input = $("#routePointInput").prop("files");
	var info = $("#routePointP");
	var fileName = "routePoints.xlsx";

	sendFileRequest(url, input, fileName, info);

	getRoutePointStatus();
}

function sendFileRequest(url, input, fileName, info){

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
			error: function (jqXHR, status, errorThrown) {
				info.addClass("error").text("Wystąpił błąd");
			}
		});
	} else {
		info.text("Wybierz plik");
	}
}