<template>
    <div
        class="w-full md: max-w-[400px] min-h-[90%] absolute md:top-[50px] md:left-[70px] z-[4] flex flex-col gap-4 px-6 py-8 md:px-0 md:py-0 bg-trasparent">

        <div class="relative w-full">
            <div class="min-h-[200px] px-4 py-4 sm:px-6 bg-white rounded-md shadow-lg">
                <h1 class="text-lg leading-6 font-medium text-gray-900">
                    Nominativo.
                </h1>
                <p class="mt-1 max-w-2xl pb-2 text-sm text-gray-500">
                    Potenziali informazioni secondarie.
                </p>
                <div class="border-y border-gray-200">
                    <dl class="py-3 space-y-2">
                        <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                            <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                            <dd class="text-gray-900">Dato</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                            <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                            <dd class="text-gray-900">Dato</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                            <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                            <dd class="text-gray-900">Dato</dd>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                            <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                            <dd class="text-gray-900">Dato</dd>
                        </div>
                    </dl>
                </div>



                <div class="sm:grid sm:grid-cols-5 sm:px-4 text-sm pt-4 pb-2 gap-2">
                    <div class="col-start-1 col-span-3">
                        <div
                            class="border-[1px] border-slate-600 text-slate-600 shadow flex justify-center items-center rounded-md min-h-[40px]">
                            <i class="fa-solid fa-i-cursor font-medium tracking-widest"> Modifica</i>
                        </div>
                    </div>
                    <div class="col-start-4 col-span-2">
                        <div
                            class="border-[1px] border-red-600 text-red-600 shadow flex justify-center items-center rounded-md min-h-[40px]">
                            <i class="fa-solid fa-trash-can font-medium tracking-widest"> Elimina</i>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="relative mt-1 gap-4">
            <!-- Search Bar -->
            <div class="relative flex-auto py-2 md:px-0 md:py-0">
                <input class="pl-[45px] pr-4 py-3 text-sm focus:outline-none w-full shadow-lg rounded-md" type="text"
                    placeholder="Start your search" v-model="searchQuery" @input="search" />

                <!-- Search Icon -->
                <div class="absolute top-0 left-[16px] h-full flex items-center">
                    <i class="fas fa-search"></i>
                </div>

                <!-- Search Result -->
                <div v-if="searchQuery" class="absolute mt-2 w-full">
                    <!-- Result -->
                    <div class="h-[200px] overflow-scroll bg-white rounded-md">
                        <!-- Entry Result -->
                        <div class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white">
                            <i class="fas fa-map-marker-alt"></i>
                            <p class="text-xs">Result</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="absolute bottom-0 left-0 w-full">
            <div class="h-auto px-4 py-2 bg-white rounded-md shadow-lg">
                <h1 class="text-xl">
                    Toggle Area
                </h1>

                <!-- Geolocation Toggle -->
                <div class="space-y-2 mx-5 pt-3 flex">
                    <div class="flex items-center justify-between gap-4">
                        <div class="px-4 bg-white flex align-middle items-center shadow-md rounded-md min-h-[45px] max-w-[45px]"
                            :class="{ 'bg-slate-600': coordsMapFeatures }" @click="getGeolocationMapFeatures">
                            <i class="fas fa-location-arrow text-state-600 text-[18px]"
                                :class="{ 'text-white': coordsMapFeatures, 'animate-pulse': fetchCoordsMapFeatures }"></i>
                        </div>
                        <p>
                            Posizione attuale dell'utente.
                        </p>

                    </div>
                </div>

                <!-- X Toggle -->
                <div class="space-y-2 mx-5 pt-3 flex">
                    <div class="flex items-center justify-between gap-4">
                        <div class="px-3 bg-white flex items-center shadow-md rounded-md min-h-[45px] max-w-[45px]"
                            :class="{ 'bg-slate-600': coordsMapFeatures }" @click="Bottone2">
                            <i class="fa-solid fa-location-crosshairs text-state-600 text-[20px]"
                                :class="{ 'text-white': coordsMapFeatures, 'animate-pulse': fetchCoordsMapFeatures }" />
                        </div>
                        <p>
                            Visualizzazione heat-map.
                        </p>
                    </div>
                </div>

                <!-- Y Toggle -->
                <div class="space-y-2 mx-5 pt-3 flex">
                    <div class="flex items-center justify-between gap-4">
                        <div class="px-3 bg-white flex items-center shadow-md rounded-md min-h-[45px] max-w-[45px]"
                            :class="{ 'bg-slate-600': coordsMapFeatures }" @click="Bottone3">
                            <i class="fa-solid fa-street-view text-state-600 text-[20px]"
                                :class="{ 'text-white': coordsMapFeatures, 'animate-pulse': fetchCoordsMapFeatures }"></i>
                        </div>
                        <p>
                            Posizione utenti aderente al servizio.
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </div>

    <div
        class="w-full md: max-w-[350px] min-h-[90%] absolute md:top-[50px] md:right-[70px] z-[4] flex flex-col gap-4 px-6 py-8 md:px-0 md:py-0 bg-trasparent">

        <div class="absolute bottom-0 left-0 w-full">
            <div class="h-auto px-4 py-2 bg-white rounded-md shadow-lg">
                <h1 class="text-xl">
                    Legenda
                </h1>
                <div class="space-y-2 mx-5 pt-3 flex">
                    <div class="flex items-center justify-between gap-4">
                        <div class="rounded-md h-8 w-8 bg-red-500 border-4 border-white shadow-lg"></div>
                        <p> Corri, scappa, c'è il Nemesis! </p>
                    </div>
                </div>
                <div class="space-y-2 mx-5 pt-3 flex">
                    <div class="flex items-center justify-between gap-4">
                        <div class="rounded-md h-8 w-8 bg-orange-500 border-4 border-white shadow-lg"></div>
                        <p> Oh no!? Anyway... </p>
                    </div>
                </div>
                <div class="space-y-2 mx-5 pt-3 flex">
                    <div class="flex items-center justify-between gap-4">
                        <div class="rounded-md h-8 w-8 bg-yellow-500 border-4 border-white shadow-lg"></div>
                        <p> Spritz in centro. </p>
                    </div>
                </div>
                <div class="space-y-2 mx-5 pt-3 flex">
                    <div class="flex items-center justify-between gap-4">
                        <div class="rounded-md h-8 w-8 bg-green-500 border-4 border-white shadow-lg"></div>
                        <p> Dov'è la mia piña colada!? </p>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
    props: ["coordsMapFeatures", "fetchCoordsMapFeatures"],
	emits: ["getGeolocationMapFeatures"],
    setup(props) {
        const searchQuery = ref(null);
        const searchData = ref(null);
        const queryTimeout = ref(null);

        const search = () => {
            clearTimeout(queryTimeout.value);

            queryTimeout.value = setTimeout(async () => {
                if (searchQuery.value !== "") {
                    const params = new URLSearchParams({
                        fuzzyMatch: true,
                        language: "en",
                        limit: 10,
                        proximity: props.coordsMapFeatures ? `${props.coordsMapFeatures.lng}, ${props.coordsMapFeatures.lat}` : "0,0",
                    });
                    const getData = await axios.get(`http://localhost:8080/api/search/${searchQuery.value}?${params}`);
                    searchData.value = getData.data.features;
                    console.log(searchData.value);
                }
            }, 750);
        }

        return { searchQuery, searchData, queryTimeout, search };
    },
    methods: {
          getGeolocationMapFeatures() {
              this.$emit("getGeolocationMapFeatures")
          }
      },
};
</script>