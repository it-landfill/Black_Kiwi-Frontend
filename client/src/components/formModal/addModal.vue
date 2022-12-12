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
                                Aggiunta di un punto di interesse </h3>
                            <div class="mt-2">
                                <form @submit.prevent="postAddPoIData">
                                    <div class=" grid grid-cols-none gap-6">
                                        <div class="flex flex-row gap-6 col-span-6 sm:col-span-4">
                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="name"
                                                    class="block pb-2 text-sm font-medium text-gray-700">
                                                    Nome del PoI:
                                                </label>
                                                <input type="text" name="name" id="name" required
                                                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                                    placeholder="es. Fontana di Nettuno">
                                            </div>
                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="rank"
                                                    class="block pb-2 text-sm font-medium text-gray-700">
                                                    Rank del PoI (Opzionale):
                                                </label>
                                                <input type="number" name="rank" id="rank"
                                                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                                    placeholder="es. 0.0">
                                            </div>
                                        </div>
                                        <div class="col-span-6 sm:col-span-4">
                                            <label class="block pb-2 text-sm font-medium text-gray-700">
                                                Latitudine e longitudine del PoI:
                                            </label>
                                            <label
                                                class="block align-middle text-center pb-2 text-sm font-medium text-gray-700">
                                                ({{ coordsNewPOI.lat }}, {{ coordsNewPOI.lng }})
                                            </label>
                                        </div>
                                   </div>

                                    <div class="py-4 space-y-4">
                                        <p class="block text-sm font-medium text-gray-700">
                                            Tipologia di PoI:
                                        </p>
                                        <div class="flex items-center">
                                            <input id="Historical Building" name="categoryAdd" type="radio" required
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Historical Building"
                                                class="ml-3 block text-sm font-medium text-gray-900">
                                                Historical Building
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Park" name="categoryAdd" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Park" class="ml-3 block text-sm font-medium text-gray-900">
                                                Park
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Theater" name="categoryAdd" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Theater"
                                                class="ml-3 block text-sm font-medium text-gray-900">
                                                Theater
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Museum" name="categoryAdd" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Museum"
                                                class="ml-3 block text-sm font-medium text-gray-900">
                                                Museum
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Department" name="categoryAdd" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Department"
                                                class="ml-3 block text-sm font-medium text-gray-900">
                                                Department
                                            </label>
                                        </div>
                                    </div>
                                    <div class="px-4 pb-8 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="submit" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                            px-4 py-2 bg-slate-300 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white sm:ml-3 sm:w-auto
                            sm:text-sm">Inviare</button>
                                        <button @click="$emit('closeAddModal')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
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
// Import funzioni di impostazione per POST e GET al server.
import {
    baseUri,
    getToken,
} from "@/components/js/dataConnection.js";

export default {
    name: 'addModal',
    props: [
        'coordsNewPOI'
    ],
    components: {},
    emits: [
        "addPoI",
        "closeAddModal",
        "showError"
    ],
    setup(props, { emit }) {

        // Funzione per ottenere i dati relativi al nuovo PoI ed inviarli.
        const postAddPoIData = () => {
            // Impostazione dell'header della richiesta.
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());
            // Acquisizione dei dati relativi al PoI da aggiungere.
            var formData = new Object();
            formData.name = document.getElementById("name").value;
            if (document.getElementById("rank").value != "") {
                formData.rank = parseFloat(document.getElementById("rank").value);
            }
            formData.category = document.querySelector('input[name="categoryAdd"]:checked').id;
            formData.coord = new Object();
            formData.coord.latitude = parseFloat(props.coordsNewPOI.lat);
            formData.coord.longitude = parseFloat(props.coordsNewPOI.lng);
            let dataJSON = JSON.stringify(formData);

            // Impostazione del metodo POST e invio dei dati al server
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: dataJSON
            };
            let titleError;
            let messageError;
            fetch(baseUri + "admin/newPOI", requestOptions)
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            // Testare se lo gettiamo effettivamente l'id
                            formData.id = response.headers.get("id");
                            emit("addPoI", formData);
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
                .catch((error) => console.log("error", error));
        };

        return { 
            postAddPoIData 
        };
    },
};
</script>