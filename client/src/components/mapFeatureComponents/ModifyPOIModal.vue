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
                                <form action="#" method="POST">
                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="Nome" class="block pb-2 text-sm font-medium text-gray-700">
                                                Nome
                                            </label>
                                            <input type="text" name="Nome" id="Nome"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm">
                                        </div>

                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="Rank" class="block pb-2 text-sm font-medium text-gray-700">
                                                Rank
                                            </label>
                                            <input type="number" name="Rank" id="Rank"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="py-4 space-y-4">
                                        <p class="block text-sm font-medium text-gray-700">
                                            Tipologia
                                        </p>

                                        <div class="flex items-center">
                                            <input id="Historical Building" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Historical Building" class="ml-3 block text-sm font-medium text-gray-900"> Historical Building
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Park" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Park" class="ml-3 block text-sm font-medium text-gray-900"> Park
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Theater" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Theater" class="ml-3 block text-sm font-medium text-gray-900"> Theater
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Museum" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Museum" class="ml-3 block text-sm font-medium text-gray-900"> Museum
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="Department" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="Department" class="ml-3 block text-sm font-medium text-gray-900"> Department
                                            </label>
                                        </div>
                                    </div>
                                    <div class="px-4 pb-8 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="submit" @click="$emit('closeLoginError')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                            px-4 py-2 bg-slate-300 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white sm:ml-3 sm:w-auto
                            sm:text-sm">Inviare</button>
                                        <button type="submit" @click="$emit('closeLoginError')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
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

import { onMounted } from "vue";

export default {
    // Nominativo del component
    name: 'ModifyPOIModal',
    props: ["nodeInfo"],

    setup(props) {

        onMounted(() => {
            document.getElementById("Nome").setAttribute("value", props.nodeInfo.name);
            document.getElementById("Rank").setAttribute("value", props.nodeInfo.rank);
            document.getElementById(props.nodeInfo.category).setAttribute("checked", true);
        });

        const setupForm = () => {
            console.log(props.nodeInfo);

        }

        return {
            setupForm
        }
    }
};
</script>