import leaflet from "leaflet";
import palette from "google-palette";

export let map;
// Lista contenente i dati geojson formati dei PoI.
export let pointOfInterest;
export let userLocation;
export let clusterLocation;
export let layerSelected;

export function setMap(newMap) {
  map = newMap;
}

export function getMap() {
  return map;
}

export function setPoIData(newPointOfInterest) {
  pointOfInterest = newPointOfInterest;
}

export function setUserLocation(newUserLocation) {
  userLocation = newUserLocation;
}

export function setClusterData(newClusterLocation) {
  clusterLocation = newClusterLocation;
}

export function getUserLocation() {
  return userLocation;
}

export function setLayerSelected(newLayerSelected) {
  layerSelected = newLayerSelected;
}

export function getLayerSelected() {
  return layerSelected;
}

// Icon for the marker

export var geojsonMarkerOptions = leaflet.icon({
  iconUrl: "./markerICO/questionmark.circle.fill.svg",
  iconSize: [30, 30],
  popupAnchor: [0, -15],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsHistoricalBuilding = leaflet.icon({
  iconUrl: "./markerICO/building.columns.circle.fill.svg",
  iconSize: [30, 30],
  popupAnchor: [0, -15],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsPark = leaflet.icon({
  iconUrl: "./markerICO/leaf.circle.fill.svg",
  iconSize: [30, 30],
  popupAnchor: [0, -15],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsTheater = leaflet.icon({
  iconUrl: "./markerICO/theatermasks.circle.fill.svg",
  iconSize: [30, 30],
  popupAnchor: [0, -15],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsMuseum = leaflet.icon({
  iconUrl: "./markerICO/building.2.crop.circle.fill.svg",
  iconSize: [30, 30],
  popupAnchor: [0, -15],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsDepartment = leaflet.icon({
  iconUrl: "./markerICO/book.circle.fill.svg",
  iconSize: [30, 30],
  popupAnchor: [0, -15],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

// Icon for the user marker

export var geojsonMarkerOptionsUserBlack = leaflet.icon({
  iconUrl: "./markerICO/user/userColorBlack.svg",
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsUserBlue = leaflet.icon({
  iconUrl: "./markerICO/user/userColorBlue.svg",
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsUserGreen = leaflet.icon({
  iconUrl: "./markerICO/user/userColorGreen.svg",
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsUserOrange = leaflet.icon({
  iconUrl: "./markerICO/user/userColorOrange.svg",
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsUserPurple = leaflet.icon({
  iconUrl: "./markerICO/user/userColorPurple.svg",
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsUserRed = leaflet.icon({
  //iconUrl: "./markerICO/building.2.crop.circle.fill.svg",
  iconUrl: "./markerICO/user/userColorRed.svg",
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

// function getColorCluster(actualCluster, maxCluster) {
// value from 0 to 1
// var hue = ((1 - actualCluster / maxCluster) * 120).toString(10);
// return ["hsl(", hue, ",100%,50%)"].join("");
// }

export function getColorPaletteGoogleCluster(actualCluster, maxCluster) {
  var paletteGoogle = palette("mpn65", maxCluster);
  return "#" + paletteGoogle[actualCluster];
}

export function geojsonMarkerOptionsCluster(actualCluster, maxCluster){
  return {
    radius: 15,
    stroke: false,
    color: getColorPaletteGoogleCluster(actualCluster, maxCluster),
    fillOpacity: 0.8,
  }
}


// Popup for the marker

export function generatorPopupInfo(feature) {
  let customPopup = {};
  customPopup.content =
    feature.properties.name;
  //+ " <br/> " + feature.properties.district;
  switch (feature.properties.category) {
    case "Historical Building":
      customPopup.style = { 'className': 'HistoricalBuilding', closeButton: false };
      break;
    case "Park":
      customPopup.style = { 'className': 'Park', closeButton: false };
      break;
    case "Theater":
      customPopup.style = { 'className': 'Theater', closeButton: false };
      break;
    case "Museum":
      customPopup.style = { 'className': 'Museum', closeButton: false };
      break;
    case "Department":
      customPopup.style = { 'className': 'Department', closeButton: false };
      break;
    default:
      customPopup.style = { 'className': 'Default', closeButton: false };
      break;
  }
  return customPopup;
}

export function generatorPopupUserInfo(feature) {
  let customPopup = {};
  customPopup.content =
    feature.properties.category + ", " + feature.properties.minRank + " <br/> " + feature.properties.timestamp;
  switch (feature.properties.category) {
    case "Historical Building":
      customPopup.style = { 'className': 'HistoricalBuilding', closeButton: false };
      break;
    case "Park":
      customPopup.style = { 'className': 'Park', closeButton: false };
      break;
    case "Theater":
      customPopup.style = { 'className': 'Theater', closeButton: false };
      break;
    case "Museum":
      customPopup.style = { 'className': 'Museum', closeButton: false };
      break;
    case "Department":
      customPopup.style = { 'className': 'Department', closeButton: false };
      break;
    default:
      customPopup.style = { 'className': 'Default', closeButton: false };
      break;
  }
  return customPopup;
}