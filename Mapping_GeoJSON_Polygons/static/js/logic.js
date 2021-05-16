// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 50,
    accessToken: API_KEY,
  });

let satelliteStreets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 11,
    accessToken: API_KEY,
  });

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/RichardYDepestre/Mapping_Earthquakes/main/torontoNeighborhoods.json";

d3.json(torontoHoods).then(function (data) {
  console.log(data);

  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h2> Neighbourhood: " + feature.properties.AREA_NAME + "</h2>");
    }
  }).addTo(mymap);
  // L.geoJson(data).addTo(mymap);
});

// Create the map object with center, zoom level and default layer.
let mymap = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 25,
  layers: [satelliteStreets]
});


// Create a style for the lines.
let myStyle = {
  color: "black",
  weight: 0.75
}
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(mymap);