// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let mymap = L.map("mapid", {
  center: [37.0902, -95.7129],
  zoom: 5,
});
// Coordinates for each point to be used in the line.
let line = [
  [33.9416, -118.4085],
  [30.1975, -97.6664],
  [43.6777, -79.6248],
  [41.9389, -72.686], // bradley(hartford)
  [40.6413, -73.7781] // jfk, ny
];
// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "yellow",
}).addTo(mymap);
// We create the tile layer that will be the background of our map.
// let streets = L.tileLayer(
//   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: "mapbox/streets-v11",
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: API_KEY,
//   }
// );
let cityData = cities;
// Loop through the cities array and create one marker for each city.
cityData.forEach(function (city) {
  console.log(city);
  L.circleMarker(city.location, {
    radius: city.population / 200000,
    fillColor: "#ffffa2",
    color: "orange",
  })
    .bindPopup(
      "<h2>" +
        city.city +
        ", " +
        city.state +
        "</h2> <hr> <h3>Population " +
        city.population +
        "</h3>"
    )
    .addTo(mymap);
});
//  Add a marker to the map for Los Angeles, California.
// let marker = L.circleMarker([34.0522, -118.2437], {
//   radius: 25,
//   color: "black",
//   fillColor: "#ffffa1"
// }).addTo(mymap);
// L.circle([34.0522, -118.2437], {
//   radius: 700
// }).addTo(mymap);
// L.marker([34.0522, -118.2437]).addTo(mymap);
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // tileSize: 512,
    // zoomOffset: -1,
    accessToken: API_KEY,
  }
);

// Then we add our 'graymap' tile layer to the map.
streets.addTo(mymap);
