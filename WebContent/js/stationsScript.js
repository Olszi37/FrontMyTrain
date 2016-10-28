function setData(){
	getStations();
	setDatalist();
    var date = $("#departureDate")[0];
    date.value = new Date().toLocaleDateString("eu-PL");
}

function getStations(){
	var request = new XMLHttpRequest();
	var url = "http://localhost:8080/MyTrain/station/get/all";
	
	request.open("GET", url, true);
	request.setRequestHeader("Access-Control-Allow-Origin", "*");
	request.setRequestHeader("accept", "Application/json");
	request.send();
	
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var result = this.responseText;

			localStorage.setItem("stations", result);
		}
	}
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
	window.sessionStorage.setItem("sessionItem", $("#initialStop").val());
	window.localStorage.setItem("localItem", $("#initialStop").val());
	
	$("#some").text(localStorage.getItem("localItem"));

	//window.location.href = "buyTicket.html";
}

function getStationObject(name){
	var stations = JSON.parse(localStorage.getItem("stations"));
	
	
}
