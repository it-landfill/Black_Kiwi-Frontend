<template>
    <div class="relative w-full">
        <div class="min-h-[200px] px-4 py-4 sm:px-6 bg-white rounded-md shadow-lg">
            <h1 class="text-lg leading-6 font-medium text-gray-900">
                Nominativo.
            </h1>
            <p class="mt-1 max-w-2xl pb-2 text-sm text-gray-500">
                Potenziali informazioni secondarie.
            </p>
            <div class="border-y border-gray-200">
                <dl class="py-3 space-y-2">
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                        <dd class="text-gray-900">Dato</dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                        <dd class="text-gray-900">Dato</dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                        <dd class="text-gray-900">Dato</dd>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:px-4 text-sm">
                        <dt class="font-medium sm:col-span-2 text-gray-500">Nominativo dato</dt>
                        <dd class="text-gray-900">Dato</dd>
                    </div>
                </dl>
            </div>

            <div class="sm:grid sm:grid-cols-5 sm:px-4 text-sm pt-4 pb-2 gap-2">
                <div class="col-start-1 col-span-3">
                    <div
                        class="border-[1px] border-slate-600 text-slate-600 shadow flex justify-center items-center rounded-md min-h-[40px]">
                        <i class="fa-solid fa-i-cursor font-medium tracking-widest"> Modifica</i>
                    </div>
                </div>
                <div class="col-start-4 col-span-2">
                    <div
                        class="border-[1px] border-red-600 text-red-600 shadow flex justify-center items-center rounded-md min-h-[40px]">
                        <i class="fa-solid fa-trash-can font-medium tracking-widest"> Elimina</i>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

export default {
};
</script>