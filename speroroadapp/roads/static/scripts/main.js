console.log("ola");

var roads = {

	occurrences: {},

	markerBounds: [],




	getOccurrences: function() {
		var that = this;

		$.get('/speroroadapp/0/', function(data) {
			window.roads.occurrences = data;
			for(var i = 0; i < data.length;i++){
				var string = '<div class="row ocorrencia" id='+data[i].id +'>'
				+ '<div class="large-8 medium-8 small-12 columns con_report">'
				+ '<div class="callout report" style="height:80px;">'
				+ '<p><b>' + data[i].id + '</b>, '+ data[i].createddate + '</b>, ' + data[i].type + ' </p>'
				+ '</div>'
				+ '</div>'
				+ '<div class="large-2 medium-2 small-12 columns bts">'
				+ '<div class="callout conIcons">'
				+ '<div class="icons">'
				+ '<div class="conEdit conten">'
				+ '<img id="edit_img" class="img imgEdit" src="static/img/edit.png" />'
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

			var levantamentos = $('#levantamentos');
			var ocorrencias = levantamentos.find('.ocorrencia');

			ocorrencias.each(function () {
				var ocorrencia = $(this);
				var botaoEdit = ocorrencia.find(".conEdit");
				var botaoExport = ocorrencia.find(".conExport");
				var botaoView = ocorrencia.find(".conView");
				botaoEdit.click(function(){
					id = ocorrencia.attr("id");

					console.log("Edit id dentro"+id);
				});
				botaoExport.click(function(){
					id = ocorrencia.attr("id");

					console.log("Export id dentro"+id);
				});    
				botaoView.click(function(){
					id = ocorrencia.attr("id");
					roads.addOccurrenceToMap(id);

					console.log("View id dentro"+id);
				});        
			});	
		});
	},

	addOccurrenceToMap: function(obj) {


		for(var i = 0; i<roads.occurrences.length; i++){
			if (roads.occurrences[i].id == obj) {
				if(roads.occurrences[i].type == "single"){
					console.log("single");

					this.addOccurence(roads.occurrences[i]);
				}
				else{
					this.addPath(roads.occurrences[i]);
				}
			}
		}

		var bounds = new google.maps.LatLngBounds();

		for(var i = 0; i < this.markerBounds.length; i++) {
			bounds.extend(this.markerBounds[i]);
		}

		this.map.fitBounds(bounds);

	},

	removeAllOcurrences: function() {
		this.setAllMap(null);
	},

	removeCurrentOcurrence: function() {

	},

	setAllMap: function(map){
		for (var i = 0; i < occurrences.length; i++) {
			window.occurrences[i].setMap(map);
		}
	},

	addOccurence: function(obj) {

		console.log("1");


		var latitude = obj.latitude;
		var longitude = obj.longitude;


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
	  	window.markers.push(marker);

	},

	addPath: function(obj) { 

		console.log(obj.path[0][0]);

		var path = [];
		new google.maps.LatLng(37.772323, -122.214897),
		new google.maps.LatLng(21.291982, -157.821856),
		new google.maps.LatLng(-18.142599, 178.431),
		new google.maps.LatLng(-27.46758, 153.027892)
		
		for(var i = 0; i<obj.path.length; i++){

			path.push(new google.maps.LatLng(obj.path[i][0], obj.path[i][1]));
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


$(document).ready(function() {

	window.markers = [];
	roads.getOccurrences();
});
