var roads = {

	occurrences: {},


	getOccurrences: function() {
		var that = this;
		
		$.get('http://localhost:8000/speroroadapp/0/', function(data) {
			window.roads.occurrences = data;
			
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
		  title = obj.title
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
	}
}



	addPath: function(obj) {

		var path = obj.path;

		var latLngBounds = new google.maps.LatLngBounds();

		for (var i = 0; i<path.length; i++){
			
	  		latLngBounds.extend(path[i]);

	  		new google.maps.Marker({
   				map: map,
    			position: path[i],
    			title: "Point " + (i + 1)
  			});
		}


		var polyline = new google.maps.Polyline({
		  map: map,
		  path: path,
		  strokeColor: '#0000FF',
		  strokeOpacity: 0.7,
		  strokeWeight: 1
		});

		map.fitBounds(latLngBounds);
	}
}


$(document).ready(function() {
	var occurrencesMap;
});

$

