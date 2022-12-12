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
                        :class="{ 'bg-slate-600': showPoI }" @click="getInfoPoIData">
                        <i class="fas fa-location-arrow text-state-600 text-[18px]"
                            :class="{ 'text-white': showPoI }"></i>
                    </div>
                    <p> Visualizzazione punti di interesse. </p>
                </div>
            </div>

            <div class="flex-col space-y-2 mx-8 pt-3 " v-if="showSelectorPoi">
                <div class="flex items-center gap-7">
                    <input id="Historical Building" name="category" type="checkbox" checked="checked"
                        value="Historical Building" @change="selectorPushPop($event, 'Historical Building')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Historical Building" class="text-slate-700"> Historical Building </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Park" name="category" type="checkbox" checked="checked" value="Park"
                        @change="selectorPushPop($event, 'Park')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Park" class="text-slate-700"> Park </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Theater" name="category" type="checkbox" checked="checked" value="Theater"
                        @change="selectorPushPop($event, 'Theater')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Theater" class="text-slate-700"> Theater </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Museum" name="category" type="checkbox" checked="checked" value="Museum"
                        @change="selectorPushPop($event, 'Museum')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Museum" class="text-slate-700"> Museum </p>
                </div>
                <div class="flex items-center gap-7">
                    <input id="Department" name="category" type="checkbox" checked="checked" value="Department"
                        @change="selectorPushPop($event, 'Department')"
                        class="w-6 h-6 focus:ring-slate-600 text-slate-600 border-gray-300 accent-slate-600">
                    <p for="Department" class="text-slate-700"> Department </p>
                </div>
            </div>

            <!-- Secondo toggle: Visualizzazione utenti -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex aspect-square items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': showUser.value }" @click="getInfoLocationUser">
                        <i class="fa-solid fa-street-view text-state-600 text-[18px]"
                            :class="{ 'text-white': showUser.value }"></i>
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
                        :class="{ 'bg-slate-600': infoClusteringMapState }" @click="showClusterModal">
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
    setPoIData,
    setLayerSelected
} from "@/components/js/dataLeaflet.js"
// Import funzioni di impostazione per POST e GET al server.
import {
    username,
    baseUri,
    poisFormat,
    removeToken
} from "@/components/js/dataConnection.js"
// Import funzioni di reiniderizzazione nel sito.
import router from '@/router'

export default {
    name: 'toggleComponent',
    props: [
        "showUser" 
    ],
    components: {},
    emits: [
        "getInfoPoIData",
        "switchHeatMap",
        "showClusterModal",
        "showAddModal",
        "reloadHeatMap",
        "checkPoICategory",
        "uncheckPoICategory",
        "getInfoLocationUser",
        "showError",
        "showUserModal",
        "closeUserModal"
    ],
    setup(props, { emit }) {

        //////////////////////////// FUNZIONI PER LA GESTIONE DELLA VISUALIZZAZIONE PoI /////////////////////////////

        // Variabile di stato per la gestione dei toggle relativo alla visualizzazione dei PoI.
        const showPoI = ref(false);
        // Variabile di stato per la gestione dei toggle relativo alla visualizzazione del selettore 
        // per le categorie dei PoI.
        const showSelectorPoi = ref(false);
        // Variabile di stato per la gestione per le categorie di PoI da visualizzare sulla mappa.
        let selectedCategoryPoI = [];
        // Variabile di memorizzazione dei dati ottenuti dal server.
        let dataRaw;
        let dataFormatted;

        // Funzione di acquisizione dei dati relativi ai PoI.
        const getInfoPoIData = () => {
            if (!showPoI.value) {
                // Impostazione del metodo GET e invio dei dati al server
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                let titleError;
                let messageError;
                fetch(baseUri + "pois", requestOptions)
                    .then(async response => {
                        switch (response.status) {
                            case 200:
                                // Se la richiesta è andata a buon fine, vengono elaborati
                                // i dati ricevuti dal server e viene emesso il segnale per
                                // aggiornare la mappa.
                                dataRaw = await response.json();
                                dataFormatted = dataRaw.map((item) => {
                                    return poisFormat(item);
                                })
                                showPoI.value = true;
                                showSelectorPoi.value = true;
                                // Memorizzazione dei dati ottenuti dal server.
                                setPoIData(dataFormatted);
                                // Inizializzazione delle categorie dei PoI visualizzate
                                initSelectorPoI();
                                // Cambio stato del toggle.
                                emit("getInfoPoIData");
                                break;
                            case 400:
                                titleError = "Errore 400 - Richiesta errata";
                                messageError = "La richiesta non è stata eseguita a causa di un errore sintattico.";
                                emit("showError", titleError, messageError);
                                break;
                            case 500:
                                titleError = "Errore 500 - Server Error";
                                messageError = "Si è verificato un errore interno al server. Riprovare più tardi.";
                                emit("showError", titleError, messageError);
                                break;
                            default:
                                titleError = "Errore sconosciuto";
                                messageError = "Si è verificato un errore sconosciuto. Riprovare più tardi.";
                                emit("showError", titleError, messageError);
                                break;
                        }
                    })
                    .catch(() => emit("loginErrorGeneric"));
            } else {
                // Se il toggle è stato disattivato, viene emesso il segnale per rimuovere i POI dalla mappa.
                showPoI.value = false;
                showSelectorPoi.value = false;
                emit("getInfoPoIData");
            }

            eventEmitted = 1;
        };

        // Inizializzazione dei dati relativi alle categorie selezionate per la visualizzazione dei PoI.
        async function initSelectorPoI() {
            await nextTick();
            // Ottenimento e formattazione dei dati relativi alle categorie dei PoI da HTML.
            const checkBoxDataRaw = document.getElementsByName("category");
            const selectedCheckBoxData = Array.prototype.slice.call(checkBoxDataRaw).filter(ch => ch.checked == true);
            // Filtro delle informazioni. 
            selectedCategoryPoI = selectedCheckBoxData.map(checkboxElem => checkboxElem.id);
        }

        // Funzione di aggiornamento dei dati relativi alle categorie selezionate per la visualizzazione dei PoI.
        async function selectorPushPop(event, idCheckBox) {
            await nextTick();
            // Aggiunta o rimozione della categoria selezionata o deselezionata dalla lista.
            if (event.target.checked) {
                selectedCategoryPoI.push(idCheckBox);
                emit("checkPoICategory", idCheckBox);
            } else {
                selectedCategoryPoI = selectedCategoryPoI.filter((item) => item !== idCheckBox);
                emit("uncheckPoICategory", idCheckBox);
            }
        }

        //////////////////// FUNZIONI PER LA GESTIONE DELLE POSIZIONI UTENTI ///////////////////////

        // Funzione di acquisizione dei dati relativi alla posizione degli utenti.
        const getInfoLocationUser = () => {
            if(!props.showUser) emit("showUserModal");
            else emit("closeUserModal");
            eventEmitted = 1;
        };

        //////////////////// FUNZIONI PER LA GESTIONE DELL'AGGIUNTA DEI PoI ///////////////////////

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
                        emit("showAddModal", coordsNewPOI);
                    });
            } else {
                document.getElementById('map').style.cursor = ''
                map.off('click');
            }
            eventEmitted = 1;
        };

        ////////////////////////// FUNZIONI PER LA GESTIONE DELLE HEATMAP //////////////////////////



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
        const infoAddPOIState = ref(false);
        

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
                else {
                    let e = document.getElementById("typeHeatMap");
                    setLayerSelected(e.options[e.selectedIndex].value);
                }
                emit("switchHeatMap");
            }
        })

        /////////////////////////////!!

        const infoClusteringMapState = ref(false);

        const showClusterModal = () => {
            infoClusteringMapState.value = !infoClusteringMapState.value;
            emit("showClusterModal");
            eventEmitted = 1;
        };

        return {
            username,
            coordsNewPOI,
            showPoI,
            infoHeatMapState,
            infoAddPOIState,
            infoClusteringMapState,
            showSelectHeatMap,
            showSelectorPoi,
            logout,
            selectItem,
            getInfoLocationUser,
            getInfoPoIData,
            switchAddPOI,
            switchHeatMap,
            showClusterModal,
            selectorPushPop
        };
    },
};
</script>
