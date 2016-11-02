function setTrainsets(){
	var url = "http://localhost:8080/MyTrain/trainset/set/file";
	var input = $("#trainsetInput").get(0);
	var info = $("#trainsetP");
	var fileName = "trainsets.xlsx";
	
	sendRequest(url, input, fileName, info);
}

function setCarriages(){
	var url = "http://localhost:8080/MyTrain/carriage/set/file";
	var input = $("#carriageInput").get(0);
	var info = $("#carriageP");
	var fileName = "carriages.xlsx";

	sendRequest(url, input, fileName, info);
}

function setStations(){
	var url = "http://localhost:8080/MyTrain/station/set/file";
	var input = $("#stationInput").get(0);
	var info = $("#stationP");
	var fileName = "stations.xlsx";

	sendRequest(url, input, fileName, info)}

function setConnections(){
	var url = "http://localhost:8080/MyTrain/connection/set/file";
	var input = $("#connectionInput").get(0);
	var info = $("#connectionP");
	var fileName = "connections.xlsx";

	sendRequest(url, input, fileName, info)}

function setRoutePoints(){
	var url = "http://localhost:8080/MyTrain/routePoint/set/file";
	var input = $("#routePointInput").get(0);
	var info = $("#routePointP");
	var fileName = "routePoints.xlsx";

	sendRequest(url, input, fileName, info)}

function sendRequest(url, input, fileName, info){
	var formData = new FormData();
	formData.append(fileName, input.files[0]);

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
}