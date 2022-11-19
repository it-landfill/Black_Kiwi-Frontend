import leaflet from "leaflet";


export let map;
export let layerSelected;

export function setLayerSelected(newLayerSelected) {
  layerSelected = newLayerSelected;
}

export function getLayerSelected() {
  return layerSelected;
}

export function setMap(newMap) {
    map = newMap;
}

export function getMap() {
    return map;
}

// Icon for the marker

export var geojsonMarkerOptions = leaflet.icon({
  iconUrl: "./markerICO/questionmark.circle.fill.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsHistoricalBuilding = leaflet.icon({
  iconUrl: "./markerICO/building.columns.circle.fill.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsPark = leaflet.icon({
  iconUrl: "./markerICO/leaf.circle.fill.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsTheater = leaflet.icon({
  iconUrl: "./markerICO/theatermasks.circle.fill.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsMuseum = leaflet.icon({
  iconUrl: "./markerICO/building.2.crop.circle.fill.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

export var geojsonMarkerOptionsDepartment = leaflet.icon({
  iconUrl: "./markerICO/book.circle.fill.svg",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

// Popup for the marker

export function generatorPopupInfo(feature) {
  let customPopup = {};
  customPopup.content = feature.properties.name + " <br/> " + feature.properties.category + " <br/> " + feature.properties.rank;
  switch (feature.properties.category) {
    case "Historical Building":
      customPopup.style = { 'className': 'HistoricalBuilding', 'minWidth': '75', };
      break;
    case "Park":
      customPopup.style = { 'className': 'Park', 'minWidth': '75', };
      break;
    case "Theater":
      customPopup.style = { 'className': 'Theater', 'minWidth': '75', };
      break;
    case "Museum":
      customPopup.style = { 'className': 'Museum', 'minWidth': '75', };
      break;
    case "Department":
      customPopup.style = { 'className': 'Department', 'minWidth': '75', };
      break;
    default:
      customPopup.style = { 'className': 'Default', 'minWidth': '75', };
      break;
  }
  return customPopup;
}