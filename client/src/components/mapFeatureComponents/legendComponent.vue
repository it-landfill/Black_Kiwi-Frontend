<!-- 
    Template per la componente "MapFeatures".
    La componente permette di gestire della leggenda.
-->
<template>
    <div class="absolute bottom-0 left-0 w-full">
        <div class="h-auto px-4 py-2 bg-white rounded-md shadow-lg">
            <h1 class="text-xl">
                Legenda
            </h1>
            <div id="listElments" />
        </div>
    </div>
</template>

<script>
// Import della libreria di leaflet in "HomeView"
import leaflet from "leaflet";
import {
    baseUri,
    getToken
} from "@/components/js/dataConnection.js";
import { onMounted } from "vue";
import {
    map,
    layerSelected
} from "@/components/js/dataLeaflet.js"

export default {
    name: 'legendComponent',
    setup() {

        let max;

        onMounted(() => {

            addHeatMap();

        });

        function getColor(value, max) {
            //value from 0 to 1
            var hue = ((1 - value / max) * 120).toString(10);
            return ["hsl(", hue, ",100%,50%)"].join("");
        }

        function getMaxDensity(data) {
            let maxDensity = 0;
            data.forEach((item) => {
                if (item.density > maxDensity) {
                    maxDensity = item.density;
                }
            })
            return maxDensity;
        }

        async function addHeatMap() {
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());
            let requestOptions = {
                method: 'GET',
                headers: myHeaders
            };

            let endPoint;
            switch (layerSelected) {
                case "Distretti":
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
            console.log(endPoint);
            fetch(endPoint, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    const dataFormatted = data.map((item) => {
                        return {
                            "name": item.name,
                            "density": item.density,
                            "geom": JSON.parse(item.geom)
                        }
                    })
                    console.debug(dataFormatted);
                    max = getMaxDensity(dataFormatted);

                    dataFormatted.forEach(elem => {
                        leaflet.geoJson(elem.geom, {
                            style: function () {
                                return {
                                    fillColor: getColor(elem.density, max),
                                    weight: 2,
                                    opacity: 0.1,
                                    color: 'white',
                                    dashArray: '3',
                                    fillOpacity: 0.1
                                };
                            }
                        }).addTo(map);
                        document.querySelector('#listElments').insertAdjacentHTML(
                            'afterbegin',
                            `
                                <div class="space-y-2 mx-5 pt-3 flex">
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="rounded-md h-8 w-8 border-4 border-white shadow-lg" style="background-color:`+ getColor(elem.density, max) + `" ></div>
                                        <p>` + elem.density + `</p>
                                        </div>
                                </div>
                            `
                        )
                    })
                    if (response.status !== 200) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });

        }




    }
};
</script>