function setTrainsets(){
	var url = "http://localhost:8080/MyTrain/trainset/set/file";
	var input = $("#trainsetInput").get(0);
	var inputName = "trainset";
	var info = $("#trainsetP").get(0);
	var fileName = "trainsets.xlsx";
	var button = $("#trainsetButton").get(0);
	
	sendRequest(url, input, inputName, info, fileName, button)
}

function sendRequest(url, input, inputName, info, fileName, button){
	if (input.files.length === 0){
		info.addClass("error").text("Nie wybrano pliku.");
	} else {
		var formData = new FormData();
		var file = input.files[0];
		var request = new XMLHttpRequest();
		
		formData.append(inputName, file, fileName);
		
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "multipart/form-data");
		request.setRequestHeader("Access-Control-Allow-Origin", "*");
		
		request.send(formData);
		
		request.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				var result = this.responseText;
				info.addClass("response").text("Dodano " + result + " rekordow.");
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