'use strict';

/* Controllers */
var serverUrl = "https://mobiledatausage.herokuapp.com";

myapp.controller('firstCtrl', ['$scope','$http', function($scope, $http){
//js for showing map 
	var map= function (received) {

	var markers = received[0].data;
	var num=received[0].number;	
	var mapOptions = {

	center: new google.maps.LatLng(12.9715987, 77.5945627),
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
	var infoWindow = new google.maps.InfoWindow();
	var lat_lng = new Array();
	var latlngbounds = new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
	var data = markers[i]

	var myLatlng = new google.maps.LatLng( data.latitude,data.longitude);
	lat_lng.push(myLatlng);
	console.log(received[0].number);
	var marker = new google.maps.Marker({
	position: myLatlng,
	map: map,
	title: received[0].number
	});
	latlngbounds.extend(marker.position);
	(function (marker, data) {
	google.maps.event.addListener(marker, "click", function (e) {
	infoWindow.setContent(data.description);
	infoWindow.open(map, marker);
	});
	})(marker, data);
	}
	map.setCenter(latlngbounds.getCenter());
	map.fitBounds(latlngbounds);
	console.log(markers);

}




//extracting numbers
	var url = serverUrl+"/get_mbnum/";
            $http.get(url).success(function (response) {
                $scope.t1 = response;
		console.log($scope.t1)	;
            });	
 


	console.log("hello");



	$scope.formatLocalDate =  function(now) {
	    		//var now = new Date(),
	          var tzo = -now.getTimezoneOffset(),
	          dif = tzo >= 0 ? '+' : '-',
	        	pad = function(num) {
	          var norm = Math.abs(Math.floor(num));
	          return (norm < 10 ? '0' : '') + norm;
	        };

		console.log("Inside fn");
	    	return now.getFullYear() 
	        + '-' + pad(now.getMonth()+1)
	        + '-' + pad(now.getDate())
	        + 'T' + pad(now.getHours())
	        + ':' + pad(now.getMinutes()) 
	        + ':' + pad(now.getSeconds()) 
	        + dif + pad(tzo / 60) 
	        + ':' + pad(tzo % 60);
	}

	$scope.getData = function(){
		var cls = angular.element(document.querySelector('#demoID'));
		cls.empty();
		console.log("in getData");
	var date1=new Date($scope.strtDate);
	var date2=new Date($scope.endDate);
		console.log(date1+".."+date2);
	date1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate());
	date2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());

	console.log("After date capture");
	date1 = $scope.formatLocalDate(date1);
	date2 = $scope.formatLocalDate(date2);
	
	console.log("After fn call"+$scope.selectedNumber.number);

	var dateToJson = {
				"startDate":date1,
				"endDate":date2,
				"number":$scope.selectedNumber.number,
				};
	//var serializedData = $.param({name:Hello});

	console.log(dateToJson);

	$http({
	    method: 'POST',
	    url: serverUrl+'/query_individual',
	    data: angular.toJson(dateToJson),
	    headers: {
	        'Content-Type': 'text/plain',
		   'Accept':'text/plain'
	    }}).then(function(response) {
	           //console.log(result);
			//$scope.data = response;			
			var received = response.data;
			//received = JSON.parse(received);
			$scope.data = received;		
			runD3(received);

       });
//for geting map data from node
	$http({
	    method: 'GET',
	    url: serverUrl+'/get_coor'
	    }).then(function(response) {
	           //console.log(result);
			//$scope.data = response;			
			var received = response.data;
			//received = JSON.parse(received);

			$scope.data1 = received;
			console.log(received);
			map(received)
			console.log($scope.data1);
//			$window.data = received;		
	//		runD3(received);


       });
	

	function runD3(data){
		var svg = dimple.newSvg("div.demo", 1500, 600);

	console.log("hellooo");
	console.log(data);
	var chart = new dimple.chart(svg,data);
    chart.addCategoryAxis("x", ["Session","type"]);
    chart.addMeasureAxis("y", "data");
    chart.addSeries("type", dimple.plot.bar);
    chart.addLegend(600, 10, 510, 20, "right");
    chart.draw();

	}
	 
	}

	
  }]);


    var data1 = [
      { "Session":"Morning", "type":"TotalTxWifi","data":2000},
      { "Session":"Morning", "type":"TotalRxWifi","data":3000},
      { "Session":"Evening", "type":"TotalTxWifi","data":1000},
      { "Session":"Evening", "type":"TotalRxWifi","data":4000},
      { "Session":"Night", "type":"TotalTxWifi","data":4000},
      { "Session":"Night", "type":"TotalRxWifi","data":8000},
      { "Session":"Early Morning", "type":"TotalTxWifi","data":3000},
      { "Session":"Early Morning", "type":"TotalRxWifi","data":4500},
    ];	
	var data_pie = [
  {'month': 'march', 'percent': 60, 'type' : 'on-sale'},
  {'month': 'october', 'percent': 90, 'type' : 'on-sale'}
];

// controller for total data
myapp.controller('nextCtrl', ['$scope','$http',function($scope, $http){

	

	console.log("hello total visualization");
var map= function (received) {

	var markers = received[0].data;
	var num=received[0].number;	
	var mapOptions = {

	center: new google.maps.LatLng(12.9715987, 77.5945627),
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
	var infoWindow = new google.maps.InfoWindow();
	var lat_lng = new Array();
	var latlngbounds = new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
	var data = markers[i]

	var myLatlng = new google.maps.LatLng( data.latitude,data.longitude);
	lat_lng.push(myLatlng);
	console.log(received[0].number);
	var marker = new google.maps.Marker({
	position: myLatlng,
	map: map,
	title: received[0].number
	});
	latlngbounds.extend(marker.position);
	(function (marker, data) {
	google.maps.event.addListener(marker, "click", function (e) {
	infoWindow.setContent(data.description);
	infoWindow.open(map, marker);
	});
	})(marker, data);
	}
	map.setCenter(latlngbounds.getCenter());
	map.fitBounds(latlngbounds);
	console.log(markers);

}



	$scope.formatLocalDate =  function(now) {
	    		//var now = new Date(),
	          var tzo = -now.getTimezoneOffset(),
	          dif = tzo >= 0 ? '+' : '-',
	        	pad = function(num) {
	          var norm = Math.abs(Math.floor(num));
	          return (norm < 10 ? '0' : '') + norm;
	        };

		console.log("Inside fn");
	    	return now.getFullYear() 
	        + '-' + pad(now.getMonth()+1)
	        + '-' + pad(now.getDate())
	        + 'T' + pad(now.getHours())
	        + ':' + pad(now.getMinutes()) 
	        + ':' + pad(now.getSeconds()) 
	        + dif + pad(tzo / 60) 
	        + ':' + pad(tzo % 60);
	}

	$scope.getData = function(){
		console.log("in getData");
		var cls = angular.element(document.querySelector('#demoID'));
		cls.empty();
	var date1=new Date($scope.strtDate);
	var date2=new Date($scope.endDate);
		console.log(date1+".."+date2);
	date1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate());
	date2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());

	console.log("After date capture");
	date1 = $scope.formatLocalDate(date1);
	date2 = $scope.formatLocalDate(date2);
	
	//console.log("After fn call"+$scope.selectedNumber.number);

	var dateToJson = {
				"startDate":date1,
				"endDate":date2,
				};
	//var serializedData = $.param({name:Hello});

	$http({
	    method: 'POST',
	    url: serverUrl+'/query',
	    data: angular.toJson(dateToJson),
	    headers: {
	        'Content-Type': 'text/plain',
		   'Accept':'text/plain'
	    }}).then(function(response) {
	           //console.log(result);
			//$scope.data = response;			
			var received = response.data;
			//received = JSON.parse(received);
			$scope.data = received;		
			runD3(received);  // for data from server
       });
//for geting map data from node
	$http({
	    method: 'GET',
	    url: serverUrl+'/get_coor'
	    }).then(function(response) {
	           //console.log(result);
			//$scope.data = response;			
			var received = response.data;
			//received = JSON.parse(received);

			$scope.data1 = received;
			
			map(received)
			//console.log($scope.data1);
//			$window.data = received;		
	//		runD3(received);


       });
	$http({
	    method: 'POST',
	    url: serverUrl+'/appwise',
	    data: angular.toJson(dateToJson),
	    headers: {
	        'Content-Type': 'text/plain',
		   'Accept':'text/plain'
	    }}).then(function(response) {
	           //console.log(result);
			//$scope.data = response;			
			var received = response.data;
			//received = JSON.parse(received);
			console.log(received);
			$scope.data = received;		
			appwiseD3(received);		// for static data
			appwiseChartD3(received);
       });


	function runD3(data){
		var svg = dimple.newSvg("div.demo", 1500, 600);

	//console.log("hellooo");
	var chart = new dimple.chart(svg,data);
    chart.addCategoryAxis("x", ["Session","type"]);
    chart.addMeasureAxis("y", "data");
    chart.addSeries("type", dimple.plot.bar);
    chart.addLegend(600, 10, 510, 20, "right");
    chart.draw();

	}

// pie chart for app wise data visualization
function appwiseD3(appData){
console.log("hellooo in d31");
var w = 400;
var h = 400;
var r = h/2;
var color = ['green','red','blue','orange','pink'];

var data=[] ;

console.log(appData);
var totalSum=0
for(var i=0;i<5;i++)
{
	totalSum+=appData[i].applicationTotal;
}
for(var i=0;i<5;i++)
{
	data.push({label:appData[i]._id,value:(appData[i].applicationTotal/totalSum)*100});
}

console.log(data);

var vis = d3.select('div.demo').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){
        return color[i];
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    });

// add the text
arcs.append("svg:text").attr("transform", function(d){
			d.innerRadius = 0;
			d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return data[i].label+" "+data[i].value+" %";}
		);

	}
	 
	}

	
  }]);

  	function appwiseChartD3(data){
		var svg = dimple.newSvg("div.demo1", 1500, 600);

	//console.log("hellooo");
	var chart = new dimple.chart(svg,data);
    chart.addCategoryAxis("x", "_id");
    chart.addMeasureAxis("y", "applicationTotal");
    chart.addSeries(null, dimple.plot.bar);
    chart.addLegend(600, 10, 510, 20, "right");
    chart.draw();

	}
