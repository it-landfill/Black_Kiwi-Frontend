<template>
    <div class="relative z-[5]">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed z-[5] inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div class="bg-white rounded-lg text-left shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
                    <div class="px-4 pt-5 pb-5 sm:p-6 sm:pb-5">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="mt-6 pb-3 text-center text-2xl text-slate-900 font-medium" id="modal-title">
                                Impostazioni delle richieste</h3>
                            <div class="mt-2">
                                <form @submit.prevent="getUser">
                                    <div class="flex flex-col py-4">
                                        <label for="date" class="block pb-2 text-sm font-medium text-gray-700">
                                            Intervallo temporale (Opzionale):
                                        </label>
                                        <datepicker placeholder="es. 08 Nov 2021 ~ 10 Nov 2021"
                                            input-classes="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                            v-model="dateValue" :formatter="dateFormat" />
                                    </div>

                                    <div class="px-4 py-4 pb-8 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="submit" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                            px-4 py-2 bg-slate-300 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white sm:ml-3 sm:w-auto
                            sm:text-sm">Inviare</button>
                                        <button @click="$emit('closeUserModal')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
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
// Import funzioni "onMounted" e "ref" di vue.
import { ref } from 'vue'
// Import funzioni gestione del datepicker.
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
// Import funzioni di impostazione per POST e GET al server.
import {
    baseUri,
    getToken,
    clusterFormat
} from "@/components/js/dataConnection.js";

import {
    setUserLocation,
} from "@/components/js/dataLeaflet.js"

export default {
    name: 'clusterModal',
    props: [],
    components: {
        datepicker: VueTailwindDatepicker
    },
    emits: [
        "getInfoLocationUser",
        "closeUserModal",
        "showError"
    ],
    setup(_, { emit }) {

        // Valore del datepicker.
        const dateValue = ref([])
        // Formattazione del datepicker.
        const dateFormat = ref({
            date: 'DD MMM YYYY',
            month: 'MMM'
        })
        // Variabile di memorizzazione dei dati ottenuti dal server.
        let dataRaw;
        let dataFormatted;
        
        // Funzione per ottenere i dati relativi ai cluster ed inviarli.
        const getUser = () => {
            // Impostazione dell'header della richiesta.
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());
            // Acquisizione dei dati relativi al clustering richiesto.
            // Warning: Potenziale problema con il formato della data.
            // Warning: Potenziale problema con la selezione di un singolo giorno di timeframe.
            var formData = new Object();
            let request = "";
            if (dateValue.value[0] != null && dateValue.value[1] != null) {
                formData.date = new Object();
                formData.date.from = new Date(dateValue.value[0]).toISOString().split('T')[0];
                formData.date.to = new Date(dateValue.value[1]).toISOString().split('T')[0];
                request += "?from=" + formData.date.from + "&to=" + formData.date.to;
            }
            // Impostazione del metodo POST e invio dei dati al server
            var requestOptions = {
                method: "GET",
                headers: myHeaders,
            };
            let titleError;
            let messageError;
            fetch(baseUri + "admin/getRequestLocations" + request, requestOptions)
                .then(async response => {
                    switch (response.status) {
                        case 200:
                            // Se la richiesta è andata a buon fine, vengono elaborati
                            // i dati ricevuti dal server e viene emesso il segnale per
                            // aggiornare la mappa.
                            dataRaw = await response.json();
                            dataFormatted = dataRaw.map((item) => {
                                return clusterFormat(item);
                            })
                            // Memorizzazione dei dati ottenuti dal server.
                            setUserLocation(dataFormatted);
                            emit("getInfoLocationUser");
                            break;
                        case 400:
                            titleError = "Errore 400 - Richiesta errata";
                            messageError = "La richiesta non è stata eseguita a causa di un errore sintattico.";
                            emit("showError", titleError, messageError);
                            break;
                        case 401:
                            titleError = "Errore 401 - Non autorizzato";
                            messageError = "Non sei autorizzato ad accedere a questa pagina.";
                            emit("showError", titleError, messageError); 
                            break;
                        case 500:
                            titleError = "Errore 500 - Server Error";
                            messageError = "Si è verificato un errore interno al server. Riprovare più tardi.";
                            emit("showError", titleError, messageError);
                            break;
                        default:
                            titleError = "Errore sconosciuto";
                            messageError = "Si è verificato un errore sconosciuto. Riprovare più tardi.";
                            emit("showError", titleError, messageError);
                            break;
                    }
                })
                .catch((error) => console.log("Log errore: ", error));
        };

        return { 
            dateValue, 
            dateFormat, 
            getUser 
        };
    },
};
</script>