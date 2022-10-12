<!-- 
    Template per la componente "toogleComponent".
    La componente permette di gestire l'overlay per i principali pulsanti di controllo delle 
    funzionalità di visualizzazione della mappa.
-->
<template>
    <div class="absolute bottom-0 left-0 w-full">
        <!-- Caratteristiche principali del pannello -->
        <div class="h-auto px-4 py-4 bg-white rounded-md shadow-lg">
            <!-- Titolo del pannello -->
            <h1 class="text-xl"> Toggle Area </h1>

            <!-- Primo toggle -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex min-h-[45px] max-w-[45px] items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoPOIState }" @click="switchPOI">
                        <i class="fas fa-location-arrow text-state-600 text-[20px]"
                            :class="{ 'text-white': infoPOIState }"></i>
                    </div>
                    <p> Visualizzazione punti di interesse. </p>
                </div>
            </div>

            <!-- Secondo toggle -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex min-h-[45px] max-w-[45px] items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': infoLegendState }" @click="switchLegend">
                        <i class="fa-solid fa-location-crosshairs text-state-600 text-[20px]"
                            :class="{ 'text-white': infoLegendState }" />
                    </div>
                    <p>
                        Visualizzazione heat-map.
                    </p>
                </div>
            </div>

            <!-- Terzo toggle -->
            <div class="flex space-y-2 mx-5 pt-3 ">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex min-h-[45px] max-w-[45px] items-center align-middle shadow-md rounded-md px-4 bg-white cursor-pointer"
                        :class="{ 'bg-slate-600': switchUserPositionState }" @click="switchUserPosition">
                        <i class="fa-solid fa-street-view text-state-600 text-[20px]"
                            :class="{ 'text-white': switchUserPositionState }"></i>
                    </div>
                    <p> Posizione utenti aderente al servizio. </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// Import della funzioni ref di vue in "MapFeatures"
import { ref } from "vue";
export default {
    // Nominativo del component
    name: 'toggleComponent',
    props: ["switchUserPositionState", "switchPOIState", "infoLegendState"],
    emits: ["switchPOI", "switchLegend", "switchUserPosition"],
    setup(_, { emit }) {

        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const infoPOIState = ref(false);

        const switchPOI = () => {
            console.log("toggleComponent - switchPOI clicked");
            infoPOIState.value = !infoPOIState.value;
            emit("switchPOI");
        };

        const switchLegend = () => {
            console.log("Premuto il bottone per la heatmap.");
            emit("switchLegend");
        };
        const switchUserPosition = () => {
            console.log("Premuto il bottone per visualizzare la posizione degli utenti.");
            emit("switchUserPosition");
        };

        return { infoPOIState, switchPOI, switchLegend, switchUserPosition };
    },
};
</script>