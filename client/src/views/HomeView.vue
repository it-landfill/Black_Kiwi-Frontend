<template>
  <div class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from 'leaflet';
import { onMounted } from 'vue';

export default {
  name: 'HomeView',
  components: {},
  setup() {
    let map;
    onMounted(() => {
      // Inizializzazione della mappa di leaflet.
      map = leaflet.map('map').setView([51.505, -0.09], 13);
      // Aggiunta del livello per le tile della mappa
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);
    })
  }
}
</script>
