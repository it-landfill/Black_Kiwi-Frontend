<template>
    <div class="h-screen relative">
        <LoginErrorModal @closeLoginError="closeLoginError" v-if="loginError" :loginErrorMsg="loginErrorMsg"  />
        <LoginModal />
        <div id="map" class="h-full z-[1]">
        </div>
    </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import LoginModal from "@/components/LoginModal.vue";
import LoginErrorModal from "@/components/LoginErrorModal.vue";

export default {
    name: 'LoginView',
    components: { LoginModal, LoginErrorModal },
    setup() {
        let map;

        onMounted(() => {
            // Inizializzazione della mappa di leaflet.
            map = leaflet.map('map').setView([51.505, -0.09], 13);
            // Aggiunta del livello per le tile della mappa
            leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 23,
                attribution: '© OpenStreetMap'
            }).addTo(map);
        })

        // TODO: Implementare la ricezione di errori dal server per il login.

        const loginError = ref(true);
        const loginErrorMsg = ref(null);

        /* 
            const getLoginError = (err) => {
                geoError.value = true;
                geoErrorMsg.value = err.message;
            }; 
        */

        const closeLoginError = () => {
            loginError.value = null;
            loginErrorMsg.value = null;
        };

        return { loginError, loginErrorMsg, closeLoginError };
    }
}
</script>
