<template>
    <div class="absolute bottom-0 left-0 w-full">
        <div class="h-auto px-4 py-2 bg-white rounded-md shadow-lg">
            <h1 class="text-xl">
                Legenda
            </h1>
            <p id="overRegion">Distretto: _</p>
            <div id="listElments" />
        </div>
    </div>
</template>

<script>
// Import funzioni "onMounted" di vue.
import { onMounted } from "vue";
// Import libreria di leaflet.
import leaflet from "leaflet";
// Import funzioni di gestione della mappa.
import {
    map,
    layerSelected
} from "@/components/js/dataLeaflet.js"
// Import funzioni di impostazione per POST e GET al server.
import {
    baseUri,
    getToken
} from "@/components/js/dataConnection.js";

export default {
    name: 'legendComponent',
    components: {},
    props: [],
    emits: [],
    setup() {

        onMounted(() => {
            addHeatMap();
        });

        let max;

        function getColor(value, max) {
            //value from 0 to 1
            var hue = ((1 - value / max) * 120).toString(10);
            return ["hsl(", hue, ",100%,50%)"].join("");
        }

        function onHighlightFeature(e) {
            document.getElementById("overRegion").textContent = "Distretto: " + e.target.feature.properties.name;

            var layer = e.target;
            layer.setStyle({
                weight: 4,
                dashArray: '',
                fillOpacity: 0.5
            });
            layer.bringToFront();
        }

        function offHighlightFeature(e) {
            document.getElementById("overRegion").textContent = "Distretto: _";
            e.target.setStyle({
                weight: 2,
                opacity: 0.75,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.2
            });
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: onHighlightFeature,
                mouseout: offHighlightFeature,
                click: zoomToFeature
            });
        }

        let dataFormatted;

        async function addHeatMap() {
            // Impostazione dell'header della richiesta di modifica.
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());
            // Impostazione del metodo GET e invio dei dati al server
            let requestOptions = {
                method: 'GET',
                headers: myHeaders
            };
            // Impostazione dell'endpoint della richiesta.
            let endPoint;
            switch (layerSelected) {
                case "Distretti":
                    // TODO: Aggiungere endpoint per distretti.
                    endPoint = baseUri + "admin/getPOIQuartieri";
                    break;
                case "Densità":
                    endPoint = baseUri + "admin/getPOIQuartieri";
                    break;
                case "Check":
                    endPoint = baseUri + "admin/getCheckinQuartieri";
                    break;
                default:
                    console.log("Errore nella formazione dell'endpoint");
                    break;
            }
            fetch(endPoint, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    switch (response.status) {
                        case 200:
                            dataFormatted = JSON.parse(data);
                            // Ordinamento dei dati in base alla value.
                            dataFormatted.features.sort((a, b) => (a.properties.value < b.properties.value) ? 1 : -1);
                            // Calcolo del massimo.
                            max = dataFormatted.features.reduce((max, p) => p.properties.value > max ? p.properties.value : max).properties.value;
                            // Impostazione dello stile e del comportamento della mappa.
                            dataFormatted.features.forEach(elem => {
                                leaflet.geoJSON(elem, {
                                    style: function () {
                                        return {
                                            fillColor: getColor(elem.properties.value, max),
                                            weight: 2,
                                            opacity: 0.75,
                                            color: 'white',
                                            dashArray: '3',
                                            fillOpacity: 0.2
                                        };
                                    },
                                    onEachFeature: onEachFeature
                                }).addTo(map);
                            });

                            // Eliminazione degli elementi "duplicati" dalla lista.
                            dataFormatted.features = [...new Map(dataFormatted.features.map((m) => [m.properties.value, m])).values()];
                            // Creazione della legenda.
                            dataFormatted.features.forEach(elem => {
                                document.querySelector('#listElments').insertAdjacentHTML(
                                    'afterbegin',
                                    `
                                        <div class="space-y-2 mx-5 pt-3 flex">
                                            <div class="flex items-center justify-between gap-4">
                                                <div class="rounded-md h-8 w-8 border-4 border-white shadow-lg" style="background-color:`+ getColor(elem.properties.value, max) + `" ></div>
                                                <p>` + elem.properties.value + `</p>
                                                </div>
                                        </div>
                                    `
                                )
                            })
                            break;
                        case 401:
                            console.log("Errore nella richiesta: " + data.message);
                            break;
                        default:
                            console.log("Errore nella richiesta: " + data.message);
                            break;
                    }
                })
                .catch(error => {
                    console.log("There was an error!");
                    console.log(error);
                });

        }
    }
};
</script>