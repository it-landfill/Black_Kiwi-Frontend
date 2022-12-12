<template>
    <div class="relative z-[9]">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed z-[9] inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div
                    class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-2xl sm:w-full">
                    <div class="px-5 py-9">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="mt-6 text-2xl text-slate-900 font-medium" id="modal-title">
                                {{ titleErrorModal }}
                            </h3>
                            <div class="mt-5">
                                <p class="text-sm text-gray-500">
                                    {{ messageErrorModal }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="$emit('closeErrorModal')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
                            px-4 py-2 bg-slate-300 text-slate-900 text-base font-medium hover:bg-slate-900
                            hover:text-white sm:ml-3 sm:w-auto
                            sm:text-sm">Chiudere</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ErrorModal',
    props: [
        "titleErrorModal", 
        "messageErrorModal",
    ],
    components: { },
    emits: [
        "closeErrorModal",
    ],
    setup() { }
}
</script>