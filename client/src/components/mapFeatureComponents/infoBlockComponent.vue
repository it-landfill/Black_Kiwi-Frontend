<template>
    <div class="relative w-full">
        <div class="min-h-[200px] px-4 py-4 sm:px-6 bg-white rounded-md shadow-lg">
            <h1 class="text-lg leading-6 font-medium text-gray-900">
                {{ nodeInfo.name }}
            </h1>
            <p class="mt-1 max-w-2xl pb-2 text-sm text-gray-500">
                Indetificativo univoco: {{ nodeInfo.id }}
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
                <button @click="removePOI" class=" w-full inline-flex justify-center rounded-md border border-transparent
                            py-2 px-4 text-slate-500  text-base font-medium 
                            hover:text-slate-900 sm:ml-3 sm:w-auto
                            sm:text-sm">Eliminare</button>
                <button @click="modifyPOI" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                             py-2 bg-slate-200 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white 
                            sm:text-sm">Modificare</button>
            </div>

        </div>
    </div>
</template>

<script>

export default {
    // Nominativo del component
    name: 'ErrorModal',
    props: ["nodeInfo"],
    emits: ["modifyPOI", "removePOI"],
    setup(_, { emit }) {

        const modifyPOI = () => {
            console.log("Premuto il bottone per la modifica di un punto di interesse.");
            emit("modifyPOI");
        };

        const removePOI = () => {
            console.log("Premuto il bottone di eliminazione di un POI");
            console.log(getToken());
            const myHeaders = new Headers();
            myHeaders.append('X-API-KEY', getToken());
            console.log(myHeaders.get('X-API-KEY'));
            var deletePOIJSON = new Object();
            deletePOIJSON.id = nodeInfo.id
            console.debug(deletePOIJSON);
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: deletePOIJSON
            };

            fetch(baseUri + "admin/newPOI", requestOptions)
                .then((response) => {
                    console.log(response);
                    switch (response.status) {
                        case 200:
                            console.log("POI eliminato con successo");
                            emit("removePOI");
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

        return { modifyPOI, removePOI };
    },
};
</script>