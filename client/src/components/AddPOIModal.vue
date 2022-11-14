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
                                Aggiunta di un nuovo punto di interesse</h3>
                            <div class="mt-2">
                                <form @submit.prevent="addPost">
                                <div class=" grid grid-cols-none gap-6">
                                    <div class="flex flex-row gap-6 col-span-6 sm:col-span-4">
                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="dato-1" class="block pb-2 text-sm font-medium text-gray-700">
                                                Nome del punto di interesse:
                                            </label>
                                            <input type="text" name="dato-1" id="dato-1"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                                placeholder="es. Fontana di Nettuno">
                                        </div>
                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="dato-2" class="block pb-2 text-sm font-medium text-gray-700">
                                                Rank del punto di interesse:
                                            </label>
                                            <input type="number" name="dato-2" id="dato-2"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                                placeholder="es. 0.0">
                                        </div>
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="dato-1" class="block pb-2 text-sm font-medium text-gray-700">
                                            Longitudine del punto di interesse:
                                        </label>
                                        <label for="dato-1"
                                            class="block align-middle text-center pb-2 text-sm font-medium text-gray-700">
                                            {{ coordsNewPOI.lng }}
                                        </label>
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="dato-1" class="block pb-2 text-sm font-medium text-gray-700">
                                            Latitudine del punto di interesse:
                                        </label>
                                        <label for="dato-1"
                                            class="block align-middle text-center pb-2 text-sm font-medium text-gray-700">
                                            {{ coordsNewPOI.lat }}
                                        </label>
                                    </div>

                            </div>

                            <div class="py-4 space-y-4">
                                <p class="block text-sm font-medium text-gray-700">
                                    Tipologia di punto di interesse:
                                </p>
                                <div class="flex items-center">
                                    <input id="push-tipologia-1" name="push-notifications" type="radio"
                                        class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                    <label for="push-tipologia-1" class="ml-3 block text-sm font-medium text-gray-900">
                                        Tipologia 1
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="push-tipologia-2" name="push-notifications" type="radio"
                                        class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                    <label for="push-tipologia-2" class="ml-3 block text-sm font-medium text-gray-900">
                                        Tipologia 2
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="push-tipologia-3" name="push-notifications" type="radio"
                                        class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                    <label for="push-tipologia-3" class="ml-3 block text-sm font-medium text-gray-900">
                                        Tipologia 3
                                    </label>
                                </div>
                            </div>
                            <div class="px-4 pb-8 sm:px-6 sm:flex sm:flex-row-reverse">
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

export default {
    name: 'AddPOIModal',
    props: ['coordsNewPOI'],
    emits: [
        "addPost",
        "add400",
        "add401",
        "add404",
        "addErrorGeneric"
    ],
    setup(props, { emit }) {

        /*
            {
                "name": "Museo Medievale",
                "rank": 10.2,
                "category": "Department",
                "coord": {
                    "latitude": 11.343083381652832,
                    "longitude": 44.49433189374523
                }
            }         
        */
        const addPost = () => {
            console.log("Premuto il bottone di aggiunta di un nuovo POI");
            var addPOIJSON = new Object();
            addPOIJSON.name = document.getElementById("dato-1").value;
            addPOIJSON.rank = document.getElementById("dato-2").value;
            addPOIJSON.category = "Department";
            addPOIJSON.coord = new Object();
            addPOIJSON.coord.latitude = props.coordsNewPOI.lat;
            addPOIJSON.coord.longitude = props.coordsNewPOI.lng;
            console.log(addPOIJSON);
            var requestOptions = {
                method: "POST",
                body: addPOIJSON
            };

            fetch("http://casadiale.noip.me:62950/admin/newPOI", requestOptions)
                .then((response) => {
                    console.log(response);
                    switch (response.status) {
                        case 200:
                            console.log("POI aggiunto con successo");
                            emit("closeAddPOIModal");
                            break;
                        case 400:
                            console.log("Bad request.");
                            // emit("login400");
                            break;
                        case 401:
                            console.log("Authorization information is missing or invalid.");
                            // emit("login401");
                            break;
                        case 404:
                            console.log("A user with the specified ID was not found.");
                            // emit("login404");
                            break;
                        default:
                            console.log("Errore sconosciuto.");
                            break;
                    }
                })
                .catch((error) => console.log("error", error));

        };

        const closeAddPOIModal = () => {
            emit("closeAddPOIModal");
        };

        return { addPost, closeAddPOIModal };
    },
};
</script>