<!-- 
    Template per la componente "MapFeatures".
    La componente permette di gestire l'overlay della mappa.
-->
<template>
    <!-- Components di sinistra -->
    <div class="w-full max-w-[375px] min-h-[90%] absolute z-[4] flex flex-col top-[50px] left-[70px] bg-trasparent">
        <!-- 
        Richiamo alla componente "ModifyPOIModal". 
            - v-if render condizionato dallo stato di un attributo.
            https://vuejs.org/api/built-in-directives.html#v-if
        -->
        <ModifyPOIModal v-if="poiModifyState" />
        <!-- 
            Richiamo alla componente "infoBlockComponent".
        -->
        <ErrorModal v-if="infoErrorState" @closeError="closeError" :infoErrorTitle="infoErrorTitle"
            :infoErrorMsg="infoErrorMsg" />
        <!-- 
            Richiamo alla componente "infoBlockComponent".
        -->
        <infoBlockComponent @modifySignal="switchPoiModifier" @removeSignal="removeSignal" />
        <!-- 
            Richiamo alla componente "searchBarComponent".
        -->
        <searchBarComponent :coordsMapFeatures="coordsMapFeatures" :fetchCoordsMapFeatures="fetchCoordsMapFeatures" />
        <!-- 
            Richiamo alla componente "toggleComponent".
        -->
        <toggleComponent @switchPOI="switchPOI" @switchLegend="switchLegend" :infoUserGeolocation="coordsMapFeatures"
            :infoLegendState="infoLegendState" />

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
import ErrorModal from "@/components/errorModal/genericErrorModal/ErrorModal.vue";
import ModifyPOIModal from "@/components/ModifyPOIModal.vue";

export default {
    // Nominativo del component
    name: 'MapFeatures',
    components: {
        infoBlockComponent,
        searchBarComponent,
        toggleComponent,
        legendComponent,
        ErrorModal,
        ModifyPOIModal,
    },
    props: ["coordsMapFeatures", "fetchCoordsMapFeatures"],
    emits: ["switchPOI", "modifySignal", "removeSignal"],
    setup(_, { emit }) {
        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const infoLegendState = ref(false);
        // Dichiarazione delle variabili di visualizzazione della finestra di errore.
        const infoErrorState = ref(false);
        const infoErrorTitle = ref("Errore nella pagina di visualizzazione della home.");
        const infoErrorMsg = ref("Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.");
        // Dichiarazione delle variabili per la gestione degla richiesta di modifica di un POI.
        const poiModifyState = ref(false);

        const switchLegend = () => {
            infoLegendState.value = !infoLegendState.value;
        };

        const switchPOI = () => {
            emit('switchPOI')
        };

        const closeError = () => {
            infoErrorState.value = false;
        };

        const removeSignal = () => {
            console.log("Passo");
            emit('removeSignal');
        };

        const switchPoiModifier = () => {
            poiModifyState.value = !poiModifyState.value;
            emit('modifySignal');
        };



        return {
            infoLegendState,
            infoErrorState,
            infoErrorTitle,
            infoErrorMsg,
            poiModifyState,
            switchLegend,
            switchPOI,
            closeError,
            removeSignal,
            switchPoiModifier
        };
    },
};
</script>