function setTrainsets(){
	var url = "http://localhost:8080/MyTrain/trainset/set/file";
	var input = $("#trainsetInput").get(0);
	var inputName = "trainset";
	var info = $("#trainsetP");
	var fileName = "trainset.xlsx";
	var button = $("#trainsetButton");
	
	sendRequest(url, input, inputName, info, fileName, button);
}

function setCarriages(){
	var url = "http://localhost:8080/MyTrain/carriage/set/file";
	var input = $("#carriageInput").get(0);
	var inputName = "carriage";
	var info = $("#carriageP");
	var fileName = "carriages.xlsx";
	var button = $("#carriageButton");

	sendRequest(url, input, inputName, info, fileName, button);
}

function setStations(){
	var url = "http://localhost:8080/MyTrain/station/set/file";
	var input = $("#stationInput").get(0);
	var inputName = "station";
	var info = $("#stationP");
	var fileName = "stations.xlsx";
	var button = $("#stationButton");

	sendRequest(url, input, inputName, info, fileName, button);
}

function setConnections(){
	var url = "http://localhost:8080/MyTrain/connection/set/file";
	var input = $("#connectionInput").get(0);
	var inputName = "connection";
	var info = $("#connectionP");
	var fileName = "connections.xlsx";
	var button = $("#connectionButton");

	sendRequest(url, input, inputName, info, fileName, button);
}

function setRoutePoints(){
	var url = "http://localhost:8080/MyTrain/routePoint/set/file";
	var input = $("#routePointInput").get(0);
	var inputName = "routePoint";
	var info = $("#routePointP");
	var fileName = "routePoints.xlsx";
	var button = $("#routePointButton");

	sendRequest(url, input, inputName, info, fileName, button);
}

function sendRequest(url, input, inputName, info, fileName, button){
	if (input.files.length === 0){
		info.addClass("error").text("Nie wybrano pliku.");
	} else {
		var formData = new FormData();
		var file = input.files[0];
		var request = new XMLHttpRequest();
		
		//formData.append(inputName, file, fileName);
		formData.append(inputName, file);
		
		request.open("POST", url, true);
		request.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:63342");
		request.setRequestHeader("Content-Type", "multipart/form-data");
		
		request.send(formData);

		request.onerror = function () {
			if (this.status == 403){
				info.addClass("error").text("403 Zabroniono. Skontaktuj sie z adminem");
			}
		};
		
		request.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var result = this.responseText;
				info.removeClass("error").text("Dodano " + result + " rekordow.");
				button.prop("disabled", true);
			} else if( this.status == 401) {
				info.addClass("error").text("401 Nieautoryzowane zadanie. Skontaktuj sie z adminem");
			} else if( this.status == 403) {
				info.addClass("error").text("403 Zabroniono. Skontaktuj sie z adminem");
			} else if( this.status == 404) {
				info.addClass("error").text("404 Nie znaleziono serwera. Skontaktuj sie z adminem");
			} else if( this.status == 408) {
				info.addClass("error").text("408 Koniec czasu oczekiwania na zadanie. Skontaktuj sie z adminem");
			} else if( this.status == 500) {
				info.addClass("error").text("500 Blad serwera. Skontaktuj sie z adminem");
			}
		}
	}
}