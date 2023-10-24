// Leaflet Map Javascript Code

// =================================================================================================
// =================================================================================================
// =================================================================================================

// INITIAL MAP SETUP

// =================================================================================================
// =================================================================================================
// =================================================================================================

// CONSTANTS AND VARIABLES
// const INITIAL_ZOOM = 15;
let initialCoordinates = [24.638741, 73.696685];

// Override the _setCaptureMarkerIcon method of L.Control.Measure
L.Control.Measure.include({
  _setCaptureMarkerIcon: function () {
    // Disable autopan
    this._captureMarker.options.autoPanOnFocus = false;

    // Set the icon for the capture marker using the default function
    this._captureMarker.setIcon(
      L.divIcon({
        iconSize: this._map.getSize().multiplyBy(2),
      })
    );
  },
});

// Map options
let mapOptions = {
  center: initialCoordinates,
  minZoom: 14.4,
  maxZoom: 20,
  zoomDelta: 0.1,
  // zoom: INITIAL_ZOOM,
  doubleClickZoom: false,

  // sleep options
  // true by default, false if you want a wild map
  sleep: true,
  // time(ms) for the map to fall asleep upon mouseout
  sleepTime: 750,
  // time(ms) until map wakes on mouseover
  wakeTime: 750,
  // defines whether or not the user is prompted oh how to wake map
  sleepNote: true,
  // should hovering wake the map? (clicking always will)
  hoverToWake: true,
};

// Initialize the map
var map = L.map("map", mapOptions);

// Set Map Attribution
map.attributionControl.setPrefix(
  "© 2023 Aumsat Technologies LLP. All rights reserved."
);

// Tile Layer Providers
// OpenStreetMap
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 22,
  attribution: "OpenStreetMap",
});

// Google Satellite Hybrid
var googleSatellite = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 22,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
);

// Create an object to hold your base layers
let baseLayers = {
  "Google Satellite Hybrid": googleSatellite,
  OpenStreetMap: osm,
};

// No overlays in this example, but you can add markers, polygons, etc.
let overlays = {};

// Add the layer control to the map
L.control
  .layers(baseLayers, overlays, {
    position: "topright", // Default position is 'topright'
  })
  .addTo(map);

// You've already set Google Satellite Hybrid as the default
googleSatellite.addTo(map);

// Add Map Measure Control
var measure = L.control.measure({
  position: "topleft",
  primaryLengthUnit: "meters",
  secondaryLengthUnit: "kilometers",
  primaryAreaUnit: "acres",
  secondaryAreaUnit: "sqmeters",
  activeColor: "#00ffff",
  completedColor: "#99ff99",
});

measure.addTo(map);

// =================================================================================================
// =================================================================================================
// =================================================================================================

// HELPER FUNCTIONS

// =================================================================================================
// =================================================================================================
// =================================================================================================

// Function to add either a point, line or polygon geojson layer to the map
function addGeoJsonLayer(
  data,
  styleFunction,
  popupFunction = null,
  pointStyleFunction = null
) {
  return new L.geoJson(data, {
    interactive: true,
    onEachFeature: popupFunction ? popupFunction : null,
    style: styleFunction,
    pointToLayer: pointStyleFunction
      ? genericPointToLayer(pointStyleFunction)
      : null,
  });
}

// Function to create popup content for a feature
function createPopupContent(feature, layer) {
  let popupContent = "";
  if (feature.properties) {
    for (let property in feature.properties) {
      popupContent +=
        "<b>" + property + "</b>: " + feature.properties[property] + "<br />";
    }
  }
  layer.bindPopup(popupContent);
}

// Function to convert Point to Layer
function genericPointToLayer(styleFunction) {
  return function (feature, latlng) {
    var context = {
      feature: feature,
      variables: {},
    };
    return L.marker(latlng, styleFunction(feature));
  };
}

// =================================================================================================
// =================================================================================================
// =================================================================================================

// MAIN CODE

// =================================================================================================
// =================================================================================================
// =================================================================================================

// Create styles for the geojson layers
// 75mm Water Pipeline Style
function style_75mmWaterPipeline(feature) {
  return {
    opacity: 1,
    color: "#1affd1",
    dashArray: "",
    lineCap: "square",
    lineJoin: "bevel",
    weight: 4.0,
    fillOpacity: 0,
    interactive: true,
  };
}

// 100mm Water Pipeline Style
function style_100mmWaterPipeline(feature) {
  return {
    opacity: 1,
    color: "#ff0066",
    dashArray: "",
    lineCap: "square",
    lineJoin: "bevel",
    weight: 4.0,
    fillOpacity: 0,
    interactive: true,
  };
}

// 150mm Water Pipeline Style
function style_150mmWaterPipeline(feature) {
  return {
    opacity: 1,
    color: "#ffff00",
    dashArray: "",
    lineCap: "square",
    lineJoin: "bevel",
    weight: 4.0,
    fillOpacity: 0,
    interactive: true,
  };
}

// Bedla Village Boundary Style
function style_BedlaBoundary(feature) {
  return {
    opacity: 1,
    color: "#ffffff",
    dashArray: "",
    lineCap: "square",
    lineJoin: "bevel",
    weight: 6,
    fillOpacity: 0,
    interactive: true,
  };
}

// Leakages
function style_Leakages(feature) {
  return {
    rotationAngle: 0.0,
    rotationOrigin: "center center",
    icon: L.icon({
      iconUrl: "/static/icons/leakage.svg",
      iconSize: [30, 30],
      iconAnchor: [15, 15], // assuming the anchor is the center of the icon
      className: "marker-icon",
    }),
    interactive: true,
  };
}

// Valves
function style_Valves(feature) {
  return {
    rotationAngle: 0.0,
    rotationOrigin: "center center",
    icon: L.icon({
      iconUrl: "/static/icons/valve.svg",
      iconSize: [30, 30],
      iconAnchor: [15, 15], // assuming the anchor is the center of the icon
      className: "marker-icon",
    }),
    interactive: true,
  };
}

// Overhead Tank
function style_OverheadTank(feature) {
  return {
    rotationAngle: 0.0,
    rotationOrigin: "center center",
    icon: L.icon({
      iconUrl: "/static/icons/water-tank-svg.svg",
      iconSize: [60, 60],
      iconAnchor: [30, 30], // assuming the anchor is the center of the icon
      className: "marker-icon",
    }),
    interactive: true,
  };
}

// Create the geojson layers
// 75mm Water Pipeline
let geojson_75mmWaterPipeline = addGeoJsonLayer(
  json_75mmPipeline,
  style_75mmWaterPipeline,
  createPopupContent
);

// 100mm Water Pipeline
let geojson_100mmWaterPipeline = addGeoJsonLayer(
  json_100mmPipeline,
  style_100mmWaterPipeline,
  createPopupContent
);

// 150mm Water Pipeline
let geojson_150mmWaterPipeline = addGeoJsonLayer(
  json_150mmPipeline,
  style_150mmWaterPipeline,
  createPopupContent
);

// Bedla Village Boundary
let geojson_BedlaBoundary = addGeoJsonLayer(
  json_BedlaBoundary,
  style_BedlaBoundary
);

// Leakages
let geojson_Leakages = addGeoJsonLayer(
  json_Leakages,
  style_Leakages,
  createPopupContent,
  style_Leakages
);

// Valves
let geojson_Valves = addGeoJsonLayer(
  json_Valves,
  style_Valves,
  createPopupContent,
  style_Valves
);

// Overhead Tank
let geojson_OverheadTank = addGeoJsonLayer(
  json_OverheadTank,
  style_OverheadTank,
  createPopupContent,
  style_OverheadTank
);

// Add the geojson layers to the map
geojson_BedlaBoundary.addTo(map);
geojson_100mmWaterPipeline.addTo(map);
geojson_75mmWaterPipeline.addTo(map);
geojson_150mmWaterPipeline.addTo(map);
geojson_Valves.addTo(map);
geojson_Leakages.addTo(map);
geojson_OverheadTank.addTo(map);

// Fit map bounds to the Bedla Village Boundary
map.fitBounds(geojson_BedlaBoundary.getBounds());
