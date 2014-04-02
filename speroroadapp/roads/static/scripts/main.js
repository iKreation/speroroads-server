console.log("ola");

var roads = {

	reports: {},

	markerBounds: [],








	getReports: function() {
		var that = this;

		$.get('/speroroadapp/0/', function(data) {
			window.roads.reports = data;
			for(var i = 0; i < data.length;i++){
				var string = '<div class="row levantamentos" id='+data[i].id +'>'
				+ '<div class="large-8 medium-8 small-12 columns con_report"' +'>'
				+ '<div class="callout report" style="height:80px;" id='+data[i].id +"1"+'>'
				+ '<p><b>' + data[i].id + '</b></p><p>'+ data[i].name + ' </p>'
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
				$('#reports').append(string);
			}

			var reports = $('#reports');
			var levantamento = reports.find('.levantamentos');

			levantamento.each(function () {
				var levantamento = $(this);
				var botaoEdit = levantamento.find(".conEdit");
				var botaoExport = levantamento.find(".conExport");
				var botaoView = levantamento.find(".conView");
				botaoEdit.click(function(){
					id = levantamento.attr("id");

					console.log("Edit id dentro"+id);
				});
				botaoExport.click(function(){
					id = levantamento.attr("id");

					console.log("Export id dentro"+id);
				});    
				botaoView.click(function(){
					
					id = levantamento.attr("id");
					roads.addOccurrenceToMap(id);
					var info = levantamento.find(".con_report");
					var report = info.find(".report");
					console.log(report.attr("id"));	
					$('#'+report.attr("id")+'').attr('style', 'background-color: green !important; height:80px;');
					console.log("View id dentro"+id);

				});        
			});	
		});
	},

	addOccurrenceToMap: function(obj) {

		//this.removeAllOcurrences();

		for(var i = 0; i<roads.reports.length; i++){
			if (roads.reports[i].id == obj) {

				var levantamento = roads.reports[i];
				var ocurrencias = levantamento.occurrences;

				for(var j = 0; j < ocurrencias.length; j++){

					var ocurrencia = ocurrencias[j];

					var string = '<div class="row occurrencia" id='+ocurrencia.id +'>'
					+ '<div class="large-8 medium-8 small-12 columns con_report"' +'>'
					+ '<div class="callout report " style="height:80px;" id='+ocurrencia.id +"1"+'>'
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
			map: this.map,
			title: obj.type
		});

		this.map.panBy(-Math.floor(this.map.getDiv().offsetWidth/10),3);

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


$(document).ready(function() {

	window.markers = [];
	roads.getReports();
});
