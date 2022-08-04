<template>
    <div
        class="w-full md: max-w-[400px] min-h-[90%] absolute md:top-[50px] md:left-[70px] z-[4] flex flex-col gap-4 px-6 py-8 md:px-0 md:py-0 bg-trasparent">

        <infoBlockComponent />
        <searchBarComponent :coordsMapFeatures="coordsMapFeatures" :fetchCoordsMapFeatures="fetchCoordsMapFeatures" />
        <toggleComponent @getGeolocationMapFeatures="getGeolocationMapFeatures" :coordsMapFeatures="coordsMapFeatures"/>

    </div>

    <div
        class="w-full md: max-w-[350px] min-h-[90%] absolute md:top-[50px] md:right-[70px] z-[4] flex flex-col gap-4 px-6 py-8 md:px-0 md:py-0 bg-trasparent">
        <legendComponent />
    </div>

</template>

<script>
import infoBlockComponent from "./infoBlockComponent.vue";
import searchBarComponent from "./searchBarComponent.vue";
import toggleComponent from "./toggleComponent.vue";
import legendComponent from "./legendComponent.vue";
export default {
    props: ["coordsMapFeatures", "fetchCoordsMapFeatures"],
    emits: ["getGeolocationMapFeatures"],
    components: {
        infoBlockComponent,
        searchBarComponent,
        toggleComponent,
        legendComponent,
    },
    setup() {
    },
    methods: {
        getGeolocationMapFeatures() {
            this.$emit("getGeolocationMapFeatures")
        }
    },
};
</script>