$(document).ready(function () {

	getTablesStatus();

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

//status functions

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

// file uploads

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

//clear functions

function clearTrainset(){
	var url = "http://localhost:8080/MyTrain/trainset/clear";
	var info = $("#trainsetP");

	if($("#carriageStatus").val() == "0"){
		alert("Musisz najpierw wyczyścić tabelę Wagony.");
	} else {
		jConfirm()
	}
}

function clearCarriage(){
	var url = "http://localhost:8080/MyTrain/trainset/clear";
	var info = $("#carriageP");

	var answer = confirm("Czy chcesz wyczyścić tabelę?");

	if(answer){
		//sendClearRequest(url, info);
		//getCarriageStatus();
		alert("OK");
	}
}

function clearStation(){
	var url = "http://localhost:8080/MyTrain/trainset/clear";
	var info = $("#stationP");

	sendClearRequest(url, info);
	getStationStatus();
}

function clearCourse(){
	var url = "http://localhost:8080/MyTrain/trainset/clear";
	var info = $("#courseP");

	sendClearRequest(url, info);
	getCourseStatus();
}

function clearRoutePoint(){
	var url = "http://localhost:8080/MyTrain/trainset/clear";
	var info = $("#routePointP");

	sendClearRequest(url, info);
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
				info.addClass("error").text("Wystąpił błąd: " + jqXHR.status + " " + errorThrown);
			}
		});
	} else {
		info.text("Wybierz plik");
	}
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
			var ending = " rekordów.";

			if(response == 1){
				ending = " rekord."
			}
			if(response != 1 && response != 0 && response < 5){
				ending = " rekordy.";
			}

			statusField.text(response + ending);
		},
		error: function (jqXHR, status, errorThrown) {
			info.addClass("error").text("Wystąpił błąd: " + jqXHR.status + " " + errorThrown);
		}
	});
}

function sendClearRequest(url, info) {
	$.ajax({
		url: url,
		type: "DELETE",
		cache: false,
		crossDomain: true,
		headers: {"Access-Control-Allow-Origin": "*"},
		contentType: false,
		processData: false,
		success: function (response, status, jqXHR) {
			info.text("Wyczyszczono tabelę.");
		},
		error: function (jqXHR, status, errorThrown) {
			info.addClass("error").text("Wystąpił błąd: " + jqXHR.status + " " + errorThrown);
		}
	})
}