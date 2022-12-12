<template>
    <div class="relative w-full">
        <div class="min-h-[200px] px-4 py-4 sm:px-6 bg-white rounded-md shadow-lg">
            <h1 class="text-lg leading-6 font-medium text-gray-900">
                {{ nodeInfo.name }}
            </h1>
            <p class="mt-1 max-w-2xl pb-2 text-sm text-gray-500">
                Indetificativo: {{ nodeInfo.id }}
            </p>
            <div class="border-y border-gray-200">
                <dl class="py-3 space-y-2">
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Categoria</dt>
                        <dd class="text-gray-900">{{ nodeInfo.category }}</dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Rank</dt>
                        <dd class="text-gray-900">{{ nodeInfo.rank }}</dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Latitude</dt>
                        <dd class="text-gray-900">{{ nodeInfo.latitude }}</dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Longitudine</dt>
                        <dd class="text-gray-900">{{ nodeInfo.longitude }}</dd>
                    </div>
                </dl>
            </div>

            <div class="sm:flex sm:flex-row-reverse sm:px-4 text-sm pt-4 pb-2 gap-2">
                <button id="deleteButtonModal" @click="removePOI" class=" w-full inline-flex justify-center rounded-md border border-transparent
                            py-2 px-4 text-slate-500  text-base font-medium 
                            hover:text-slate-900 sm:ml-3 sm:w-auto
                            disabled:text-slate-400 disabled:cursor-not-allowed
                            sm:text-sm">Eliminare</button>
                <button id="modifyButtonModal" @click="$emit('showModifyModal')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                             py-2 bg-slate-200 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white 
                            sm:text-sm disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed">Modificare</button>
            </div>

        </div>
    </div>
</template>

<script>
// Import della funzioni "onMounted" di vue in "MapFeatures"
import { onMounted } from "vue";
// Import funzioni di impostazione per POST e GET al server.
import {
    baseUri,
    getToken
} from "@/components/js/dataConnection.js";

export default {
    name: 'infoComponent',
    props: [
        "nodeInfo"
    ],
    emits: [
        "showModifyModal", 
        "removePOI"
    ],
    setup(props, { emit }) {

        // Funzione richiamata ogni volta che visualizzato il componente.
        onMounted(() => {
            document.getElementById("modifyButtonModal").disabled = true;
            document.getElementById("deleteButtonModal").disabled = true;
        });

        // Funzione per rimuovere il POI selezionato.
        const removePOI = () => {
            // Impostazione dell'header della richiesta.
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());

            // Impostazione del metodo DELETE e invio dei dati al server
            var requestOptions = {
                method: "DELETE",
                headers: myHeaders,
            };
            let titleError;
            let messageError;
            fetch(baseUri + "admin/deletePOI?poiID=" + props.nodeInfo.id, requestOptions)
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            emit("removePOI", props.nodeInfo.id);
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
            removePOI
        };
    },
};
</script>