<template>
  <div class="h-screen relative">
    <div id="map" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from 'leaflet';
import { onMounted, ref } from 'vue';

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

      getGeolocation();
    })

    const coords = ref(null);
    const fetchCoords = ref(null);
    const geoMarker = ref(null);

    const getGeolocation = () => {
      // controllo della sessione storage per le coordinate.
      if (sessionStorage.getItem("coords")) {
        coords.value = JSON.parse(sessionStorage.getItem("coords"));
        plotGeolocation(coords.value);
        return;
      }
      fetchCoords.value = true;
      navigator.geolocation.getCurrentPosition(setCoords, getLocError);
    };

    const setCoords = (pos) => {
      // stop fetching coords
      fetchCoords.value = null;

      // set coords in session storage
      const setSessionCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      sessionStorage.setItem('coords', JSON.stringify(setSessionCoords));

      // set ref coords value
      coords.value = setSessionCoords;

      plotGeolocation(coords.value);
    };

    const plotGeolocation = (coords) => {
      // create custom marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-blue.svg"),
        iconSize: [35, 35],
      });

      // create new marker with coords and custom icon
      geoMarker.value = leaflet
        .marker([coords.lat, coords.lng], { icon: customMarker })
        .addTo(map);

      // set map view to current location
      map.setView([coords.lat, coords.lng], 10);

    };

    const getLocError = (err) => {
      console.log(err);
    };

    return { coords, geoMarker };
  }
}
</script>
