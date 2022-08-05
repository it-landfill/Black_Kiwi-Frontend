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
                        :class="{ 'bg-slate-600': infoUserGeolocation }" @click="switchUserGeolocation">
                        <i class="fas fa-location-arrow text-state-600 text-[20px]"
                            :class="{ 'text-white': infoUserGeolocation }"></i>
                    </div>
                    <p> Posizione attuale dell'utente. </p>
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
export default {
    props: ["switchUserPositionState", "infoUserGeolocation", "infoLegendState"],
    emits: ["switchUserGeolocation", "switchLegend", "switchUserPosition"],
    setup(_, { emit }) {

        const switchUserGeolocation = () => {
            console.log("Premuto il bottone per la geolocalizzazione.");
            emit("switchUserGeolocation");
        };

        const switchLegend = () => {
            console.log("Premuto il bottone per la heatmap.");
            emit("switchLegend");
        };
        const switchUserPosition = () => {
            console.log("Premuto il bottone per visualizzare la posizione degli utenti.");
            emit("switchUserPosition");
        };

        return { switchUserGeolocation, switchLegend, switchUserPosition };
    },
};
</script>