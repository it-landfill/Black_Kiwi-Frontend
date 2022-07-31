<template>
  <div class="h-screen relative">
    <ModifyPOIModal />
    <GeoErrorModal @closeGeoError="closeGeoError" v-if="geoError" :geoErrorMsg="geoErrorMsg" />
    <MapFeatures @getGeolocation="getGeolocation" :coords="coords" :fetchCoords="fetchCoords" />
    <div id="map" class="h-full z-[1]">
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import GeoErrorModal from "@/components/GeoErrorModal.vue";
import MapFeatures from "@/components/MapFeatures.vue";
import ModifyPOIModal from "@/components/ModifyPOIModal.vue";

export default {
  name: 'HomeView',
  components: { ModifyPOIModal, GeoErrorModal, MapFeatures },
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
    const geoError = ref(null);
    const geoErrorMsg = ref(null);

    const getGeolocation = () => {

      if (coords.value) {
        coords.value = null;
        sessionStorage.removeItem("coords");
        // map.removeLayer(geoMarker.value); può non funzionare correttamente.
        // [Warning] listener not found - f_off - Events.js:180
        map.removeLayer(geoMarker.value);
        return;
      }
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
      fetchCoords.value = null;
      geoError.value = true;
      geoErrorMsg.value = err.message;
    };

    const closeGeoError = () => {
      geoError.value = null;
      geoErrorMsg.value = null;
    };

    return { coords, fetchCoords, geoMarker, geoError, geoErrorMsg, closeGeoError, getGeolocation };
  }
}
</script>
