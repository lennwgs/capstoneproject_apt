$(function(){
  console.log("testing");
  //apartment information
  var apartmentName = [];
  var apartmentAdd = [];
  var bedNumber = [];
  var bathNumber = [];
  var rent = [];
  var area = [];
  var crimeRate = [];
  var grocery = [];
  var distanceToPurdue = [];
  var busStops = [];
  var userMaxRent = '';
  //radar plot
  var factors = ["Rent",
                  "# Bedroom",
                  "# Bathroom",
                  "Area(sq-ft)",
                  "Crime Rate",
                  "# Grocery (.5 mi)",
                  "Distance to Purdue (mi)"]

  var radarChartOptions = {
    w: 250,
    h: 250,
    margin: {top: 50, right: 100, bottom: 50, left: 100},
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: d3.scale.ordinal().range(["#FDF373","#24E456","#8E6CF9"])
  };

  /*var margin = {top: 5, right: 5, bottom: 5, left: 5},
    width = Math.min(500, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
*/
  //selected apartment for comparison
  var color_clicked = {
    1:'https://maps.google.com/mapfiles/ms/micons/yellow-dot.png',
    2:'https://maps.google.com/mapfiles/ms/micons/green-dot.png',
    3:'https://maps.google.com/mapfiles/ms/micons/purple-dot.png'};
  var aptSelected = 0;

  //map options
  var mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(40.421594, -86.897647),
      zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			}
  };

  var infoWindow = null;

  //adding apartment informations on a window
  infoWindow = new google.maps.InfoWindow({
    content: "holding..."
  });


  //displaying map information
  var map = new google.maps.Map(document.getElementById('map'),mapOptions);

  var purdue_icon = {
    url: "https://i.imgur.com/6h0zHd8.png", // url
    scaledSize: new google.maps.Size(50,27), // scaled size
    //origin: new google.maps.Point(0,0), // origin
    //anchor: new google.maps.Point(0, 0) // anchor
  };

  var marker = new google.maps.Marker({ //Line 1
    position: {lat: 40.4247621, lng: -86.913649}, //Line2: Location to be highlighted
    map: map,//Line 3: Reference to map object
    icon: purdue_icon,
    title: 'PMU' //Line 4: Title to be given
  });

  var symbolOne = {
          path: 'M -2,0 0,-2 2,0 0,2 z',
          strokeColor: '#F00',
          fillColor: '#F00',
          fillOpacity: 1
        };

  //filter by maximum RENT
var apt_data = apartmentData();

console.log("apartmentData");

console.log("almost_clear_ cliked");

var value1 = [0,0,0,0,0,0,0];
var value2 = [0,0,0,0,0,0,0];
var value3 = [0,0,0,0,0,0,0];
var data_radar_plot = [
      [//apt 1
      {axis:factors[0],value:value1[0]},
      {axis:factors[1],value:value1[1]},
      {axis:factors[2],value:value1[2]},
      {axis:factors[3],value:value1[3]},
      {axis:factors[4],value:value1[4]},
      {axis:factors[5],value:value1[5]},
      {axis:factors[6],value:value1[6]}//,
      //{axis:factors[7],value:value1[7]}
    ],[//apt 2
      {axis:factors[0],value:value2[0]},
      {axis:factors[1],value:value2[1]},
      {axis:factors[2],value:value2[2]},
      {axis:factors[3],value:value2[3]},
      {axis:factors[4],value:value2[4]},
      {axis:factors[5],value:value2[5]},
      {axis:factors[6],value:value2[6]}//,
      //{axis:factors[7],value:value2[7]}
    ],[//apt 3
      {axis:factors[0],value:value3[0]},
      {axis:factors[1],value:value3[1]},
      {axis:factors[2],value:value3[2]},
      {axis:factors[3],value:value3[3]},
      {axis:factors[4],value:value3[4]},
      {axis:factors[5],value:value3[5]},
      {axis:factors[6],value:value3[6]}//,
      //{axis:factors[7],value:value2[7]}
      ]
    ];


RadarChart(".radarChart", data_radar_plot, radarChartOptions);
  $('#filterByRent').submit(function(){
    map = new google.maps.Map(document.getElementById('map'),mapOptions);
    var marker = new google.maps.Marker({ //Line 1
      position: {lat: 40.4247621, lng: -86.913649}, //Line2: Location to be highlighted
      map: map,//Line 3: Reference to map object
      icon: purdue_icon,
      title: 'PMU' //Line 4: Title to be given
    });

    var count_apt_found = 0
    userMaxRent = $('#maxrent').val();
    userMaxRent = userMaxRent.replace(',','');
    userMaxRent = parseInt(userMaxRent);

  console.log(userMaxRent+ " "+isNaN(userMaxRent))

  if(isNaN(userMaxRent) || userMaxRent == ''){
    userMaxRent = 9999;
  }

    $.each(apt_data, function (key,data){

      if(parseInt(data.Rent) <= userMaxRent){
        count_apt_found = count_apt_found + 1
        var latLng = new google.maps.LatLng(data.lat,data.lng);

        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon:symbolOne,
          title: data.AptName
        });
        var details = data.AptName+ "</br>"+ "Rent: $" + data.Rent;

        bindInfoWindow(marker, map, infoWindow,details,data);

        }
      });



    function bindInfoWindow(marker, map, infowindow, strDescription,data) {

          google.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent(strDescription);
              infowindow.open(map, marker);
              console.log("clicked")
              if(aptSelected < 3){
                  aptSelected = aptSelected + 1;
                  marker.setIcon(color_clicked[aptSelected]);
                  document.getElementById("selected_"+aptSelected).innerHTML = aptSelected+ ". "+ data.AptName

                  if(aptSelected == 1){
                    value1 = [data.P_Rent,data.P_BedroomNo,data.P_BathroomNo,
                              data.P_Area,data.P_crimeRate,data.P_grocery,data.P_distanceToPurdue].map(Number)
                  }

                  if(aptSelected == 2){
                    value2 = [data.P_Rent,data.P_BedroomNo,data.P_BathroomNo,
                              data.P_Area,data.P_crimeRate,data.P_grocery,data.P_distanceToPurdue].map(Number)
                  }

                  if(aptSelected == 3){
                    value3 = [data.P_Rent,data.P_BedroomNo,data.P_BathroomNo,
                              data.P_Area,data.P_crimeRate,data.P_grocery,data.P_distanceToPurdue].map(Number)
                  }

                  data_radar_plot = [
                        [//apt 1
                        {axis:factors[0],value:value1[0]},
                        {axis:factors[1],value:value1[1]},
                        {axis:factors[2],value:value1[2]},
                        {axis:factors[3],value:value1[3]},
                        {axis:factors[4],value:value1[4]},
                        {axis:factors[5],value:value1[5]},
                        {axis:factors[6],value:value1[6]}//,
                        //{axis:factors[7],value:value1[7]}
                      ],[//apt 2
                        {axis:factors[0],value:value2[0]},
                        {axis:factors[1],value:value2[1]},
                        {axis:factors[2],value:value2[2]},
                        {axis:factors[3],value:value2[3]},
                        {axis:factors[4],value:value2[4]},
                        {axis:factors[5],value:value2[5]},
                        {axis:factors[6],value:value2[6]}//,
                        //{axis:factors[7],value:value2[7]}
                      ],[//apt 3
                        {axis:factors[0],value:value3[0]},
                        {axis:factors[1],value:value3[1]},
                        {axis:factors[2],value:value3[2]},
                        {axis:factors[3],value:value3[3]},
                        {axis:factors[4],value:value3[4]},
                        {axis:factors[5],value:value3[5]},
                        {axis:factors[6],value:value3[6]}//,
                        //{axis:factors[7],value:value2[7]}
                        ]
                      ];

                  RadarChart(".radarChart", data_radar_plot, radarChartOptions);
                  infowindow.open(map);
              }

          });


    }

    document.getElementById("noApartments_filtered").innerHTML = "Apartment available: "+ count_apt_found
  console.log("DONE");


  return false;
  });

  document.getElementById('clear_submit_btn').onclick = function() {
    aptSelected = 0
    document.getElementById("noApartments_filtered").innerHTML = "Apartment available: "
    console.log("clear_ cliked");

    document.getElementById("selected_1").innerHTML = "1. "
    document.getElementById("selected_2").innerHTML = "2. "
    document.getElementById("selected_3").innerHTML = "3. "


    value1 = [0,0,0,0,0,0,0];
    value2 = [0,0,0,0,0,0,0];
    value3 = [0,0,0,0,0,0,0];
    data_radar_plot = [
          [//apt 1
          {axis:factors[0],value:value1[0]},
          {axis:factors[1],value:value1[1]},
          {axis:factors[2],value:value1[2]},
          {axis:factors[3],value:value1[3]},
          {axis:factors[4],value:value1[4]},
          {axis:factors[5],value:value1[5]},
          {axis:factors[6],value:value1[6]}//,
          //{axis:factors[7],value:value1[7]}
        ],[//apt 2
          {axis:factors[0],value:value2[0]},
          {axis:factors[1],value:value2[1]},
          {axis:factors[2],value:value2[2]},
          {axis:factors[3],value:value2[3]},
          {axis:factors[4],value:value2[4]},
          {axis:factors[5],value:value2[5]},
          {axis:factors[6],value:value2[6]}//,
          //{axis:factors[7],value:value2[7]}
        ],[//apt 3
          {axis:factors[0],value:value3[0]},
          {axis:factors[1],value:value3[1]},
          {axis:factors[2],value:value3[2]},
          {axis:factors[3],value:value3[3]},
          {axis:factors[4],value:value3[4]},
          {axis:factors[5],value:value3[5]},
          {axis:factors[6],value:value3[6]}//,
          //{axis:factors[7],value:value2[7]}
          ]
        ];

    RadarChart(".radarChart", data_radar_plot, radarChartOptions);

    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    var marker = new google.maps.Marker({ //Line 1
      position: {lat: 40.4247621, lng: -86.913649}, //Line2: Location to be highlighted
      map: map,//Line 3: Reference to map object
      icon: purdue_icon,
      title: 'PMU' //Line 4: Title to be given
    });
  };


});

/* works
    function initMap(){
      var mapDiv = document.getElementById('map');
      var map = new google.maps.Map(mapDiv, {
        center: {lat: 40.4247621, lng: -86.913649},
        zoom: 14});

      var marker = new google.maps.Marker({ //Line 1
        position: {lat: 40.4247621, lng: -86.913649}, //Line2: Location to be highlighted
        map: map,//Line 3: Reference to map object
        icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
        title: 'PMU' //Line 4: Title to be given
      });

      var marker1 = new google.maps.Marker({ //Line 1
        position: {lat: 40.424564, lng: -86.899706}, //Line2: Location to be highlighted
        map: map,//Line 3: Reference to map object
        icon: 'https://maps.google.com/mapfiles/ms/micons/yellow-dot.png',
        title: 'Waterfront Aparment' //Line 4: Title to be given
      });

      var marker2 = new google.maps.Marker({ //Line 1
        position: {lat: 40.432620	, lng: -86.914806}, //Line2: Location to be highlighted
        map: map,//Line 3: Reference to map object
        icon: 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
        title: 'Fuse Apartment' //Line 4: Title to be given
      });

      //if I want to add transitLayer
      var transitLayer = new google.maps.TransitLayer();
          transitLayer.setMap(); //map

      //if I want to add bikeLayer
      var bikeLayer = new google.maps.BicyclingLayer();
          bikeLayer.setMap(); //map
    };
*/
