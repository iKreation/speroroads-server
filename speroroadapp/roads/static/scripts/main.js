/*var test_routes = [
{
      "subRoutes": [
        [
          {
            "timestamp": "2014-05-02T14:33:20.731Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:20.731Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:20.940Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:21.732Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:21.880Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:22.732Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:24.153Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:24.735Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:25.154Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          {
            "timestamp": "2014-05-02T14:33:25.735Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          }
        ]
      ],
      "occurrences": [
        {
          "name": "Rodeiras - Tipo 1",
          "createddate": "2014-05-02T14:33:20.944Z",
          "instance_id": "11",
          "path": null,
          "position": {
            "timestamp": "2014-05-02T14:33:20.940Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          "type": "single",
          "id": 1399041200944
        },
        {
          "name": "Peladas etc - Tipo 2",
          "createddate": "2014-05-02T14:33:22.736Z",
          "instance_id": "32",
          "path": null,
          "position": {
            "timestamp": "2014-05-02T14:33:22.732Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          "type": "single",
          "id": 1399041202736
        },
        {
          "name": "Repara\u00e7\u00f5es - Tipo 1",
          "createddate": "2014-05-02T14:33:25.157Z",
          "instance_id": "51",
          "path": null,
          "position": {
            "timestamp": "2014-05-02T14:33:25.154Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          "type": "single",
          "id": 1399041205157
        },
        {
          "name": "Repara\u00e7\u00f5es - Tipo 2",
          "createddate": "2014-05-02T14:33:26.124Z",
          "instance_id": "52",
          "path": null,
          "position": {
            "timestamp": "2014-05-02T14:33:25.735Z",
            "coords": {
              "altitude": 0,
              "longitude": -122.406417,
              "latitude": 37.785834,
              "altitudeAccuracy": -1,
              "speed": -1,
              "heading": -1,
              "accuracy": 5
            }
          },
          "type": "single",
          "id": 1399041206124
        }
      ],
      "id": 1399041146501,
      "name": "2\/4\/2014 15:32"
    }]
*/

var roads = {
	routes: [],
	reports: {},

	markerBounds: [],

	addOccurrenceToMap: function(obj) {

		//this.removeAllOcurrences();

		for(var i = 0; i<roads.reports.length; i++){
			if (roads.reports[i].id == obj) {

				var levantamento = roads.reports[i];
				var ocurrencias = levantamento.occurrences;

				for(var j = 0; j < ocurrencias.length; j++){

					var ocurrencia = ocurrencias[j];

					var string = 

					'<div class="row occurrencia" style="margin-top:-100px" id='+ocurrencia.id +'>'
					+ '<div class="large-7 medium-7 small-10 columns occu_report" ' +'>'
					+ '<div class="callout report " style="height:80px; margin-left:5%; margin-top:10px;" id='+ocurrencia.id +"1"+'>'
					+ '<p><b>' + ocurrencia.id + '</b></p><p>'+ ocurrencia.type + ' </p>'
					+ '</div>'
					+ '</div>'
					+ '</div>';
					$('.levantamentos').append(string);

					if(ocurrencia.type == "single"){
						console.log("single");

						this.addOccurence(ocurrencia);
					}
					else{
						this.addPath(ocurrencia);
					}

				}
			}

		var bounds = new google.maps.LatLngBounds();

		for(var i = 0; i < this.markerBounds.length; i++) {
			bounds.extend(this.markerBounds[i]);
		}


		this.map.fitBounds(bounds);
		this.map.setZoom(15);

		}
	},

	removeAllOcurrences: function() {
		this.setAllMap(null);
		this.markerBounds = [];
	},

	removeCurrentOcurrence: function() {

	},

	setAllMap: function(map){
		for (var i = 0; i < window.markers.length; i++) {
			window.markers[i].setMap(map);
		}

	},

	addOccurence: function(obj) {

		console.log("1");
		console.log(obj);

		//this.removeAllOcurrences();

		var latitude = obj.position.coords.latitude;
		var longitude = obj.position.coords.longitude;


		var myLatlng = new google.maps.LatLng(latitude,longitude);
		console.log("2");


		this.markerBounds.push(new google.maps.LatLng(latitude,longitude));

		console.log("3");

		var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1 id="firstHeading" style="color:#000000" class="firstHeading">' + obj.id + '</h1>'+
		'<h2 id="secondHeading" style="color:#000000" class="secondHeading">' + obj.type + '</h2>'
		'</div>';

		console.log("foi aqui");

		var marker = new google.maps.Marker({
			position: myLatlng,
			zoom: 100,
			map: this.map,
			title: obj.type

		});




		console.log("4");

		console.log(marker);

	  	google.maps.event.addListener(marker, 'click', function() {
	  		console.log(marker);
	  		console.log(map);

	  		console.log(" n tem, cria ");
	  		window.currentMarker = marker;
	  		if(window.infowindow) {
	  			window.infowindow.close()
	  		}
	  		window.infowindow = null;

	  		window.infowindow = new google.maps.InfoWindow({
      							content: contentString
		  					});
		  	
		  	window.infowindow.open(this.map,marker);

		  	
		  	
	  	});
	  	console.log("push marker");
	  	window.markers.push(marker);

	},

	addPath: function(obj) { 

		console.log("path");
		console.log(obj);
		console.log(obj.path);

		var path = [];
			
		for(var i = 0; i<obj.path.length; i++){

			path.push(new google.maps.LatLng(obj.path[i].latitude, obj.path[i].longitude));
		}


		var polyline = new google.maps.Polyline({

			path: path,
			strokeColor: '#0000FF',
			strokeOpacity: 0.7,
			strokeWeight: 1
		});
		console.log(path);
		console.log('crl');
		console.log(polyline)
		console.log(this.map)
		polyline.setMap(this.map);



	}
}

/* Main changes */

roads.showOccurrences = function(options) {
	var route_id = options.route_id;
	var self = this;
	var route = self.findRoute({
		id: route_id
	});

	if (route) {
		$(".levantamentos .occurrencia").remove();

		//$('#'+route.id+'').attr('style', 'background-color: green !important;');
	
		var occurrences = route.occurrences;
		for (var i = 0; i < occurrences.length; i++) {
			var template = self.buildOccurrenceTemplate({
				id: occurrences[i].id,
				name: occurrences[i].name,
				instance_id: occurrences[i].instance_id,
				createddate: occurrences[i].createddate,
				timestamp: occurrences[i].position.timestamp,
				altitude: occurrences[i].position.coords.altitude,
				longitude: occurrences[i].position.coords.longitude,
				latitude: occurrences[i].position.coords.latitude,
				altitudeAccuracy: occurrences[i].position.coords.altitudeAccuracy,
				speed: occurrences[i].position.coords.speed,
				heading: occurrences[i].position.coords.heading,
				accuracy: occurrences[i].position.coords.accuracy,
				type: occurrences[i].type
			});

			$(".levantamentos").append(template);
		};
	}
}

roads.editRoute = function(options) {
	var route = options.route;

	$.post("/speroroadapp/"+route.id+"/", {'route':JSON.stringify(route)}, function(data) {
		console.log(data);
		if (data.success) {
			alert("Route updated!");
		}
	}, "json");
}

roads.getCSV = function(options) {
	var r_id = options.id;
	window.open(
		"/export/"+r_id+"/",
		"_blank"
	);
} 

roads.triggerEvents = function() {
	var reports = $('#reports');
	var routes = reports.find('.levantamentos');
	var self = this;
	
	routes.each(function () {

		var route = $(this);
		var botaoEdit = route.find(".conEdit");
		var botaoExport = route.find(".conExport");
		var botaoView = route.find(".conView");
		
		botaoEdit.click(function() {
			var r_id = route.attr("id");
			var route_name = $(".levantamentos[id='"+r_id+"'] #route-name").val();
			var curr_route = self.findRoute({
				id: r_id
			});

			curr_route.name = route_name;

			for (var i = 0; i < curr_route.occurrences.length; i++) {
				var occ = curr_route.occurrences[i];
				var id = occ.id;
				var position_altitude = $(".occurrencia[id='"+id+"'] #position-altitude").val();
				var position_longitude = $(".occurrencia[id='"+id+"'] #position-longitude").val();
				var position_latitude = $(".occurrencia[id='"+id+"'] #position-latitude").val();
				var position_altitudeAccuracy = $(".occurrencia[id='"+id+"'] #position-altitudeAccuracy").val();
				var position_speed = $(".occurrencia[id='"+id+"'] #position-speed").val();
				var position_heading = $(".occurrencia[id='"+id+"'] #position-heading").val();
				var position_accuracy = $(".occurrencia[id='"+id+"'] #position-accuracy").val();

				occ.position.coords.altitude = position_altitude;
				occ.position.coords.longitude = position_longitude;
				occ.position.coords.latitude = position_latitude;
				occ.position.coords.altitudeAccuracy = position_altitudeAccuracy;
				occ.position.coords.speed = position_speed;
				occ.position.coords.heading = position_heading;
				occ.position.coords.accuracy = position_accuracy;
			};

			self.editRoute({
				route: curr_route
			});
		});
		
		botaoExport.click(function(){
			id = route.attr("id");
			self.getCSV({
				id: id
			});
		});    
		
		botaoView.click(function() {
			id = route.attr("id");
			self.showOccurrences({
				route_id: id
			});
		});        
	});
}

roads.buildOccurrenceTemplate = function(options) {
	var template = '<div class="row occurrencia" style="margin-top:-100px" id='+options.id +'>'
		+ '<div class="large-7 medium-7 small-10 columns occu_report" ' +'>'
		+ '<div class="callout report " style="height:auto; margin-left:5%; margin-top:10px;" id='+options.id +"1"+'>'
		+ '<p style="margin:10px;"><b style="text-decoration:underline;">Occurrence ID: ' + options.id + '</b><br>Name: '+options.name+'<br>Occurrence type: '+ options.type + ' <br>Occurrence instance_id: '+options.instance_id+'<br>Created date: '+options.createddate
		+ '<br><b style="text-decoration:underline;">Position:</b>'
		+ '<br>Altitude: <input type="text" value="'+options.altitude+'" id="position-altitude">'
		+ '<br>Longitude: <input type="text" value="'+options.longitude+'" id="position-longitude">'
		+ '<br>Latitude: <input type="text" value="'+options.latitude+'" id="position-latitude">'
		+ '<br>Altitude accuracy: <input type="text" value="'+options.altitudeAccuracy+'" id="position-altitudeAccuracy">'
		+ '<br>Speed: <input type="text" value="'+options.speed+'" id="position-speed">'
		+ '<br>Heading: <input type="text" value="'+options.heading+'" id="position-heading">'
		+ '<br>Accuracy: <input type="text" value="'+options.accuracy+'" id="position-accuracy"><br>'
		+ '</p>'
		+ '</div>'
		+ '</div>'
		+ '</div>';
	return template;
}

roads.buildTemplate = function(options) {
	var template = '<div class="row levantamentos" id='+options.id +'>'
				+ '<div class="large-8 medium-8 small-12 columns con_report"' +'>'
				+ '<div class="callout report" style="height:auto;" id='+options.id +"1"+'>'
				+ '<p style="margin:10px;"><b style="text-decoration:underline">Route ID: ' + options.id + '</b><br>Name: <input type="text" value="'+ options.name + '" id="route-name"><br>Nº Sub-Routes: '+options.subRoutes.length+'<br>Nº Occurrences: '+options.occurrences.length+'</p>'
				+ '</div>'
				+ '</div>'
				+ '<div class="large-2 medium-2 small-12 columns bts">'
				+ '<div class="callout conIcons">'
				+ '<div class="icons">'
				+ '<div class="conEdit conten">'
				+ '<img id="edit_img" style="cursor: pointer" class="img imgEdit" src="static/img/edit.png" />'
				+ '</div>'
				+ '<div class="conExport conten">'
				+ '<img  style="cursor: pointer" class="img imgExport" src="static/img/export.png" />'
				+ '</div>'
				+ '<div class="conView conten">'
				+ '<img  style="cursor: pointer" class="img imgView" src="static/img/view.png" />'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>';
	return template;
}

roads.findRoute = function(options) {
	if (this.routes) {
		for (var i = 0; i < this.routes.length; i++) {
			if (this.routes[i].id == options.id) {
				return this.routes[i];
			}
		};
	}
	return null;
}

roads.buildReports = function() {
	var self = this;
	console.log(this.routes);
	for (var i = 0; i < this.routes.length; i++) {
		var template = this.buildTemplate({
			id: this.routes[i].id,
			name: this.routes[i].name,
			occurrences: this.routes[i].occurrences,
			subRoutes: this.routes[i].subRoutes
		})
		$('#reports').append(template);
		self.triggerEvents();
	};
}

roads.fetchReports = function() {
	var self = this;
	$.get('/speroroadapp/0/', function(data) {
		for (var i = 0; i < data.length; i++) {
			self.routes.push(data[i]);
		};
		self.buildReports();
	});
}

$(document).ready(function() {
	window.markers = [];
	//roads.getReports();
	roads.fetchReports();
});
