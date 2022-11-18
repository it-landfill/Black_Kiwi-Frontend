<template>
    <div class="h-screen relative">
        <!-- 
            Nel caso di errore ...
        -->
        <GeoErrorModal v-if="geoError" @closeGeoError="closeGeoError" :geoErrorMsg="geoErrorMsg" />
        <!-- 
            Nella pagina di home è presente un pannello nella parte inferiore a sinistra
            dello schermo. All'interno di questo pannello sono presenti i pulsanti per
            la visualizzazione dei vari layer della mappa, oltre alle informazioni 
            relative all'utente loggato.
        -->
        <MapFeatures ref="mapFeatures" @switchShowPOI="switchShowPOI" @switchAddPOI="switchAddPOI"
            @switchHeatMap="switchHeatMap" @switchClustering="switchClustering" :coordsMapFeatures="coords"
            :fetchCoordsMapFeatures="fetchCoords" />

        <AddPOIModal v-if="addPOIState" @closeAddPOIModal="closeAddPOIModal" :coordsNewPOI="coordsNewPOI" />

        <div id="map" class="h-full z-[1]" />
    </div>
</template>

<!-- set width and height styles for map -->
<style>
/* css to customize Leaflet default styles  */
.HistoricalBuilding .leaflet-popup-tip,
.HistoricalBuilding .leaflet-popup-content-wrapper {
    background: #df0ddc;
    color: #ffffff;
}

.Park .leaflet-popup-tip,
.Park .leaflet-popup-content-wrapper {
    background: #0ddf3a;
    color: #ffffff;
}

.Theater .leaflet-popup-tip,
.Theater .leaflet-popup-content-wrapper {
    background: #df0d0d;
    color: #ffffff;
}

.Museum .leaflet-popup-tip,
.Museum .leaflet-popup-content-wrapper {
    background: #3a0ddf;
    color: #ffffff;
}

.Department .leaflet-popup-tip,
.Department .leaflet-popup-content-wrapper {
    background: #000000;
    color: #ffffff;
}

.Default .leaflet-popup-tip,
.Default .leaflet-popup-content-wrapper {
    background: #df810d;
    color: #ffffff;
}
</style>

<script>

// Import della libreria di leaflet in "HomeView"
import leaflet from "leaflet";
// Import delle funzioni onMounted e ref di vue in "HomeView"
import { onMounted, ref } from "vue";
// Import delle componenti richiamate nel blocco <template>
import GeoErrorModal from "@/components/errorModal/genericErrorModal/GeoErrorModal.vue";
import AddPOIModal from "@/components/AddPOIModal.vue";
import MapFeatures from "@/components/MapFeatures.vue";

import {
    map,
    setMap,
    geojsonMarkerOptions,
    geojsonMarkerOptionsHistoricalBuilding,
    geojsonMarkerOptionsPark,
    geojsonMarkerOptionsTheater,
    geojsonMarkerOptionsMuseum,
    geojsonMarkerOptionsDepartment,
    generatorPopupInfo
} from "@/components/js/dataLeaflet.js"

import {
    baseUri
} from "@/components/js/dataConnection.js";

export default {
    // Nominativo del component
    name: 'HomeView',
    // Elenco dei components utilizzati
    components: {
        GeoErrorModal,
        MapFeatures,
        AddPOIModal
    },
    setup() {
        // Dichiarazione delle variabili di geolocalizzazione.
        const coords = ref(null);
        const fetchCoords = ref(null);
        let dataFormatted;
        let marker = ref(null);
        // Dichiarazione delle variabili per la gestione degli errori.
        const geoError = ref(null);
        const geoErrorMsg = ref(null);
        // Dichiarazione delle variabili per la gestione dell'aggiunta dei POI.
        const addPOIMode = ref(false);
        const coordsNewPOI = ref({ lat: null, lng: null });
        const addPOIState = ref(false);

        const mapFeatures = ref(null);

        /* 
          onMounted, composition API che permette di eseguire una chiamata quando la componente in 
          cui è utilizzata è caricata.
          https://vuejs.org/api/composition-api-lifecycle.html#onmounted
        */
        onMounted(() => {
            // Inizializzazione della mappa di leaflet con i valori di default.
            setMap(leaflet.map('map').setView([44.4939, 11.3428], 15));
            // Aggiunta del livello per le tile della mappa
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                minZoom: 15,
                detectRetina: true,
                attribution: '© OpenStreetMap'
            }).addTo(map);
        })

        /*
          Funzione di geolocalizzazione del dispositivo.
        */
        const switchShowPOI = () => {
            console.log("HomeView - switchShowPOI executed");
            // Controllo dello stato di "coords" 
            if (coords.value) {
                coords.value = false;
                // Remove marker
                map.removeLayer(marker);
                return;
            } else {
                coords.value = true;
                addGeoJson()
            }
        };

        function addGeoJson() {

            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch(baseUri + "pois", requestOptions)
                .then(async response => {
                    const data = await response.json();
                    dataFormatted = data.map((item) => {
                        return {
                            "type": "Feature",
                            "properties": {
                                "id": item.id,
                                "name": item.name,
                                "category": item.category,
                                "rank": item.rank
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [item.coord.latitude, item.coord.longitude]
                            }
                        }
                    })
                    // Add GeoJSON
                    const geojson = leaflet.geoJson(dataFormatted, {
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
                        onEachFeature: function (feature, layer) {
                            // create popup contents
                            let customPopup = generatorPopupInfo(feature);
                            layer.bindPopup(customPopup.content, customPopup.style);
                            layer.on('click', function () {
                                console.log("HomeView - addGeoJson - onEachFeature - click executed");
                                let nodeInfo = {
                                    id: feature.properties.id,
                                    name: feature.properties.name,
                                    category: feature.properties.category,
                                    rank: feature.properties.rank,
                                    latitude: feature.geometry.coordinates[0].toFixed(3),
                                    longitude: feature.geometry.coordinates[1].toFixed(3)
                                }
                                console.debug(nodeInfo);
                                mapFeatures.value.switchPointOfInterestState(nodeInfo);
                            });
                        }
                    }).addTo(map);
                    marker = geojson;
                    if (response.status !== 200) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });

        }
        
        // Aggiunta di un punto di interesse
        const switchAddPOI = () => {
            console.log("HomeView - switchAddPOI executed");
            addPOIMode.value = !addPOIMode.value;
            if (addPOIMode.value) {
                document.getElementById('map').style.cursor = 'crosshair'
                map.on('click',
                    function (e) {
                        var coord = e.latlng.toString().split(',');
                        coordsNewPOI.value.lat = coord[0].split('(')[1];
                        coordsNewPOI.value.lng = coord[1].split(')')[0];
                        console.log("You clicked the map at latitude: " + coordsNewPOI.value.lat + " and longitude: " + coordsNewPOI.value.lng);
                        addPOIState.value = true;
                    });
            } else {
                document.getElementById('map').style.cursor = ''
                map.off('click');
            }
        };

        const closeAddPOIModal = () => {
            console.log("HomeView - closeAddPOIModal executed");
            addPOIState.value = false;
            document.getElementById('map').style.cursor = ''
            map.off('click');
        }

        const switchHeatMap = () => {
            console.log("HomeView - switchHeatMap executed");
        };

        const switchClustering = () => {
            console.log("HomeView - switchClustering executed");
        }

        const closeGeoError = () => {
            geoError.value = null;
            geoErrorMsg.value = null;
        };

        const errorSignal = () => {
            console.log("hola");
        };

        return {
            coords,
            fetchCoords,
            geoError,
            geoErrorMsg,
            addPOIState,
            coordsNewPOI,
            mapFeatures,
            switchShowPOI,
            switchAddPOI,
            switchHeatMap,
            switchClustering,

            closeAddPOIModal,
            closeGeoError,
            errorSignal,
        };
    }
}
</script>
