<template>
    <div class="relative z-[5]">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed z-[5] inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div
                    class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
                    <div class="px-4 pt-5 pb-5 sm:p-6 sm:pb-5">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="mt-6 pb-3 text-center text-2xl text-slate-900 font-medium" id="modal-title">
                                Modifica dei dati correnti</h3>
                            <div class="mt-2">
                                <form @submit.prevent="modifyPost">
                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="name" class="block pb-2 text-sm font-medium text-gray-700">
                                                Nome
                                            </label>
                                            <input type="text" name="name" id="name"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm">
                                        </div>

                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="rank" class="block pb-2 text-sm font-medium text-gray-700">
                                                Rank
                                            </label>
                                            <input type="number" name="rank" id="rank"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="py-4 space-y-4">
                                        <p class="block text-sm font-medium text-gray-700">
                                            Tipologia
                                        </p>

                                        <div class="flex items-center">
                                            <input id="Historical Building Modifier" name="categoryModifier"
                                                type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Historical Building Modifier"
                                                class="ml-3 block text-sm font-medium text-gray-900"> Historical
                                                Building
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Park Modifier" name="categoryModifier" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Park Modifier"
                                                class="ml-3 block text-sm font-medium text-gray-900"> Park
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Theater Modifier" name="categoryModifier" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Theater Modifier"
                                                class="ml-3 block text-sm font-medium text-gray-900">
                                                Theater
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Museum Modifier" name="categoryModifier" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Museum Modifier"
                                                class="ml-3 block text-sm font-medium text-gray-900">
                                                Museum
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Department Modifier" name="categoryModifier" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Department Modifier"
                                                class="ml-3 block text-sm font-medium text-gray-900"> Department
                                            </label>
                                        </div>
                                    </div>
                                    <div class="px-4 pb-8 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="submit" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                            px-4 py-2 bg-slate-300 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white sm:ml-3 sm:w-auto
                            sm:text-sm">Inviare</button>
                                        <button @click="$emit('closeModifyPOIModal')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
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
// Import funzioni "onMounted" di vue.
import { onMounted } from "vue";
// Import funzioni di impostazione per POST e GET al server.
import {
    baseUri,
    getToken,
} from "@/components/js/dataConnection.js";

export default {
    name: 'ModifyPOIModal',
    components: {},
    props: [
        "nodeInfo"
    ],
    emits: [
        "closeModifyPOIModal",
        "closePostModifyPOIModal"
    ],
    setup(props, { emit }) {

        // La funzione "onMounted" è una funzione di vue che viene richiamata automaticamente
        // una volta che il componente è stato caricata.
        onMounted(() => {
            // Impostazione dei dati relativi al PoI selezionato.
            document.getElementById("name").setAttribute("value", props.nodeInfo.name);
            document.getElementById("rank").setAttribute("value", props.nodeInfo.rank);
            document.getElementById(props.nodeInfo.category + " Modifier").setAttribute("checked", true);
        });

        // Funzione di mofica dei dati relativi ad un PoI selezionato.
        const modifyPost = () => {
            // Impostazione dell'header della richiesta di modifica.
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());
            // Acquisizione dei dati relativi al PoI selezionato.
            var formData = new Object();
            formData.id = props.nodeInfo.id;
            formData.name = document.getElementById("name").value;
            formData.rank = parseFloat(document.getElementById("rank").value);
            formData.category = document.querySelector('input[name="categoryModifier"]:checked').id;
            formData.category = formData.category.substring(0, formData.category.length - 9);
            formData.coord = new Object();
            formData.coord.latitude = parseFloat(props.nodeInfo.latitude);
            formData.coord.longitude = parseFloat(props.nodeInfo.longitude);
            let addPOIJSON = JSON.stringify(formData);

            // Impostazione del metodo POST e invio dei dati al server
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: addPOIJSON
            };
            fetch(baseUri + "admin/editPOI", requestOptions)
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            // Se la richiesta di modifica termina con successo vengono aggiornati 
                            // in locale i dati relativi al PoI modificato.
                            emit(
                                "closePostModifyPOIModal",
                                formData.name,
                                formData.rank,
                                formData.category
                            );
                            break;
                        case 400:
                            emit("closeModifyPOIModal");
                            // emit("login400");
                            break;
                        case 401:
                            emit("closeModifyPOIModal");
                            // emit("login401");
                            break;
                        case 404:
                            emit("closeModifyPOIModal");
                            // emit("login404");
                            break;
                        default:
                            emit("closeModifyPOIModal");
                            emit("loginErrorGeneric");
                            break;
                    }
                })
                .catch(() => {
                    emit("closeModifyPOIModal");
                    emit("loginErrorGeneric")
                });
        }

        return {
            modifyPost
        }
    }
};
</script>