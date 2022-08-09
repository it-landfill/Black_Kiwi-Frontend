<!-- 
  Ogni file .vue contiene nel top-level il blocco <template>.
  Il contenuto del blocco <template> viene estratto e passato al @vue/compiler-dom 
  che precompila la componente alla visualizzazione.
-->
<template>
  <div class="h-screen relative">
    <!-- Definizione delle caratteristiche grafiche della mappa. -->
    <div id="baseMap" class="h-full z-[1]" />
    <!-- 
      Richiamo alla componente "MapFeatures". 
      Modificatori applicati:
        - v-on (alias @) ricollega un event listener all'elemento component (in questo caso MapFeatures).
          Una volta aggiunto l'event listener, se la componente invia un evento (in questo caso "switchPOI") 
          la componente padre richiama l'handler definito (in questo caso "switchPOI")
          https://vuejs.org/api/built-in-directives.html#v-on

        - v-bind (alias :) collegamento tra uno o più attributi.
          https://vuejs.org/api/built-in-directives.html#v-bind
    -->
    <MapFeatures @switchPOI="switchPOI" :coordsMapFeatures="coords" :fetchCoordsMapFeatures="fetchCoords"
      @modifySignal="modifySignal" @removeSignal="removeSignal" />
    <!-- 
      Richiamo alla componente "GeoErrorModal". 
    -->
    <GeoErrorModal @closeGeoError="closeGeoError" v-if="geoError" :geoErrorMsg="geoErrorMsg" />
  </div>
</template>


<script>

// Import della libreria di leaflet in "HomeView"
import leaflet from "leaflet";
// Import delle funzioni onMounted e ref di vue in "HomeView"
import { onMounted, ref } from "vue";
// Import delle componenti richiamate nel blocco <template>
import GeoErrorModal from "@/components/errorModal/genericErrorModal/GeoErrorModal.vue";
import MapFeatures from "@/components/mapFeatureComponents/MapFeatures.vue";

export default {
  // Nominativo del component
  name: 'HomeView',
  // Elenco dei components utilizzati
  components: {
    GeoErrorModal,
    MapFeatures
  },
  setup() {
    //  Dichiarazione della variabile map.
    let map;
    // Dichiarazione delle variabili di geolocalizzazione.
    const coords = ref(null);
    const fetchCoords = ref(null);
    // Dichiarazione delle variabili per la gestione degli errori.
    const geoError = ref(null);
    const geoErrorMsg = ref(null);
    // Dichiarazione delle variabili i marker sulla mappa dei punti di interesse.
    const geoMarker = ref(null);

    /* 
      onMounted, composition API che permette di eseguire una chiamata quando la componente in 
      cui è utilizzata è caricata.
      https://vuejs.org/api/composition-api-lifecycle.html#onmounted
    */
    onMounted(() => {
      // Inizializzazione della mappa di leaflet con i valori di default.
      map = leaflet.map('baseMap').setView([44.4939, 11.3428], 15);
      // Aggiunta del livello per le tile della mappa
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 15,
        detectRetina: true,
        attribution: '© OpenStreetMap'
      }).addTo(map);
      // Richiamo della funzione per l'ottenimento dei dati di geolocalizzazione 
      // del dispositivo.
      // switchPOI();
    })

    /*
      Funzione di geolocalizzazione del dispositivo.
    */
    const switchPOI = () => {
      // Controllo dello stato di "coords" 
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
      plotGeolocation(coords.value);
    };

    async function addGeoJson() {
      const response = await fetch("./geoJSON/poi_museum.geojson");
      const data = await response.json();
      leaflet.geoJson(data).addTo(map);
    }

    const plotGeolocation = () => {
      // create custom marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-blue.svg"),
        iconSize: [35, 35],
      });
      // 44.8353	11.6199


      // create new marker with coords and custom icon
      geoMarker.value = leaflet
        .marker([44.4939, 11.3428], { icon: customMarker })
        .addTo(map);
      addGeoJson();
    };

    const closeGeoError = () => {
      geoError.value = null;
      geoErrorMsg.value = null;
    };

    const errorSignal = () => {
      console.log("hola");
    };

    return { coords, fetchCoords, geoMarker, geoError, geoErrorMsg, closeGeoError, switchPOI, errorSignal, plotGeolocation };
  }
}
</script>
