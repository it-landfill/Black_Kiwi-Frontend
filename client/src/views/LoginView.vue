<template>
    <div class="h-screen relative">
        <LoginModal />
        <div id="map" class="h-full z-[1]">
        </div>
    </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import LoginModal from "@/components/LoginModal.vue";

export default {
    name: 'LoginView',
    components: { LoginModal },
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

        const geoError = ref(null);
        const geoErrorMsg = ref(null);

        /* 
            const getLocError = (err) => {
                geoError.value = true;
                geoErrorMsg.value = err.message;
            }; 
        */

        const closeGeoError = () => {
            geoError.value = null;
            geoErrorMsg.value = null;
        };

        return { geoError, geoErrorMsg, closeGeoError };
    }
}
</script>
