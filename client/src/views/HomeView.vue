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
    let marker = ref(null);
    // Dichiarazione delle variabili per la gestione degli errori.
    const geoError = ref(null);
    const geoErrorMsg = ref(null);


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
    })

    /*
      Funzione di geolocalizzazione del dispositivo.
    */
    const switchPOI = () => {
      console.log("HomeView - switchPOI executed");
      // Controllo dello stato di "coords" 
      if (coords.value) {
        coords.value = false;
        // Remove marker
        map.removeLayer(marker);

        return;
      } else {
        coords.value = true;
        addGeoJson()
      }
    };

    var geojsonMarkerOptions = leaflet.icon({
      iconUrl: "./markerICO/building.columns.circle.fill.svg",
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });

    async function addGeoJson() {
      const response = await fetch("./geoJSON/poi_museum.geojson");
      const data = await response.json();
      const geojson = leaflet.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          return leaflet.marker(latlng, { icon: geojsonMarkerOptions });
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.name);
        }
      }).addTo(map);
      marker = geojson;
    }

    const closeGeoError = () => {
      geoError.value = null;
      geoErrorMsg.value = null;
    };

    const errorSignal = () => {
      console.log("hola");
    };

    return { coords, fetchCoords, geoError, geoErrorMsg, closeGeoError, switchPOI, errorSignal };
  }
}
</script>
