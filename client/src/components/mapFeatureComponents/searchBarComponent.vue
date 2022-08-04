<template>
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
                <div class="h-[200px] overscroll-scroll bg-white rounded-sm">
                    <!-- Entry Result -->
                    <div class="px-4 py-2 flex gap-x-2 cursor-pointer rounded-sm hover:bg-slate-600 hover:text-white">
                        <i class="fas fa-map-marker-alt"></i>
                        <p class="text-xs">Result</p>
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
    }
};
</script>