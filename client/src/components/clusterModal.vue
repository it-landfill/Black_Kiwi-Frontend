<template>
    <div class="relative z-[5]">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed z-[5] inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="bg-white rounded-lg text-left shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
                    <div class="px-4 pt-5 pb-5 sm:p-6 sm:pb-5">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="mt-6 pb-3 text-center text-2xl text-slate-900 font-medium" id="modal-title">
                                Impostazioni del clustering</h3>
                            <div class="mt-2">
                                <form @submit.prevent="addPost">
                                    <div class="flex flex-col py-4">
                                        <label for="date" class="block pb-2 text-sm font-medium text-gray-700">
                                            Intervallo temporale:
                                        </label>
                                        <datepicker placeholder="es. 08 Nov 2021 ~ 10 Nov 2021"
                                            input-classes="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                            v-model="dateValue" :formatter="formatter" />
                                    </div>
                                    <div class="flex flex-col py-4">
                                        <label for="numCluster" class="block pb-2 text-sm font-medium text-gray-700">
                                            Numero di cluster:
                                        </label>
                                        <input type="number" name="rank" id="rank"
                                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                            placeholder="es. 5">
                                    </div>
                                    <div class="flex flex-col py-4">
                                        <label for="rangeCluster" class="block pb-2 text-sm font-medium text-gray-700">
                                            Raggio per il clustering (Opzionale):
                                        </label>
                                        <input type="number" name="rank" id="rank"
                                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                            placeholder="es. 10.4">

                                    </div>

                                    <div class="px-4 py-4 pb-8 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="submit" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                            px-4 py-2 bg-slate-300 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white sm:ml-3 sm:w-auto
                            sm:text-sm">Inviare</button>
                                        <button @click="$emit('closeAddPOIModal')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                            px-4 py-2 bg-slate-300 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white sm:ml-3 sm:w-auto
                            sm:text-sm">Annullare</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

export default {
    name: 'AddPOIModal',
    props: [],
    components: {
        datepicker: VueTailwindDatepicker
    },
    emits: [

    ],
    setup() {

        const dateValue = ref([])
        const formatter = ref({
            date: 'DD MMM YYYY',
            month: 'MMM'
        })

        return { dateValue, formatter };
    },
};
</script>