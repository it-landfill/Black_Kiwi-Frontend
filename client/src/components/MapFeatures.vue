<template>
    <!-- Components di sinistra -->
    <div class="w-full max-w-[375px] min-h-[93%] absolute z-[4] flex flex-col top-[50px] left-[70px] bg-trasparent">

        <toggleComponent @switchShowPOI="switchShowPOI" @switchAddPOI="switchAddPOI" @switchHeatMap="switchHeatMap"
            @switchClustering="switchClustering" @reloadHeatMap="reloadHeatMap" @showAddPOIModal="showAddPOIModal" />

        <infoBlockComponent v-if="infoPointOfInterestState" @modifyPOI="modifyPOI" @removePOI="removePOI"
            :nodeInfo="nodeInfo" />

        <AddPOIModal v-if="addPOIState" @closeAddPOIModal="closeAddPOIModal" :coordsNewPOI="coordsNewPOI" />

        <ModifyPOIModal ref="modifyPOIModal" v-if="poiModifyState" @closePostModifyPOIModal="closePostModifyPOIModal"
            @closeModifyPOIModal="closeModifyPOIModal" :nodeInfo="nodeInfo" />

        <clusterModal v-if="switchClusteringShow" />

        <ErrorModal v-if="infoErrorState" @closeError="closeError" :infoErrorTitle="infoErrorTitle"
            :infoErrorMsg="infoErrorMsg" />
            
    </div>

    <!-- Components di destra -->
    <div
        class="w-full max-w-[375px] min-h-[93%] absolute z-[4] flex flex-col top-[50px] right-[70px] bg-trasparent"
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
// Import funzioni di gestione della mappa.
import {
    map,
    pointOfInterest,
    geojsonMarkerOptions,
    geojsonMarkerOptionsHistoricalBuilding,
    geojsonMarkerOptionsPark,
    geojsonMarkerOptionsTheater,
    geojsonMarkerOptionsMuseum,
    geojsonMarkerOptionsDepartment,
    generatorPopupInfo
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
        let marker = ref(null);
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
                const geojson = leaflet.geoJson(pointOfInterest, {
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
                marker = geojson;
                infoPointOfInterestState.value = !infoPointOfInterestState.value;
            } else {
                map.removeLayer(marker);
                resetNodeInfo()
                infoPointOfInterestState.value = !infoPointOfInterestState.value;
            }
        };

        const modifyPOI = () => {
            poiModifyState.value = !poiModifyState.value;
        };

        const closePostModifyPOIModal = (name, rank, category) => {
            nodeInfo.value.name = name;
            nodeInfo.value.rank = rank;
            nodeInfo.value.category = category;
            poiModifyState.value = false;
            // Aggiornamento 
        };

        const closeModifyPOIModal = () => {
            poiModifyState.value = false;
        };

        const removePOI = () => {
            nodeInfo = ref(
                {
                    id: "_",
                    name: "_",
                    category: "_",
                    rank: "_",
                    latitude: "_",
                    longitude: "_"
                }
            );
        };

        const addPOIState = ref(false);
        const coordsNewPOI = ref({ lat: 0, lng: 0 });

        const showAddPOIModal = (coordsNewPOIs) => {
            coordsNewPOI.value = coordsNewPOIs._rawValue;
            console.log("showAddPOIModal");
            addPOIState.value = !addPOIState.value;
        };

        const closeAddPOIModal = () => {
            console.log("HomeView - closeAddPOIModal executed");
            addPOIState.value = false;
        }

        const switchClusteringShow = ref(false);

        const switchClustering = () => {
            switchClusteringShow.value = !switchClusteringShow.value;
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


        };

        const switchHeatMap = () => {
            switchHeatMapShow.value = !switchHeatMapShow.value;
        };



        const reloadHeatMap = () => {

            // legendComponentHeatmap.value.addHeatMap();
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
            removePOI
        };
    },
};
</script>