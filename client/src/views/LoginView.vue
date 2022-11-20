<template>
    <div class="h-screen relative">
        <!-- 
            Nel caso di errore (boolError) viene mostrato un messaggio di errore, il
            quale varia in base al tipo di errore (infoErrorTitle e infoErrorMsg).
            Il messaggio rimane visibile fino a quando l'utente non clicca sul pulsante
            che richiama l'evento di chiusura (closeError).
        -->
        <ErrorModal 
            v-if="boolError" 
            @closeError="closeError" 
            :infoErrorTitle="infoErrorTitle"
            :infoErrorMsg="infoErrorMsg" 
        />
        <!-- 
            Richiamo alla componente "LoginModal".
                -   Gestione del login dall'utente all'applicazione.
        -->
        <LoginModal 
            @loginSuccess="loginSuccess" 
            @login400="login400" 
            @login401="login401"
            @login404="login404" 
            @loginErrorGeneric="loginErrorGeneric" 
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
import LoginModal from "@/components/loginModal/LoginModal.vue";
import ErrorModal from "@/components/errorModal/genericErrorModal/ErrorModal.vue";

export default {
    name: 'LoginView',
    components: {
        LoginModal,
        ErrorModal
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

        // Dichiarazione variabili di visualizzazione della finestra di errore.
        const boolError = ref(false);
        const infoErrorTitle = ref("Titolo del messaggio di errore.");
        const infoErrorMsg = ref("Testo del messaggio di errore.");

        const login400 = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            boolError.value = true;
        };

        const login401 = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            boolError.value = true;
        };

        const login404 = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            boolError.value = true;
        };

        const loginErrorGeneric = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            boolError.value = true;
        };

        const closeError = () => {
            boolError.value = false;
        };

        return {
            boolError,
            infoErrorTitle,
            infoErrorMsg,
            loginSuccess,
            login400,
            login401,
            login404,
            loginErrorGeneric,
            closeError
        };
    }
}
</script>
