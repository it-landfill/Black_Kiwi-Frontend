<template>
    <div class="absolute bottom-0 left-0 w-full">
        <!-- Caratteristiche principali del pannello -->
        <div class="h-auto px-4 py-4 bg-white rounded-md shadow-lg">
            <!-- Titolo del pannello -->
            <h1 class="text-xl"> Pannello di controllo </h1>

            <!-- Informazioni sull'utente attualmente attivo -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <p> Username </p>
                </div>
            </div>


            <!-- Primo toggle: Visualizzazione punti di interesse. -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex min-h-[45px] max-w-[45px] items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoShowPOIState }" @click="switchShowPOI">
                        <i class="fas fa-location-arrow text-state-600 text-[20px]"
                            :class="{ 'text-white': infoShowPOIState }"></i>
                    </div>
                    <p> Visualizzazione punti di interesse. </p>
                </div>
            </div>

            <!-- Secondo toggle: Aggiunta punto di interesse. -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex min-h-[45px] max-w-[45px] items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoAddPOIState }" @click="switchAddPOI">
                        <i class="fa-solid fa-plus text-state-600 text-[20px]"
                            :class="{ 'text-white': infoAddPOIState }"></i>
                    </div>
                    <p> Aggiunta punto di interesse. </p>
                </div>
            </div>

            <!-- Terzo toggle: Visualizzazione heat-map -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex min-h-[45px] max-w-[45px] items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoHeatMapState }" @click="switchHeatMap">
                        <i class="fa-solid fa-location-crosshairs text-state-600 text-[20px]"
                            :class="{ 'text-white': infoHeatMapState }" />
                    </div>
                    <p>
                        Visualizzazione heat-map.
                    </p>
                </div>
            </div>

            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <p>Heatmap selector</p>
                    <select id="typeHeatMap" @change="selectItem"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected="selected" value="Distretti">Distretti</option>
                        <option value="Densità">Densità</option>
                        <option value="Check">Check-in</option>
                    </select>
                </div>
            </div>

            <!-- Quarto toggle: Clustering dei dati registrati. -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex min-h-[45px] max-w-[45px] items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoClusteringMapState }" @click="switchClustering">
                        <i class="fa-solid fa-circle-nodes text-state-600 text-[20px]"
                            :class="{ 'text-white': infoClusteringMapState }"></i>
                    </div>
                    <p> Clustering dei dati registrati. </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// Import della funzioni ref di vue in "MapFeatures"
import { ref } from "vue";
import {
    map, 
    setLayerSelected
} from "@/components/js/dataLeaflet.js"


export default {
    // Nominativo del component
    name: 'toggleComponent',
    emits: ["switchShowPOI", "switchAddPOI", "switchHeatMap", "switchClustering", "reloadHeatMap"],
    setup(_, { emit }) {

        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const infoShowPOIState = ref(false);
        const infoAddPOIState = ref(false);
        const infoHeatMapState = ref(false);
        const infoClusteringMapState = ref(false);

        const switchShowPOI = () => {
            console.log("toggleComponent - switchShowPOI clicked");
            infoShowPOIState.value = !infoShowPOIState.value;
            emit("switchShowPOI");
        };

        const switchAddPOI = () => {
            console.log("toggleComponent - switchAddPOI clicked");
            infoAddPOIState.value = !infoAddPOIState.value;
            emit("switchAddPOI");
        };

        const switchHeatMap = () => {
            console.log("toggleComponent - switchHeatMap clicked");
            infoHeatMapState.value = !infoHeatMapState.value;
            if (!infoHeatMapState.value) {
                removeHeatMap();
            }
            selectItem();
            emit("switchHeatMap");
        };

        const switchClustering = () => {
            console.log("toggleComponent - switchClustering clicked");
            infoClusteringMapState.value = !infoClusteringMapState.value;
            emit("switchClustering");
        };

        function removeHeatMap() {
            map.eachLayer(function (layer) {
                if (layer.options && layer.options.fillColor) {
                    map.removeLayer(layer);
                }
            });
        }

        const selectItem = () => {
            var e = document.getElementById("typeHeatMap");
            setLayerSelected(e.options[e.selectedIndex].value);
            console.log(e.options[e.selectedIndex].value);
            emit("reloadHeatMap");
        }


        return {
            infoShowPOIState,
            infoHeatMapState,
            infoAddPOIState,
            infoClusteringMapState,
            selectItem,
            switchShowPOI,
            switchAddPOI,
            switchHeatMap,
            switchClustering
        };
    },
};
</script>
