<template>
    <div class="h-screen relative">
        <!-- 
            Richiamo alla componente "ErrorModal".
                -   In caso di errore nella "LoginView" è possibile visualizzare un pop-up di errore.
        -->
        <ErrorModal v-if="infoErrorState" @closeError="closeError" :infoErrorTitle="infoErrorTitle"
            :infoErrorMsg="infoErrorMsg" />
        <!-- 
            Richiamo alla componente "LoginModal".
                -   Gestione del login dall'utente all'applicazione.
        -->
        <LoginModal />
        <!-- 
            Definizione delle caratteristiche della componente grafica utilizzata 
            per la visualizzazione della mappa.
        -->
        <div id="map" class="h-full z-[2]" />
    </div>
</template>

<script>
// Import della libreria di leaflet in "LoginView"
import leaflet from "leaflet";
// Import delle funzioni onMounted e ref di vue in "LoginView"
import { onMounted, ref } from "vue";
// Import delle componenti richiamate nel blocco <template>
import LoginModal from "@/components/LoginModal.vue";
import ErrorModal from "@/components/errorModal/genericErrorModal/ErrorModal.vue";

export default {
    // Nominativo del component.
    name: 'LoginView',
    // Elenco dei components utilizzati.
    components: {
        LoginModal,
        ErrorModal
    },
    setup() {
        //  Dichiarazione della variabile map.
        let map;
        //  Dichiarazione delle variabili di visualizzazione della finestra di errore.
        const infoErrorState = ref(null);
        const infoErrorTitle = ref("Errore nella pagina di visualizzazione del login.");
        const infoErrorMsg = ref("Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.");

        /* 
            onMounted, composition API che permette di eseguire una chiamata quando la componente in 
            cui è utilizzata è caricata.
            https://vuejs.org/api/composition-api-lifecycle.html#onmounted
        */
        onMounted(() => {
            // Inizializzazione della mappa di leaflet con set della view di partenza (Londra).
            map = leaflet.map('map').setView([51.505, -0.09], 12);
            // Aggiunta del livello per le tile della mappa
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 23,
                attribution: '© OpenStreetMap'
            }).addTo(map);
            // Cambio della view con animazione (Bologna).
            map.flyTo([44.4939, 11.3428], 15, {
                duration: 40
            });
        })

        // TODO: Implementare la ricezione di errori dal server per il login.

        const closeError = () => {
            infoErrorState.value = false;
        };

        return { infoErrorState, infoErrorTitle, infoErrorMsg, closeError };
    }
}
</script>
