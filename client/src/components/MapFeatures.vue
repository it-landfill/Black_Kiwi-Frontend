<template>
    <!-- Components di sinistra -->
    <div class="w-full max-w-[375px] min-h-[93%] absolute z-[4] flex flex-col top-[50px] left-[70px] bg-trasparent">

        <toggleComponent @switchShowPOI="switchShowPOI" @switchAddPOI="switchAddPOI" @switchShowUser="switchShowUser"
            @switchHeatMap="switchHeatMap" @switchClustering="switchClustering" @reloadHeatMap="reloadHeatMap"
            @showAddPOIModal="showAddPOIModal" @addCategory="addCategory" @removeCategory="removeCategory" />

        <infoBlockComponent v-if="infoPointOfInterestState" @modifyPOI="modifyPOI" @removePOI="removePOI"
            :nodeInfo="nodeInfo" />

        <AddPOIModal v-if="addPOIState" @closeAddPOIModal="closeAddPOIModal" :coordsNewPOI="coordsNewPOI"
            @closeAddPOIModalSuccess="closeAddPOIModalSuccess" />

        <ModifyPOIModal ref="modifyPOIModal" v-if="poiModifyState" @closePostModifyPOIModal="closePostModifyPOIModal"
            @closeModifyPOIModal="closeModifyPOIModal" :nodeInfo="nodeInfo" />

        <clusterModal v-if="switchClusteringShow"  @closeClusterModal="closeClusterModal"
            @closeAddClusterSuccess="closeAddClusterSuccess"/>

        <ErrorModal v-if="infoErrorState" @closeError="closeError" :infoErrorTitle="infoErrorTitle"
            :infoErrorMsg="infoErrorMsg" />

    </div>

    <!-- Components di destra -->
    <div class="w-full max-w-[375px] min-h-[93%] absolute z-[4] flex flex-col top-[50px] right-[70px] bg-trasparent"
        v-if="switchHeatMapShow">
        <legendComponent />
    </div>
</template>

<script>
// Import della funzioni ref di vue in "MapFeatures"
import { ref } from "vue";
// Import libreria di leaflet.
import leaflet from "leaflet";
// Import delle componenti richiamate nel blocco <template>
import infoBlockComponent from "./mapFeatureComponents/infoBlockComponent.vue";
// Import funzioni di impostazione per POST e GET al server.
import {
    baseUri,
    getToken
} from "@/components/js/dataConnection.js";
// Import funzioni di gestione della mappa.
import {
    map,
    pointOfInterest,
    userLocation,
    geojsonMarkerOptions,
    geojsonMarkerOptionsHistoricalBuilding,
    geojsonMarkerOptionsPark,
    geojsonMarkerOptionsTheater,
    geojsonMarkerOptionsMuseum,
    geojsonMarkerOptionsDepartment,
    generatorPopupInfo,
    geojsonMarkerOptionsUserBlack,
    geojsonMarkerOptionsUserBlue,
    geojsonMarkerOptionsUserGreen,
    geojsonMarkerOptionsUserOrange,
    geojsonMarkerOptionsUserPurple,
    geojsonMarkerOptionsUserRed,
    generatorPopupUserInfo,
    layerSelected
} from "@/components/js/dataLeaflet.js"

import toggleComponent from "./mapFeatureComponents/toggleComponent.vue";
import legendComponent from "./mapFeatureComponents/legendComponent.vue";
import ErrorModal from "@/components/errorModal/genericErrorModal/ErrorModal.vue";
import ModifyPOIModal from "@/components/mapFeatureComponents/ModifyPOIModal.vue";
import AddPOIModal from "@/components/AddPOIModal.vue";
import clusterModal from "@/components/clusterModal.vue";

export default {
    // Nominativo del component
    name: 'MapFeatures',
    components: {
        AddPOIModal,
        infoBlockComponent,
        toggleComponent,
        legendComponent,
        ErrorModal,
        ModifyPOIModal,
        clusterModal
    },
    props: ["coordsMapFeatures", "fetchCoordsMapFeatures"],
    emits: [],
    setup() {

        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const infoPointOfInterestState = ref(false);
        let marker;
        var nodeInfo = ref(
            {
                id: "_",
                name: "_",
                category: "_",
                rank: "_",
                latitude: "_",
                longitude: "_"
            }
        );

        function resetNodeInfo() {
            nodeInfo.value = {
                id: "_",
                name: "_",
                category: "_",
                rank: "_",
                latitude: "_",
                longitude: "_"
            }
        }

        const switchShowPOI = () => {
            if (!infoPointOfInterestState.value) {
                marker = leaflet.geoJson(pointOfInterest, {
                    // Impostazione dello stile dei marker.
                    pointToLayer: function (feature, latlng) {
                        switch (feature.properties.category) {
                            case "Historical Building":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsHistoricalBuilding });
                            case "Park":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsPark });
                            case "Theater":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsTheater });
                            case "Museum":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsMuseum });
                            case "Department":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsDepartment });
                            default:
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptions });
                        }
                    },
                    // Impostazione del popup.
                    onEachFeature: function (feature, layer) {
                        let customPopup = generatorPopupInfo(feature);
                        layer.bindPopup(customPopup.content, customPopup.style);
                        // Aggiunta di un listener per la gestione del click sul marker.
                        layer.on('click', function () {
                            // Impostazione dello stato di visualizzazione del blocco di informazioni.
                            nodeInfo.value.name = feature.properties.name;
                            nodeInfo.value.id = feature.properties.id;
                            nodeInfo.value.category = feature.properties.category;
                            nodeInfo.value.rank = feature.properties.rank;
                            nodeInfo.value.latitude = feature.geometry.coordinates[1].toFixed(6);
                            nodeInfo.value.longitude = feature.geometry.coordinates[0].toFixed(6);
                        });
                    }
                }).addTo(map);
                infoPointOfInterestState.value = !infoPointOfInterestState.value;
            } else {
                map.removeLayer(marker);
                resetNodeInfo()
                infoPointOfInterestState.value = !infoPointOfInterestState.value;
            }
        };

        const infoUserLocationState = ref(false);
        let userMarker;
        const switchShowUser = () => {
            if (!infoUserLocationState.value) {
                const geojson = leaflet.geoJson(userLocation, {
                    // Impostazione dello stile dei marker.
                    pointToLayer: function (feature, latlng) {
                        switch (feature.properties.category) {
                            case "Historical Building":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsUserBlue });
                            case "Park":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsUserGreen });
                            case "Theater":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsUserRed });
                            case "Museum":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsUserPurple });
                            case "Department":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsUserBlack });
                            default:
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsUserOrange });
                        }
                    },
                    // Impostazione del popup.
                    onEachFeature: function (feature, layer) {
                        let customPopup = generatorPopupUserInfo(feature);
                        layer.bindPopup(customPopup.content, customPopup.style);
                    }
                }).addTo(map);
                userMarker = geojson;
            } else {
                map.removeLayer(userMarker);
            }
            infoUserLocationState.value = !infoUserLocationState.value;
        };

        const removeCategory = (category) => {
            map.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.category === category) {
                    map.removeLayer(layer);
                }
            });
        };

        const addCategory = (category) => {
            marker.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.category === category) {
                    map.addLayer(layer);
                }
            });
        };

        const modifyPOI = () => {
            poiModifyState.value = !poiModifyState.value;
        };

        const closePostModifyPOIModal = (name, rank, category) => {
            nodeInfo.value.name = name;
            nodeInfo.value.rank = rank;
            nodeInfo.value.category = category;
            poiModifyState.value = false;
            // Update from marker variable
            marker.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.id === nodeInfo.value.id) {
                    layer.feature.properties.name = name;
                    layer.feature.properties.rank = rank;
                    layer.feature.properties.category = category;
                }
            });
            // Update from map
            map.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.id === nodeInfo.value.id) {
                    layer.feature.properties.name = name;
                    layer.feature.properties.rank = rank;
                    layer.feature.properties.category = category;
                    switch (category) {
                        case "Historical Building":
                            layer.setIcon(geojsonMarkerOptionsHistoricalBuilding);
                            break;
                        case "Park":
                            layer.setIcon(geojsonMarkerOptionsPark);
                            break;
                        case "Theater":
                            layer.setIcon(geojsonMarkerOptionsTheater);
                            break;
                        case "Museum":
                            layer.setIcon(geojsonMarkerOptionsMuseum);
                            break;
                        case "Department":
                            layer.setIcon(geojsonMarkerOptionsDepartment);
                            break;
                        default:
                            layer.setIcon(geojsonMarkerOptions);
                    }
                    let customPopup = generatorPopupInfo(layer.feature);
                    layer.bindPopup(customPopup.content, customPopup.style);
                }
            });

        };

        const closeModifyPOIModal = () => {
            poiModifyState.value = false;
        };

        const removePOI = (id) => {
            // Remove from map
            marker.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.id === id) {
                    map.removeLayer(layer);
                }
            });
            // Remove from marker variable
            marker.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.id === id) {
                    marker.removeLayer(layer);
                }
            });

            resetNodeInfo();
        };

        const addPOIState = ref(false);
        const coordsNewPOI = ref({ lat: 0, lng: 0 });

        const showAddPOIModal = (coordsNewPOIs) => {
            coordsNewPOI.value = coordsNewPOIs._rawValue;
            addPOIState.value = !addPOIState.value;
        };

        const closeAddPOIModal = () => {
            addPOIState.value = false;
        }

        const closeAddPOIModalSuccess = (obj) => {
            addPOIState.value = false;
            if (infoPointOfInterestState.value) {
                const newPOI = {
                    "type": "Feature",
                    "properties": {
                        "name": obj.name,
                        "id": obj.id,
                        "category": obj.category,
                        "rank": obj.rank,
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [obj.coord.longitude, obj.coord.latitude]
                    }
                };
                marker.addLayer(leaflet.geoJson(newPOI, {
                    // Impostazione dello stile dei marker.
                    pointToLayer: function (feature, latlng) {
                        switch (feature.properties.category) {
                            case "Historical Building":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsHistoricalBuilding });
                            case "Park":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsPark });
                            case "Theater":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsTheater });
                            case "Museum":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsMuseum });
                            case "Department":
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptionsDepartment });
                            default:
                                return leaflet.marker(latlng, { icon: geojsonMarkerOptions });
                        }
                    },
                    // Impostazione del popup.
                    onEachFeature: function (feature, layer) {
                        let customPopup = generatorPopupInfo(feature);
                        layer.bindPopup(customPopup.content, customPopup.style);
                        // Aggiunta di un listener per la gestione del click sul marker.
                        layer.on('click', function () {
                            // Impostazione dello stato di visualizzazione del blocco di informazioni.
                            nodeInfo.value.name = feature.properties.name;
                            nodeInfo.value.id = feature.properties.id;
                            nodeInfo.value.category = feature.properties.category;
                            nodeInfo.value.rank = feature.properties.rank;
                            nodeInfo.value.latitude = feature.geometry.coordinates[1].toFixed(6);
                            nodeInfo.value.longitude = feature.geometry.coordinates[0].toFixed(6);
                        });
                    }
                }).addTo(map));
            }
        };

        const switchClusteringShow = ref(false);

        const switchClustering = () => {
            switchClusteringShow.value = !switchClusteringShow.value;
        };

        const closeClusterModal = () => {
            switchClusteringShow.value = false;
        };

        const closeAddClusterSuccess = () => {
            switchClusteringShow.value = false;
        };


        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const switchHeatMapShow = ref(false);
        // Dichiarazione delle variabili di visualizzazione della finestra di errore.
        const infoErrorState = ref(false);
        const infoErrorTitle = ref("Errore nella pagina di visualizzazione della home.");
        const infoErrorMsg = ref("Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.");
        // Dichiarazione delle variabili per la gestione degla richiesta di modifica di un POI.

        const poiModifyState = ref(false);


        const switchAddPOI = () => {
            console.log("switchAddPOI - yo");
        };

        const switchHeatMap = () => {
            switchHeatMapShow.value = !switchHeatMapShow.value;
        };



        const reloadHeatMap = () => {
            console.log("reloadHeatMap - yo", layerSelected);
            map.eachLayer(function (layer) {
                if (layer.options && layer.options.fillColor) {
                    map.removeLayer(layer);
                }
            });
            // Remove legend 
            addHeatMap();
        };

        let max;

        function getColor(value, max) {
            //value from 0 to 1
            var hue = ((1 - value / max) * 120).toString(10);
            return ["hsl(", hue, ",100%,50%)"].join("");
        }

        function onHighlightFeature(e) {
            document.getElementById("overRegion").textContent = "Distretto: " + e.target.feature.properties.name;

            var layer = e.target;
            layer.setStyle({
                weight: 4,
                dashArray: '',
                fillOpacity: 0.5
            });
            layer.bringToFront();
        }

        function offHighlightFeature(e) {
            document.getElementById("overRegion").textContent = "Distretto: _";
            e.target.setStyle({
                weight: 2,
                opacity: 0.75,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.2
            });
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: onHighlightFeature,
                mouseout: offHighlightFeature,
                click: zoomToFeature
            });
            
        }

        let dataFormatted;

        async function addHeatMap() {
            // Impostazione dell'header della richiesta di modifica.
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());
            // Impostazione del metodo GET e invio dei dati al server
            let requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            // Impostazione dell'endpoint della richiesta.
            let endPoint;

            switch (layerSelected) {
                case "Distretti":
                    endPoint = baseUri + "admin/getQuartieri";
                    break;
                case "Densità":
                    endPoint = baseUri + "admin/getPOIQuartieri";
                    break;
                case "Check":
                    endPoint = baseUri + "admin/getRequestQuartieri";
                    break;
                default:
                    console.log("Errore nella formazione dell'endpoint");
                    break;
            }
            fetch(endPoint, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    switch (response.status) {
                        case 200:
                            dataFormatted = JSON.parse(data);
                            // Ordinamento dei dati in base alla value.
                            dataFormatted.features.sort((a, b) => (a.properties.value < b.properties.value) ? 1 : -1);
                            // Calcolo del massimo.
                            max = dataFormatted.features.reduce((max, p) => p.properties.value > max ? p.properties.value : max).properties.value;
                            // Impostazione dello stile e del comportamento della mappa.
                            dataFormatted.features.forEach(elem => {
                                leaflet.geoJSON(elem, {
                                    style: function () {
                                        return {
                                            fillColor: getColor(elem.properties.value, max),
                                            weight: 2,
                                            opacity: 0.75,
                                            color: 'white',
                                            dashArray: '3',
                                            fillOpacity: 0.2
                                        };
                                    },
                                    onEachFeature: onEachFeature
                                }).addTo(map);
                            });

                            // Eliminazione degli elementi "duplicati" dalla lista.
                            dataFormatted.features = [...new Map(dataFormatted.features.map((m) => [m.properties.value, m])).values()];
                            document.querySelector('#listElments').innerHTML = "";
                            // Creazione della legenda.
                            dataFormatted.features.forEach(elem => {
                                document.querySelector('#listElments').insertAdjacentHTML(
                                    'afterbegin',
                                    `
                                <div class="space-y-2 mx-5 pt-3 flex">
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="rounded-md h-8 w-8 border-4 border-white shadow-lg" style="background-color:`+ getColor(elem.properties.value, max) + `" ></div>
                                        <p>` + elem.properties.value + `</p>
                                        </div>
                                </div>
                            `
                                )
                            })
                            break;
                        case 401:
                            console.log("Errore nella richiesta: " + data.message);
                            break;
                        default:
                            console.log("Errore nella richiesta: " + data.message);
                            break;
                    }
                })
                .catch(error => {
                    console.log("There was an error!");
                    console.log(error);
                });

        }

        const closeError = () => {
            infoErrorState.value = false;
        };

        return {
            switchHeatMapShow,
            coordsNewPOI,
            nodeInfo,
            infoPointOfInterestState,
            poiModifyState,
            infoErrorState,
            infoErrorTitle,
            infoErrorMsg,
            addPOIState,
            switchClusteringShow,
            closePostModifyPOIModal,
            closeAddPOIModal,
            showAddPOIModal,
            switchShowPOI,
            switchAddPOI,
            switchHeatMap,
            switchClustering,
            modifyPOI,
            reloadHeatMap,
            closeModifyPOIModal,
            closeError,
            removePOI,
            addCategory,
            removeCategory,
            switchShowUser,
            closeAddPOIModalSuccess,
            closeClusterModal,
            closeAddClusterSuccess,
        };
    },
};
</script>