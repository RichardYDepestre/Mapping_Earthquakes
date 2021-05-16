// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let mymap = L.map("mapid", {
//   center: [40.7, -94.5],
//   zoom: 4,
// });
// Create the map object with center at the San Francisco airport.
// let mymap = L.map('mapid').setView([30, 30], 2);
// let mymap = L.map("mapid", {
//   center: [40.7, -94.5],
//   zoom: 4
// });

let geojsonFeature = {
  "type": "Feature",
  "properties": {
    "name": "Coors Field",
    "amenity": "Baseball Stadium",
    "popupContent": "This is where the Rockies play!"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [-104.99404, 39.75621]
  }
};

// Add GeoJSON data.
let sanFranAirport =
{
  "type": "FeatureCollection", "features": [{
    "type": "Feature",
    "properties": {
      "id": "3469",
      "name": "San Francisco International Airport",
      "city": "San Francisco",
      "country": "United States",
      "faa": "SFO",
      "icao": "KSFO",
      "alt": "13",
      "tz-offset": "-8",
      "dst": "A",
      "tz": "America/Los_Angeles"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.375, 37.61899948120117]
    }
  }
  ]
};

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(mymap);
// Grabbing our GeoJSON data.
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   onEachFeature: function (feature, layer) {
//     // pointToLayer: function (feature, latlng)
//     console.log(layer);
//     layer.bindPopup(
//       // return L.marker(latlng)
//       "<h2> Airport code: " + feature.properties.faa + "<hr> Airport name: " + feature.properties.name + "</h2>");
//   }

// }).addTo(mymap);
// We create the tile layer that will be the background of our map.
let light = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY,
  }
);

let dark = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY,
  }
);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/RichardYDepestre/Mapping_Earthquakes/main/torontoRoutes.json";

d3.json(torontoData).then(function (data) {
  console.log(data);

  L.geoJson(data, {
    // color: "yellow",
    // weight: 2,
    style: myStyle,
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h2> Airline: " + feature.properties.airline + "<hr> Destination: " + feature.properties.dst + "</h2>");

    }
  }).addTo(mymap);
  // L.geoJson(data).addTo(mymap);
});
// Then we add our 'graymap' tile layer to the map.
// streets.addTo(mymap);
// Create a base layer that holds both maps.
let baseMaps = {
  Dark: dark, Light: light

};
// Create the map object with center, zoom level and default layer.
let mymap = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [dark]
})
// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(mymap);