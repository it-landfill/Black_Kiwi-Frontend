<template>
    <div class="h-screen relative">
        <!-- 
            Nel caso di errore (boolError) viene mostrato un messaggio di errore, il
            quale varia in base al tipo di errore (infoErrorTitle e infoErrorMsg).
            Il messaggio rimane visibile fino a quando l'utente non clicca sul pulsante
            che richiama l'evento di chiusura (closeError).
        -->
        <errorModal 
            v-if="errorVisible" 
            @closeErrorModal="closeErrorModal" 
            :titleErrorModal="titleErrorModal"
            :messageErrorModal="messageErrorModal" 
        />
        <!-- 
            Richiamo alla componente "LoginModal".
                -   Gestione del login dall'utente all'applicazione.
        -->
        <loginModal 
            @loginSuccess="loginSuccess" 
            @showError="showError"
        />
        <!-- 
            Definizione delle caratteristiche della componente grafica utilizzata 
            per la visualizzazione della mappa.
        -->
        <div id="map" class="h-full z-[2]" />
    </div>
</template>

<script>
// Import funzioni "onMounted" e "ref" di vue.
import { onMounted, ref } from "vue";
// Import funzioni di reiniderizzazione nel sito.
import router from '@/router'
// Import libreria di leaflet.
import leaflet from "leaflet";
// Import componenti richiamate nel blocco <template>.
import loginModal from "@/components/formModal/loginModal.vue";
import errorModal from "@/components/errorModal/errorModal.vue";

export default {
    name: 'LoginView',
    components: {
        loginModal,
        errorModal
    },
    emits: [],
    setup() {

        // La funzione "onMounted" è una funzione di vue che viene richiamata automaticamente
        // una volta che il componente è stato caricata.
        onMounted(() => {
            // Inizializzazione della mappa di leaflet con il set della view alle cordinate: 
            //      - Latitudine: 51.505
            //      - Longitudine: -0.09
            //      - Zoom: 12
            // Che corrisponde alla città di Londra.
            let map = leaflet.map('map', { zoomControl: false }).setView([51.505, -0.09], 10);
            // Aggiunta alla mappa delle tile di openstreetmap alla mappa di leaflet.
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            // Cambio della mappa di leaflet con il set della view alle cordinate: 
            //      - Latitudine: 44.4939
            //      - Longitudine: 11.3428
            //      - Zoom: 16
            // Che corrisponde alla città di Bologna.
            map.flyTo([44.4939, 11.3428], 16, { duration: 70 });
        })

        // In caso di login eseguito con successo viene richiamata la funzione "loginSuccess" che 
        // permette di reindirizzare l'utente alla pagina principale dell'applicazione.
        const loginSuccess = () => {
            router.push({ name: "home" });
        };

        //////////////////////////// ERROR /////////////////////////////
        
        // Dati per la visualizzazione del messaggio di errore.
        const titleErrorModal = ref(null);
        const messageErrorModal = ref(null);
        const errorVisible = ref(false);
        
        // Funzione per la visualizzazione del messaggio di errore.
        const showError = (titleError, messageError) => {
            titleErrorModal.value = titleError;
            messageErrorModal.value = messageError;
            errorVisible.value = true;
        };

        // Funzione per la chiusura del messaggio di errore.
        const closeErrorModal = () => {
            errorVisible.value = false;
        };

        return {
            loginSuccess,
            showError,
            closeErrorModal,
            titleErrorModal,
            messageErrorModal,
            errorVisible
        };
    }
}
</script>
