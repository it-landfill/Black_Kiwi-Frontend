<template>
    <!-- Components di sinistra -->
    <div class="w-full max-w-[375px] min-h-[90%] absolute z-[4] flex flex-col top-[50px] left-[70px] bg-trasparent">
        <!-- 
        Richiamo alla componente "ModifyPOIModal". 
            - v-if render condizionato dallo stato di un attributo.
            https://vuejs.org/api/built-in-directives.html#v-if
        -->
        <ModifyPOIModal 
            ref="modifyPOIModal" 
            v-if="poiModifyState"   
            @closeModifyPOIModal="closeModifyPOIModal"
            :nodeInfo="nodeInfo"
        />
        <!-- 
            Richiamo alla componente "infoBlockComponent".
        -->
        <ErrorModal v-if="infoErrorState" @closeError="closeError" :infoErrorTitle="infoErrorTitle"
            :infoErrorMsg="infoErrorMsg" />
        <!-- 
            Richiamo alla componente "infoBlockComponent".
        -->
        <infoBlockComponent 
            v-if="infoPointOfInterestState" 
            @modifyPOI="modifyPOI"
            @removePOI="removePOI"
            :nodeInfo="nodeInfo" 
        />
        <!--
             emits: ["switchShowPOI", "switchAddPOI", "switchHeatMap", "switchUserPosition"],
        -->
        <toggleComponent 
            @switchShowPOI="switchShowPOI" 
            @switchAddPOI="switchAddPOI"
            @switchHeatMap="switchHeatMap"
            @switchClustering="switchClustering" 
            @reloadHeatMap="reloadHeatMap"
        />
    </div>
    <!-- Components di destra -->
    <div class="w-full max-w-[375px] min-h-[90%] absolute z-[4] flex flex-col top-[50px] right-[70px] bg-trasparent">
        <!-- 
            Richiamo alla componente "legendComponent".
        -->
        <legendComponent 
            ref="legendComponentHeatmap" 
            v-if="switchHeatMapShow"
        />
    </div>
</template>

<script>
// Import della funzioni ref di vue in "MapFeatures"
import { ref } from "vue";
// Import delle componenti richiamate nel blocco <template>
import infoBlockComponent from "./mapFeatureComponents/infoBlockComponent.vue";

import toggleComponent from "./mapFeatureComponents/toggleComponent.vue";
import legendComponent from "./mapFeatureComponents/legendComponent.vue";
import ErrorModal from "@/components/errorModal/genericErrorModal/ErrorModal.vue";
import ModifyPOIModal from "@/components/mapFeatureComponents/ModifyPOIModal.vue";

export default {
    // Nominativo del component
    name: 'MapFeatures',
    components: {
        infoBlockComponent,
        toggleComponent,
        legendComponent,
        ErrorModal,
        ModifyPOIModal,
    },
    props: ["coordsMapFeatures", "fetchCoordsMapFeatures"],
    emits: ["switchShowPOI", "switchAddPOI", "switchHeatMap", "switchClustering", "modifyPOI", "removePOI"],
    setup(props, { emit }) {
        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const infoPointOfInterestState = ref(false);
        // Dichiarazione delle variabili di visualizzazione della leggenda.
        const switchHeatMapShow = ref(false);
        // Dichiarazione delle variabili di visualizzazione della finestra di errore.
        const infoErrorState = ref(false);
        const infoErrorTitle = ref("Errore nella pagina di visualizzazione della home.");
        const infoErrorMsg = ref("Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.");
        // Dichiarazione delle variabili per la gestione degla richiesta di modifica di un POI.
        const poiModifyState = ref(false);
        const nodeInfo = ref(null);
        const legendComponentHeatmap = ref(null);
      
        const switchShowPOI = () => {
            emit('switchShowPOI')
        };
        
        const switchAddPOI = () => {
            emit('switchAddPOI')
        };
        
        const switchHeatMap = () => {
            switchHeatMapShow.value = !switchHeatMapShow.value;
            emit('switchHeatMap')
        };

        const switchClustering = () => {
            emit('switchClustering')
        };
        
        // If props.nodeInfo is not null, then the infoBlockComponent is shown.
        const switchPointOfInterestState = (nodeData) => {
            nodeInfo.value = nodeData;
            infoPointOfInterestState.value = !infoPointOfInterestState.value;
        };

        const reloadHeatMap = () => {
            console.log(legendComponentHeatmap)
            // legendComponentHeatmap.value.addHeatMap();
        }
        
        const modifyPOI = () => {
            poiModifyState.value = !poiModifyState.value;
            emit('modifyPOI');
        };
        
        const closeModifyPOIModal = () => {
            poiModifyState.value = false;
            infoPointOfInterestState.value = false;
        };
        
        const removePOI = () => {
            console.log("removePOI");
            infoPointOfInterestState.value = false;
        };
        
        const closeError = () => {
            infoErrorState.value = false;
        };

        return {
            switchHeatMapShow,
            nodeInfo,
            infoPointOfInterestState,
            poiModifyState,
            infoErrorState,
            infoErrorTitle,
            infoErrorMsg,
            switchShowPOI,
            switchAddPOI,
            switchHeatMap,
            switchClustering,
            modifyPOI,
            reloadHeatMap,
            closeModifyPOIModal,
            switchPointOfInterestState,
            closeError,
            removePOI,
        };
    },
};
</script>