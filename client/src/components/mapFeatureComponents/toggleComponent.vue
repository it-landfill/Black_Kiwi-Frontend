<template>
    <div class="absolute bottom-0 left-0 w-full">
        <!-- Caratteristiche principali del pannello -->
        <div class="h-auto px-4 py-4 bg-white rounded-md shadow-lg">

            <h1 class="text-xl"> Informazioni utente </h1>

            <!-- Informazioni sull'utente attualmente attivo -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4 min-w-full min-h-[40px]">
                    <p> Username: {{ username }} </p>
                    <div class="flex aspect-square items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        @click="logout">
                        <i class="fa fa-sign-out text-state-600 text-[18px]"></i>
                    </div>
                </div>
            </div>

            <!-- Titolo del pannello -->
            <h1 class="text-xl"> Pannello di controllo </h1>

            <!-- Primo toggle: Visualizzazione punti di interesse. -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex aspect-square items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoShowPOIState }" @click="switchShowPOI">
                        <i class="fas fa-location-arrow text-state-600 text-[18px]"
                            :class="{ 'text-white': infoShowPOIState }"></i>
                    </div>
                    <p> Visualizzazione punti di interesse. </p>
                </div>
            </div>

            <div class="flex-col space-y-2 mx-8 pt-3 " v-if="showSelectPOI">
                <div class="flex items-center gap-7">
                    <input id="Historical Building" name="category" type="checkbox" checked="checked"
                        value="Historical Building" @change="checkEvent($event, 'Historical Building')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Historical Building" class="text-slate-700"> Historical Building </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Park" name="category" type="checkbox" checked="checked" value="Park"
                        @change="checkEvent($event, 'Park')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Park" class="text-slate-700"> Park </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Theater" name="category" type="checkbox" checked="checked" value="Theater"
                        @change="checkEvent($event, 'Theater')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Theater" class="text-slate-700"> Theater </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Museum" name="category" type="checkbox" checked="checked" value="Museum"
                        @change="checkEvent($event, 'Museum')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Museum" class="text-slate-700"> Museum </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Department" name="category" type="checkbox" checked="checked" value="Department"
                        @change="checkEvent($event, 'Department')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Department" class="text-slate-700"> Department </p>
                </div>
            </div>

            <!-- Secondo toggle: Visualizzazione punti di interesse. -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex aspect-square items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoShowUser }" @click="switchShowUser">
                        <i class="fa-solid fa-street-view text-state-600 text-[18px]"
                            :class="{ 'text-white': infoShowUser }"></i>
                    </div>
                    <p> Visualizzazione delle richieste effettuate dagli utenti. </p>
                </div>
            </div>

            <!-- Terzo toggle: Aggiunta punto di interesse. -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex aspect-square items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoAddPOIState }" @click="switchAddPOI">
                        <i class="fa-solid fa-plus text-state-600 text-[18px]"
                            :class="{ 'text-white': infoAddPOIState }"></i>
                    </div>
                    <p> Aggiunta punto di interesse. </p>
                </div>
            </div>

            <!-- Quarto toggle: Visualizzazione heat-map -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex aspect-square items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoHeatMapState }" @click="switchHeatMap">
                        <i class="fa-solid fa-location-crosshairs text-state-600 text-[18px]"
                            :class="{ 'text-white': infoHeatMapState }" />
                    </div>
                    <p>
                        Visualizzazione heat-map.
                    </p>
                </div>
            </div>

            <div class="flex space-y-2 ml-[84px] mr-5 pt-3 " v-if="showSelectHeatMap">
                <div class="flex min-w-full min-h-fit items-center justify-between gap-4 ">
                    <select id="typeHeatMap" @change="selectItem"
                        class="form-select appearance-none w-full px-3 py-1 text-base text-white bg-slate-600 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0">
                        <option value="Distretti">Distretti</option>
                        <option selected="selected" value="Densità">Densità</option>
                        <option value="Check">Check-in</option>
                    </select>
                </div>
            </div>

            <!-- Quinto toggle: Clustering dei dati registrati. -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex aspect-square items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoClusteringMapState }" @click="switchClustering">
                        <i class="fa-solid fa-circle-nodes text-state-600 text-[18px]"
                            :class="{ 'text-white': infoClusteringMapState }"></i>
                    </div>
                    <p> Clustering dei dati registrati. </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// Import funzioni "ref" di vue.
import { ref, onUpdated, nextTick } from "vue";
// Import funzioni di gestione della mappa.
import {
    map,
    setPointOfInterest,
    setUserLocation,
    setLayerSelected
} from "@/components/js/dataLeaflet.js"
// Import funzioni di impostazione per POST e GET al server.
import {
    username,
    baseUri,
    poisFormat,
    userFormat,
    getToken,
    removeToken
} from "@/components/js/dataConnection.js"
// Import funzioni di reiniderizzazione nel sito.
import router from '@/router'

export default {
    name: 'toggleComponent',
    components: {},
    emits: [
        "switchShowPOI",
        "switchAddPOI",
        "switchHeatMap",
        "switchClustering",
        "showAddPOIModal",
        "reloadHeatMap",
        "addCategory",
        "removeCategory",
        "switchShowUser"
    ],
    setup(_, { emit }) {

        const logout = () => {
            var requestOptions = {
                method: "POST",
            };
            fetch(baseUri + "logout", requestOptions)
                .then(async response => {
                    await response.json();
                    switch (response.status) {
                        case 200:
                            removeToken();
                            router.push({ name: 'login' });
                            break;
                        case 400:
                            emit("login400");
                            break;
                        case 401:
                            emit("login401");
                            break;
                        case 404:
                            emit("login404");
                            break;
                        default:
                            emit("loginErrorGeneric");
                            break;
                    }
                })
                .catch(() => emit("loginErrorGeneric"));

        }

        let eventEmitted = 0;

        // Variabili di stato per i toggle.
        const infoShowPOIState = ref(false);
        const infoAddPOIState = ref(false);
        const showSelectPOI = ref(false);

        const switchShowPOI = () => {
            // Cambio stato del toggle.
            infoShowPOIState.value = !infoShowPOIState.value;
            if (infoShowPOIState.value) {
                // Impostazione del metodo POST e invio dei dati al server
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch(baseUri + "pois", requestOptions)
                    .then(async response => {
                        const data = await response.json();
                        const dataFormatted = data.map((item) => {
                            return poisFormat(item);
                        })
                        switch (response.status) {
                            case 200:
                                // Se la richiesta è andata a buon fine, vengono elaborati
                                // i dati ricevuti dal server e viene emesso il segnale per
                                // aggiornare la mappa.
                                setPointOfInterest(dataFormatted);
                                showSelectPOI.value = true;
                                getCheckBoxElem()
                                emit("switchShowPOI");
                                break;
                            case 400:
                                console.log("Errore 400: " + data.message);
                                // emit("login400");
                                break;
                            case 401:
                                console.log("Errore 401: " + data.message);
                                // emit("login401");
                                break;
                            case 404:
                                console.log("Errore 404: " + data.message);
                                // emit("login404");
                                break;
                            default:
                                console.log("Errore: " + data.message);
                                // emit("loginErrorGeneric");
                                break;
                        }
                    })
                    .catch(() => emit("loginErrorGeneric"));
            } else {
                // Se il toggle è stato disattivato, viene emesso il segnale per
                // rimuovere i POI dalla mappa.
                showSelectPOI.value = false;
                emit("switchShowPOI");
            }
            eventEmitted = 1;
        };

        let selectedCboxesId = [];

        async function checkEvent(event, idCheckBox) {
            if (event.target.checked) {
                selectedCboxesId.push(idCheckBox);
                emit("addCategory", idCheckBox);
            } else {
                selectedCboxesId = selectedCboxesId.filter((item) => item !== idCheckBox);
                emit("removeCategory", idCheckBox);
            }
        }

        async function getCheckBoxElem() {
            await nextTick();
            // Get all selected options
            const checkboxes = document.getElementsByName("category");
            const selectedCboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked == true);
            // Get only the id 
            selectedCboxesId = selectedCboxes.map(ch => ch.id);
        }

        const infoShowUser = ref(false);
        const switchShowUser = () => {
            infoShowUser.value = !infoShowUser.value;
            if (infoShowUser.value) {
                // Impostazione dell'header della richiesta di modifica.
                const myHeaders = new Headers();
                myHeaders.append('X-API-KEY', getToken());
                // Impostazione del metodo POST e invio dei dati al server
                let requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                };

                fetch(baseUri + "admin/getRequestLocations", requestOptions)
                    .then(async response => {
                        const data = await response.json();
                        const dataFormatted = data.map((item) => {
                            return userFormat(item);
                        })
                        switch (response.status) {
                            case 200:
                                // Se la richiesta è andata a buon fine, vengono elaborati
                                // i dati ricevuti dal server e viene emesso il segnale per
                                // aggiornare la mappa.
                                setUserLocation(dataFormatted);
                                emit("switchShowUser");
                                break;
                            case 400:
                                console.log("Errore 400: " + data.message);
                                // emit("login400");
                                break;
                            case 401:
                                console.log("Errore 401: " + data.message);
                                // emit("login401");
                                break;
                            case 404:
                                console.log("Errore 404: " + data.message);
                                // emit("login404");
                                break;
                            default:
                                console.log("Errore: " + data.message);
                                // emit("loginErrorGeneric");
                                break;
                        }
                    })
                    .catch(() => emit("loginErrorGeneric"));
            } else {
                // Se il toggle è stato disattivato, viene emesso il segnale per
                // rimuovere i POI dalla mappa.
                emit("switchShowUser");
            }
            eventEmitted = 1;
        };

        const coordsNewPOI = ref({ lat: null, lng: null });
        const addPOIState = ref(false);

        const switchAddPOI = () => {
            infoAddPOIState.value = !infoAddPOIState.value;
            if (infoAddPOIState.value) {
                document.getElementById('map').style.cursor = 'crosshair'
                map.on('click',
                    function (event) {
                        var coord = event.latlng.toString().split(',');
                        coordsNewPOI.value.lat = coord[0].split('(')[1];
                        coordsNewPOI.value.lng = coord[1].split(')')[0];
                        addPOIState.value = true;
                        emit("showAddPOIModal", coordsNewPOI);
                    });
            } else {
                document.getElementById('map').style.cursor = ''
                map.off('click');
            }
            eventEmitted = 1;
        };

        const infoHeatMapState = ref(false);
        const showSelectHeatMap = ref(false);

        const switchHeatMap = () => {
            showSelectHeatMap.value = !showSelectHeatMap.value;
            infoHeatMapState.value = !infoHeatMapState.value;
            eventEmitted = 0;
        };

        function removeHeatMap() {
            map.eachLayer(function (layer) {
                if (layer.options && layer.options.fillColor) {
                    map.removeLayer(layer);
                }
            });
        }

        const selectItem = () => {
            let e = document.getElementById("typeHeatMap");
            setLayerSelected(e.options[e.selectedIndex].value);
            emit("reloadHeatMap");
        }

        onUpdated(() => {
            if (eventEmitted == 0) {
                if (!infoHeatMapState.value) removeHeatMap();
                else selectItem();
                emit("switchHeatMap");
            }
        })

        /////////////////////////////!!

        const infoClusteringMapState = ref(false);

        const switchClustering = () => {
            console.log("toggleComponent - switchClustering clicked");
            infoClusteringMapState.value = !infoClusteringMapState.value;
            emit("switchClustering");
        };

        return {
            username,
            coordsNewPOI,
            infoShowPOIState,
            infoShowUser,
            infoHeatMapState,
            infoAddPOIState,
            infoClusteringMapState,
            showSelectHeatMap,
            showSelectPOI,
            logout,
            selectItem,
            switchShowUser,
            switchShowPOI,
            switchAddPOI,
            switchHeatMap,
            switchClustering,
            checkEvent
        };
    },
};
</script>
