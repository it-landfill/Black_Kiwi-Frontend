<!-- 
    Template per la componente "MapFeatures".
    La componente permette di gestire l'overlay della mappa.
-->
<template>
    <!-- Components di sinistra -->
    <div class="w-full max-w-[375px] min-h-[90%] absolute z-[4] flex flex-col top-[50px] left-[70px] bg-trasparent">
        <!-- 
            Richiamo alla componente "infoBlockComponent".
        -->
        <infoBlockComponent />
        <!-- 
            Richiamo alla componente "searchBarComponent".
        -->
        <searchBarComponent :coordsMapFeatures="coordsMapFeatures" :fetchCoordsMapFeatures="fetchCoordsMapFeatures" />
        <!-- 
            Richiamo alla componente "toggleComponent".
        -->
        <toggleComponent @switchUserGeolocation="switchUserGeolocation" @switchLegend="switchLegend"
            :infoUserGeolocation="coordsMapFeatures" :infoLegendState="infoLegendState" />

    </div>
    <!-- Components di destra -->
    <div class="w-full max-w-[375px] min-h-[90%] absolute z-[4] flex flex-col top-[50px] right-[70px] bg-trasparent">
        <!-- 
            Richiamo alla componente "legendComponent".
        -->
        <legendComponent v-if="infoLegendState" />
    </div>
</template>

<script>
// Import della funzioni ref di vue in "MapFeatures"
import { ref } from "vue";
// Import delle componenti richiamate nel blocco <template>
import infoBlockComponent from "./infoBlockComponent.vue";
import searchBarComponent from "./searchBarComponent.vue";
import toggleComponent from "./toggleComponent.vue";
import legendComponent from "./legendComponent.vue";

export default {
    // Nominativo del component
    name: 'MapFeatures',
    components: {
        infoBlockComponent,
        searchBarComponent,
        toggleComponent,
        legendComponent,
    },
    props: ["coordsMapFeatures", "fetchCoordsMapFeatures"],
    emits: ["switchUserGeolocation"],
    setup(_, { emit }) {
        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const infoLegendState = ref(false);

        const switchLegend = () => {
            infoLegendState.value = !infoLegendState.value;
        };

        const switchUserGeolocation = () => {
            emit('switchUserGeolocation')
        };

        return { infoLegendState, switchLegend, switchUserGeolocation };
    },
};
</script>