<template>
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
</template>

<script>
export default {
    props: ["coordsMapFeatures"],
    emits: ["getGeolocationMapFeatures"],
    setup() {
        },
    methods: {
        getGeolocationMapFeatures() {
            this.$emit("getGeolocationMapFeatures")
        }
    },
};
</script>