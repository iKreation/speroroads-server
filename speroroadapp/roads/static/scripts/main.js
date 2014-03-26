console.log("ola");
var roads = {
	occurrences: {},



	getOccurrences: function() {
		var that = this;
		
		$.get('http://localhost:8000/speroroadapp/0/', function(data) {
			console.log(data);
			window.roads.occurrences = data;
			for(var i = 0; i < data.length;i++){
				var string = '<div class="row">'
				+ '<div class="large-8 medium-8 small-12 columns con_report">'
				+ '<div class="callout report" style="height:80px;">'
				+ '<p><b>' + data[i].createddate + '</b>, ' + data[i].type + ' </p>'
				+ '</div>'
				+ '</div>'
				+ '<div class="large-2 medium-2 small-12 columns bts">'
				+ '<div class="callout conIcons">'
				+ '<div class="icons">'
				+ '<div class="conEdit conten">'
				+ '<img class="img imgEdit" src="static/img/edit.png" />'
				+ '</div>'
				+ '<div class="conExport conten">'
				+ '<img class="img imgExport" src="static/img/export.png" />'
				+ '</div>'
				+ '<div class="conView conten">'
				+ '<img class="img imgView" src="static/img/view.png" />'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>'
				+ '</div>';
				$('#levantamentos').append(string);
			}	
			//console.log(window.onspot.categories);
		});
	},


	addOccurrenceToMap: function(obj) {

		for(var i = 0; i<occurrences.length; i++){
			if (occurrences[i].id == id) {
				if(occurrences[i].type == "single")
					this.addOccurence(this.occurrences[i]);
				else
					this.addPath(this.occurrences[i]);
			};
		}

		var bounds = new google.maps.LatLngBounds();

		for(var i = 0; i < markerBounds.length; i++) {
			bounds.extend(markerBounds[i]);
		}

		window.occurrencesMap.fitBounds(bounds);
	},

	removeAllOcurrences: function() {
		this.setAllMap(null);
	},

	removeCurrentOcurrence: function() {
		
	},

	// Sets the map on all markers in the array.
	setAllMap: function(map){
	  for (var i = 0; i < occurrences.length; i++) {
	    window.occurrences[i].setMap(map);
	  }
	},

	addOccurence: function(obj) {

		var latitude = obj.position.coords.latitude;
		var longitude = obj.position.coords.longitude;
		
	  	var myLatlng = new google.maps.LatLng(latitude,longitude);

	  	markerBounds.push(new google.maps.LatLng(coordsSplited[0],coordsSplited[1]));


	  	var contentString = '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h1 id="firstHeading" class="firstHeading">' + obj.title + '</h1>'
	      '</div>';
	  	
		

		var occurrence = new google.maps.Marker({
		      position: myLatlng,
			  map: window.occurrencesMap,
			  title: obj.title
		});


	  	google.maps.event.addListener(marker, 'click', function() {
		  	if(infowindow) {
		  		console.log("entrou");
		  		infowindow.close();
		  	} 

		  	var infowindow = new google.maps.InfoWindow({
		      content: contentString
		  	});

	  		infowindow.open(occurrencesMap,marker);
	  		window.markers.push(occurrence);
		});
	},

	addPath: function(obj) { 
		
		var path = [
		    new google.maps.LatLng(37.772323, -122.214897),
		    new google.maps.LatLng(21.291982, -157.821856),
		    new google.maps.LatLng(-18.142599, 178.431),
		    new google.maps.LatLng(-27.46758, 153.027892)
		  ];
		  
		  
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

		/*for (var i = 0; i<obj.length; i++){
			
	  		latLngBounds.extend(obj[i]);
	  		
	  		new google.maps.Marker({
   				map: map,
    			position: obj[i],
    			title: "Point " + (i + 1)
  			});
			
		}
*/
		

		//map.fitBounds(latLngBounds);
	}


}


$(document).ready(function() {

	var occurrencesMap;
	roads.getOccurrences();
});
