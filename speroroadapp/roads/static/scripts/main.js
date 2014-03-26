var roads = {

	occurrences: {},

	paths: [],




	getOccurrences: function() {
		var that = this;
		
		$.get('http://localhost:8000/speroroadapp/0/', function(data) {
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
				$('#levantamentos').append(string)
			}	
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
	roads.getOccurrences();
});
