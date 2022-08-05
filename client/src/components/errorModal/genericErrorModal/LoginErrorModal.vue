<template>
    <div class="relative z-[9]">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed z-[9] inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <div
                    class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform sm:my-8 sm:max-w-lg sm:w-full">
                    <div class="px-4 pt-5 pb-5 sm:p-6 sm:pb-5">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 class="mt-6 text-2xl text-slate-900 font-medium" id="modal-title">Errore
                                in fase di login</h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500"> E' stato impossibile accedere al proprio account.
                                    Controllare che il nome account o la password inserita siano corrette.</p>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 pb-8 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="$emit('closeLoginError')" class=" w-full inline-flex justify-center rounded-md border border-transparent shadow-sm
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
    props: ["loginErrorMsg"],
}
</script>