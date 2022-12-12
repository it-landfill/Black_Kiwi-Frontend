<template>
    <!-- Components di sinistra -->
    <div class="w-full max-w-[375px] min-h-[93%] absolute z-[4] flex flex-col top-[50px] left-[70px] bg-trasparent">

        <toggleComponent 
            @getInfoPoIData="getInfoPoIData"
            @checkPoICategory="checkPoICategory" 
            @uncheckPoICategory="uncheckPoICategory"

            @showUserModal="showUserModal"
            :showUser="showUser"
            
            @showAddModal="showAddModal" 

            @showClusterModal="showClusterModal" 
            @showError="showError"
            
            @switchHeatMap="switchHeatMap" 
            @reloadHeatMap="reloadHeatMap"
        />
            
        <AddPOIModal 
            v-if="addModalVisible" 
            @addPoI="addPoI"
            @closeAddModal="closeAddModal" 
            @showError="showError"
            :coordsNewPOI="coordsNewPOI"
        />
            
        <infoBlockComponent 
            v-if="infoModalVisible" 
            @showModifyModal="showModifyModal" 
            @removePOI="removePOI"
            :nodeInfo="nodeInfo" 
        />

        <ModifyPOIModal 
            v-if="modifyModalVisible" 
            @modifyPoIData="modifyPoIData"
            @closeModifyPOIModal="closeModifyPOIModal" 
            :nodeInfo="nodeInfo" 
        />

        <userModal 
            v-if="userModalVisible" 
            @getInfoLocationUser="getInfoLocationUser"
            @closeUserModal="closeUserModal" 
            @showError="showError"
        />

        <clusterModal 
            v-if="clusterModalVisible"  
            @showCluster="showCluster"
            @closeClusterModal="closeClusterModal"
            @showError="showError"
        />


        <errorModal 
            v-if="errorVisible" 
            @closeErrorModal="closeErrorModal" 
            :titleErrorModal="titleErrorModal"
            :messageErrorModal="messageErrorModal" 
        />

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
import infoBlockComponent from "./featureComponent/infoComponent.vue";
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
    layerSelected,
    clusterLocation,
    geojsonMarkerOptionsCluster
} from "@/components/js/dataLeaflet.js"

import toggleComponent from "./featureComponent/toggleComponent.vue";
import legendComponent from "./featureComponent/legendComponent.vue";
import errorModal from "@/components/errorModal/errorModal.vue";
import ModifyPOIModal from "@/components/formModal/modifyModal.vue";
import AddPOIModal from "@/components/formModal/addModal.vue";
import clusterModal from "@/components/formModal/clusterModal.vue";
import userModal from "@/components/formModal/userModal.vue";

export default {
    // Nominativo del component
    name: 'MapFeatures',
    components: {
        AddPOIModal,
        infoBlockComponent,
        toggleComponent,
        legendComponent,
        errorModal,
        ModifyPOIModal,
        clusterModal,
        userModal
    },
    props: ["coordsMapFeatures", "fetchCoordsMapFeatures"],
    emits: [],
    setup() {

        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const switchHeatMapShow = ref(false);

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

        //////////////////////////// SHOW USER ////////////////////////////

        // Dichiarazione delle variabili di memorizzazione dei dati leaflet relativi alle posizione degli utenti nella mappa.
        let markerUser;
        // Variabile di stato per la gestione dei toggle relativo alla visualizzazione della posizione degli utenti.
        const showUser = ref(false);

        // Dati per la visualizzazione dei risultati della richiesta di cluster.
        const userModalVisible = ref(false);
      

        // Funzione di elaborazione dei dati per la visualizzazione dei risultati della richiesta di posizione degli utenti.
        const getInfoLocationUser = () => {
            console.log("showUser",showUser.value);
            console.debug("userLocation", userLocation);
            if (showUser.value) {
                closeUserModal();
                markerUser = leaflet.geoJson(userLocation, {
                    // Impostazione dello stile dei marker (impostazione della posizione geospaziale e dell'icona).
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
                    // Impostazione dello stile per il popup.
                    onEachFeature: function (feature, layer) {
                        let customPopup = generatorPopupUserInfo(feature);
                        layer.bindPopup(customPopup.content, customPopup.style);
                    }
                }).addTo(map);
            } else map.removeLayer(markerUser);
        };

        // Funzione di chiusura della modal della richiesta di cluster.
        const closeUserModal = () => {
            showUser.value = false;
            userModalVisible.value = !userModalVisible.value;
        };
        
        // Funzione di apertura della modal della richiesta di cluster.
        const showUserModal = () => {
            showUser.value = true;
            userModalVisible.value = true;
        };

        //////////////////////////// ADD PoI /////////////////////////////

        const addModalVisible = ref(false);
        const coordsNewPOI = ref({ lat: 0, lng: 0 });

        // Funzione di ottenimento delle coordinate del punto di interesse da aggiungere e di apertura del modal.
        const showAddModal = (coordsNewPOIs) => {
            coordsNewPOI.value = coordsNewPOIs._rawValue;
            addModalVisible.value = !addModalVisible.value;
        };

        const closeAddModal = () => {
            addModalVisible.value = false;
        }

        const addPoI = (obj) => {
            addModalVisible.value = false;
            if (infoModalVisible.value) {
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
                markerPoI.addLayer(leaflet.geoJson(newPOI, {
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

        /////////////////////////// SHOW PoI ////////////////////////////

        // Dichiarazione delle variabili di memorizzazione dei dati leaflet relativi a PoI aggiunti nella mappa.
        let markerPoI; 

        // Funzione di elaborazione dei dati per la visualizzazione dei risultati della richiesta di PoI.
        const getInfoPoIData = () => {
            if (!infoModalVisible.value) {
                markerPoI = leaflet.geoJson(pointOfInterest, {
                    // Impostazione dello stile dei marker (impostazione della posizione geospaziale e dell'icona).
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
                    // Impostazione dello stile per il popup.
                    onEachFeature: function (feature, layer) {
                        let customPopup = generatorPopupInfo(feature);
                        layer.bindPopup(customPopup.content, customPopup.style);
                        // Aggiunta di un listener per la gestione del click sul marker.
                        layer.on('click', function () {
                            // Impostazione della variabile di stato per la visualizzazione delle informazioni 
                            // relative al PoI cliccato.
                            nodeInfo.value.name = feature.properties.name;
                            nodeInfo.value.id = feature.properties.id;
                            nodeInfo.value.category = feature.properties.category;
                            nodeInfo.value.rank = feature.properties.rank;
                            nodeInfo.value.latitude = feature.geometry.coordinates[1].toFixed(8);
                            nodeInfo.value.longitude = feature.geometry.coordinates[0].toFixed(8);
                            // Attivazione dei bottoni di modifica ed eliminazione
                            document.getElementById("modifyButtonModal").disabled = false;
                            document.getElementById("deleteButtonModal").disabled = false;
                        });
                    }
                }).addTo(map);
            } else {
                map.removeLayer(markerPoI);
                resetNodeInfo()
            }
            infoModalVisible.value = !infoModalVisible.value;
        };

        // Funzione di aggiunta dei marker PoI di una data categoria alla mappa.
        const checkPoICategory = (category) => {
            markerPoI.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.category === category) map.addLayer(layer);
            });
        };

        // Funzione di rimozione dei marker PoI di una data categoria dalla mappa.
        const uncheckPoICategory = (category) => {
            markerPoI.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.category === category) map.removeLayer(layer);
            });
        };

        ///////////////////////////// INFO /////////////////////////////

        // Dichiarazione delle variabili di visualizzazione del blocco di informazione di un PoI 
        // e di modifica.
        const infoModalVisible = ref(false);
        const modifyModalVisible = ref(false);
        // Variabile di stato delle informazioni relative al PoI cliccato.
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

        // Funzione di eliminazione del PoI selezionato.
        const removePOI = (id) => {
            // Rimozione del PoI dalla mappa e dalla variabile di stato.
            markerPoI.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.id === id) {
                    map.removeLayer(layer);
                    markerPoI.removeLayer(layer);
                }
            });
            resetNodeInfo();
        };
        
        // Funzione di modifica delle informazioni relative al PoI selezionato.
        const modifyPoIData = (name, rank, category) => {
            modifyModalVisible.value = false;
            // Aggiornamento delle informazioni relative al PoI modificato.
            nodeInfo.value.name = name;
            nodeInfo.value.rank = rank;
            nodeInfo.value.category = category;
            // Aggiormento delle informazioni relative al PoI modificato.
            markerPoI.eachLayer(function (layer) {
                if (layer.feature && layer.feature.properties.id === nodeInfo.value.id) {
                    layer.feature.properties.name = name;
                    layer.feature.properties.rank = rank;
                    layer.feature.properties.category = category;
                }
            });
            // Aggiornamento delle informazioni relative al PoI modificato nella mappa.
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
                    // Aggiormento del popup del PoI modificato.
                    layer.openPopup();
                }
            });
        };

        // Funzione di visualizzazione del blocco di modfica del PoI selezionato.
        const showModifyModal = () => {
            modifyModalVisible.value = true;
        };

        // Funzione di chiusura del blocco di modifica del PoI selezionato.
        const closeModifyPOIModal = () => {
            modifyModalVisible.value = false;
        };

        // Funzione di reset delle informazioni relative al PoI cliccato.
        function resetNodeInfo() {
            // Override dei valori delle variabili di stato delle informazioni relative al PoI cliccato.
            nodeInfo.value = {
                id: "_",
                name: "_",
                category: "_",
                rank: "_",
                latitude: "_",
                longitude: "_"
            }
            // Disattivazione dei bottoni di modifica ed eliminazione
            document.getElementById("modifyButtonModal").disabled = true;
            document.getElementById("deleteButtonModal").disabled = true;
        }

        /////////////////////////// CLUSTER //////////////////////////// 
        
        // Dati per la visualizzazione dei risultati della richiesta di cluster.
        const clusterModalVisible = ref(false);
        // Dichiarazione delle variabili di memorizzazione dei dati leaflet relativi alle posizione degli utenti nella mappa.
        let markerCluster;
        // Variabile di stato per la gestione dei toggle relativo alla visualizzazione della posizione degli utenti.
        const toggleClusterStatus = ref(false);
        
        // Funzione di elaborazione dei dati per la visualizzazione dei risultati della richiesta di cluster.
        const showCluster = () => {
            closeClusterModal();
        
            if (toggleClusterStatus.value) {
                // Ottenimento del numero di cluster.
                let maxClusterID = 0;
                console.debug(clusterLocation[0].properties.clusterID);
                clusterLocation.forEach(element => {
                    if (element.properties.clusterID > maxClusterID) maxClusterID = element.properties.clusterID;
                });
                // L'enumerazione dei cluster parte da 0.
                maxClusterID += 1;
                console.log(maxClusterID);
                markerCluster = leaflet.geoJson(clusterLocation, {
                    // Impostazione dello stile dei marker (impostazione della posizione geospaziale e dell'icona).
                    pointToLayer: function (feature, latlng) {
                        return leaflet.circleMarker(latlng, geojsonMarkerOptionsCluster(feature.properties.clusterID, maxClusterID));
                    },
                    // Impostazione dello stile per il popup.
                    onEachFeature: function (feature, layer) {
                        let customPopup = generatorPopupUserInfo(feature);
                        layer.bindPopup(customPopup.content, customPopup.style);
                    }
                }).addTo(map);
            } else map.removeLayer(markerCluster);
            toggleClusterStatus.value = !toggleClusterStatus.value;
        };
        
        // Funzione di chiusura della modal della richiesta di cluster.
        const closeClusterModal = () => {
            clusterModalVisible.value = false;
        };
        
        // Funzione di apertura della modal della richiesta di cluster.
        const showClusterModal = () => {
            toggleClusterStatus.value = !toggleClusterStatus.value;
            if (toggleClusterStatus.value) 
                clusterModalVisible.value = true;
        };
        
        //////////////////////////// ERROR /////////////////////////////
        
        // Dati per la visualizzazione del messaggio di errore.
        const titleErrorModal = ref(null);
        const messageErrorModal = ref(null);
        const errorVisible = ref(false);
        
        // Funzione per la visualizzazione del messaggio di errore.
        const showError = (titleError, messageError) => {
            titleErrorModal.value = titleError;
            messageErrorModal.value = messageError;
            errorVisible.value = true;
        };

        // Funzione per la chiusura del messaggio di errore.
        const closeErrorModal = () => {
            errorVisible.value = false;
        };

        /////////////////////////////////////////////////////////////

        return {
            switchHeatMapShow,
            coordsNewPOI,
            nodeInfo,
            modifyModalVisible,
            addModalVisible,
            modifyPoIData,
            closeAddModal,
            showAddModal,
            getInfoPoIData,
            switchAddPOI,
            switchHeatMap,
            showModifyModal,
            reloadHeatMap,
            closeModifyPOIModal,
            removePOI,
            checkPoICategory,
            uncheckPoICategory,
            addPoI,
            
            
            
            showUser,
            userModalVisible,
            closeUserModal,
            showUserModal,
            getInfoLocationUser,

            infoModalVisible,
            
            showCluster,
            clusterModalVisible,
            closeClusterModal,
            showClusterModal,
            
            showError,
            errorVisible,
            titleErrorModal,
            messageErrorModal,
            closeErrorModal,
        };
    },
};
</script>