var roads = {

	occurrences: {},

	paths = [];




	getOccurrences: function() {
		var that = this;
		
		$.get('http://localhost:8000/speroroadapp/0/', function(data) {
			window.roads.occurrences = data;
			
			//console.log(window.onspot.categories);
		});
	},


	addOccurrencesToMap: function() {



		
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
	  	
		

	  var occurrence = new google.maps.Marker({
	      position: myLatlng,
		  map: window.occurrencesMap,
	  });

	  /*
	  if(obj.id == 0) {
	  	marker.setIcon("http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-ff8a22/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/sponge.png");
	  } else if(obj.id == 2) {
	  	marker.setIcon("http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-36ff24/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/sponge.png");
	  } else if(obj.id == 1) {
	  	marker.setIcon("http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-333333/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/bar_coktail.png");
	  } else if(obj.id == 3) {
	  	marker.setIcon("http://mapicons.nicolasmollet.com/wp-content/uploads/mapicons/shape-default/color-2663ff/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/coffee.png");
	  }
	  */

	  window.markers.push(occurrence);
	}
}


$(document).ready(function() {
	var onspotMap;
	onspot.initialize();
});

$