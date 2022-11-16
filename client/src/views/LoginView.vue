<template>
    <div class="h-screen relative">
        <!-- 
            Nel caso di errore (showError) viene mostrato un messaggio di errore, il
            quale varia in base al tipo di errore (infoErrorTitle e infoErrorMsg).
            Il messaggio rimane visibile fino a quando l'utente non clicca sul pulsante
            che richiama l'evento di chiusura (closeError).
        -->
        <ErrorModal 
            v-if="showError"
            @closeError="closeError" 
            :infoErrorTitle="infoErrorTitle"
            :infoErrorMsg="infoErrorMsg" 
        />
        <!-- 
            Richiamo alla componente "LoginModal".
                -   Gestione del login dall'utente all'applicazione.
        -->
        <LoginModal 
            @loginPost="loginPost" 
            @login404="login404" 
            @login400="login400"
            @login401="login401"
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
// Import della libreria di leaflet
import leaflet from "leaflet";
// Import delle funzioni onMounted e ref di vue
import { onMounted, ref } from "vue";
// Import delle componenti richiamate nel blocco <template>
import LoginModal from "@/components/LoginModal.vue";
import ErrorModal from "@/components/errorModal/genericErrorModal/ErrorModal.vue";
// Import delle funzioni di reiniderizzazione nel sito
import router from '@/router'

export default {
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
        const showError = ref(null);
        const infoErrorTitle = ref("Titolo errore");
        const infoErrorMsg = ref("Corpo errore.");

        onMounted(() => {
            // Inizializzazione della mappa di leaflet con set della view di partenza (Londra).
            map = leaflet.map('map').setView([51.505, -0.09], 12);
            // Aggiunta del livello per le tile della mappa
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 23,
                attribution: '© OpenStreetMap'
            }).addTo(map);
            // Cambio della view con set della view di destinazione (Bologna).
            map.flyTo([44.4939, 11.3428], 15, {
                duration: 45
            });
        })

        const loginPost = () => {
            // Router push per il reindirizzamento alla pagina "HomeView".
            router.push({ name: "home" });
        };

        const login400 = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            showError.value = true;
        };

        const login401 = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            showError.value = true;
        };

        const login404 = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            showError.value = true;
        };

        const loginErrorGeneric = () => {
            infoErrorTitle.value = "Errore nella pagina di visualizzazione del login.";
            infoErrorMsg.value = "Oh rabbia! Christopher Robin deve avere combinato qualcosa di grave per non far funzionare questa pagina.";
            showError.value = true;
        };

        const closeError = () => {
            showError.value = false;
        };

        return { 
            showError, 
            infoErrorTitle, 
            infoErrorMsg,
            loginPost,
            login400, 
            login401, 
            login404, 
            loginErrorGeneric,
            closeError 
        };
    }
}
</script>
