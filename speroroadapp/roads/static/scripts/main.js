var roads = {
	routes: [],
	reports: {},
	markerBounds: [],
	map: null,

	addOccurence: function(obj) {
		var self = this;
		var infobox;
		var latitude = obj.position.coords.latitude;
		var longitude = obj.position.coords.longitude;

		var myLatlng = new google.maps.LatLng(latitude,longitude);


		this.markerBounds.push(new google.maps.LatLng(latitude,longitude));

		//to do - definir o máximo de fotos a aparecer num report a 3.

		var contentString = '<div id="contentBox">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<div id="tipNome" class="tipNome"><b>' + "Name - " + '</b>' + obj.name + '</div>'+
		'<div id="tipTipo" class="tipTipo"><b>' + "Type - " + '</b>' + obj.type + '</div>'+
		'<div id="tipId" class="tipId"><b>' + "Id - " + '</b>' + obj.id + '</div>'+
		'<div id="tipData" class="tipData"><b>' + "Creation Date - " + '</b>' + obj.createddate + '</div>'+
		'<div id="tipConF" class="tipConF">'+
		'<div id="tipFoto" class="tipFoto">' + obj.photos + '</div>'+
		'</div>'+
		'</div>';

		var marker = new google.maps.Marker({
			position: myLatlng,
			zoom: 100,
			map: roads.map,
			icon: icons.report.icon,
			title: obj.type
		});

		marker.occ_id = obj.id;

	  	google.maps.event.addListener(marker, 'click', function() {
	
			if(window.infobox){
                window.infobox.close();
            }

            window.infobox = null;

            window.infobox = new InfoBox({
		         content: document.getElementById("contentBox"),
		         disableAutoPan: false,
		         maxWidth: 150,
		         pixelOffset: new google.maps.Size(-185, -300),
		         zIndex: null,
		         boxStyle: {
		            background: " ",
		            opacity: 1,
		            width: " "
		        },
		        closeBoxMargin: "10px ",
		        closeBoxURL: "static/img/close.png",
		        infoBoxClearance: new google.maps.Size(1, 1)
		    });

		  	window.infobox.setContent(contentString);
            window.infobox.open(self.map, marker);
        	
	  	});

	  	window.markers.push(marker);
	},

	addPath: function(obj) {
		var path = [];
		var self = this;
		var FIRST = 0;
		var LAST = obj.path.length;

		for(var i = 0; i < obj.path.length; i++){
			var point = new google.maps.LatLng(obj.path[i][0], obj.path[i][1])
			path.push(point);
			
			if (i == FIRST) {
				var marker = new google.maps.Marker({
					position: point,
					zoom: 100,
					icon: "http://www.google.com/mapfiles/dd-start.png",
					map: roads.map,
					title: obj.type
				});
				marker.occ_id = obj.id;
				window.markers.push(marker);
			} else if (i == LAST) {
				var marker = new google.maps.Marker({
					position: point,
					zoom: 100,
					icon: "http://www.google.com/mapfiles/dd-end.png",
					map: roads.map,
					title: obj.type
				});
				marker.occ_id = obj.id;
				window.markers.push(marker);
			}
		}

		var polyline = new google.maps.Polyline({
			path: path,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});

		polyline.setMap(self.map);
		window.polylines.push(polyline);
	}
}

/* Main changes */

roads.removeAllMarkers = function() {
	for (var i = 0; i < window.markers.length; i++) {
		window.markers[i].setMap(null);
	};

	window.markers.length = 0;
	window.markers = [];
}

roads.removeAllPolylines = function() {
	for (var i = 0; i < window.polylines.length; i++) {
		window.polylines[i].setMap(null);
	};

	window.polylines.length = 0;
	window.polylones = [];
}

roads.showOccurrences = function(options) {
	var route_id = options.route_id;
	var self = this;
	var route = self.findRoute({
		id: route_id
	});

	if (route) {
		self.removeAllPolylines();
		self.removeAllMarkers();

		$(".occu_wraper .occurrencia").remove();

		//$('#'+route.id+'').attr('style', 'background-color: green !important;');
	
		var occurrences = route.occurrences;
		for (var i = 0; i < occurrences.length; i++) {
			if (occurrences[i].type == "single") {
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
					type: occurrences[i].type,
					photos: occurrences[i].photos
				});
			} else {
				var template = self.buildOccurrenceTemplate({
					id: occurrences[i].id,
					name: occurrences[i].name,
					instance_id: occurrences[i].instance_id,
					createddate: occurrences[i].createddate,
					type: occurrences[i].type,
					photos: occurrences[i].photos
				});
			}

			$(".occu_wraper[id='"+route_id+"']").append(template);

			//console.log(occurrences[i].type);
			if (occurrences[i].type == "path") {
				self.addPath(occurrences[i]);
			} else {
				self.addOccurence(occurrences[i]);
			}
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
	
	//console.log(routes);
	routes.each(function () {

		var route = $(this);
		var botaoEdit = route.find(".conEdit");
		var botaoExport = route.find(".conExport");
		var botaoView = route.find(".conView");
		var botaoGraph = route.find(".conGraph");
		

		botaoEdit.click(function() {
			var r_id = route.attr("id");
			var route_name = $(".levantamentos[id='"+r_id+"'] #route-name").val();
			var curr_route = self.findRoute({
				id: r_id
			});

			curr_route.name = route_name;

			for (var i = 0; i < curr_route.occurrences.length; i++) {
				if (curr_route.type == "single") {
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
				}
			};

			if (curr_route.type == "single") {
				self.editRoute({
					route: curr_route
				});
			}
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
		//todo - função showGraph a escrever na div #graph
		botaoGraph.click(function() {
			id = route.attr("id");
			if (!$("#graph").is(":visible")) {
				self.showGraph({
					route_id: id
				});
			} else {
				$("#graph").fadeOut(100);
				$("#backwrapper").fadeOut(100);
			}
		});

	});
}

roads.showGraph = function(options) {
	$("#graph").fadeIn();
	$("#backwrapper").fadeIn();

	route_id = options.route_id;
	//var plot1 = $.jqplot ('graph', [[3,7,9,1,4,6,8,2,5]]);
	var line1 = [['Rodeiras - Tipo 1', 7], ['Rodeiras - Tipo 2', 8], ['Rodeiras - Tipo 3', 1], ['Fendilhamentos - Tipo 1', 9], ['Fendilhamentos - Tipo 2', 2], ['Fendilhamentos - Tipo 3', 1], ['Peladas', 15], 
  	['Covas', 12], [' Reparações', 3]];
 
  	var plot1 = $.jqplot('graph', [line1], {
    	title: 'Distribuição de ocorrências',
	    series:[{renderer:$.jqplot.BarRenderer}],
	    axesDefaults: {
	        tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
	        tickOptions: {
	          angle: -30,
	          fontSize: '10pt'
	        }
	    },
	    cursor: {
        	show: true,
        	tooltipLocation:'sw', 
        	zoom:true
      	},
      	highlighter: {
        	show: true,
        	sizeAdjust: 7.5
      	},
	    axes: {
	      xaxis: {
	        renderer: $.jqplot.CategoryAxisRenderer
	      }
	    }
  	});
}

roads.buildOccurrenceTemplate = function(options) {

	if (options.type == "single") {
		var template = '<div class="row occurrencia" id='+options.id +'>'
			+ '<div class="large-7 medium-7 small-10 columns occu_report" ' +'>'
			+ '<div class="callout occuren" id='+options.id +"1"+'>'
			+ '<p style="margin:10px;"><b style="text-decoration:underline;">Occurrence ID: ' + options.id + '</b><br><b>Name:</b> '+options.name+'<br><b>Occurrence type:</b> '+ options.type + ' <br><b>Occurrence instance_id:</b> '+options.instance_id+'<br><b>Created date:</b> '+options.createddate
			+ '<br><b style="text-decoration:underline;">Position:</b>'
			+ '<br>Altitude: <input type="text" value="'+options.altitude+'" id="position-altitude" class="position">'
			+ '<br>Longitude: <input type="text" value="'+options.longitude+'" id="position-longitude" class="position">'
			+ '<br>Latitude: <input type="text" value="'+options.latitude+'" id="position-latitude" class="position">'
			+ '<br>Altitude accuracy: <input type="text" value="'+options.altitudeAccuracy+'" id="position-altitudeAccuracy" class="position">'
			+ '<br>Speed: <input type="text" value="'+options.speed+'" id="position-speed" class="position">'
			+ '<br>Heading: <input type="text" value="'+options.heading+'" id="position-heading" class="position">'
			+ '<br>Accuracy: <input type="text" value="'+options.accuracy+'" id="position-accuracy" class="position"><br>'
			+ '</p>';

		var photos = "";
		for (var i = 0; i < options.photos.length; i++) {
			photos += "<a href='"+options.photos[i]+"' target='_blank'><div class='conPh'><img class='photo' src='"+options.photos[i]+"'></div></a>";
		};

		template += photos;
		template += "</div></div></div>"
	}
	else {
		var template = '<div class="row occurrencia" id='+options.id +'>'
		+ '<div class="large-7 medium-7 small-10 columns occu_report" ' +'>'
		+ '<div class="callout report " style="height:auto; margin-left:5%; margin-top:10px;" id='+options.id +"1"+'>'
		+ '<p style="margin:10px;"><b style="text-decoration:underline;">Occurrence ID: ' + options.id + '</b><br><b>Name:</b> '+options.name+'<br><b>Occurrence type:</b> '+ options.type + ' <br><b>Occurrence instance_id:</b> '+options.instance_id+'<br><b>Created date:</b> '+options.createddate
		+ '</p><p style="margin:10px;"><b>Path length:</b> 191.023 km'
		+ '<br><b>Path depth:</b> 20.2 m2'
		+ '<br><b>Path area:</b> 200.21 m2'
		+ '</p>';

		var photos = "";
		for (var i = 0; i < options.photos.length; i++) {
			photos += "<a href='"+options.photos[i]+"' target='_blank'><div class='conPh'><img class='photo' src='"+options.photos[i]+"'></div></a>";
		};

		template += photos;
		template += "</div></div></div>"
	}
	return template;
}

roads.buildTemplate = function(options) {
	var template = '<div class="row levantamentos" id='+options._id +'>'
				+ '<div class="large-8 medium-8 small-12 columns con_report"' +'>'
				+ '<div class="callout report" style="height:auto;" id='+options._id +"1"+'>'
				+ '<p style="margin:10px;"><b style="text-decoration:underline">Route ID: ' + options._id + '</b><br>Name: <input type="text" value="'+ options.name + '" id="route-name"><br>Nº Sub-Routes: '+options.subRoutes.length+'<br>Nº Occurrences: '+options.occurrences.length
				+ '</p><p style="margin:10px;"><b>Route Length:</b> 928.393 km'
				+ '<br><b>Average area:</b> 98.1 m2'
				+ '</p>'
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
				+ '<div class="conGraph conten">'
				+ '<img  style="cursor: pointer" class="img imgGraph" src="static/img/graph.png" />'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				//div vazia
				+'<div class="occu_wraper" id='+options._id +'>'
				+'</div>';
				//div vazia		
	return template;
}

roads.findRoute = function(options) {
	if (this.routes) {
		for (var i = 0; i < this.routes.length; i++) {
			if (this.routes[i]._id == options.id) {
				return this.routes[i];
			}
		};
	}
	return null;
}

roads.buildReports = function() {
	var self = this;
	//console.log(this.routes);
	for (var i = 0; i < this.routes.length; i++) {
		var template = this.buildTemplate({
			_id: this.routes[i]._id,
			id: this.routes[i].id,
			name: this.routes[i].name,
			occurrences: this.routes[i].occurrences,
			subRoutes: this.routes[i].subRoutes
		})
		$('#reports').append(template);
	};
	self.triggerEvents();
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

/* -------------------------------------------- */
/*	Sample usage:								*/
/*		var p1 = {								*/
/*			lat: 51.5136,						*/
/*			lng: -8.8983						*/
/*		}										*/
/*												*/
/*		var p2 = {								*/
/*			lat: 51.5136,						*/
/*			lng: -8.8915						*/
/*		}										*/
/*											  	*/
/*		var dist = roads.pointDistance(p1, p2); */
/* -------------------------------------------- */
roads.pointDistance = function(point1, point2, precision) {
    // default 4 significant figures reflects typical 0.3% accuracy of spherical model
    if (typeof precision == 'undefined') precision = 4;
  
    var R = 6371; // radius of earth in kilometres
    var φ1 = point1.lat.toRadians(),  λ1 = point1.lng.toRadians();
    var φ2 = point.lat.toRadians(), λ2 = point.lng.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d.toPrecisionFixed(Number(precision));
}

roads.initMaps = function() {
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 13,
        center: new google.maps.LatLng(40.20346,-8.447212),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.VERTICAL_BAR,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        panControl: false,
        panControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        zoomControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: false,
        scaleControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
	};
    var mapElement = document.getElementById('map');
    this.map = new google.maps.Map(mapElement, mapOptions);


    icons = {
        report: {
            icon: 'static/img/report.png'
        },
    };
}

$(document).ready(function() {
	window.markers = [];
	window.polylines = [];
	roads.initMaps();
	roads.fetchReports();
	//$('.wrapList').jScrollPane();
});
