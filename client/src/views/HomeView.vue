<template>
    <div class="h-screen relative">
        <!-- 
            Nella pagina di home è presente un pannello nella parte inferiore a sinistra
            dello schermo. All'interno di questo pannello sono presenti i pulsanti per
            la visualizzazione dei vari layer della mappa, oltre alle informazioni 
            relative all'utente loggato.
        -->
        <MapFeatures />

        <!-- 
            Nel caso di errore ...
        -->
        <GeoErrorModal 
            v-if="geoError" 
            @closeGeoError="closeGeoError" 
            :geoErrorMsg="geoErrorMsg" 
        />
        
        <div id="map" class="h-full z-[1]" />
    </div>
</template>

<!-- set width and height styles for map -->
<style>
/* css to customize Leaflet default styles  */
.HistoricalBuilding .leaflet-popup-tip,
.HistoricalBuilding .leaflet-popup-content-wrapper {
    background: #df0ddc;
    color: #ffffff;
}

.Park .leaflet-popup-tip,
.Park .leaflet-popup-content-wrapper {
    background: #0ddf3a;
    color: #ffffff;
}

.Theater .leaflet-popup-tip,
.Theater .leaflet-popup-content-wrapper {
    background: #df0d0d;
    color: #ffffff;
}

.Museum .leaflet-popup-tip,
.Museum .leaflet-popup-content-wrapper {
    background: #3a0ddf;
    color: #ffffff;
}

.Department .leaflet-popup-tip,
.Department .leaflet-popup-content-wrapper {
    background: #000000;
    color: #ffffff;
}

.Default .leaflet-popup-tip,
.Default .leaflet-popup-content-wrapper {
    background: #df810d;
    color: #ffffff;
}
</style>

<script>
// Import funzioni "onMounted" e "ref" di vue.
import { onMounted, ref } from "vue";
// Import libreria di leaflet.
import leaflet from "leaflet";
// Import componenti richiamate nel blocco <template>.
import MapFeatures from "@/components/MapFeatures.vue";
import GeoErrorModal from "@/components/errorModal/genericErrorModal/GeoErrorModal.vue";
// Import funzioni di gestione della mappa.
import {
    map,
    setMap
} from "@/components/js/dataLeaflet.js"

export default {
    name: 'HomeView',
    components: {
        MapFeatures,
        GeoErrorModal
    },
    emits: [],
    setup() {

        // La funzione "onMounted" è una funzione di vue che viene richiamata automaticamente
        // una volta che il componente è stato caricata.
        onMounted(() => {
            // Inizializzazione della mappa di leaflet con il set della view alle cordinate: 
            //      - Latitudine: 44.4939
            //      - Longitudine: 11.3428
            //      - Zoom: 16
            // Che corrisponde alla città di Bologna.
            setMap(leaflet.map('map').setView([44.4939, 11.3428], 15));
            // Aggiunta alla mappa delle tile di openstreetmap alla mappa di leaflet.
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                minZoom: 10,
                detectRetina: true,
                attribution: '© OpenStreetMap'
            }).addTo(map);
        })

        ///////////////////////////

      
        // Dichiarazione delle variabili per la gestione degli errori.
        const geoError = ref(null);
        const geoErrorMsg = ref(null);
        // Dichiarazione delle variabili per la gestione dell'aggiunta dei POI.

        const switchHeatMap = () => {
            console.log("HomeView - switchHeatMap executed");
        };

        const switchClustering = () => {
            console.log("HomeView - switchClustering executed");
        }

        const closeGeoError = () => {
            geoError.value = null;
            geoErrorMsg.value = null;
        };

        const errorSignal = () => {
            console.log("hola");
        };

        return {
            geoError,
            geoErrorMsg,
            switchHeatMap,
            switchClustering,
            closeGeoError,
            errorSignal,
        };
    }
}
</script>
