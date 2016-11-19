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

	$("#clear_dialog").dialog({
		autoOpen: false,
		resizable: false,
		height: 200,
		width: 300,
		modal: true,
		position: "center"
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
	var statusField = $("#trainsetStatus");

	sendFileRequest(url, input, fileName, info, statusField);
}

function setCarriages(){
	var url = "http://localhost:8080/MyTrain/carriage/set/file";
	var input = $("#carriageInput").prop("files");
	var info = $("#carriageP");
	var fileName = "carriages.xlsx";
	var statusField = $("#carriageStatus");

	sendFileRequest(url, input, fileName, info, statusField);
}

function setStations(){
	var url = "http://localhost:8080/MyTrain/station/set/file";
	var input = $("#stationInput").prop("files");
	var info = $("#stationP");
	var fileName = "stations.xlsx";
	var statusField = $("#stationStatus");

	sendFileRequest(url, input, fileName, info, statusField);
}

function setCourses(){
	var url = "http://localhost:8080/MyTrain/course/set/file";
	var input = $("#courseInput").prop("files");
	var info = $("#courseP");
	var fileName = "courses.xlsx";
	var statusField = $("#courseStatus");

	sendFileRequest(url, input, fileName, info, statusField);
}

function setRoutePoints(){
	var url = "http://localhost:8080/MyTrain/routePoint/set/file";
	var input = $("#routePointInput").prop("files");
	var info = $("#routePointP");
	var fileName = "routePoints.xlsx";
	var statusField = $("#routePointStatus");

	sendFileRequest(url, input, fileName, info, statusField);
}

//clear functions

function clearTrainset(){
	var url = "http://localhost:8080/MyTrain/trainset/clear";
	var info = $("#trainsetP");
	var dialog = $("#clear_dialog");
	var statusField = $("#trainsetStatus");
	var carriageRows = parseInt($("#carriageStatus").text());
	var rows = parseInt(statusField.text());


	if(rows == 0){
		info.text("Tabela jest pusta");
	}
	else {
		if(carriageRows != 0){
			$("#dialog_message").text("Przed wyczyszczeniem tej tabeli musisz wyczyścić tabelę Wagony.");
			dialog.dialog("option", "buttons", {
				"Ok" : function () {
					dialog.dialog("close");
				}
			});
			dialog.dialog("open");
		} else {
			openDialog(0, url, info, statusField);
		}
	}
}

function clearCarriage(){
	var url = "http://localhost:8080/MyTrain/carriage/clear";
	var info = $("#carriageP");
	var statusField = $("#carriageStatus");
	var rows = parseInt(statusField.text());


	if(rows == 0)
		info.text("Tabela jest pusta");
	else
		openDialog(1, url, info, statusField);
}

function clearStation(){
	var url = "http://localhost:8080/MyTrain/station/clear";
	var info = $("#stationP");
	var dialog = $("#clear_dialog");
	var statusField = $("#stationStatus");
	var courseRows = parseInt($("#courseStatus").text());
	var rows = parseInt(statusField.text());


	if(rows == 0){
		info.text("Tabela jest pusta");
	} else {
		if(courseRows != 0){
			$("#dialog_message").text("Przed wyczyszczeniem tej tabeli musisz wyczyścić najpierw " +
				"Rozdkład kursów, a następnie Kursy.");
			dialog.dialog("option", "buttons", {
				"Ok" : function () {
					dialog.dialog("close");
				}
			});
			dialog.dialog("open");
		} else {
			openDialog(2, url, info, statusField);
		}
	}
}

function clearCourse(){
	var url = "http://localhost:8080/MyTrain/course/clear";
	var info = $("#courseP");
	var dialog = $("#clear_dialog");
	var statusField = $("#courseStatus");
	var routePointRows = parseInt($("#routePointStatus").text());
	var rows = parseInt(statusField.text());


	if(rows == 0){
		info.text("Tabela jest pusta");
	} else {
		if(routePointRows != 0){
			$("#dialog_message").text("Przed wyczyszczeniem tej tabeli musisz wyczyścić tabelę Rozkład kursów");
			dialog.dialog("option", "buttons", {
				"Ok" : function () {
					dialog.dialog("close");
				}
			});
			dialog.dialog("open");
		} else {
			openDialog(3, url, info, statusField);
		}
	}
}

function clearRoutePoint(){
	var url = "http://localhost:8080/MyTrain/routePoint/clear";
	var info = $("#routePointP");
	var statusField = $("#routePointStatus");
	var rows = parseInt(statusField.text());

	if(rows == 0)
		info.text("Tabela jest pusta");
	else
		openDialog(4, url, info, statusField);
}


function openDialog(table, url, info, statusField){
	var dialog = $("#clear_dialog");
	$("#dialog_message").text("Czy jesteś pewien?");

	dialog.dialog("option", "buttons", {
		"Tak": function () {
			dialog.dialog("close");

			if(table == 0){
				sendClearRequest(url, info, statusField);
			} else if (table == 1){
				sendClearRequest(url, info, statusField);
			} else if (table == 2){
				sendClearRequest(url, info, statusField);
			} else if (table == 3){
				sendClearRequest(url, info, statusField);
			} else {
				sendClearRequest(url, info, statusField);
			}
		},
		"Nie" : function () {
			dialog.dialog("close");
		}
	});
	dialog.dialog("open");
}



function sendFileRequest(url, input, fileName, info, statusField){

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

function sendClearRequest(url, info, statusField) {
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
			statusField.text("0 rekordów")
		},
		error: function (jqXHR, status, errorThrown) {
			info.addClass("error").text("Wystąpił błąd: " + jqXHR.status + " " + errorThrown);
		}
	})
}