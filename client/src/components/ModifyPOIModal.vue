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
                                            <label for="dato-1" class="block pb-2 text-sm font-medium text-gray-700">
                                                Nome del dato corrente.
                                            </label>
                                            <input type="text" name="dato-1" id="dato-1"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                                placeholder="Attuale valore per il dato corrente">
                                        </div>

                                        <div class="col-span-6 sm:col-span-4">
                                            <label for="dato-2" class="block pb-2 text-sm font-medium text-gray-700">
                                                Nome del dato corrente.
                                            </label>
                                            <input type="text" name="dato-2" id="dato-2"
                                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-slate-600 focus:border-slate-600 focus:z-[8] sm:text-sm"
                                                placeholder="Attuale valore per il dato corrente">
                                        </div>
                                    </div>

                                    <div class="py-4 space-y-4">
                                        <p class="block text-sm font-medium text-gray-700">
                                            Tipologia
                                        </p>
                                        <div class="flex items-center">
                                            <input id="push-tipologia-1" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="push-tipologia-1"
                                                class="ml-3 block text-sm font-medium text-gray-900"> Tipologia 1
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="push-tipologia-2" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="push-tipologia-2"
                                                class="ml-3 block text-sm font-medium text-gray-900"> Tipologia 2
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input id="push-tipologia-3" name="push-notifications" type="radio"
                                                class="w-6 h-6 focus:ring-slate-900 text-slate-900 border-gray-300 accent-slate-900">
                                            <label for="push-tipologia-3"
                                                class="ml-3 block text-sm font-medium text-gray-900"> Tipologia 3
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

export default {
    props: [],
};
</script>